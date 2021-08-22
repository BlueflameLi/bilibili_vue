<template>
    <div id="bili_live" ref="live">
        <a
            v-if="storyBanner.live && storyBanner.live.server_type"
            target="_blank"
            class="banner-card wrap"
            :href="storyBanner.live.url"
        >
            <img :src="storyBanner.live.pic" />
            <i v-if="storyBanner.live.is_ad" class="gg-icon"></i>
        </a>
        <div class="space-between">
            <div class="live-list">
                <StoreyTitle title="正在直播" link="//live.bilibili.com/" svg="#bili-live">
                    <template #title>
                        <div class="text-info">
                            <span>当前共有 {{ liveData.online_total }} 个在线直播</span>
                        </div>
                    </template>
                    <ExchangeBtn link="//live.bilibili.com/" @click="setLiveMore"></ExchangeBtn>
                </StoreyTitle>
                <div class="zone-list-box">
                    <div
                        v-for="(item,index) in liveData.recommend_room_list"
                        :key="index"
                        class="live-card"
                    >
                        <a :href="'//live.bilibili.com' + item.link" target="_blank">
                            <div class="pic">
                                <img :src="item.cover + '@206w_116h_1c_100q.webp'" />
                                <p class="count">
                                    <i class="bilifont bili-icon_xinxi_renqi"></i>
                                    {{ $format.formatCount(item.online) }}
                                </p>
                            </div>
                            <div class="up">
                                <div class="up-cover">
                                    <img class="face" :src="item.face" />
                                    <svg
                                        v-if="item.verify.role"
                                        aria-hidden="true"
                                        class="svg-icon vip-icon"
                                    >
                                        <use
                                            v-if="item.verify.role >= 3"
                                            xlink:href="#bili-ic_gerenzhongxin_qiyerenzhenghuibiao"
                                        />
                                        <use
                                            v-else
                                            xlink:href="#bili-ic_gerenzhongxin_gerenrenzhenghuibiao"
                                        />
                                    </svg>
                                </div>
                                <div class="txt">
                                    <p class="name">{{ item.uname }}</p>
                                    <p class="desc" title="item.title">{{ item.title }}</p>
                                    <p class="tag">{{ item.area_v2_name }}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="live-tabs">
                <div class="tab-switch">
                    <div
                        class="tab-switch-item"
                        :class="{ 'on': currentActiveTab === 0 }"
                        @click="currentActiveTab = 0"
                    >直播排行</div>
                    <div
                        class="tab-switch-item"
                        :class="{ 'on': currentActiveTab === 1 }"
                        @click="currentActiveTab = 1"
                    >关注的主播</div>
                    <div
                        class="tab-switch-item"
                        :class="{ 'on': currentActiveTab === 2 }"
                        @click="currentActiveTab = 2"
                    >为你推荐</div>
                </div>
                <div v-show="currentActiveTab === 0" class="live-rank">
                    <a
                        v-for="(item,index) in liveData.ranking_list"
                        :key="index"
                        :href="item.link"
                        class="live-rank-item"
                        target="_blank"
                    >
                        <div class="rank-face">
                            <span class="number" :class="{ 'on': index < 3 }">{{ index + 1 }}</span>
                            <img :src="item.face" />
                            <div class="txt">
                                <p>{{ item.uname }}</p>
                                <p class="p2">{{ item.title }}</p>
                            </div>
                        </div>
                        <div class="count">
                            <i class="bilifont bili-icon_xinxi_renqi"></i>
                            {{ $format.formatCount(item.online) }}
                        </div>
                    </a>
                </div>
                <div
                    v-if="liveWatchingData.length"
                    v-show="currentActiveTab === 1"
                    class="live-rank"
                >
                    <a
                        v-for="(item,index) in liveWatchingData"
                        :key="index"
                        :href="item.link"
                        class="live-rank-item"
                        target="_blank"
                    >
                        <div class="rank-face">
                            <img :src="item.face" />
                            <div class="txt">
                                <p>{{ item.uname }}</p>
                                <p class="p2">{{ item.title }}</p>
                            </div>
                        </div>
                        <div class="count">
                            <i class="bilifont bili-icon_xinxi_renqi"></i>
                            {{ $format.formatCount(item.online) }}
                        </div>
                    </a>
                </div>
                <div v-else v-show="currentActiveTab === 1" class="empty-state">
                    <span>没有数据(-_-#)</span>
                </div>
                <div v-show="currentActiveTab === 2" class="recommend-activity home-slide">
                    <Carousel v-if="liveData.preview_banner_list" class="carousel">
                        <CarouselItem
                            v-for="(item,index) in liveData.preview_banner_list"
                            :key="index"
                        >
                            <a :href="item.link" target="_blank">
                                <img :src="item.pic" />
                                <p class="title">{{ item.title }}</p>
                            </a>
                        </CarouselItem>
                    </Carousel>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getLive, getLiveWatching, getLiveMore } from '@/api'
