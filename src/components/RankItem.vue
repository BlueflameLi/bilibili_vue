<template>
    <div :class="pgc ? 'pgc-rank-wrap' : 'rank-wrap'">
        <span v-if="hasNumber" class="number" :class="{ on: rank <= 3 }">{{ rank }}</span>
        <div v-if="!pgc && rank === 1" class="preview">
            <div class="pic">
                <a :href="link" target="_blank" class="link">
                    <img v-lazy="pic + '@112w_63h_1c_100q.webp'" :alt="title" />
                </a>
                <div class="watchlater">
                    <span class="wl-tips" style="left: -21px;">稍后再看</span>
                </div>
            </div>
            <div class="txt">
                <a :href="link" target="_blank" class="link">
                    <p title="title">{{ title }}</p>
                </a>
                <span>综合得分：{{ $format.formatCount(pts) }}</span>
            </div>
        </div>
        <a v-else :href="link" target="_blank" class="link">
            <p v-if="pgc" class="txt">
                <span :title="title" class="title">{{ title }}</span>
                <span class="update">{{ index_show }}</span>
            </p>
            <p v-else class="title" :title="title">{{ title }}</p>
        </a>
    </div>
</template>
<script>
export default {
    name: 'RankItem',
    props: ['bvid', 'title', 'pic', 'pts', 'index_show', 'ssid'],
    data() {
        return {
            rank: 0,
            hasNumber: true,
            pgc: false,
        }
    },
    computed: {
        link() {
            if (this.pgc)
                return `https://www.bilibili.com/bangumi/play/ss${this.ssid}/`
            else
                return '//www.bilibili.com/video/' + this.bvid
        }
    }
}
</script>
<style>
.rank-wrap {
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

.pgc-rank-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
}

.pgc-rank-wrap .number {
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

.pgc-rank-wrap .number.on {
    color: #fff;
    background: #00a1d6;
}

.pgc-rank-wrap .link {
    display: inline-block;
}

.pgc-rank-wrap .txt {
    width: 290px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .pgc-rank .pgc-rank-wrap .txt,
    .wrap .pgc-rank .pgc-rank-wrap .txt {
        width: 235px;
    }
}

.pgc-rank-wrap .txt .title {
    width: 198px;
    font-size: 14px;
    font-weight: 500;
}

.pgc-rank-wrap .txt .title,
.pgc-rank-wrap .txt .update {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.pgc-rank-wrap .txt .update {
    font-size: 12px;
    color: #999;
    text-align: right;
    min-width: 90px;
}
</style>