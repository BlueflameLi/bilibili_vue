<template>
    <div class="international-header" :class="{ 'fixed-top': navFixed }">
        <div
            class="mini-header"
            :class="{
                'mini-type': 0 === navType || navFixed,
                'mask-bg': !navFixed && 2 === navType
            }"
        >
            <div class="mini-header-content">
                <NavLink :navType="navType"></NavLink>
                <NavSearch v-if="userInfo"></NavSearch>
                <NavUserCenter v-if="userInfo"></NavUserCenter>
            </div>
        </div>
        <Banner v-if="1 === navType"></Banner>
        <div v-if="1 === navType" class="wrap">
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
                                <span>{{ item.name }}<em>{{ regionCount.length ? regionCount[index] : '-' }}</em></span>
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
import Banner from './Banner/Banner'
import { getOnline } from '@/api'
import { mapState } from 'vuex'
import NavLink from './NavLink/NavLink'
import NavSearch from './NavSearch/NavSearch'
import NavUserCenter from './NavUserCenter/NavUserCenter'

export default {
    name: 'TheHeader',
    components: {
        Banner,
        NavUserCenter,
        NavLink,
        NavSearch,
    },
    props: {
        navType: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            primaryPageTab: [
                {
                    name: '首页',
                    url: '/',
                    color: '',
                    icon: 'bilifont bili-icon_fenqudaohang_shouye',
                },
                {
                    name: '动态',
                    url: '/',
                    color: 'yel',
                    icon: 'bilifont bili-icon_dingdao_dongtai',
                },
                {
                    name: '热门',
                    url: '/',
                    color: 'orange',
                    icon: 'bilifont bili-remen',
                },
                {
                    name: '频道',
                    url: '/',
                    color: 'channel',
                    icon: 'bilifont bili-pindao',
                },
            ],
            primaryChannelMenu: [
                {
                    name: '动画',
                    url: '/',
                },
                {
                    name: '番剧',
                    url: '/',
                },
                {
                    name: '音乐',
                    url: '/',
                },
                {
                    name: '国创',
                    url: '/',
                },
                {
                    name: '舞蹈',
                    url: '/',
                },
                {
                    name: '游戏',
                    url: '/',
                },
                {
                    name: '知识',
                    url: '/',
                },
                {
                    name: '科技',
                    url: '/',
                },
                {
                    name: '生活',
                    url: '/',
                },
                {
                    name: '鬼畜',
                    url: '/',
                },
                {
                    name: '时尚',
                    url: '/',
                },
                {
                    name: '资讯',
                    url: '/',
                },
                {
                    name: '娱乐',
                    url: '/',
                },
                {
                    name: '影视',
                    url: '/',
                },
                {
                    name: '放映厅',
                    url: '/',
                },
            ],
            primaryFriendshipLink: [
                {
                    name: '专栏',
                    url: '/',
                    svg: '#bili-read',
                },
                {
                    name: '直播',
                    url: '/',
                    svg: '#bili-live',
                },
                {
                    name: '活动',
                    url: '/',
                    svg: '#bili-activit',
                },
                {
                    name: '课堂',
                    url: '/',
                    svg: '#bili-zhishi',
                },
                {
                    name: '小黑屋',
                    url: '/',
                    svg: '#bili-blackroom',
                },
                {
                    name: '新歌热榜',
                    url: '/',
                    svg: '#bili-musicplus',
                },
            ],
            regionCount: [],
            navFixed: false,
        }
    },
    computed: {
        ...mapState(['userInfo']),
    },
    methods: {
        setOnline() {
            getOnline().then((reponse) => {
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
                this.regionCount.push(
                    this.fromatOnline(
                        region_count['11'] +
                            region_count['23'] +
                            region_count['177']
                    )
                )
            })
        },
        fromatOnline(val) {
            if (val > 999) return '999+'
            else return val
        },
        handleBsource() {
            var that = this
            var e = document.scrollingElement || document.documentElement
            this.handleScroll = function () {
                if (!that.navFixed && e.scrollTop > 56) that.navFixed = true
                else if (that.navFixed && e.scrollTop <= 56)
                    that.navFixed = false
            }
            window.addEventListener('scroll', this.handleScroll)
        },
        onLoginUpdate() {},
    },
    watch: {
        'userInfo.isLogin'(value) {
            if (value || this.$router.currentRoute.path === '/login') {
                if (this.handleScroll)
                    window.removeEventListener('scroll', this.handleScroll)
                this.navFixed = false
            } else this.handleBsource()
        },
    },
    mounted() {
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

.international-header .mini-type .nav-link .nav-link-ul .nav-link-item .link,
.van-popover .mini-type .nav-link .nav-link-ul .nav-link-item .link {
    color: #212121;
    text-shadow: none;
}

.international-header.fixed-top .mini-header {
    position: fixed;
    top: 0;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}

.international-header.fixed-top .mini-header .bili-icon_dingdao_xiazaiapp,
.international-header.fixed-top .mini-header .bili-icon_dingdao_zhuzhan {
    color: #00a1d6;
}

.international-header.fixed-top
    .mini-type
    .nav-link
    .nav-link-ul
    .nav-link-item
    .link,
.international-header.fixed-top
    .mini-type
    .nav-user-center
    .user-con
    .item
    .name {
    color: #212121;
}

.mini-type .nav-user-center .user-con .item .name {
    color: #212121;
    text-shadow: none;
}

.international-header.fixed-top
    .nav-link
    .nav-link-ul.mini
    .bili-icon_dingdao_xiazaiapp {
    color: #00a1d6;
}

/* 滚动条偏移修正 */
.international-header.fixed-top .mini-header .nav-user-center {
    margin-right: 12px;
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

/* 弹出框 */
.popover-channe,
.popover-game {
    padding: 0;
    border: none;
    background: transparent;
    box-shadow: none;
}

.popover-game {
    width: 680px;
    height: 260px;
}

.popover-live {
    width: 528px;
}

.popover-live,
.popover-manga {
    padding: 0;
    height: 266px;
    border: none;
    background: transparent;
    box-shadow: none;
}

.popover-manga {
    width: 720px;
}

.popover-app-download {
    padding: 0;
    width: 280px;
    height: 212px;
    border: none;
    box-shadow: none;
    background: url(//s1.hdslb.com/bfs/static/jinkela/international-home/assets/app-download.png);
    background-size: cover;
    background-position-y: -3px;
    display: flex;
    align-items: flex-end;
}

.popover-app-download .txt {
    font-size: 14px;
    color: #212121;
    width: 100%;
    text-align: center;
    padding-bottom: 24px;
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