import { mapGetters, mapState } from 'vuex'
import StoreyTitle from '../StoreyTitle'
import ExchangeBtn from '../ExchangeBtn'
import Carousel from '../../Carousel/Carousel'
import CarouselItem from '../../Carousel/CarouselItem'
export default {
    name: 'Live',
    components: {
        StoreyTitle,
        ExchangeBtn,
        Carousel,
        CarouselItem
    },
    data() {
        return {
            liveData: {},
            liveWatchingData: [],
            currentActiveTab: 2,
            isShow: false
        }
    },
    computed: {
        ...mapGetters(['storyBanner']),
        ...mapState(['userInfo', 'scrollTop', 'viewHeight']),
        inView() {
            if (this.$refs.live) {
                let offsetHeight = this.$refs.live.offsetHeight
                let offsetTop = this.$refs.live.offsetTop
                return offsetTop - (this.viewHeight + 100) < this.scrollTop && this.scrollTop < offsetTop + offsetHeight
            }
            else
                return this.scrollTop && this.viewHeight && false
        }
    },
    watch: {
        inView() {
            if (!this.isShow && this.inView) {
                this.isShow = true
                this.setLive()
                this.setLiveWatching()
            }
        }
    },
    methods: {
        setLive() {
            getLive().then(
                response => {
                    this.liveData = response.data
                })
        },
        setLiveMore() {
            getLiveMore().then(
                response => {
                    this.liveData.recommend_room_list = response.data.recommend_room_list
                }
            )
        },
        setLiveWatching() {
            if (this.userInfo && this.userInfo.isLogin)
                getLiveWatching({ pagesize: '6', page: '1' }).then(
                    response => {
                        this.liveWatchingData = response.data.list
                    })
        },
    }
}
</script>
<style>
.live-card {
    width: 206px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .zone-list-box .live-card,
    .wrap .zone-list-box .live-card {
        width: 170px;
    }
}

@media screen and (max-width: 1654px) {
    .footer-wrap .zone-list-box .live-card:nth-child(n + 9),
    .footer-wrap .zone-list-box .video-card-common:nth-child(n + 9),
    .wrap .zone-list-box .live-card:nth-child(n + 9),
    .wrap .zone-list-box .video-card-common:nth-child(n + 9) {
        display: none;
    }
}

@media screen and (max-width: 1870px) {
    .footer-wrap .space-between .zone-list-box .live-card:nth-child(n + 11),
    .footer-wrap
        .space-between
        .zone-list-box
        .video-card-common:nth-child(n + 11),
    .wrap .space-between .zone-list-box .live-card:nth-child(n + 11),
    .wrap .space-between .zone-list-box .video-card-common:nth-child(n + 11) {
        display: none;
    }
}

.live-card .pic {
    position: relative;
    display: block;
    cursor: pointer;
    margin-bottom: 10px;
    width: 100%;
    height: 116px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .zone-list-box .live-card .pic,
    .wrap .zone-list-box .live-card .pic {
        width: 100%;
        height: 96px;
    }
}

.live-card .pic:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 48px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAwCAYAAAGnNCAXAAAABGdBTUEAALGPC/xhBQAAAENJREFUCB1jYGBgYGICEpIgQgqNBRRi4MMmARYDyXKAWLwgggfOAnMJiIH0soJ0sMEJdlQWWBYshpAAK0ZwwSzS1AEAes8Ckyqvlc0AAAAASUVORK5CYII=);
    background-size: contain;
    background-repeat: repeat-x;
    bottom: 0;
    left: 0;
    border-radius: 2px;
}

