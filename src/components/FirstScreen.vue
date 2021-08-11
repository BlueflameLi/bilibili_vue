<template>
    <div class="first-screen wrap">
        <div class="space-between">
            <div class="focus-carousel home-slide" scrollshow="true">
                <div class="van-slide ggc">
                    <transition
                        v-for="(item, index) in imagesData"
                        :key="index"
                        :name="swipeData.dir"
                    >
                        <div v-show="index === swipeData.currentIndex" class="item">
                            <a :href="item.url" target="_blank">
                                <img v-if="item.pic" v-lazy="item.pic" :alt="item.name" />
                                <p class="title">
                                    <i v-if="item.is_ad" class="bypb-icon"></i>
                                    {{ item.name }}
                                </p>
                            </a>
                        </div>
                    </transition>
                </div>
                <div class="trigger">
                    <span
                        v-for="(item, index) in imagesData"
                        :key="index"
                        :class="{ on: index === swipeData.currentIndex }"
                        @click="swipeTo(index)"
                    ></span>
                </div>
                <a href="//www.bilibili.com/blackboard/topic_list.html" class="more">
                    更多
                    <i class="bilifont bili-icon_caozuo_qianwang"></i>
                </a>
            </div>
            <div class="rcmd-box-wrap">
                <div class="rcmd-box">
                    <div
                        v-for="(item, index) in rcmdData.slice(0, 10)"
                        :key="index"
                        class="video-card-reco"
                    >
                        <div class="info-box">
                            <a :href="item.uri" target="_blank">
                                <img v-if="item.pic" v-lazy="item.pic" />
                                <div class="info">
                                    <p :title="item.title" class="title">{{ item.title }}</p>
                                    <p class="up">
                                        <i class="bilifont bili-icon_xinxi_UPzhu"></i>
                                        {{ item.owner ? item.owner.name : '' }}
                                    </p>
                                    <p
                                        class="play"
                                    >{{ item.stat ? $format.formatCount(item.stat.view) : '' }}播放量</p>
                                </div>
                            </a>
                        </div>
                        <div class="watchlater">
                            <span class="wl-tips" style="left: -21px;">稍后再看</span>
                        </div>
                    </div>
                </div>
                <div class="change-btn" @click="setRcmd">
                    <i class="bilifont bili-icon_caozuo_huanyihuan"></i>
                    <span>换一换</span>
                </div>
            </div>
        </div>
        <div class="space-between">
            <div class="extension">
                <header class="storey-title">
                    <div class="l-con">
                        <svg aria-hidden="true" class="svg-icon">
                            <use xlink:href="#bili-tuiguang" />
                        </svg>
                        <a target="_blank" class="name no-link">推广</a>
                        <div class="text-info">
                            <a
                                v-for="(item,index) in locsData['1550']"
                                :key="index"
                                :href="item.url"
                                target="_blank"
                                class="text-info-link"
                            >
                                <i class="bilifont bili-icon_xinxi_huo"></i>
                                {{ item.name }}
                            </a>
                        </div>
                    </div>
                </header>
                <div class="ext-box">
                    <div
                        v-for="(item,index) in locsData['34']"
                        :key="index"
                        class="video-card-common ex-card-common"
                    >
                        <div class="card-pic">
                            <a :href="item.url" target="_blank">
                                <img v-lazy="item.pic + '@412w_232h_1c'" />
                                <div class="count">
                                    <div class="left"></div>
                                    <div class="right">
                                        <span>{{ item.archive ? $format.formatSeconds(item.archive.duration) : '' }}</span>
                                    </div>
                                </div>
                                <p class="ex-title" :title="item.name">
                                    <span v-if="item.is_ad" class="gg-icon">广告</span>
                                    <span>{{ item.name }}</span>
                                </p>
                            </a>
                        </div>
                        <a
                            v-if="item.archive && item.archive.owner"
                            :href="`//space.bilibili.com/${item.archive.owner.mid}/`"
                            target="_blank"
                            class="ex-up"
                        >
                            <i class="bilifont bili-icon_xinxi_UPzhu"></i>
                            {{ item.archive.owner.name }}
                        </a>
                        <a
                            v-else-if="item.adver_name"
                            :href="item.url"
                            target="_blank"
                            class="adver_name"
                        >{{ item.adver_name }}</a>
                    </div>
                </div>
            </div>
            <div class="bypb-window">
                <div class="online">
                    <a href="//www.bilibili.com/video/online.html" target="_blank">观看列表</a>
                </div>
                <a
                    v-if="locsData['29']"
                    target="_blank"
                    class="operate-card"
                    :href="locsData['29'][0].url"
                >
                    <img v-lazy="locsData['29'][0].pic" :alt="locsData['29'][0].name" />
                </a>
            </div>
        </div>
        <div v-if="true" class="space-between">
            <div class="extension">
                <header class="storey-title">
                    <div class="l-con">
                        <img
                            src="//i0.hdslb.com/bfs/feed-admin/2d46df9bbf585fc72155bd4904fd30545669f088.png"
                            class="sprite"
                        />
                        <a
                            href="https://www.bilibili.com/v/game/match/"
                            target="_blank"
                            class="name"
                        >电竞赛事</a>
                    </div>
                </header>
                <div class="ext-box">
                    <div
                        v-for="(item,index) in locsData['3449']"
                        :key="index"
                        class="video-card-common"
                    >
                        <div :class="{ 'card-pic': item.archive, 'match-card-pic': item.room }">
                            <a :href="item.url" target="_blank">
                                <img v-lazy="item.pic + '@206w_116h_1c_100q.jpg'" />
                                <div class="count">
                                    <div class="left">
                                        <span v-if="item.archive">
                                            <i class="bilifont bili-icon_shipin_bofangshu"></i>
                                            {{ $format.formatCount(item.archive.stat.view) }}
                                        </span>
                                        <span v-if="item.archive">
                                            <i class="bilifont bili-icon_shipin_dianzanshu"></i>
                                            {{ $format.formatCount(item.archive.stat.like) }}
                                        </span>
                                    </div>
                                    <div class="right">
                                        <span
                                            v-if="item.archive"
                                        >{{ $format.formatSeconds(item.archive.duration) }}</span>
                                        <i
                                            v-else-if="item.room"
                                            class="bilifont bili-icon_xinxi_renqi"
                                        ></i>
                                        {{ item.room ? $format.formatCount(item.room.show.popularity_count) : '' }}
                                    </div>
                                </div>
                                <p
                                    :class="{ 'ex-title': item.archive, 'live-title': item.room }"
                                    :title="item.name"
                                >
                                    <span v-if="item.room" class="live">
                                        <i></i>直播中
                                    </span>
                                    <span>{{ item.name }}</span>
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bypb-window ggpos">
                <a
                    href="https://www.bilibili.com/blackboard/activity-9XQ2e2aUKj.html"
                    target="_blank"
                >
                    <img
                        src="//i0.hdslb.com/bfs/feed-admin/c22765645393e853d4139cf23eb79ef5f689690b.jpg@320w_184h_1c_100q.jpg"
                        alt="诚聘！投稿瓜分10万现金奖励！"
                        class="pic"
                    />
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { getRcmd, getLoc } from '@/api'
import { mapState } from 'vuex'


