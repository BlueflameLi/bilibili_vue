<template>
    <div class="international-header">
        <div class="mini-header">
            <div class="mini-header-content">
                <div class="nav-link">
                    <ul class="nav-link-ul">
                        <li v-for="(item,index) in navLinkItem" :key="index" class="nav-link-item">
                            <a :href="item.url" class="link">
                                <i v-if="item.hasIcon" :class="item.icon"></i>
                                {{ item.name }}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="nav-search-box" v-clickoutside="clickoutside">
                    <div class="nav-search">
                        <form id="nav_searchform">
                            <input
                                :value="navSearchData.keyword"
                                @input="changeSearchKeyword"
                                type="text"
                                autocomplete="off"
                                accesskey="s"
                                class="nav-search-keyword"
                                :placeholder="navSearchData.default.name"
                                @keydown.enter="search"
                                @keydown.up.prevent="itemSelect(navSearchData.itemSelectIndex - 1)"
                                @keydown.down.prevent="itemSelect(navSearchData.itemSelectIndex + 1)"
                                @focus="navSearchData.isActivate = true"
                            />
                            <div class="nav-search-btn" @click="search">
                                <button
                                    type="button"
                                    class="bilifont bili-icon_dingdao_sousuo nav-search-submit"
                                ></button>
                            </div>
                        </form>
                        <ul v-if="isShowSearchSuggest" id="search-suggest" class="search-suggest">
                            <li
                                v-for="(item,index) in navSearchData.suggest"
                                :key="index"
                                class="suggest-item"
                                :class="index == navSearchData.itemSelectIndex ? 'selected' : ''"
                                @click.prevent="search"
                            >
                                <a
                                    :href="'//search.bilibili.com/all?keyword=' + item.value"
                                    target="_blank"
                                    v-html="item.name"
                                ></a>
                            </li>
                        </ul>
                        <ul v-if="isShowSearchHistory" id="search-history" class="search-history">
                            <li
                                v-for="(item,index) in navSearchData.searchHistory"
                                :key="index"
                                class="history-item"
                                :class="index == navSearchData.itemSelectIndex ? 'selected' : ''"
                            >
                                <a
                                    :href="'//search.bilibili.com/all?keyword=' + item.value"
                                >{{ item.value }}</a>
                                <i
                                    class="bilifont bili-icon_sousuo_yichu"
                                    @click="navSearchData.searchHistory.splice(index, 1)"
                                ></i>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="nav-user-center">
                    <div class="user-con search-icon">
                        <a href="//search.bilibili.com/?from_source=webtop_search" target="_blank">
                            <i class="bilifont bili-icon_dingdao_sousuo"></i>
                        </a>
                    </div>
                    <ul class="user-con">
                        <li class="item">
                            <div class="mini-avatar">
                                <div>
                                    <div class="bili-avatar">
                                        <img
                                            class="bili-avatar-img bili-avatar-face bili-avatar-img-radius"
                                            data-src="https://i0.hdslb.com/bfs/face/1d5d205e69c80763fd17c2bccb8111815cb7da9b.jpg@96w_96h_1c_1s.webp"
                                            alt
                                            src="https://i0.hdslb.com/bfs/face/1d5d205e69c80763fd17c2bccb8111815cb7da9b.jpg@96w_96h_1c_1s.webp"
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li v-for="(item,index) in userConItem" :key="index" class="item">
                            <div class="nav-item">
                                <div class="t">
                                    <a :href="item.url" class="name" target="_blank">{{ item.name }}</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div>
                        <span class="mini-upload">投稿</span>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="mini-header-banner"
            @mouseenter="bannerMouseEnter"
            @mousemove="bannerMouseMove"
            @mouseleave="bannerMouseLeave"
        >
            <div class="animated-banner">
                <div class="layer">
                    <video
                        loop
                        autoplay
                        muted
                        :src="bannerAnimateData.src"
                        :width="bannerAnimateData.width"
                        :height="bannerAnimateData.height"
                        :style="`object-fit: cover; transform: translateX(${bannerAnimateData.translateX}px); transition: ${bannerAnimateData.transition};`"
                        data-height="180"
                        data-width="2104"
                    ></video>
                </div>
            </div>
            <div class="taper-line"></div>
            <div class="logo wrap">
                <a class="head-logo">
                    <img
                        src="@/assets/img/10641bbc5189591221c00958f3458f33798c7caa.png"
                        class="logo-img"
                    />
                </a>
            </div>
        </div>
        <div class="wrap">
            <div class="primary-menu">
                <div class="page-tab">
                    <ul class="con">
                        <li v-for="(item,index) in primaryPageTab" :key="index">
                            <a :href="item.url" target="_blank">
                                <div class="round" :class="item.color">
                                    <i :class="item.icon"></i>
                                    <div v-if="item.hasDynamicUpdate" class="dynamic-update">
                                        <img
                                            src="//i1.hdslb.com/bfs/face/70fba98159d382c91d236289a3294fb2b0c3f258.jpg@36w_36h_1c_100q.webp"
                                            alt
                                        />
                                        <i></i>
                                    </div>
                                </div>
                            </a>
                            <span>{{ item.name }}</span>
                        </li>
                    </ul>
                </div>
                <div class="tab-line"></div>
                <div class="channel-menu">
                    <span v-for="(item,index) in primaryChannelMenu" :key="index">
                        <div class="item">
                            <a :href="item.url" class="name">
                                <span>
                                    {{ item.name }}<em>{{ regionCount.length ? regionCount[index] : '-' }}</em>
                                </span>
                            </a>
                        </div>
                    </span>
                    <span>
                        <div class="item">
                            <a href="/" class="name">
                                <span>更多</span>
                                <i class="bilifont bili-icon_caozuo_xiangyou-copy"></i>
                            </a>
                        </div>
                    </span>
                </div>
                <div class="tab-line none"></div>
                <div class="friendship-link">
                    <span v-for="(item,index) in primaryFriendshipLink" :key="index">
                        <div class="item">
                            <a :href="item.url" target="_blank" class="name">
                                <svg class="svg-icon">
                                    <use :xlink:href="item.svg" />
                                </svg>
                                <span>{{ item.name }}</span>
                            </a>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { throttle } from 'lodash'
