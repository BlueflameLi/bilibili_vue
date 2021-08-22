<template>
    <div @mouseenter="pauseTimer" @mouseleave="startTimer">
        <div class="van-slide">
            <slot></slot>
        </div>
        <div class="trigger">
            <span
                v-for="(item, index) in items"
                :key="index"
                :class="{ on: index === activeIndex }"
                @click="setActiveIndex(index)"
            ></span>
        </div>
        <slot name="more"></slot>
    </div>
</template>
<script>
export default {
    name: 'Carousel',
    props: {
        height: String,
        interval: {
            type: Number,
            default: 5000
        }
    },
    data() {
        return {
            activeIndex: 0,
            items: [],
            timer: null,
        }
    },
    computed: {
        preIndex() {
            return (this.activeIndex - 1 + this.items.length) % this.items.length
        },
        nextIndex() {
            return (this.activeIndex + 1) % this.items.length
        }
    },
    methods: {
        updateItems() {
            this.items = this.$children.filter(child => child.$options.name === 'CarouselItem')
            this.items[0].active = true
        },
        startTimer() {
            if (this.interval <= 0 || this.timer) return;
            this.timer = setInterval(() => {
                this.next()
            }, this.interval);
        },
        pauseTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        setActiveIndex(index) {
            this.pauseTimer()
            if (index > this.activeIndex) {
                this.items[index].dir = 'next'
                this.items[this.activeIndex].dir = 'next'
                this.items[index].active = true
                this.items[this.activeIndex].active = false
                this.activeIndex = index
            }
            else if (index < this.activeIndex) {
                this.items[index].dir = 'pre'
                this.items[this.activeIndex].dir = 'pre'
                this.items[index].active = true
                this.items[this.activeIndex].active = false
                this.activeIndex = index
            }
            this.startTimer()
        },
        next() {
            this.items[this.nextIndex].dir = 'next'
            this.items[this.activeIndex].dir = 'next'
            this.items[this.nextIndex].active = true
            this.items[this.activeIndex].active = false
            this.activeIndex = this.nextIndex
        },
    },
    mounted() {
        this.updateItems()
        this.$nextTick(() => {
            this.startTimer();
        })
    },
}
</script>
<style>
</style>