export default {
    name: 'FirstScreen',
    data() {
        return {
            imagesData: [{}, {}, {}, {}, {}],
            swipeData: {
                currentIndex: 0,
                timer: null,
                dir: 'next'
            },
            rcmdData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        }
    },
    computed: {
        preIndex() {
            return (this.swipeData.currentIndex - 1 + 5) % 5
        },
        nextIndex() {
            return (this.swipeData.currentIndex + 1) % 5
        },
        ...mapState(['locsData'])
    },
    methods: {
        swipeTo(index) {
            clearInterval(this.swipeData.timer)
            if (index > this.swipeData.currentIndex) {
                this.swipeData.dir = 'next'
                this.swipeData.currentIndex = index
            }
            else if (index < this.swipeData.currentIndex) {
                this.swipeData.dir = 'pre'
                this.swipeData.currentIndex = index
            }

            this.swipeData.timer = setInterval(() => {
                this.swipeTo(this.nextIndex)
            }, 5000)
        },
        setRcmd() {
            getRcmd().then(
                response => {
                    this.rcmdData = response.data.item
                })
        },
        getSwipe() {
            getLoc({ pf: '0', id: '3197' }).then(
                response => {
                    this.imagesData = response.data

                    this.swipeData.timer = setInterval(() => {
                        this.swipeTo(this.nextIndex)
                    }, 5000)
                })
        },


    },
    mounted() {
        this.getSwipe()
        this.setRcmd()
    },
}
</script>
<style>
.space-between {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
}