import { getSuggest, getSearchDefault, getOnline } from '@/api'
export default {
    name: "TheHeader",
    components: {

    },
    data() {
        const localData = localStorage.getItem('search_history')
        let searchHistory
        try {
            searchHistory = JSON.parse(localData) || []
        } catch (error) {
            searchHistory = []
        }
        return {
            screenWidth: 1654,
            bannerAnimateData: {
                src: require('@/assets/video/8d8bb221-d24b-4fa7-93b2-e5f8585fb907.webm'),
                width: 1851,
                height: 158,
                mouseX: 0,
                translateX: 44,
                transition: 'none',
            },

            navLinkItem: [
                {
                    name: '主站',
                    hasIcon: true,
                    url: './',
                    icon: 'bilifont bili-icon_dingdao_zhuzhan',
                },
                {
                    name: '番剧',
                    hasIcon: false,
                    url: './',
                    icon: '',
                },
                {
                    name: '游戏中心',
                    hasIcon: false,
                    url: './',
                    icon: '',
                },
                {
                    name: '直播',
                    hasIcon: false,
                    url: './',
                    icon: '',
                },
                {
                    name: '会员购',
                    hasIcon: false,
                    url: './',
                    icon: '',
                },
                {
                    name: '漫画',
                    hasIcon: false,
                    url: './',
                    icon: '',
                },
                {
                    name: '赛事',
                    hasIcon: false,
                    url: './',
                    icon: '',
                },
                {
                    name: '下载APP',
                    hasIcon: true,
                    url: './',
                    icon: 'bilifont bili-icon_dingdao_xiazaiapp',
                },
            ],
            userConItem: [
                {
                    name: '大会员',
                    url: ''
                },
                {
                    name: '消息',
                    url: ''
                },
                {
                    name: '动态',
                    url: ''
                },
                {
                    name: '收藏',
                    url: ''
                },
                {
                    name: '历史',
                    url: ''
                },
                {
                    name: '创作中心',
                    url: ''
                }
            ],
            navSearchData: {
                default: {
                    name: '',
                    url: ''
                },
                keyword: '',
                searchHistory,
                suggest: [],
                isActivate: false,
                itemSelectIndex: -1
            },
            primaryPageTab: [
                {
                    name: '首页',
                    url: '/',
                    color: '',
                    icon: 'bilifont bili-icon_fenqudaohang_shouye',
                    hasDynamicUpdate: false
                },
                {
                    name: '动态',
                    url: '/',
                    color: 'yel',
                    icon: 'bilifont bili-icon_dingdao_dongtai',
                    hasDynamicUpdate: true
                },
                {
                    name: '热门',
                    url: '/',
                    color: 'orange',
                    icon: 'bilifont bili-remen',
                    hasDynamicUpdate: false
                },
                {
                    name: '频道',
                    url: '/',
                    color: 'channel',
                    icon: 'bilifont bili-pindao',
                    hasDynamicUpdate: false
                }
            ],
            primaryChannelMenu: [{
                name: '动画',
                url: '/'
            },
            {
                name: '番剧',
                url: '/'
            },
            {
                name: '音乐',
                url: '/'
            },
            {
                name: '国创',
                url: '/'
            },
            {
                name: '舞蹈',
                url: '/'
            },
            {
                name: '游戏',
                url: '/'
            }, {
                name: '知识',
                url: '/'
            },
            {
                name: '科技',
                url: '/'
            },
            {
                name: '生活',
                url: '/'
            },
            {
                name: '鬼畜',
                url: '/'
            },
            {
                name: '时尚',
                url: '/'
            },
            {
                name: '资讯',
                url: '/'
            },
            {
                name: '娱乐',
                url: '/'
            },
            {
                name: '影视',
                url: '/'
            },
            {
                name: '放映厅',
                url: '/'
            }],
            primaryFriendshipLink: [
                {
                    name: '专栏',
                    url: '/',
                    svg: '#bili-read'
                },
                {
                    name: '直播',
                    url: '/',
                    svg: '#bili-live'
                },
                {
                    name: '活动',
                    url: '/',
                    svg: '#bili-activit'
                },
                {
                    name: '课堂',
                    url: '/',
                    svg: '#bili-zhishi'
                },
                {
                    name: '小黑屋',
                    url: '/',
                    svg: '#bili-blackroom'
                },
                {
                    name: '新歌热榜',
                    url: '/',
                    svg: '#bili-musicplus'
                }
            ],
            regionCount: []
        }
    },
    computed: {
        isShowSearchSuggest() {
            return this.navSearchData.suggest.length && this.navSearchData.isActivate
        },
        isShowSearchHistory() {
            return this.navSearchData.searchHistory.length && this.navSearchData.isActivate && !this.isShowSearchSuggest
        }
    },
    methods: {
        bannerSelfAd() {
            if (this.screenWidth < 1655) {
                this.bannerAnimateData.width = 1851
                this.bannerAnimateData.height = 158
            }
            else {
                this.bannerAnimateData.width = 1851 + (2866 - 1851) / (2560 - 1655) * (this.screenWidth - 1655)
                this.bannerAnimateData.height = 158 + (245 - 158) / (2560 - 1655) * (this.screenWidth - 1655)
            }
        },
        bannerMouseEnter(event) {
            this.bannerAnimateData.mouseX = event.clientX
            this.bannerAnimateData.transition = 'none'
        },
        bannerMouseMove: throttle(function (event) {
            this.bannerAnimateData.translateX = 44 + (event.clientX - this.bannerAnimateData.mouseX) / this.screenWidth * 20
        }, 20),
        bannerMouseLeave() {
            this.bannerAnimateData.translateX = 44
            // this.bannerAnimateData.transition = 'transform 0.3s'
        },
        setSearchDefault() {
            getSearchDefault().then(
                response => {
                    this.navSearchData.default.name = response.data.show_name
                    this.navSearchData.default.url = response.data.url
                })
        },
        setSuggest() {
            this.navSearchData.itemSelectIndex = -1
            getSuggest(this.navSearchData.keyword).then(
                response => {
                    this.navSearchData.suggest = Object.values(response)
                })
        },
        changeSearchKeyword(event) {
            this.navSearchData.keyword = event.target.value

            this.setSuggest()
        },
        addSearchHistory(keyword) {
            if (this.navSearchData.searchHistory.findIndex(function (obj) {
                return obj.value == keyword
            }) == -1) {
                this.navSearchData.searchHistory.unshift(
                    { value: keyword, timestamp: Date.now() }
                )
                if (this.navSearchData.searchHistory.length > 10)
                    this.navSearchData.searchHistory.pop()
            }
        },
        search() {
            if (this.navSearchData.keyword) {
                let { keyword } = this.navSearchData
                window.open('https://search.bilibili.com/all?keyword=' + keyword, "_blank")
                this.addSearchHistory(keyword)
                if (this.navSearchData.itemSelectIndex != -1)
                    this.setSuggest()
            }
            else
                window.open(this.navSearchData.default.url, "_blank")
            return false
        },
        clickoutside() {
            this.navSearchData.isActivate = false;
        },
        itemSelect(index) {
            if (this.isShowSearchSuggest) {
                if (index < 0)
                    this.navSearchData.itemSelectIndex = 0
                else if (index >= this.navSearchData.suggest.length)
                    this.navSearchData.itemSelectIndex = this.navSearchData.suggest.length - 1
                else
                    this.navSearchData.itemSelectIndex = index
                this.navSearchData.keyword = this.navSearchData.suggest[this.navSearchData.itemSelectIndex].value
            }
            else if (this.isShowSearchHistory) {
                if (!this.isShowSearchHistory) return
                if (index < 0)
                    this.navSearchData.itemSelectIndex = 0
                else if (index >= this.navSearchData.searchHistory.length)
                    this.navSearchData.itemSelectIndex = this.navSearchData.searchHistory.length - 1
                else
                    this.navSearchData.itemSelectIndex = index
                this.navSearchData.keyword = this.navSearchData.searchHistory[this.navSearchData.itemSelectIndex].value
            }
            else
                return
        },
        setOnline() {
            getOnline().then(
                reponse => {
                    var { region_count } = reponse.data
                    this.regionCount = []
                    this.regionCount.push(this.fromatOnline(region_count['1']))
                    this.regionCount.push(this.fromatOnline(region_count['13']))
                    this.regionCount.push(this.fromatOnline(region_count['3']))
                    this.regionCount.push(this.fromatOnline(region_count['167']))
                    this.regionCount.push(this.fromatOnline(region_count['129']))
                    this.regionCount.push(this.fromatOnline(region_count['4']))
                    this.regionCount.push(this.fromatOnline(region_count['36']))
                    this.regionCount.push(this.fromatOnline(region_count['188']))
                    this.regionCount.push(this.fromatOnline(region_count['160']))
                    this.regionCount.push(this.fromatOnline(region_count['119']))
                    this.regionCount.push(this.fromatOnline(region_count['155']))
                    this.regionCount.push(this.fromatOnline(region_count['202']))
                    this.regionCount.push(this.fromatOnline(region_count['5']))
                    this.regionCount.push(this.fromatOnline(region_count['181']))
                    this.regionCount.push(this.fromatOnline(region_count['11'] + region_count['23'] + region_count['177']))
                }
            )
        },
        fromatOnline(val) {
            if (val > 999)
                return '999+'
            else
                return val
        }
    },
    watch: {
        'navSearchData.searchHistory'(value) {
            localStorage.setItem('search_history', JSON.stringify(value))
        }

    },
    mounted() {
        this.screenWidth = document.documentElement.clientWidth;
        this.bannerSelfAd();
        const that = this; // 备份this指向至that

        window.addEventListener('resize', throttle(function () {
            that.screenWidth = document.documentElement.clientWidth; // 触发立即更新尺寸数据
            that.bannerSelfAd();
        }, 10));

        this.setSearchDefault()
        this.setOnline()
    },

}
</script>
<style>
.footer-wrap,
.wrap {
    margin: 0 auto;
    width: 1630px;
}

