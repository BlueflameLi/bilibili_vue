<template>
    <div
        class="bili-banner"
        :style="bannerData.is_split_layer ? '' : `background-image:url(${bannerData.pic || ''});`"
    >
        <AnimatedBanner v-if="bannerData.is_split_layer" :banner="bannerData"></AnimatedBanner>
        <div class="taper-line"></div>
        <div class="logo wrap" style="margin: 0">
            <a href="//www.bilibili.com" class="head-logo">
                <img :src="bannerData.litpic" class="logo-img" />
            </a>
            <a
                v-if="bannerData.name"
                :href="bannerData.url"
                target="_blank"
                class="head-title"
            >{{ bannerData.name }}</a>
        </div>
        <a v-if="bannerData.url" :href="bannerData.url" target="_blank" class="banner-link"></a>
    </div>
</template>
<script>
import { getBanner } from '@/api'
import AnimatedBanner from './AnimatedBanner'
export default {
    name: 'banner',
    components: {
        AnimatedBanner
    },
    data() {
        return {
            bannerData: {}
        }
    },
    methods: {
        setBanner() {
            getBanner(142).then(
                response => {
                    this.bannerData = response.data || {}
                }
            )
        }
    },
    mounted() {
        this.setBanner()
    },
}
</script>
<style scoped>
/* 顶部banner */

.bili-banner {
    margin: 0 auto;
    position: relative;
    z-index: 0;
    min-height: 155px;
    height: 9.375vw;
    min-width: 999px;
    background-color: #f9f9f9;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-position: center 0;
    background-size: cover;
    /* 滚动条偏移修正 */
    margin-right: -12px;
}

.bili-banner .taper-line {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(rgba(0, 0, 0, 0.4), transparent);
}

.bili-banner .head-title {
    position: absolute;
    bottom: 25px;
    left: 280px;
    line-height: 20px;
    padding: 6px 10px;
    background-color: rgba(0, 0, 0, 0.68);
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    max-width: 350px;
    opacity: 0;
    transition: all 0.2s;
}

.bili-banner:hover .head-title {
    opacity: 1;
}

.bili-banner .logo {
    position: relative;
}

.bili-banner .logo .head-logo {
    position: absolute;
    width: 220px;
    height: 50%;
    min-height: 60px;
    bottom: 10px;
    z-index: 1;
}

.bili-banner .logo .logo-img {
    height: 100%;
}

.bili-banner .banner-link {
    z-index: 0;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
}
</style>