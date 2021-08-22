<template>
    <div class="manga-rank">
        <header class="rank-header">
            <span class="name">排行榜</span>
            <div class="tab-switch">
                <div
                    class="tab-switch-item"
                    :class="{ 'on': currentActiveTab === 0 }"
                    @click="currentActiveTab = 0"
                >月票</div>
                <div
                    class="tab-switch-item"
                    :class="{ 'on': currentActiveTab === 1 }"
                    @click="currentActiveTab = 1"
                >应援</div>
                <div
                    class="tab-switch-item"
                    :class="{ 'on': currentActiveTab === 2 }"
                    @click="currentActiveTab = 2"
                >飙升</div>
            </div>
            <a href="//manga.bilibili.com" target="_blank" class="more">
                更多
                <i class="bilifont bili-icon_caozuo_qianwang"></i>
            </a>
        </header>
        <div v-if="ComcisRank" class="manga-rank-wrap" :class="currentActiveClass">
            <div v-for="(item, key) in ComcisRank" :key="key" class="manga-rank-list">
                <div
                    v-for="(aitem, index) in item.slice(0, 14)"
                    :key="index"
                    class="manga-rank-item"
                >
                    <span class="rank-number" :class="{ 'on': index < 3 }">{{ index + 1 }}</span>
                    <div v-if="index === 0" class="preview">
                        <a
                            :href="'//manga.bilibili.com/detail/mc' + aitem.comic_id"
                            target="_blank"
                            class="preview-link"
                        >
                            <img :src="aitem.vertical_cover + '@112w_149h_1c_100q.webp'" alt />
                            <div class="preview-desc">
                                <p :title="aitem.title" class="title">{{ aitem.title }}</p>
                                <p class="style">{{ aitem.styles[0].name }}</p>
                                <p
                                    :title="formatShortTitle(aitem.last_short_title)"
                                    class="update"
                                >{{ formatShortTitle(aitem.last_short_title) }}</p>
                            </div>
                        </a>
                    </div>
                    <a
                        v-else
                        :href="'//manga.bilibili.com/detail/mc' + aitem.comic_id"
                        target="_blank"
                        class="other-link"
                    >
                        <p :title="aitem.title" class="title">{{ aitem.title }}</p>
                        <p
                            :title="formatShortTitle(aitem.last_short_title)"
                            class="update"
                        >{{ formatShortTitle(aitem.last_short_title) }}</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getHomeHotComics, getHomeFansComics } from '@/api'
export default {
    name: 'MangaRank',
    props: ['isShow'],
    data() {
        return {
            currentActiveTab: 0,
            hotData: [],
            fansData: [],
            freeData: []
        }
    },
    computed: {
        currentActiveClass() {
            switch (this.currentActiveTab) {
                case 1:
                    return 'show-fans'
                case 2:
                    return 'show-free'
                default:
                    return 'show-hot'
            }
        },
        ComcisRank() {
            return { hotData: this.hotData, fansData: this.fansData, freeData: this.freeData }
        }
    },
    methods: {
        getHotData() {
            getHomeFansComics(1).then(
                response => {
                    this.hotData = response.data.comics || []
                }
            )
        },
        getfansData() {
            getHomeFansComics(0).then(
                response => {
                    this.fansData = response.data.comics || []
                }
            )
        },
        getfreeData() {
            getHomeHotComics(2).then(
                response => {
                    this.freeData = response.data || []
                }
            )
        },
        formatShortTitle(str) {
            var value = Number(str)
            if (value)
                return `更新至${value}话`
            else
                return '更新至' + str
        }
    },
    watch: {
        isShow(val) {
            if (val) {
                this.getHotData()
                this.getfansData()
                this.getfreeData()
            }
        }
    },
    mounted() {

    },
}
</script>
<style>
.manga-rank {
    overflow: hidden;
    width: 320px;
}
@media screen and (max-width: 1438px) {
    .footer-wrap .manga-rank,
    .footer-wrap .manga-rank .manga-rank-list,
    .wrap .manga-rank,
    .wrap .manga-rank .manga-rank-list {
        width: 265px !important;
    }
}

.manga-rank .tab-switch {
    display: flex;
    flex: 1;
    margin-left: 20px;
    margin-top: 2px;
}

.manga-rank .tab-switch .tab-switch-item {
    margin-right: 12px;
    height: 21px;
    font-size: 12px;
    line-height: 16px;
    cursor: pointer;
}

.manga-rank .tab-switch .tab-switch-item.on {
    border-bottom: 1px solid #00a1d6;
    color: #00a1d6;
}

.manga-rank .manga-rank-wrap {
    display: flex;
    width: 300%;
    transition: all 0.2s ease-in-out;
}

.manga-rank .manga-rank-wrap.show-fans {
    margin-left: -100%;
}

.manga-rank .manga-rank-wrap.show-free {
    margin-left: -200%;
}

.manga-rank-list {
    width: 320px;
    flex-shrink: 0;
}

.manga-rank-item {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 9px 0;
}

.manga-rank-item:first-child {
    padding-top: 0;
}

