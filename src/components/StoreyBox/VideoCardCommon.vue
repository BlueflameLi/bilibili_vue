<template>
    <div class="video-card-common">
        <div class="card-pic">
            <a v-framepreview="aid" v-danmu="aid" :href="'//www.bilibili.com/video/' + bvid" target="_blank">
                <img :src="$format.trimHttp(pic)" alt />
                <div class="count">
                    <div class="left">
                        <span v-if="stat && stat.view">
                            <i class="bilifont bili-icon_shipin_bofangshu"></i>
                            {{ $format.formatCount(stat.view) }}
                        </span>
                        <span v-if="stat && stat.like">
                            <i class="bilifont bili-icon_shipin_dianzanshu"></i>
                            {{ $format.formatCount(stat.like) }}
                        </span>
                    </div>
                    <div class="right">
                        <span v-if="duration">{{ $format.formatDuration(duration) }}</span>
                    </div>
                </div>
                <i class="crown" :class="crown"></i>
            </a>
            <div class="watchlater">
                <span class="wl-tips" style="left: -21px;">稍后再看</span>
            </div>
        </div>
        <a
            :href="'//www.bilibili.com/video/' + bvid"
            target="_blank"
            :title="title"
            class="title"
        >{{ title }}</a>
        <a v-if="owner" :href="`//space.bilibili.com/${owner.mid}/`" target="_blank" class="up">
            <i class="bilifont bili-icon_xinxi_UPzhu"></i>
            {{ owner.name }}
        </a>
    </div>
</template>
<script>
export default {
    name: 'VideoCardCommon',
    props: {
        aid: Number,
        pic: String,
        bvid: String,
        stat: Object,
        duration: [String, Number],
        title: String,
        owner: Object,
    },
    computed: {
        crown() {
            var t = (this.stat && this.stat.coin) || 0
            return t >= 2e3 && t < 1e4 ? 'silver' : t >= 1e4 ? 'gold' : ''
        },
    },
}
</script>
<style>
.van-framepreview {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    transition: opacity 0.3s;
    z-index: 1;
}

.van-framepreview .van-fpbar-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 10px;
    border-color: #000;
    border-style: solid;
    border-width: 4px 8px;
    background: #444;
    box-sizing: border-box;
}

.van-framepreview .van-fpbar-box span {
    display: block;
    background: #fff;
    height: 2px;
    transition: width 0.12s;
}

.van-danmu {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    transition: opacity .3s;
    z-index: 2
}

.van-danmu-item {
    position: absolute;
    color: #fff;
    white-space: pre;
    will-change: transform;
    top: 8px;
    left: 100%;
    text-shadow: 1px 1px 2px #001
}

.van-danmu-item.row2 {
    top: 28px
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
    content: '';
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

    .footer-wrap .video-card-common:hover .card-pic .right,
    .wrap .video-card-common:hover .card-pic .right {
        display: block;
    }

    .footer-wrap .video-card-common:hover .card-pic .left,
    .wrap .video-card-common:hover .card-pic .left {
        display: none;
    }
}

.video-card-common .card-pic a .crown {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 24px;
    background-size: contain;
}

.video-card-common .card-pic a .crown.gold {
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/international-home/assets/icon_gold.png);
}

.video-card-common .card-pic a .crown.silver {
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/international-home/assets/icon_silver.png);
}

.video-card-common .bilifont {
    margin-right: 4px;
    vertical-align: middle;
}

.video-card-common .title {
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

.video-card-common .up {
    display: flex;
    font-size: 12px;
    color: #999;
    line-height: 16px;
}

.video-card-common .up:hover {
    color: #00a1d6;
}

.watchlater {
    position: absolute;
    z-index: 20;
    width: 28px;
    height: 28px;
    right: 8px;
    bottom: 8px;
    cursor: pointer;
    background-size: contain;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAwFBMVEUAAAAGBgavr69EREQUFBQ1NTUODg7t7e3FxcV0dHRbW1sAAAAAAAAAAAD+/v77+/v4+Pj09PTj4+P8/PzV1dWpqamSkpIhISH19fXX19fLy8ulpaWdnZ1kZGRVVVUsLCz6+vrm5uba2tq9vb20tLSsrKyXl5eMjIx+fn54eHhsbGxpaWk+Pj4AAAAAAADv7+/e3t7AwMC3t7ehoaFLS0vo6OjR0dHOzs7CwsKCgoKCgoJiYmLp6enMzMywsLD////DVMIGAAAAP3RSTlOZmtOrnqec8927sopkEf38+ffu/eXPxqH45+DOyrWwpPvv6NnV0cjEv724t6qPAPTr2tbNru/j4tvAv7Tw4dTgAD9iAAABpElEQVRIx+ST13KCUBiEDyCCBRBQsaHGHrvp/Xv/twpDTBgRonjr3u0w38zu8h+xNsolkVGlsrEWxkpcoJUhyuISBVjpIi7Arli9bmE6mb0rUhZI6tZu2KuxK+TO5RYOB2pM8udgShWASlOXa8MnDYDN7DRX6AOVkf/bTemEqe9OdW0DluwdNH7VgKZ3knNUEVN+CGz/K3oLtJJGrJugp3MPFrSSy7wBnVRwAE7aTxuDq6YNCpaaehRN2KV8eoRaNMh8GesBKIlgEewoaAtTPoytw0gIXz4KJYMcORfQ5n/Wy4kuaMKHzzioQTFyhNJ7P27ZMNuSDb4Noxingi3FQSpTab8bWx0+YOMdV6yKIxAGSuCkZ6Dv9sEsJlzNSxKIex/ejgUkXkEdxokgLMJn4gBUpcygyH+BHYyVMWo4w/eMwXFIfOCgAVKiAxMQTgCYAH+S44MkOXRAOJGbYyRyHXU24rIVWgjqCNgbkZWRRYA+JrfoYKaksKK8eKS8QCZcBVBe6VBezRGuWGlalSMaD2KQxsMooCMgu6FLdtOa7MY82d0HAP3jZ1lFdjimAAAAAElFTkSuQmCC);
}

.watchlater .wl-tips {
    position: absolute;
    font-size: 12px;
    color: #fff;
    border-radius: 4px;
    line-height: 18px;
    padding: 4px 8px;
    background-color: #000;
    background: rgba(0, 0, 0, 0.8);
    white-space: nowrap;
    top: -30px;
}

.watchlater:not(:hover) .wl-tips {
    display: none;
}

.watchlater:hover .wl-tips {
    animation: bounce-in 0.26s;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.1);
    }

    to {
        transform: scale(1);
    }
}

.video-card-common .card-pic .watchlater {
    transition: opacity 0.3s;
    opacity: 0;
}

.video-card-common .card-pic:hover .watchlater {
    transition-delay: 0.2s;
    opacity: 1;
}
</style>