@media screen and (max-width: 1870px) {
    .footer-wrap,
    .wrap {
        width: 1414px;
    }
}

@media screen and (max-width: 1654px) {
    .footer-wrap,
    .wrap {
        width: 1198px;
    }
}

@media screen and (max-width: 1438px) {
    .footer-wrap,
    .wrap {
        width: 999px;
    }
}

.international-header {
    min-width: 999px;
    min-height: 56px;
    z-index: 1000;
    position: relative;
}

.mini-header {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 56px;
}

.mini-header-content {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 0 auto;
    padding: 10px 24px;
    line-height: 30px;
}

@media screen and (max-width: 1122px) {
    .mini-header-content {
        padding: 10px 12px;
    }
}

.nav-search {
    position: relative;
}

/* 顶部nav */
.nav-link .nav-link-ul {
    height: 36px;
    display: flex;
    align-items: center;
}

.nav-link .nav-link-ul .nav-link-item {
    margin-right: 12px;
}

.nav-link .nav-link-ul .nav-link-item .link {
    font-size: 14px;
    color: #fff;
    text-shadow: 0 1px 1px rgb(0 0 0 / 30%);
    line-height: 32px;
    white-space: nowrap;
    display: flex;
}

.nav-link .bili-icon_dingdao_zhuzhan {
    margin-right: 6px;
    font-size: 18px;
    vertical-align: middle;
}

