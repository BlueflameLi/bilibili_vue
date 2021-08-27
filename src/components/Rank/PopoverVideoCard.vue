<template>
    <div class="popover-video-card">
        <div class="content">
            <img :src="$format.trimHttp(info.pic) + '@112w_63h_1c_100q.webp'" alt />
            <div class="info">
                <p class="f-title">{{ info.title }}</p>
                <p class="subtitle">
                    <span class="name">{{ info.author }}</span>
                    <span class="point">·</span>
                    <span class="time">{{ time }}</span>
                </p>
            </div>
        </div>
        <div class="count">
            <ul>
                <li>
                    <i class="bilifont bili-icon_shipin_bofangshu"></i>
                    <span>{{ formatCount(info.play) }}</span>
                </li>
                <li>
                    <i class="bilifont bili-icon_shipin_danmushu"></i>
                    <span>{{ formatCount(info.video_review) }}</span>
                </li>
                <li>
                    <i class="bilifont bili-icon_shipin_shoucangshu"></i>
                    <span>{{ formatCount(info.favorites) }}</span>
                </li>
                <li>
                    <i class="bilifont bili-icon_shipin_yingbishu"></i>
                    <span>{{ formatCount(info.coins) }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "PopoverVideoCard",
    props: ["info"],
    computed: {
        time() {
            return ((this.info && this.info.create) || "").split(" ")[0];
        },
    },
    methods: {
        formatCount(val) {
            return this.$format.formatCount(val)
        }
    },
};
</script>

<style>
.popover-video-card {
    position: absolute;
    padding: 12px;
    width: 320px;
    background: #fff;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
    border-radius: 2px;
}

.popover-video-card .content {
    display: -ms-flexbox;
    display: flex;
}

.popover-video-card .content img {
    width: 112px;
    height: 63px;
    border-radius: 2px;
}

.popover-video-card .content .info {
    padding-left: 10px;
}

.popover-video-card .content .info .f-title {
    max-height: 40px;
    color: #212121;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /*! autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    word-break: break-word !important;
    word-break: break-all;
}

.popover-video-card .content .info .subtitle {
    display: -ms-flexbox;
    display: flex;
    color: #999;
    font-size: 12px;
    line-height: 16px;
}

.popover-video-card .content .info .subtitle span {
    display: inline-block;
}

.popover-video-card .content .info .subtitle .point {
    margin: 0 5px;
}

.popover-video-card .content .info .subtitle .name {
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.popover-video-card .content .info .subtitle .time {
    max-width: 72px;
    white-space: nowrap;
    overflow: hidden;
}

.popover-video-card .count {
    padding-top: 12px;
    margin-top: 12px;
    border-top: 1px solid #e7e7e7;
}

.popover-video-card .count ul {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

.popover-video-card .count ul li {
    font-size: 12px;
    color: #999;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
}

.popover-video-card .count ul li i {
    margin-right: 3px;
}
</style>