/* 轮播图 */
.focus-carousel {
    position: relative;
    width: 550px;
    height: 242px;
    overflow: hidden;
    border-radius: 2px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .focus-carousel,
    .wrap .focus-carousel {
        width: 459px;
        height: 202px;
    }
}

.van-slide {
    position: relative;
    overflow: hidden;
}
.home-slide .van-slide {
    z-index: 0;
}

.van-slide > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    z-index: 0;
}

.focus-carousel .ggc {
    width: 100% !important;
    height: 100% !important;
    z-index: 1;
}
.space-between .focus-carousel img {
    width: 100%;
    height: 100%;
}

.home-slide .item .title {
    position: absolute;
    bottom: 10px;
    left: 12px;
    display: flex;
    overflow: hidden;
    align-items: center;
    width: 70%;
    color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
}

.home-slide .item:before {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 48px;
    border-radius: 2px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAwCAYAAAGnNCAXAAAABGdBTUEAALGPC/xhBQAAAENJREFUCB1jYGBgYGICEpIgQgqNBRRi4MMmARYDyXKAWLwgggfOAnMJiIH0soJ0sMEJdlQWWBYshpAAK0ZwwSzS1AEAes8Ckyqvlc0AAAAASUVORK5CYII=);
    background-size: contain;
    content: "";
}

.focus-carousel .bypb-icon {
    display: inline-block;
    vertical-align: middle;
    width: 38px;
    height: 22px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAsCAMAAAD4va5DAAAAolBMVEX///8AAAAAAAAAAAAAAAACAgIAAAAAAAAGBgb5+fns7OwAAACBgYHq6ur9/f17e3tgYGD09PSoqKiLi4sAAAANDQ3V1dW6urqPj48DAwMAAAD////u7u7j4+MbGxv////b29vBwcH19fXt7e3GxsaLi4ukpKRTU1P4+Pjl5eXh4eHX19fLy8vb29v4+PisrKwvLy86Ojr7+/vy8vK4uLhVVVX0WqNFAAAANnRSTlOZAgULFR0IACCBYxIvW4sxJmk0HxoXU0grJQ6TZl0cj1RFcmtENTUmfGFYTUlGcT4rI4dyMhsJ24tXAAABiElEQVRIx+3XyW6DMBCA4WnAzrCUJUDYCpQAIWuTdHn/V6sNqZqFAwSfqv4HJHP4ZECIAabT6ZOQGARnazKqhuBYI1EqjYjSxpsCt6gUaZr8cJoWSZRr0FiObcCIDNvhWoNJTgYjyxypxWhkw+jsiHJsQjVjPGZodMIxSQMBaVKLySIw+R/jxX5lXK2LFYDqK4/tLCeby+UadwA7XAzECj/Py7KcuXVZ5rnv+zHfmEXYzvbuUOwVyU+IGIYhxxLipp4ne15K2Dm/P0Y2ylV8tyQNWF+yEwS6ac4HYC9w0wLT5vr28tvgy7zD3msbhGHqRm369LZqW/Y4FiJxWR7LdQnBMFR6Ylss4KYkSZ4vYkujJ7bDhbjX6YAruGu9nLGW7THvj1Vo3GNzcrIsq64tFtH7YyeELuz3qaT9MQUrcZiKW3HYISw6MSvQddM0dT0gvbH4eIy7MLS41Who9r9nc+hoXX3Auazy/84HZSAmdjwQOriIHKmEDnuCx1ChA7LI0V3sT4XQ351vRIIkxg4KQCAAAAAASUVORK5CYII=);
    background-size: cover;
    border-radius: 2px;
    margin-right: 3px;
}