.nav-link .bili-icon_dingdao_xiazaiapp {
    margin-right: 2px;
    font-size: 18px;
    vertical-align: middle;
}

/* 顶部搜索框 */
.nav-search-box {
    margin: 0 10px;
    width: 500px;
    transition: width 0.3s;
}

@media screen and (max-width: 1190px) {
    .nav-search-box {
        display: none;
    }
}

.nav-search #nav_searchform {
    display: block;
    padding: 0 38px 0 16px;
    border: 1px solid hsla(0, 0%, 100%, 0);
    border-radius: 2px;
    background-color: #fff;
}

.nav-search .nav-search-keyword {
    overflow: hidden;
    width: 100%;
    height: 34px;
    border: none;
    background-color: transparent;
    box-shadow: none;
    color: #999;
    font-size: 14px;
    line-height: 34px;
    transition: all 0.2s;
}

.nav-search .nav-search-keyword:focus {
    color: #222;
}

.nav-search .nav-search-btn {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    width: 48px;
    height: 36px;
    border: none;
    border-radius: 2px;
    background: #e7e7e7;
    line-height: 26px;
    cursor: pointer;
}

.nav-search .nav-search-submit {
    position: absolute;
    top: 8px;
    right: 16px;
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    color: #505050;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    transition: all 0.2s;
    outline: none;
}

