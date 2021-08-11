<template>
    <div class="storey-box wrap">
        <div class="proxy-box">
            <div id="bili_live">
                <a
                    v-if="storyBanner.live && storyBanner.live.server_type"
                    target="_blank"
                    class="banner-card wrap"
                    :href="storyBanner.live.url"
                >
                    <img v-lazy="storyBanner.live.pic" />
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
                                        <img v-lazy="item.cover + '@206w_116h_1c_100q.webp'" />
                                        <p class="count">
                                            <i class="bilifont bili-icon_xinxi_renqi"></i>
                                            {{ $format.formatCount(item.online) }}
                                        </p>
                                    </div>
                                    <div class="up">
                                        <div class="up-cover">
                                            <img class="face" v-lazy="item.face" />
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
                                :class="liveCurrentActiveTab === 0 ? 'on' : ''"
                                @click="liveCurrentActiveTab = 0"
                            >直播排行</div>
                            <div
                                class="tab-switch-item"
                                :class="liveCurrentActiveTab === 1 ? 'on' : ''"
                                @click="liveCurrentActiveTab = 1"
                            >关注的主播</div>
                            <div
                                class="tab-switch-item"
                                :class="liveCurrentActiveTab === 2 ? 'on' : ''"
                                @click="liveCurrentActiveTab = 2"
                            >为你推荐</div>
                        </div>
                        <div v-show="liveCurrentActiveTab === 0" class="live-rank">
                            <a
                                v-for="(item,index) in liveData.ranking_list"
                                :key="index"
                                :href="item.link"
                                class="live-rank-item"
                                target="_blank"
                            >
                                <div class="rank-face">
                                    <span
                                        class="number"
                                        :class="index < 3 ? 'on' : ''"
                                    >{{ index + 1 }}</span>
                                    <img v-lazy="item.face" />
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
                            v-show="liveCurrentActiveTab === 1"
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
                                    <img v-lazy="item.face" />
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
                        <div v-else v-show="liveCurrentActiveTab === 1" class="empty-state">
                            <span>没有数据(-_-#)</span>
                        </div>
                        <div
                            v-show="liveCurrentActiveTab === 2"
                            class="recommend-activity home-slide"
                        >
                            <Carousel v-if="liveData.preview_banner_list" class="carousel">
                                <CarouselItem
                                    v-for="(item,index) in liveData.preview_banner_list"
                                    :key="index"
                                >
                                    <a :href="item.link" target="_blank">
                                        <img v-lazy="item.pic" />
                                        <p class="title">{{ item.title }}</p>
                                    </a>
                                </CarouselItem>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
            <div id="bili_douga">
                <div class="space-between">
                    <div class="card-list">
                        <StoreyTitle title="动画" link="/v/douga" svg="#bili-douga">
                            <ExchangeBtn link="/v/douga" @click="getDouga"></ExchangeBtn>
                        </StoreyTitle>
                        <div class="zone-list-box">
                            <VideoCardCommon
                                v-for="(item,index) in dougaData"
                                :key="index"
                                :pic="item.pic"
                                :bvid="item.bvid"
                                :stat="item.stat"
                                :duration="item.duration"
                                :title="item.title"
                                :owner="item.owner"
                            ></VideoCardCommon>
                        </div>
                    </div>
                    <Rank
                        v-if="dougaRank.length"
                        moreLink="//www.bilibili.com/v/popular/rank/douga"
                    >
                        <RankItem
                            v-for="(item,index) in dougaRank.slice(0, 10)"
                            :key="index"
                            :bvid="item.bvid"
                            :pic="item.pic"
                            :title="item.title"
                            :pts="item.pts"
                        ></RankItem>
                    </Rank>
                </div>
            </div>
            <div id="bili_anime">
                <a
                    v-if="storyBanner.anime && storyBanner.anime.server_type"
                    target="_blank"
                    class="banner-card wrap"
                    :href="storyBanner.anime.url"
                >
                    <img v-lazy="storyBanner.anime.pic" />
                    <i v-if="storyBanner.anime.is_ad" class="gg-icon"></i>
                </a>
                <div class="anime">
                    <div class="space-between">
                        <TimeLine :timeLineData="animeTimeLine"></TimeLine>
                        <Rank
                            v-if="animeRank.length"
                            pgc
                            moreLink="//www.bilibili.com/v/popular/rank/bangumi"
                        >
                            <RankItem
                                v-for="(item,index) in animeRank.slice(0, 10)"
                                :key="index"
                                :title="item.title"
                                :index_show="item.new_ep.index_show"
                                :ssid="item.season_id"
                            ></RankItem>
                        </Rank>
                    </div>
                    <div class="space-between">
                        <div class="card-list">
                            <StoreyTitle title="番剧动态" link="//www.bilibili.com/anime/">
                                <ExchangeBtn link="//www.bilibili.com/anime/" @click="getAnime"></ExchangeBtn>
                            </StoreyTitle>
                            <div class="zone-list-box">
                                <VideoCardCommon
                                    v-for="(item,index) in animeData"
                                    :key="index"
                                    :pic="item.pic"
                                    :bvid="item.bvid"
                                    :stat="item.stat"
                                    :duration="item.duration"
                                    :title="item.title"
                                    :owner="item.owner"
                                ></VideoCardCommon>
                            </div>
                        </div>
                        <div class="special-recommend home-slide">
                            <header>特别推荐</header>
                            <Carousel v-if="animeSlideShow.length" class="carousel">
                                <CarouselItem v-for="(item,index) in animeSlideShow" :key="index">
                                    <a :href="item.link" target="_blank">
                                        <img v-lazy="item.img" />
                                        <p class="title">{{ item.title }}</p>
                                    </a>
                                </CarouselItem>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
            <div id="bili_guochuang">
                <div class="guochuang">
                    <div class="space-between">
                        <TimeLine :seasonType="4" :timeLineData="guoChuangTimeLine"></TimeLine>
                        <div class="r-con">
                            <Rank
                                v-if="guoChuangRank.length"
                                pgc
                                moreLink="//www.bilibili.com/v/popular/rank/guochan"
                            >
                                <RankItem
                                    v-for="(item,index) in guoChuangRank.slice(0, 7)"
                                    :key="index"
                                    :title="item.title"
                                    :index_show="item.new_ep.index_show"
                                    :ssid="item.season_id"
                                ></RankItem>
                            </Rank>
                            <div class="special-recommend home-slide">
                                <Carousel v-if="guoChuangSlideShow.length" class="carousel">
                                    <CarouselItem
                                        v-for="(item,index) in guoChuangSlideShow"
                                        :key="index"
                                    >
                                        <a :href="item.link" target="_blank">
                                            <img v-lazy="item.img" />
                                            <p class="title">{{ item.title }}</p>
                                        </a>
                                    </CarouselItem>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                    <div class="space-between">
                        <div class="card-list">
                            <StoreyTitle title="国产原创相关" link="//www.bilibili.com/guochuang/">
                                <ExchangeBtn
                                    link="//www.bilibili.com/guochuang/"
                                    @click="getGuoChuang"
                                ></ExchangeBtn>
                            </StoreyTitle>
                            <div class="zone-list-box">
                                <VideoCardCommon
                                    v-for="(item,index) in guoChuangData"
                                    :key="index"
                                    :pic="item.pic"
                                    :bvid="item.bvid"
                                    :stat="item.stat"
                                    :duration="item.duration"
                                    :title="item.title"
                                    :owner="item.owner"
                                ></VideoCardCommon>
                            </div>
                        </div>
                        <Rank v-if="guoChuangOriginalRank.length">
                            <RankItem
                                v-for="(item,index) in guoChuangOriginalRank.slice(0, 10)"
                                :key="index"
                                :bvid="item.bvid"
                                :pic="item.pic"
                                :title="item.title"
                                :pts="item.pts"
                            ></RankItem>
                        </Rank>
                    </div>
                </div>
            </div>
            <div id="bili_manga">
                <a
                    v-if="storyBanner.manga && storyBanner.manga.server_type"
                    target="_blank"
                    class="banner-card wrap"
                    :href="storyBanner.manga.url"
                >
                    <img v-lazy="storyBanner.manga.pic" />
                    <i v-if="storyBanner.manga.is_ad" class="gg-icon"></i>
                </a>
                <div class="space-between">
                    <MangaPanel></MangaPanel>
                    <MangaRank></MangaRank>
                </div>
            </div>
        </div>
        <div id="bili_report_spe_rec" class="space-between s-rec wrap">
            <div class="card-list">
                <StoreyTitle svg="#bili-tebietuijian" title="特别推荐"></StoreyTitle>
                <div class="zone-list-box">
                    <VideoCardCommon
                        v-for="(item, index) in specialRcmdData"
                        :key="index"
                        :pic="item.pic"
                        :bvid="item.bvid"
                        :stat="{ like: item.like, view: item.play, coin: item.coins }"
                        :duration="item.duration"
                        :title="item.title"
                        :owner="{ name: item.author, mid: item.mid }"
                    ></VideoCardCommon>
                </div>
            </div>
            <a v-if="spcialRcmdPic" target="_blank" class="operate-card gg" :href="spcialRcmdPic.url">
                <img v-lazy="spcialRcmdPic.pic" :alt="spcialRcmdPic.name" />
            </a>
        </div>
    </div>
</template>
<script>
import { getLive, getLiveWatching, getRegionDynamic, getRegionRanking, getLiveMore, getTimeLine, getPgcRanking, getSlideShow, getSpecialRcmd } from '@/api'
import { mapGetters, mapState } from 'vuex'
import Carousel from './Carousel'
import CarouselItem from './CarouselItem'
import StoreyTitle from './StoreyTitle'
import ExchangeBtn from './ExchangeBtn'
import VideoCardCommon from './VideoCardCommon'
import Rank from './Rank'
import RankItem from './RankItem'
import TimeLine from './TimeLine'
import MangaPanel from './MangaPanel'
import MangaRank from './MangaRank'
export default {
    name: 'StoryBox',
    components: { Carousel, CarouselItem, StoreyTitle, ExchangeBtn, VideoCardCommon, Rank, RankItem, TimeLine, MangaPanel, MangaRank },
    data() {
        return {
            liveData: {},
            liveWatchingData: [],
            liveCurrentActiveTab: 2,
            dougaData: [],
            dougaRank: [],
            animeTimeLine: {},
            animeRank: [],
            animeData: [],
            animeSlideShow: [],
            guoChuangTimeLine: {},
            guoChuangRank: [],
            guoChuangSlideShow: [],
            guoChuangData: [],
            guoChuangOriginalRank: [],
            specialRcmdData: []
        }
    },
    computed: {
        ...mapGetters(['storyBanner']),
        ...mapState({
            spcialRcmdPic: state => state.locsData && state.locsData['31'] && state.locsData['31'][0]
        })
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
            getLiveWatching({ pagesize: '6', page: '1' }).then(
                response => {
                    this.liveWatchingData = response.data.list
                })
        },
        getDouga() {
            getRegionDynamic({ ps: '12', rid: '1' }).then(
                response => {
                    this.dougaData = response.data.archives
                }
            )
        },
        getDougaRanking() {
            getRegionRanking({ rid: '1' }).then(
                response => {
                    this.dougaRank = response.data
                }
            )
        },
        getAnimeTimeLine() {
            var days = (new Date().getDay() + 6) % 7
            getTimeLine({ season_type: 1, day_before: days, day_after: 6 - days }).then(
                response => {
                    this.animeTimeLine = response.result
                }
            )
        },
        getGuoChuangTimeLine() {
            var days = (new Date().getDay() + 6) % 7
            getTimeLine({ season_type: 4, day_before: days, day_after: 6 - days }).then(
                response => {
                    this.guoChuangTimeLine = response.result
                }
            )
        },
        getAnimeRanking() {
            getPgcRanking({ season_type: 1, day: 3 }).then(
                response => {
                    this.animeRank = response.result.list
                }
            )
        },
        getGuochuangRanking() {
            getPgcRanking({ season_type: 4, day: 3 }).then(
                response => {
                    this.guoChuangRank = response.result.list
                }
            )
        },
        getAnime() {
            getRegionDynamic({ ps: '12', rid: '13' }).then(
                response => {
                    this.animeData = response.data.archives
                }
            )
        },
        getAnimeSlideShow() {
            getSlideShow({ position_id: 104 }).then(
                response => {
                    this.animeSlideShow = response.result
                }
            )
        },
        getGuoChuangSlideShow() {
            getSlideShow({ position_id: 101 }).then(
                response => {
                    this.guoChuangSlideShow = response.result
                }
            )
        },
        getGuoChuang() {
            getRegionDynamic({ ps: '12', rid: '168' }).then(
                response => {
                    this.guoChuangData = response.data.archives
                }
            )
        },
        getGuoChuangOriginalRanking() {
            getRegionRanking({ rid: '168' }).then(
                response => {
                    this.guoChuangOriginalRank = response.data
                }
            )
        },
        setSpecialRcmd() {
            getSpecialRcmd().then(
                response => {
                    this.specialRcmdData = response.list || []
                }
            )
        }
    },
    mounted() {
        this.setLive()
        this.setLiveWatching()
        this.getDouga()
        this.getDougaRanking()
        this.getAnimeTimeLine()
        this.getAnimeRanking()
        this.getAnime()
        this.getAnimeSlideShow()
        this.getGuoChuangTimeLine()
        this.getGuochuangRanking()
        this.getGuoChuangSlideShow()
        this.getGuoChuang()
        this.getGuoChuangOriginalRanking()
        this.setSpecialRcmd()
    },

}
</script>
<style>
.storey-box .proxy-box {
    min-height: 1000px;
}