.focus-carousel .more {
    position: absolute;
    z-index: 11;
    opacity: 0;
    transition: opacity 0.3s;
    bottom: 44px;
    right: 12px;
    font-size: 12px;
    padding: 4px 8px;
    background: rgba(0, 0, 0, 0.65);
    color: #fff;
    border-radius: 2px;
}

.focus-carousel .more i {
    vertical-align: middle;
}

.focus-carousel:hover .more {
    opacity: 1;
}

/* 轮播动画
.pre-leave-to,
.next-enter {
    transform: translateX(100%);
}

.pre-enter,
.next-leave-to {
    transform: translateX(-100%);
}

.pre-enter-active,
.pre-leave-active,
.next-enter-active,
.next-leave-active {
    transition: all 0.55s ease 0s;
}

.pre-leave,
.pre-enter-to,
.next-leave,
.next-enter-to {
    transform: translateX(0%);
} */

/* 轮播图下方指示器 */

.home-slide .trigger {
    position: absolute;
    right: 12px;
    bottom: 12px;
    z-index: 10;
}

.home-slide .trigger span {
    display: inline-block;
    margin-left: 10px;
    width: 10px;
    height: 10px;
    border: 2px solid transparent;
    border-radius: 50%;
    background-color: #fff;
    vertical-align: middle;
    cursor: pointer;
    transition: all 0.2s;
}

.home-slide .trigger span:hover {
    border: 2px solid #fff;
    background-color: #00a1d6;
    transform: scale(1.3);
}

.home-slide .trigger span.on {
    border-width: 0;
    border-color: transparent;
    background-color: transparent;
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/international-home/assets/icon_slide_selected.png);
    background-size: cover;
    background-repeat: no-repeat;
    transform: scale(1.8);
}

/* 首页推荐 */
.rcmd-box-wrap {
    position: relative;
}

.rcmd-box-wrap .rcmd-box {
    display: flex;
    width: 1070px;
    height: 242px;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
}

@media screen and (max-width: 1870px) {
    .footer-wrap .rcmd-box-wrap > .rcmd-box,
    .wrap .rcmd-box-wrap > .rcmd-box {
        width: 854px;
        height: 242px;
    }
}

@media screen and (max-width: 1654px) {
    .footer-wrap .rcmd-box-wrap > .rcmd-box,
    .wrap .rcmd-box-wrap > .rcmd-box {
        width: 638px;
    }
}

@media screen and (max-width: 1438px) {
    .footer-wrap .rcmd-box-wrap > .rcmd-box,
    .wrap .rcmd-box-wrap > .rcmd-box {
        width: 530px;
        height: 202px;
    }
}

.video-card-reco {
    position: relative;
    width: 206px;
    height: 116px;
}

.rcmd-box-wrap .video-card-reco {
    margin-bottom: 10px;
}

@media screen and (max-width: 1870px) {
    .footer-wrap .rcmd-box-wrap > .rcmd-box .video-card-reco:nth-child(n + 9),
    .wrap .rcmd-box-wrap > .rcmd-box .video-card-reco:nth-child(n + 9) {
        display: none;
    }
}

@media screen and (max-width: 1654px) {
    .footer-wrap .rcmd-box-wrap > .rcmd-box .video-card-reco:nth-child(n + 7),
    .wrap .rcmd-box-wrap > .rcmd-box .video-card-reco:nth-child(n + 7) {
        display: none;
    }
}

@media screen and (max-width: 1438px) {
    .footer-wrap .rcmd-box-wrap > .rcmd-box .video-card-reco,
    .wrap .rcmd-box-wrap > .rcmd-box .video-card-reco {
        width: 170px;
        height: 96px;
    }
}
.video-card-reco:before {
    content: "";
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 48px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAwCAYAAAGnNCAXAAAABGdBTUEAALGPC/xhBQAAAENJREFUCB1jYGBgYGICEpIgQgqNBRRi4MMmARYDyXKAWLwgggfOAnMJiIH0soJ0sMEJdlQWWBYshpAAK0ZwwSzS1AEAes8Ckyqvlc0AAAAASUVORK5CYII=);
    background-size: contain;
    background-repeat: repeat-x;
    border-radius: 0 0 2px 2px;
}