.nav-search-btn:hover .nav-search-submit {
    color: #1890ff;
}

/* 顶部搜索建议 */
.search-suggest {
    position: absolute;
    width: 100%;
    border: 1px solid #e5e9ef;
    margin-top: 1px;
    background: #fff;
    z-index: 99999;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 16%);
    padding: 10px 0;
    font-size: 14px;
}

.search-suggest .suggest-item {
    padding: 0 16px;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    word-wrap: break-word;
    word-break: break-all;
    display: block;
    color: #222;
    position: relative;
    transition: 0.2 ease;
}

.search-suggest .selected,
.search-suggest .suggest-item:hover {
    background-color: #f4f4f4;
}

.search-suggest .suggest-item .suggest_high_light {
    font-style: normal;
    color: #f25d8e;
}

/* 顶部搜索历史 */
.search-history {
    position: absolute;
    width: 100%;
    border: 1px solid #e5e9ef;
    margin-top: 1px;
    background: #fff;
    z-index: 99999;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 16%);
    padding: 10px 0;
    font-size: 14px;
}

.search-history .history-item {
    padding: 6px 10px 6px 16px;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    word-wrap: break-word;
    word-break: break-all;
    color: #222;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.2s ease;
}

.search-history .history-item a {
    width: 100%;
    color: #222;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.search-history .bili-icon_sousuo_yichu {
    color: #999;
}