.live-card .pic img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
}

.live-card .pic .count {
    position: absolute;
    bottom: 0;
    left: 0;
    color: #fff;
    font-size: 12px;
    padding: 6px 8px;
    height: 28px;
    display: flex;
    align-items: center;
    line-height: 16px;
}

.live-card .pic .count .bilifont {
    margin-right: 4px;
}

/* up主信息 */
.live-card .up {
    display: block;
    display: flex;
    justify-content: space-between;
    line-height: 16px;
}

.live-card .up .up-cover {
    position: relative;
}

.live-card .up .up-cover .face {
    width: 36px;
    height: 36px;
    display: inline-block;
    border-radius: 50%;
    background: #f7f7f7;
}

.live-card .up .up-cover .vip-icon {
    position: absolute;
    right: -4px;
    top: 23px;
    width: 15px;
    height: 15px;
}

.live-card .up .txt {
    width: 158px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .live-card .up .txt,
    .wrap .live-card .up .txt {
        width: 128px;
    }
}

.live-card .up .txt p {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 20px;
}

.live-card .up .txt .name {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
}

.live-card .up .txt .desc {
    font-size: 12px;
    color: #505050;
    line-height: 18px;
    margin-top: 2px;
}

.live-card .up .txt .tag {
    font-size: 12px;
    line-height: 16px;
    color: #999;
    margin-top: 8px;
}

/* 右侧切换 */
.live-tabs {
    width: 320px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .live-tabs,
    .wrap .live-tabs {
        width: 265px;
    }
}

.live-tabs .tab-switch {
    display: flex;
    height: 36px;
    margin-right: 16px;
    margin-bottom: 16px;
    align-items: center;
}

.live-tabs .tab-switch .tab-switch-item {
    font-size: 12px;
    line-height: 18px;
    height: 22px;
    margin-right: 12px;
    cursor: pointer;
}

.live-tabs .tab-switch .tab-switch-item.on {
    border-bottom: 1px solid #00a1d6;
    color: #00a1d6;
}

/* 直播排行榜 */
.live-rank .live-rank-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 22px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .live-tabs .live-rank .live-rank-item,
    .wrap .live-tabs .live-rank .live-rank-item {
        margin-bottom: 16px;
    }
}

.live-rank .live-rank-item .rank-face {
    display: flex;
    align-items: center;
}

.live-rank .live-rank-item .number {
    font-size: 14px;
    color: #999;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    background: #fff;
    border-radius: 2px;
    display: inline-block;
    margin-right: 12px;
}

.live-rank .live-rank-item .number.on {
    color: #fff;
    background: #00a1d6;
}

.live-rank .live-rank-item img {
    width: 44px;
    height: 44px;
    border-radius: 44px;
    margin-right: 12px;
}

.live-rank .live-rank-item .txt {
    display: inline-block;
    margin-right: 10px;
    width: 158px;
    vertical-align: middle;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .live-tabs .live-rank .live-rank-item .txt,
    .wrap .live-tabs .live-rank .live-rank-item .txt {
        width: 102px;
    }
}

.live-rank .live-rank-item .txt p {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.live-rank .live-rank-item .txt p:first-child {
    font-size: 14px;
    font-weight: 500;
}

.live-rank .live-rank-item .txt p.p2 {
    color: #505050;
    line-height: 18px;
    margin-top: 2px;
}

.live-rank .live-rank-item .count {
    color: #999;
    font-size: 12px;
    display: -ms-flexbox;
    display: flex;
    white-space: nowrap;
    padding-top: 4px;
}

.live-rank .live-rank-item .count .bilifont {
    margin-right: 4px;
}

.empty-state {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.recommend-activity {
    position: relative;
    height: 330px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .recommend-activity,
    .wrap .recommend-activity {
        width: 265px !important;
        height: 273px !important;
    }
}

.recommend-activity .carousel,
.recommend-activity .van-slide {
    position: relative;
    width: 100% !important;
    height: 100% !important;
}

.recommend-activity .carousel img,
.recommend-activity .van-slide img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
}
</style>