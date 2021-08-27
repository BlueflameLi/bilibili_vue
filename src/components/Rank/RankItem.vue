<template>
    <div class="rank-wrap" @mouseenter="onEnter" @mouseleave="onLeave">
        <span class="number" :class="{ on: rank <= 3 }">{{ rank }}</span>
        <div v-if="rank === 1" class="preview">
            <div class="pic">
                <a
                    :href="'//www.bilibili.com/video/' + info.bvid"
                    target="_blank"
                    class="link"
                >
                    <img :src="$format.trimHttp(info.pic) + '@112w_63h_1c_100q.webp'" :alt="info.title" />
                </a>
                <div class="watchlater">
                    <span class="wl-tips" style="left: -21px;">稍后再看</span>
                </div>
            </div>
            <div class="txt">
                <a
                    :href="'//www.bilibili.com/video/' + info.bvid"
                    target="_blank"
                    class="link"
                >
                    <p :title="info.title">{{ info.title }}</p>
                </a>
                <span>综合得分：{{ formatCount(info.pts) }}</span>
            </div>
        </div>
        <a v-else :href="'//www.bilibili.com/video/' + info.bvid" target="_blank" class="link">
            <p class="title" :title="info.title">{{ info.title }}</p>
        </a>
        <transition name="pvc-fade">
            <PopoverVideoCard v-show="show" :info="info" class="pvc" />
        </transition>
    </div>
</template>
<script>
import PopoverVideoCard from './PopoverVideoCard.vue'
export default {
    name: 'RankItem',
    props: ['rank', 'info'],
    components: {
        PopoverVideoCard
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        onEnter() {
            this.clear()
            this.timeout = setTimeout(() => {
                this.show = true
                this.clear()
            }, 300)
        },
        onLeave() {
            this.show = false
            this.clear()
        },
        clear() {
            this.timeout && clearTimeout(this.timeout)
        },
        formatCount(val){
            return this.$format.formatCount(val)
        }
    },
}
</script>
<style>
.rank-wrap {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
}

@media screen and (max-width: 1438px) {
    .rank-list .rank-wrap:nth-child(n + 10) {
        display: none;
    }
}

.rank-wrap .number {
    font-size: 14px;
    color: #999;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    background: #fff;
    border-radius: 2px;
    display: inline-block;
}

.rank-wrap .number.on {
    color: #fff;
    background: #00a1d6;
}

.rank-wrap .preview {
    position: relative;
    display: flex;
    width: 290px;
    font-weight: 500;
}

.rank-wrap .title {
    width: 290px;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-word !important;
    word-break: break-all;
    font-weight: 500;
}

@media screen and (max-width: 1438px) {
    .rank-list .rank-wrap .preview,
    .rank-list .rank-wrap .title {
        width: 235px;
    }
}

.rank-wrap .preview .pic {
    position: relative;
}

.rank-wrap .link {
    display: inline-block;
}

.rank-wrap .preview img {
    width: 112px;
    height: 63px;
    border-radius: 2px;
}

.rank-wrap .preview .pic .watchlater {
    transition: opacity 0.3s;
    opacity: 0;
}

.rank-wrap .preview .pic:hover .watchlater {
    transition-delay: 0.2s;
    opacity: 1;
}

.rank-wrap .preview .txt {
    margin-left: 12px;
}

.rank-wrap .preview .txt p {
    font-size: 14px;
    height: 40px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 5px;
    word-break: break-word !important;
    word-break: break-all;
}

.rank-wrap .preview .txt span {
    color: #999;
    white-space: nowrap;
}

.rank-wrap .pvc {
    top: -138px;
    z-index: 200;
}

.pvc-fade-enter-active,
.pvc-fade-leave-active {
    transition: all 0.2s ease;
}

.pvc-fade-enter,
.pvc-fade-leave-to {
    transform: translateY(5px);
    opacity: 0;
}
</style>