.search-history .bili-icon_sousuo_yichu:hover {
    color: #00a1d6;
}

.search-history .selected,
.search-history .history-item:hover {
    background-color: #f4f4f4;
}
/* 顶部用户中心 */
.nav-user-center {
    display: flex;
    flex-shrink: 0;
}

.nav-user-center .user-con {
    display: flex;
    align-items: center;
}

.nav-user-center .search-icon {
    display: none;
}

.nav-user-center .bilifont {
    color: #fff;
    vertical-align: middle;
    font-size: 20px;
    cursor: pointer;
}

@media screen and (max-width: 1190px) {
    .nav-user-center .search-icon {
        display: flex;
        align-items: center;
    }
}

.nav-user-center .user-con .item {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    margin-left: 12px;
    cursor: pointer;
}

.nav-user-center .user-con .item .name {
    color: #fff;
    text-shadow: 0 1px 1px rgb(0 0 0 / 30%);
    white-space: nowrap;
}

.nav-item {
    float: left;
    text-align: center;
    position: relative;
    background-color: rgba(255, 255, 255, 0);
    transition: all 0.3s;
}

.t {
    color: inherit;
    height: 100%;
    display: block;
}

/* 用户头像 */
.mini-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    position: relative;
    margin-right: 10px;
}

.mini-avatar > div {
    height: 100%;
    transform: translate(0);
    transition: transform 0.2s ease;
}

.bili-avatar {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url(data:image/gif;base64,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);
    background-size: cover;
    -moz-border-radius: 50%;
    border-radius: 50%;
}

.bili-avatar img {
    border-radius: 50%;
    border: none;
    display: block;
    object-fit: cover;
    image-rendering: -webkit-optimize-contrast;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
}

.nav-user-center .user-con .item .name {
    color: #fff;
    text-shadow: 0 1px 1px rgb(0 0 0 / 30%);
    white-space: nowrap;
    font-size: 14px;
}

/* 投稿按钮 */
.mini-upload {
    cursor: pointer;
    position: relative;
    color: #fff;
    font-size: 14px;
    display: block;
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: #fb7299;
    border-radius: 2px;
    margin-left: 14px;
}

/* 顶部banner */
.mini-header-banner {
    margin: 0 auto;
    position: relative;
    z-index: 0;
    min-height: 155px;
    height: 9.375vw;
    min-width: 999px;
    background-color: #f9f9f9;
    display: flex;
    justify-content: center;
    background-repeat: no-repeat;
    background-position: center 0;
    background-size: cover;
    /* 滚动条偏移修正 */
    margin-right: -12px;
}

.animated-banner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
}

