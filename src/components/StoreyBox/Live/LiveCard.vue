<template>
    <div class="live-card">
        <a :href="'//live.bilibili.com' + info.link" target="_blank">
            <div class="pic" @mouseenter="showCover=true" @mouseleave="showCover=false">
                <img :src="$format.trimHttp(info.cover) + '@206w_116h_1c_100q.webp'" />
                <p class="count">
                    <i class="bilifont bili-icon_xinxi_renqi"></i>
                    {{ $format.formatCount(info.online) }}
                </p>
                <transition name="slide-fade">
                    <div
                        v-if="showCover"
                        class="mask"
                        :style="`background-image: url(${trimHttp(info.keyframe)});`"
                    ></div>
                </transition>
            </div>
            <div class="up">
                <div class="up-cover">
                    <img class="face" :src="$format.trimHttp(info.face) + '@36w_36h_1c_100q.webp'" />
                    <svg
                        v-if="info.verify && info.verify.type !== -1"
                        aria-hidden="true"
                        class="svg-icon vip-icon"
                    >
                        <use
                            v-if="info.verify.type === 1"
                            xlink:href="#bili-ic_gerenzhongxin_qiyerenzhenghuibiao"
                        />
                        <use
                            v-else-if="info.verify.type === 0"
                            xlink:href="#bili-ic_gerenzhongxin_gerenrenzhenghuibiao"
                        />
                    </svg>
                </div>
                <div class="txt">
                    <p class="name">{{ info.uname }}</p>
                    <p class="desc" :title="info.title">{{ info.title }}</p>
                    <p class="tag">{{ info.area_v2_name }}</p>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    name: 'LiveCard',
    props: ['info'],
    data() {
        return {
            showCover: false,
        }
    },
    methods: {
        trimHttp(val) {
            return val ? val.replace(/^http:/, '') : ''
        },
    },
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
    content: '';
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

.live-card .pic .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    transition: opacity 0.3s;
    background-repeat: no-repeat;
    background-color: #000;
    background-position: 50%;
    background-size: contain;
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

.live-card .slide-fade-enter-active,
.live-card .slide-fade-leave-active {
    transition: all 0.3s;
}

.live-card .slide-fade-enter,
.live-card .slide-fade-leave-to {
    opacity: 0;
}
</style>