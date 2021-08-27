<template>
    <div ref="container" class="animated-banner">
        <div v-for="(item, index) in animatedBannerConfig.layers" :key="index" class="layer">
            <img
                v-if="!/\.(webm|mp4)$/.test(item.resources[0].src)"
                :src="item.resources[0].src"
                @load="init($event,item,index)"
            />
            <video
                v-else
                :src="item.resources[0].src"
                loop
                muted
                webkit-playsinline
                autoplay
                style="object-fit: cover;"
                @loadedmetadata="init($event,item,index)"
            ></video>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AnimatedBanner',
    props: ['banner'],
    data() {
        return {
            animatedBannerConfig: JSON.parse(this.banner.split_layer),
            entered: false,
            moveOffset: 0,
            enterX: 0,
            layers: [],
            initStatus: [],
            timer: null,
        }
    },
    methods: {
        handleResize() {
            let container = this.$refs.container
            let clientHeight = container.clientHeight
            let v = clientHeight / 155

            this.layers.forEach((element, index) => {
                let scale =
                    this.animatedBannerConfig.layers[index].scale.initial || 1

                element.height = element.dataset.height * v * scale
                element.width = element.dataset.width * v * scale
            })
        },
        handleMouseMove(event) {
            let container = this.$refs.container
            if (
                document.documentElement.scrollTop + event.clientY <
                container.offsetHeight
            ) {
                if (!this.entered) {
                    this.entered = true
                    this.enterX = event.clientX
                }
                let clientWidth = container.clientWidth
                this.moveOffset = (event.clientX - this.enterX) / clientWidth
                cancelAnimationFrame(this.timer)
                this.timer = requestAnimationFrame(this.updateBanner)
            } else {
                if (this.entered) {
                    this.entered = false
                    this.initBanner()
                }
            }
        },
        handleMouseLeave() {
            this.entered = false
            this.initBanner()
        },
        init(event, item, index) {
            let element = event.target
            this.layers[index] = element
            let container = this.$refs.container
            let clientHeight = container.clientHeight
            let v = clientHeight / 155

            if (element.tagName === 'VIDEO') {
                
                element.dataset.height = element.videoHeight
                element.dataset.width = element.videoWidth
            } else {
                element.dataset.height = element.naturalHeight
                element.dataset.width = element.naturalWidth
            }

            element.height =
                element.dataset.height * v * (item.scale.initial || 1)
            element.width =
                element.dataset.width * v * (item.scale.initial || 1)
            let initStatus = {
                sale: 1,
                translate: item.translate.initial || [0, 0],
                rotate: item.rotate.initial || 0,
                blur: item.blur.initial || 0,
                opacity:
                    item.opacity.initial === 0 ? 0 : item.opacity.initial || 1,
            }
            this.initStatus[index] = initStatus
            element.style.transform = `scale(${initStatus.sale}) translate(${
                initStatus.translate[0] * v * (item.scale.initial || 1)
            }px, ${
                initStatus.translate[1] * v * (item.scale.initial || 1)
            }px) rotate(${initStatus.rotate}deg)`
            element.style.opacity = initStatus.opacity
        },
        updateBanner() {
            let container = this.$refs.container
            let clientHeight = container.clientHeight
            let v = clientHeight / 155
            this.layers.map((item, index) => {
                let i = this.animatedBannerConfig.layers[index]
                let Status = { ...this.initStatus[index] }
                if (i.scale)
                    Status.scale += (i.scale.offset || 0) * this.moveOffset
                if (i.rotate)
                    Status.rotate += (i.rotate.offset || 0) * this.moveOffset
                if (i.translate) {
                    let translateOffset = i.translate.offset || [0, 0]
                    translateOffset = translateOffset.map((val) => {
                        return val * this.moveOffset
                    })
                    Status.translate = Status.translate.map((val, index) => {
                        return (
                            (val + translateOffset[index]) *
                            v *
                            (i.scale.initial || 1)
                        )
                    })
                }
                item.style.transform = `scale(${Status.sale}) translate(${Status.translate[0]}px, ${Status.translate[1]}px) rotate(${Status.rotate}deg)`

                if (i.opacity) {
                    let opacity =
                        Status.opacity +
                        (i.opacity.offset || 0) * this.moveOffset
                    if (i.opacity.wrap === 'clamp') {
                        item.style.opacity = Math.max(0, Math.min(1, opacity))
                    } else if (i.opacity.wrap === 'alternate') {
                        let g = Math.abs(opacity % 1)
                        Math.abs(opacity % 2) >= 1 && (g = 1 - g)
                        item.style.opacity = g
                    }
                }
            })
        },
        initBanner() {
            let t = performance.now()
            let moveOffset = this.moveOffset
            let that = this
            cancelAnimationFrame(this.timer)
            this.timer = requestAnimationFrame(function init(now) {
                if (now - t < 200) {
                    that.moveOffset = moveOffset * (1 - (now - t) / 200)
                    that.updateBanner()
                    requestAnimationFrame(init)
                } else {
                    that.moveOffset = 0
                    that.updateBanner()
                }
            })
        },
    },
    mounted() {
        this.layers = new Array(this.animatedBannerConfig.layers.length)
        this.initStatus = new Array(this.animatedBannerConfig.layers.length)

        document.addEventListener('mouseleave', this.handleMouseLeave)
        window.addEventListener('mousemove', this.handleMouseMove)
        window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
        document.removeEventListener('mouseleave', this.handleMouseLeave)
        window.removeEventListener('mousemove', this.handleMouseMove)
        window.removeEventListener('resize', this.handleResize)
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