.rcmd-box-wrap .change-btn {
    position: absolute;
    top: 0;
    right: -36px;
    width: 28px;
    height: 77px;
    border: 1px solid silver;
    border-radius: 2px;
    color: #505050;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 7px;
    line-height: 14px;
    cursor: pointer;
}

.rcmd-box-wrap .change-btn i {
    margin-bottom: 4px;
    transition: all 0.5s;
}

.rcmd-box-wrap .change-btn:hover {
    background-color: #f4f4f4;
}

.rcmd-box-wrap .change-btn:hover i {
    transform: rotate(-1turn);
}

.rcmd-box-wrap .change-btn span {
    display: inline-block;
    font-size: 12px;
    line-height: 14px;
    width: 12px;
}

.video-card-reco .info-box {
    position: relative;
    overflow: hidden;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAAAh1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0UCIZXAAAALHRSTlMAoJDx4OYL/DcGF+6+JNi4ycSIT2k6LPeWfRzTVPXPszEQrV0hpo12cEZAZFpRNIQAAAJVSURBVFjD7dbZcpswGIbhHwwSi81q8Ib33fnu//oatRIpmliDhQ/aaZ+TKInnjVgkhb4RJMhP9Fzo8PiD+vEA+JPnqS0+1dRHBJhibAzh2HNeekxP9Z8XBSMZM6SmRBYx65QeM6XsY3rKPqanLGMWqeDmOh0b/Io9+YHi3gKtdExgLznSlyjFMGnUphIMlcgY22C4DSPBxTu4IrXDe+yI6IDWbPSqGVoHoohDyip6XZVB4hFN1TgPyUaYQ5rSWQ0nZGcC6UyJukKypa4yIXX3HLLlqCdHX++HLRfS/9bbWvvHLSLNR3N6tRXdFwdxejekiYF4fDnWYa/WqSm2PqRCSy0hrbP5RxAaW8141N17tVbZ+S1fFYbWFF2+1lqg62BoBdAsqWOLroWhxTh+M8vmWuuaxp1WaWjRSn43yl35sHTLUjxiaWlqnYE4LZoJme3v13MibqepFZRL6otV5V+/Hv+xVvi+FsvZG1qh/LQ7uFXnF/HlwcEfYlDktW2r5EARUiXWc1xRWAC8tGwxsdJ9dcRnYrddMdtrjDZyAy3kXrSJ7O89u8zEZAIKxBRnFzbonWD3ZkfCrrmzP+6979nicjAnW3NZ4OS1R6GtVBa8drTek539up3NAgMvcv51WNZQitCiFBZQaqIMSrx1XrWNoWTy/w1r+hk+xjuMSVjGGC6WZ3S1xlDriqTKxzB+Ra3I4bDHne62drqmied57QR9z0D94dHnOEmvJ/pWAMm4ovL2TTcJ5cRyMlHrbkdG5c/5r82fYqt+K/iR89m2JrP9PEZyI80PsPxVT0P3FAEAAAAASUVORK5CYII=);
    background-repeat: no-repeat;
    background-position: 50%;
}

.video-card-reco .info-box:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    transition: opacity 0.2s;
}

.video-card-reco .info-box,
.video-card-reco .info-box:before,
.video-card-reco .info-box img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
}

.video-card-reco .info-box .info {
    position: absolute;
    z-index: 2;
    width: 100%;
    top: 64px;
    left: 0;
    transition: top 0.2s;
    padding: 26px 10px 10px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .rcmd-box-wrap > .rcmd-box .video-card-reco .info-box .info,
    .wrap .rcmd-box-wrap > .rcmd-box .video-card-reco .info-box .info {
        padding: 8px 10px 10px;
    }
}

.video-card-reco .info-box .info .title {
    font-size: 14px;
    line-height: 18px;
    height: 18px;
    color: #fff;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 500;
}