/* 横幅 */
.banner-card {
    position: relative;
    display: block;
    max-height: 134px;
    margin-bottom: 46px;
}

.banner-card img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
}

.banner-card .gg-icon {
    position: absolute;
    left: 5px;
    bottom: 5px;
    width: 38px;
    height: 22px;
    margin-right: 3px;
    z-index: 1;
    vertical-align: middle;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAsCAMAAAD4va5DAAAAolBMVEX///8AAAAAAAAAAAAAAAACAgIAAAAAAAAGBgb5+fns7OwAAACBgYHq6ur9/f17e3tgYGD09PSoqKiLi4sAAAANDQ3V1dW6urqPj48DAwMAAAD////u7u7j4+MbGxv////b29vBwcH19fXt7e3GxsaLi4ukpKRTU1P4+Pjl5eXh4eHX19fLy8vb29v4+PisrKwvLy86Ojr7+/vy8vK4uLhVVVX0WqNFAAAANnRSTlOZAgULFR0IACCBYxIvW4sxJmk0HxoXU0grJQ6TZl0cj1RFcmtENTUmfGFYTUlGcT4rI4dyMhsJ24tXAAABiElEQVRIx+3XyW6DMBCA4WnAzrCUJUDYCpQAIWuTdHn/V6sNqZqFAwSfqv4HJHP4ZECIAabT6ZOQGARnazKqhuBYI1EqjYjSxpsCt6gUaZr8cJoWSZRr0FiObcCIDNvhWoNJTgYjyxypxWhkw+jsiHJsQjVjPGZodMIxSQMBaVKLySIw+R/jxX5lXK2LFYDqK4/tLCeby+UadwA7XAzECj/Py7KcuXVZ5rnv+zHfmEXYzvbuUOwVyU+IGIYhxxLipp4ne15K2Dm/P0Y2ylV8tyQNWF+yEwS6ac4HYC9w0wLT5vr28tvgy7zD3msbhGHqRm369LZqW/Y4FiJxWR7LdQnBMFR6Ylss4KYkSZ4vYkujJ7bDhbjX6YAruGu9nLGW7THvj1Vo3GNzcrIsq64tFtH7YyeELuz3qaT9MQUrcZiKW3HYISw6MSvQddM0dT0gvbH4eIy7MLS41Who9r9nc+hoXX3Auazy/84HZSAmdjwQOriIHKmEDnuCx1ChA7LI0V3sT4XQ351vRIIkxg4KQCAAAAAASUVORK5CYII=);
    background-size: cover;
}