.mini-header-banner .animated-banner .layer {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mini-header-banner .taper-line {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(rgba(0, 0, 0, 0.4), transparent);
}

.mini-header-banner .logo {
    position: relative;
}

.mini-header-banner .logo .head-logo {
    position: absolute;
    width: 220px;
    height: 50%;
    min-height: 60px;
    bottom: 10px;
    z-index: 1;
}

.mini-header-banner .logo .logo-img {
    height: 100%;
}

/* 主菜单 */
.primary-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    width: 100%;
}

.page-tab,
.page-tab .con {
    display: flex;
    align-items: center;
}

.page-tab .con li {
    cursor: pointer;
    width: 66px;
    height: 68px;
    text-align: center;
    font-size: 14px;
    white-space: nowrap;
    border: 1px solid #fff;
    border-radius: 16px;
    transition: all 0.3s;
}

@media screen and (max-width: 1870px) {
    .wrap .page-tab .con li {
        width: 58px;
    }
}

@media screen and (max-width: 1654px) {
    .wrap .page-tab .con li {
        width: 50px !important;
    }
}
/* 
@media screen and (max-width: 1438px) {
    .wrap .page-tab .con li {
        width: 50px;
    }
} */

.page-tab .con li .round {
    position: relative;
    width: 36px;
    height: 36px;
    background: #ff5c7c;
    border-radius: 36px;
    line-height: 36px;
    text-align: center;
    margin: 0 auto 4px;
}

.page-tab .con li .bilifont {
    color: #fff;
    font-size: 28px;
}

.page-tab .con li .round.yel {
    background: #fcba2a;
}

.page-tab .con li .round.orange {
    background: #ff716d;
}

.page-tab .con li .round.channel {
    background: #6dc781;
}

.page-tab .con li .round .dynamic-update,
.page-tab .con li .round .dynamic-update img {
    position: absolute;
    width: 36px;
    height: 36px;
    left: 0;
    top: 0;
}

.page-tab .con li .round .dynamic-update img {
    border-radius: 50%;
}

.page-tab .con li .round .dynamic-update i {
    position: absolute;
    right: -2px;
    top: -2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fa5a57;
    border: 2px solid #fff;
}

.tab-line {
    display: inline-block;
    height: 46px;
    border-left: 1px solid #e7e7e7;
    margin: 0 20px;
}

@media screen and (max-width: 1654px) {
    .wrap .tab-line {
        margin: 0 8px;
    }
}

/* 中央导航区 */
.channel-menu {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 5rem;
    height: 68px;
    flex: 1;
}

.channel-menu .item {
    cursor: pointer;
    display: flex;
    height: 34px;
}

.channel-menu .item .name {
    font-size: 14px;
    display: flex;
    align-items: center;
    white-space: nowrap;
}

.channel-menu .item .name:hover {
    color: #00a1d6;
}

.channel-menu .item .name em {
    font-style: normal;
    font-size: 12px;
    display: inline-block;
    background: #73c9e5;
    border-radius: 2px;
    color: #fff;
    margin-left: 1px;
    transform: scale(0.85);
    width: 32px;
    text-align: center;
}

.channel-menu .item .bili-icon_caozuo_xiangyou-copy {
    margin-left: 5px;
    transition: all 0.3s;
}

.tab-line.none {
    margin: 0 24px 0 0;
}

@media screen and (max-width: 1654px) {
    .wrap .tab-line.none {
        margin: 0 12px 0 0;
    }
}

/* 头部右侧导航区 */
.friendship-link {
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 68px;
    width: 289px;
}

@media screen and (max-width: 1870px) {
    .wrap .friendship-link {
        width: 242px;
    }
}

@media screen and (max-width: 1654px) {
    .wrap .friendship-link {
        width: 220px;
    }
}

.friendship-link .item {
    height: 34px;
    display: flex;
}

.friendship-link .item .name {
    font-size: 14px;
    display: flex;
    align-items: center;
    white-space: nowrap;
}

.friendship-link .svg-icon {
    width: 1.8em;
    height: 1.8em;
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
}

.friendship-link .item .name span {
    margin-left: 4px;
}
</style>