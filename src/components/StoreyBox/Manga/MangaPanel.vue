<template>
    <div class="manga-panel">
        <StoreyTitle svg="#bili-ic_partition_Comic" link="//manga.bilibili.com/" title="漫画">
            <template #title>
                <div class="left-slot">
                    <div class="tab-switch tab-switch">
                        <div
                            class="tab-switch-item"
                            :class="{ 'on': currentActiveTab === 0 }"
                            @click="currentActiveTab = 0"
                        >人气推荐</div>
                        <div
                            class="tab-switch-item"
                            :class="{ 'on': currentActiveTab === 1 }"
                            @click="currentActiveTab = 1"
                        >免费漫画推荐</div>
                    </div>
                    <a
                        href="//manga.bilibili.com/app-download?from=manga_homepage"
                        target="_blank"
                        class="app-download-link"
                    >
                        下载APP
                        <span>领券免费看</span>
                    </a>
                </div>
            </template>
            <ExchangeBtn link="//manga.bilibili.com/" @click="exchangeComics"></ExchangeBtn>
        </StoreyTitle>
        <div class="manga-list-box" v-if="currentActiveData.length">
            <a
                v-for="(item, index) in currentActiveData"
                :key="index"
                :href="'//manga.bilibili.com/detail/mc' + item.comic_id"
                target="_blank"
                class="manga-card"
            >
                <img :src="item.vertical_cover + '@206w_275h_1c_90q.webp'" alt />
                <p :title="item.title" class="manga-title">{{ item.title }}</p>
                <p class="manga-tag">{{ currentActiveTab ? item.styles[0].name : item.styles[0] }}</p>
            </a>
        </div>
    </div>
</template>
<script>
import StoreyTitle from '../StoreyTitle'
import ExchangeBtn from '../ExchangeBtn'

import { getRcmdComics, getHomeHotComics } from '@/api'
export default {
    name: 'MangaPanel',
    props: ['isShow'],
    components: {
        StoreyTitle, ExchangeBtn
    },
    data() {
        return {
            currentActiveTab: 0,
            comicsData: [],
            comicsHomeHot: [],
        }
    },
    computed: {
        currentActiveData() {
            return this.currentActiveTab ? this.comicsHomeHot.slice(0, 10) : this.comicsData
        }
    },
    methods: {
        setRcmdComics() {
            getRcmdComics({ type: 1, page_size: 12, page_num: 1 }).then(
                response => {
                    this.comicsData = response.data.comics || []
                }
            )
        },
        setHomeHotComics() {
            getHomeHotComics(1).then(
                response => {
                    this.comicsHomeHot = response.data
                }
            )
        },
        exchangeComics() {
            if (this.currentActiveTab)
                this.comicsHomeHot.sort(() => 0.5 - Math.random())
            else
                this.setRcmdComics()
        }
    },
    watch: {
        isShow(val) {
            if (val) {
                this.setRcmdComics()
                this.setHomeHotComics()
            }
        }
    },
    mounted() {

    },
}
</script>
<style>
.manga-panel .left-slot,
.manga-panel .tab-switch {
    display: flex;
}

.manga-panel .tab-switch {
    margin-left: 4px;
    margin-top: 1px;
}

.manga-panel .tab-switch .tab-switch-item {
    margin-right: 12px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    cursor: pointer;
}

.manga-panel .tab-switch .tab-switch-item.on {
    border-bottom: 1px solid #00a1d6;
    color: #00a1d6;
}

.manga-panel .app-download-link {
    position: relative;
    height: 30px;
    color: #505050;
    text-align: center;
    font-size: 12px;
    line-height: 32px;
    cursor: pointer;
}

.manga-panel .app-download-link span {
    position: absolute;
    top: -10px;
    right: -54px;
    width: 72px;
    height: 20px;
    border-radius: 10px;
    background: #fa5a57;
    color: #fff;
    font-size: 12px;
    line-height: 19px;
    text-align: center;
}

@media screen and (max-width: 1654px) {
    .footer-wrap .manga-list-box,
    .wrap .manga-list-box {
        width: 854px !important;
        height: 581px !important;
    }
}

@media screen and (max-width: 1438px) {
    .footer-wrap .manga-list-box,
    .wrap .manga-list-box {
        width: 710px !important;
        height: 602px;
    }
}

.manga-panel .manga-list-box {
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 1286px;
    height: 682px;
}

@media screen and (max-width: 1870px) {
    .footer-wrap .manga-panel .manga-list-box,
    .wrap .manga-panel .manga-list-box {
        width: 1070px;
    }
}