.video-card-reco .info-box .info .play,
.video-card-reco .info-box .info .up {
    font-size: 12px;
    color: #e0e0e0;
    margin-bottom: 3px;
}

.video-card-reco .info-box .info .up .bilifont {
    vertical-align: middle;
    margin-right: 5px;
}

.video-card-reco .watchlater {
    transition: opacity 0.2s;
    opacity: 0;
}

.video-card-reco:hover .watchlater {
    transition-delay: 0.2s;
    opacity: 1;
}


.video-card-reco:hover .info-box:before {
    opacity: 1;
}

.video-card-reco:hover .info-box .info {
    top: 0;
}

.video-card-reco:hover .info-box .info .title {
    height: 36px;
    white-space: normal;
}

/* 推广 */
.extension {
    width: 1286px;
}

@media screen and (max-width: 1870px) {
    .footer-wrap .extension,
    .wrap .extension {
        width: 1070px;
    }
}

@media screen and (max-width: 1654px) {
    .footer-wrap .extension,
    .wrap .extension {
        width: 854px;
    }
}

@media screen and (max-width: 1438px) {
    .footer-wrap .extension,
    .wrap .extension {
        width: 710px;
    }
}

/* .storey-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    height: 36px;
}

.storey-title .l-con {
    display: inline-flex;
}

.storey-title .l-con .svg-icon {
    margin-right: 6px;
}

.storey-title .name {
    margin: 0 20px 0 0;
    vertical-align: bottom;
    font-size: 20px;
    line-height: 36px;
} */

.storey-title .text-info {
    color: #505050;
    line-height: 36px;
    font-size: 12px;
}

.storey-title .text-info a {
    color: #505050;
}

/* .storey-title .no-link {
    color: #212121;
    cursor: default;
} */

.extension .text-info-link {
    margin-right: 10px;
}

.storey-title .text-info a .bilifont {
    margin-right: 3px;
    color: #f0361b;
}
.extension .ext-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.video-card-common {
    width: 206px;
    cursor: pointer;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .video-card-common,
    .wrap .video-card-common {
        width: 170px;
    }
}

@media screen and (max-width: 1870px) {
    .footer-wrap .extension .video-card-common:nth-child(n + 6),
    .wrap .extension .video-card-common:nth-child(n + 6) {
        display: none;
    }
}

@media screen and (max-width: 1654px) {
    .footer-wrap .extension .video-card-common:nth-child(n + 5),
    .wrap .extension .video-card-common:nth-child(n + 5) {
        display: none;
    }
}

.video-card-common .card-pic {
    position: relative;
    width: 100%;
    height: 116px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .video-card-common .card-pic,
    .footer-wrap .video-card-common .match-card-pic,
    .wrap .video-card-common .card-pic,
    .wrap .video-card-common .match-card-pic {
        width: 100%;
        height: 96px;
    }
}

.video-card-common .card-pic a {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAAAh1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0UCIZXAAAALHRSTlMAoJDx4OYL/DcGF+6+JNi4ycSIT2k6LPeWfRzTVPXPszEQrV0hpo12cEZAZFpRNIQAAAJVSURBVFjD7dbZcpswGIbhHwwSi81q8Ib33fnu//oatRIpmliDhQ/aaZ+TKInnjVgkhb4RJMhP9Fzo8PiD+vEA+JPnqS0+1dRHBJhibAzh2HNeekxP9Z8XBSMZM6SmRBYx65QeM6XsY3rKPqanLGMWqeDmOh0b/Io9+YHi3gKtdExgLznSlyjFMGnUphIMlcgY22C4DSPBxTu4IrXDe+yI6IDWbPSqGVoHoohDyip6XZVB4hFN1TgPyUaYQ5rSWQ0nZGcC6UyJukKypa4yIXX3HLLlqCdHX++HLRfS/9bbWvvHLSLNR3N6tRXdFwdxejekiYF4fDnWYa/WqSm2PqRCSy0hrbP5RxAaW8141N17tVbZ+S1fFYbWFF2+1lqg62BoBdAsqWOLroWhxTh+M8vmWuuaxp1WaWjRSn43yl35sHTLUjxiaWlqnYE4LZoJme3v13MibqepFZRL6otV5V+/Hv+xVvi+FsvZG1qh/LQ7uFXnF/HlwcEfYlDktW2r5EARUiXWc1xRWAC8tGwxsdJ9dcRnYrddMdtrjDZyAy3kXrSJ7O89u8zEZAIKxBRnFzbonWD3ZkfCrrmzP+6979nicjAnW3NZ4OS1R6GtVBa8drTek539up3NAgMvcv51WNZQitCiFBZQaqIMSrx1XrWNoWTy/w1r+hk+xjuMSVjGGC6WZ3S1xlDriqTKxzB+Ra3I4bDHne62drqmied57QR9z0D94dHnOEmvJ/pWAMm4ovL2TTcJ5cRyMlHrbkdG5c/5r82fYqt+K/iR89m2JrP9PEZyI80PsPxVT0P3FAEAAAAASUVORK5CYII=);
    background-repeat: no-repeat;
    background-position: 50%;
}