/* 推荐 */
.zone-list-box {
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 1286px;
    height: 404px;
}

@media screen and (max-width: 1654px) {
    .footer-wrap .zone-list-box,
    .wrap .zone-list-box {
        width: 854px !important;
    }
}

@media screen and (max-width: 1438px) {
    .footer-wrap .zone-list-box,
    .wrap .zone-list-box {
        width: 710px !important;
        height: 360px;
    }
}

@media screen and (max-width: 1870px) {
    .footer-wrap .space-between .zone-list-box,
    .wrap .space-between .zone-list-box {
        width: 1070px;
    }
}

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

.anime .zone-list-box {
    height: 376px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .anime .zone-list-box,
    .wrap .anime .zone-list-box {
        height: 332px;
    }
}

.special-recommend {
    width: 320px;
}

.anime .special-recommend {
    height: 314px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .anime .special-recommend,
    .wrap .anime .special-recommend {
        width: 265px !important;
        height: 274px !important;
    }
}

.special-recommend header {
    height: 36px;
    margin-bottom: 16px;
    font-size: 20px;
    color: #212121;
    line-height: 36px;
}

.special-recommend .carousel,
.special-recommend .van-slide {
    position: relative;
    width: 100% !important;
    height: 100% !important;
}

.special-recommend .carousel img,
.special-recommend .van-slide img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
}

.guochuang .r-con {
    width: 320px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .guochuang .r-con,
    .footer-wrap .pgc-rank,
    .wrap .guochuang .r-con,
    .wrap .pgc-rank {
        width: 265px;
    }
}

.guochuang .special-recommend {
    height: 110px;
    margin-top: 20px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .guochuang .special-recommend,
    .wrap .guochuang .special-recommend {
        width: 265px !important;
        height: 91px !important;
    }
}

.s-rec {
    height: 252px;
    overflow: hidden;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .s-rec,
    .wrap .s-rec {
        height: 220px;
    }
}

.s-rec .gg {
    width: 320px;
    margin-top: 52px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .s-rec .operate-card,
    .wrap .s-rec .operate-card {
        width: 265px;
    }
}
</style>