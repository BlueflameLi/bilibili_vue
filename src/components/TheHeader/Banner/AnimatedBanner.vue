<template>
    <div ref="container" class="animated-banner">
        <div v-for="(item, index) in animatedBannerConfig.layers" :key="index" class="layer">
            <img
                v-if="!/\.(webm|mp4)$/.test(item.resources[0].src)"
                :src="item.resources[0].src"
                :style="`transform:translateX(${entered ? translateX[index] : 0}px)`"
            />
            <video
                v-else
                :src="item.resources[0].src"
                loop
                muted
                webkit-playsinline
                autoplay
                style="object-fit: cover;"
                :style="`transform:translateX(${entered ? translateX[index] : 0}px)`"
            ></video>
        </div>
    </div>
</template>
<script>
import { throttle } from 'lodash'
export default {
    name: 'AnimatedBanner',
    props: [
        'banner'
    ],
    data() {
        return {
            animatedBannerConfig: JSON.parse(this.banner.split_layer),
            entered: false,
            moveOffset: 0,
            enterX: 0
        }
    },
    computed: {
        translateX() {
            let translateX = []
            this.animatedBannerConfig.layers.forEach(
                (item) => {
                    translateX.push(item.translate.offset[0] * this.moveOffset)
                }
            )
            return translateX
        }
    },
    methods: {
        handleResize() {
            let container = this.$refs.container
            let clientHeight = container.clientHeight
            let v = clientHeight / 155
            document.querySelectorAll(".animated-banner .layer").forEach((layer, index) => {
                let element = layer.children[0]
                if (!element.dataset.height) {
                    element.dataset.height = element.tagName === "VIDEO" ? element.videoHeight : element.naturalHeight
                }
                if (!element.dataset.width) {
                    element.dataset.width = element.tagName === "VIDEO" ? element.videoWidth : element.naturalWidth
                }
                element.height = element.dataset.height * v * (this.animatedBannerConfig.layers[index].scale.initial || 1)
                element.width = element.dataset.width * v * (this.animatedBannerConfig.layers[index].scale.initial || 1)
            });
        },
        handleMouseMove: throttle(function (event) {
            let container = this.$refs.container
            if (document.documentElement.scrollTop + event.clientY < container.offsetHeight) {
                if (!this.entered) {
                    this.entered = true
                    this.enterX = event.clientX
                }
                let clientWidth = container.clientWidth
                this.moveOffset = (event.clientX - this.enterX) / clientWidth
            }
            else
                this.entered && (this.entered = false)
        }, 100),
        handleMouseLeave() {
            this.entered = false
        }
    },
    mounted() {
        setTimeout(() => {
            this.handleResize()
        }, 500);
        document.addEventListener("mouseleave", this.handleMouseLeave)
        window.addEventListener("mousemove", this.handleMouseMove)
        window.addEventListener('resize', this.handleResize)

    },
    beforeDestroy() {
        document.removeEventListener("mouseleave", this.handleMouseLeave)
        window.removeEventListener("mousemove", this.handleMouseMove)
        window.removeEventListener("resize", this.handleResize)
    },
}
</script>
<style>
.animated-banner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
}

.animated-banner > .layer {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
}
</style>