.video-card-common .card-pic a:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 48px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAwCAYAAAGnNCAXAAAABGdBTUEAALGPC/xhBQAAAENJREFUCB1jYGBgYGICEpIgQgqNBRRi4MMmARYDyXKAWLwgggfOAnMJiIH0soJ0sMEJdlQWWBYshpAAK0ZwwSzS1AEAes8Ckyqvlc0AAAAASUVORK5CYII=);
    background-repeat: repeat-x;
    background-size: contain;
    bottom: 0;
    left: 0;
    border-radius: 2px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .video-card-common.ex-card-common .card-pic a:before,
    .wrap .video-card-common.ex-card-common .card-pic a:before {
        background: none;
    }
}

.video-card-common .card-pic a img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
}

.video-card-common .card-pic a .count {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 6px 8px;
    justify-content: space-between;
    color: #fff;
    line-height: 16px;
    font-size: 12px;
}

.video-card-common .card-pic a .count,
.video-card-common .card-pic a .count .left,
.video-card-common .card-pic a .count .left span {
    display: flex;
    align-items: center;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .video-card-common .card-pic .right,
    .footer-wrap .video-card-common .match-card-pic .right,
    .wrap .video-card-common .card-pic .right,
    .wrap .video-card-common .match-card-pic .right {
        display: none;
    }
}

.video-card-common .ex-title {
    display: block;
    font-size: 14px;
    line-height: 20px;
    margin: 10px 0 8px;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 500;
    padding-right: 12px;
}

.video-card-common .card-pic:hover .ex-title span:not(.gg-icon) {
    color: #00a1d6;
}

.video-card-common .gg-icon {
    display: inline-block;
    font-size: 12px;
    border-radius: 2px;
    margin-right: 8px;
    width: 30px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border: 1px solid #b2b2b2;
    color: #b2b2b2;
    font-weight: 400;
}

.video-card-common .ex-up {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #999;
    line-height: 16px;
    margin-top: 60px;
}

.video-card-common .ex-up:hover {
    color: #00a1d6;
}

.video-card-common .adver_name {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #999;
    line-height: 16px;
    margin-top: 60px;
}

.video-card-common .bilifont {
    margin-right: 4px;
    vertical-align: middle;
}

/* 推广右侧 */
.bypb-window {
    width: 320px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .bypb-window,
    .wrap .bypb-window {
        width: 265px;
    }
}

.bypb-window .online {
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3px;
    margin-bottom: 19px;
    height: 30px;
    border: 1px solid #e7e7e7;
    border-radius: 2px;
    background: #f4f4f4;
    color: #505050;
    line-height: 30px;
}

.bypb-window .online a {
    flex: 1;
    text-align: center;
    font-size: 12px;
}

.operate-card {
    position: relative;
    display: block;
}

.operate-card img {
    width: 100%;
    border-radius: 2px;
}

/* 电竞赛事 */
.storey-title .l-con .sprite {
    width: 36px;
    height: 36px;
    margin-right: 6px;
}

.video-card-common .card-pic a .count .left span:first-child {
    margin-right: 10px;
}

.video-card-common .match-card-pic {
    position: relative;
    width: 100%;
    height: 116px;
}