.manga-rank-item .rank-number {
    display: inline-block;
    flex-shrink: 0;
    margin-right: 12px;
    width: 18px;
    height: 18px;
    border-radius: 2px;
    background: #fff;
    color: #999;
    text-align: center;
    font-size: 14px;
    line-height: 18px;
    cursor: default;
}

.manga-rank-item .rank-number.on {
    background: #00a1d6;
    color: #fff;
}

.manga-rank-item .preview {
    position: relative;
    width: 290px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .manga-rank .link,
    .footer-wrap .manga-rank .preview,
    .wrap .manga-rank .link,
    .wrap .manga-rank .preview {
        width: 235px !important;
    }
}

.manga-rank-item .preview .preview-link {
    display: flex;
}

.manga-rank-item .preview .preview-link img {
    flex-shrink: 0;
    width: 112px;
    height: 149px;
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: 2px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAAAh1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0UCIZXAAAALHRSTlMAoJDx4OYL/DcGF+6+JNi4ycSIT2k6LPeWfRzTVPXPszEQrV0hpo12cEZAZFpRNIQAAAJVSURBVFjD7dbZcpswGIbhHwwSi81q8Ib33fnu//oatRIpmliDhQ/aaZ+TKInnjVgkhb4RJMhP9Fzo8PiD+vEA+JPnqS0+1dRHBJhibAzh2HNeekxP9Z8XBSMZM6SmRBYx65QeM6XsY3rKPqanLGMWqeDmOh0b/Io9+YHi3gKtdExgLznSlyjFMGnUphIMlcgY22C4DSPBxTu4IrXDe+yI6IDWbPSqGVoHoohDyip6XZVB4hFN1TgPyUaYQ5rSWQ0nZGcC6UyJukKypa4yIXX3HLLlqCdHX++HLRfS/9bbWvvHLSLNR3N6tRXdFwdxejekiYF4fDnWYa/WqSm2PqRCSy0hrbP5RxAaW8141N17tVbZ+S1fFYbWFF2+1lqg62BoBdAsqWOLroWhxTh+M8vmWuuaxp1WaWjRSn43yl35sHTLUjxiaWlqnYE4LZoJme3v13MibqepFZRL6otV5V+/Hv+xVvi+FsvZG1qh/LQ7uFXnF/HlwcEfYlDktW2r5EARUiXWc1xRWAC8tGwxsdJ9dcRnYrddMdtrjDZyAy3kXrSJ7O89u8zEZAIKxBRnFzbonWD3ZkfCrrmzP+6979nicjAnW3NZ4OS1R6GtVBa8drTek539up3NAgMvcv51WNZQitCiFBZQaqIMSrx1XrWNoWTy/w1r+hk+xjuMSVjGGC6WZ3S1xlDriqTKxzB+Ra3I4bDHne62drqmied57QR9z0D94dHnOEmvJ/pWAMm4ovL2TTcJ5cRyMlHrbkdG5c/5r82fYqt+K/iR89m2JrP9PEZyI80PsPxVT0P3FAEAAAAASUVORK5CYII=);
}

.manga-rank-item .preview .preview-desc {
    margin-left: 12px;
}

.manga-rank-item .preview .preview-desc .title {
    font-weight: 500;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    margin-bottom: 10px;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 20px;
    -webkit-line-clamp: 2;
}

@media screen and (max-width: 1654px) {
    .footer-wrap
        .manga-rank
        .manga-rank-list
        .manga-rank-item
        .other-link
        .title,
    .footer-wrap
        .manga-rank
        .manga-rank-list
        .manga-rank-item
        .preview-desc
        .title,
    .wrap .manga-rank .manga-rank-list .manga-rank-item .other-link .title,
    .wrap .manga-rank .manga-rank-list .manga-rank-item .preview-desc .title {
        max-width: 200px !important;
    }
}

@media screen and (max-width: 1438px) {
    .footer-wrap
        .manga-rank
        .manga-rank-list
        .manga-rank-item
        .other-link
        .title,
    .footer-wrap
        .manga-rank
        .manga-rank-list
        .manga-rank-item
        .preview-desc
        .title,
    .wrap .manga-rank .manga-rank-list .manga-rank-item .other-link .title,
    .wrap .manga-rank .manga-rank-list .manga-rank-item .preview-desc .title {
        max-width: 148px !important;
    }
}

.manga-rank-item .preview .preview-desc .style,
.manga-rank-item .preview .preview-desc .update {
    color: #999;
    line-height: 18px;
}

@media screen and (max-width: 1654px) {
    .footer-wrap
        .manga-rank
        .manga-rank-list
        .manga-rank-item:nth-child(n + 13),
    .wrap .manga-rank .manga-rank-list .manga-rank-item:nth-child(n + 13) {
        display: none;
    }
}

.manga-rank-item .other-link {
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    line-height: 18px;
}

.manga-rank-item .other-link .title {
    overflow: hidden;
    width: 198px;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
}

.manga-rank-item .other-link .update {
    overflow: hidden;
    min-width: 80px;
    height: 18px;
    color: #999;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
}
</style>