@media screen and (max-width: 1654px) {
    .footer-wrap .manga-list-box .manga-card,
    .wrap .manga-list-box .manga-card {
        width: 162px !important;
        margin-bottom: 20px !important;
    }
}

@media screen and (max-width: 1438px) {
    .footer-wrap .manga-list-box .manga-card,
    .wrap .manga-list-box .manga-card {
        width: 170px !important;
        margin-bottom: 20px !important;
    }
}

.manga-panel .manga-list-box .manga-card {
    width: 206px;
    margin-bottom: 24px;
}

@media screen and (max-width: 1654px) {
    .footer-wrap .manga-list-box .manga-card > img,
    .wrap .manga-list-box .manga-card > img {
        width: 162px !important;
        height: 216px !important;
    }
}

@media screen and (max-width: 1438px) {
    .footer-wrap .manga-list-box .manga-card > img,
    .wrap .manga-list-box .manga-card > img {
        width: 170px !important;
        height: 227px !important;
    }
}

.manga-panel .manga-list-box .manga-card > img {
    display: block;
    width: 206px;
    height: 275px;
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: 2px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAAAh1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0UCIZXAAAALHRSTlMAoJDx4OYL/DcGF+6+JNi4ycSIT2k6LPeWfRzTVPXPszEQrV0hpo12cEZAZFpRNIQAAAJVSURBVFjD7dbZcpswGIbhHwwSi81q8Ib33fnu//oatRIpmliDhQ/aaZ+TKInnjVgkhb4RJMhP9Fzo8PiD+vEA+JPnqS0+1dRHBJhibAzh2HNeekxP9Z8XBSMZM6SmRBYx65QeM6XsY3rKPqanLGMWqeDmOh0b/Io9+YHi3gKtdExgLznSlyjFMGnUphIMlcgY22C4DSPBxTu4IrXDe+yI6IDWbPSqGVoHoohDyip6XZVB4hFN1TgPyUaYQ5rSWQ0nZGcC6UyJukKypa4yIXX3HLLlqCdHX++HLRfS/9bbWvvHLSLNR3N6tRXdFwdxejekiYF4fDnWYa/WqSm2PqRCSy0hrbP5RxAaW8141N17tVbZ+S1fFYbWFF2+1lqg62BoBdAsqWOLroWhxTh+M8vmWuuaxp1WaWjRSn43yl35sHTLUjxiaWlqnYE4LZoJme3v13MibqepFZRL6otV5V+/Hv+xVvi+FsvZG1qh/LQ7uFXnF/HlwcEfYlDktW2r5EARUiXWc1xRWAC8tGwxsdJ9dcRnYrddMdtrjDZyAy3kXrSJ7O89u8zEZAIKxBRnFzbonWD3ZkfCrrmzP+6979nicjAnW3NZ4OS1R6GtVBa8drTek539up3NAgMvcv51WNZQitCiFBZQaqIMSrx1XrWNoWTy/w1r+hk+xjuMSVjGGC6WZ3S1xlDriqTKxzB+Ra3I4bDHne62drqmied57QR9z0D94dHnOEmvJ/pWAMm4ovL2TTcJ5cRyMlHrbkdG5c/5r82fYqt+K/iR89m2JrP9PEZyI80PsPxVT0P3FAEAAAAASUVORK5CYII=);
}

@media screen and (max-width: 1654px) {
    .footer-wrap .manga-list-box .manga-card .manga-title,
    .wrap .manga-list-box .manga-card .manga-title {
        max-width: 162px !important;
    }
}

@media screen and (max-width: 1438px) {
    .footer-wrap .manga-list-box .manga-card .manga-title,
    .wrap .manga-list-box .manga-card .manga-title {
        max-width: 170px !important;
    }
}

.manga-panel .manga-list-box .manga-card .manga-title {
    max-width: 206px;
    margin: 10px 0 8px;
    color: #212121;
    font-weight: 500;
    font-size: 14px;
    transition: 0.3s;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
}

.manga-panel .manga-list-box .manga-card .manga-tag {
    color: #999;
    font-size: 12px;
    overflow: hidden;
    line-height: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .manga-list-box .manga-card:nth-child(n + 9),
    .wrap .manga-list-box .manga-card:nth-child(n + 9) {
        display: none;
    }
}

@media screen and (max-width: 1870px) {
    .footer-wrap .manga-panel .manga-list-box .manga-card:nth-child(n + 11),
    .wrap .manga-panel .manga-list-box .manga-card:nth-child(n + 11) {
        display: none;
    }
}
</style>