.video-card-common .match-card-pic a {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAAAh1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0UCIZXAAAALHRSTlMAoJDx4OYL/DcGF+6+JNi4ycSIT2k6LPeWfRzTVPXPszEQrV0hpo12cEZAZFpRNIQAAAJVSURBVFjD7dbZcpswGIbhHwwSi81q8Ib33fnu//oatRIpmliDhQ/aaZ+TKInnjVgkhb4RJMhP9Fzo8PiD+vEA+JPnqS0+1dRHBJhibAzh2HNeekxP9Z8XBSMZM6SmRBYx65QeM6XsY3rKPqanLGMWqeDmOh0b/Io9+YHi3gKtdExgLznSlyjFMGnUphIMlcgY22C4DSPBxTu4IrXDe+yI6IDWbPSqGVoHoohDyip6XZVB4hFN1TgPyUaYQ5rSWQ0nZGcC6UyJukKypa4yIXX3HLLlqCdHX++HLRfS/9bbWvvHLSLNR3N6tRXdFwdxejekiYF4fDnWYa/WqSm2PqRCSy0hrbP5RxAaW8141N17tVbZ+S1fFYbWFF2+1lqg62BoBdAsqWOLroWhxTh+M8vmWuuaxp1WaWjRSn43yl35sHTLUjxiaWlqnYE4LZoJme3v13MibqepFZRL6otV5V+/Hv+xVvi+FsvZG1qh/LQ7uFXnF/HlwcEfYlDktW2r5EARUiXWc1xRWAC8tGwxsdJ9dcRnYrddMdtrjDZyAy3kXrSJ7O89u8zEZAIKxBRnFzbonWD3ZkfCrrmzP+6979nicjAnW3NZ4OS1R6GtVBa8drTek539up3NAgMvcv51WNZQitCiFBZQaqIMSrx1XrWNoWTy/w1r+hk+xjuMSVjGGC6WZ3S1xlDriqTKxzB+Ra3I4bDHne62drqmied57QR9z0D94dHnOEmvJ/pWAMm4ovL2TTcJ5cRyMlHrbkdG5c/5r82fYqt+K/iR89m2JrP9PEZyI80PsPxVT0P3FAEAAAAASUVORK5CYII=);
    background-repeat: no-repeat;
    background-position: 50%;
}

.video-card-common .match-card-pic a:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 48px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAwCAYAAAGnNCAXAAAABGdBTUEAALGPC/xhBQAAAENJREFUCB1jYGBgYGICEpIgQgqNBRRi4MMmARYDyXKAWLwgggfOAnMJiIH0soJ0sMEJdlQWWBYshpAAK0ZwwSzS1AEAes8Ckyqvlc0AAAAASUVORK5CYII=);
    background-repeat: repeat-x;
    bottom: 0;
    left: 0;
    border-radius: 2px;
}

.video-card-common .match-card-pic a img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
}

.video-card-common .match-card-pic a .count {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 6px 8px;
    justify-content: space-between;
    color: #fff;
    line-height: 16px;
}

.video-card-common .match-card-pic a .count,
.video-card-common .match-card-pic a .count .left,
.video-card-common .match-card-pic a .count .left span {
    display: flex;
    align-items: center;
}

.video-card-common .match-card-pic a .count .left span {
    vertical-align: middle;
}

.video-card-common .match-card-pic a .count .left span:first-child {
    margin-right: 10px;
}

.video-card-common .match-card-pic a .count .right {
    display: flex;
}

.video-card-common .live-title {
    display: block;
    font-size: 14px;
    line-height: 20px;
    margin: 10px 0 8px;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 500;
}

.video-card-common .live-title .live {
    display: inline-block;
    color: #fff;
    background: #fb7299;
    border-radius: 2px;
    line-height: 16px;
    width: 56px;
    text-align: center;
    margin-right: 5px;
    font-size: 12px;
}

.video-card-common .live-title .live i {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/international-home/assets/living.gif);
    background-size: cover;
}

.ggpos {
    padding-top: 52px;
}

.ggpos .pic {
    width: 100%;
    border-radius: 2px;
}
</style>