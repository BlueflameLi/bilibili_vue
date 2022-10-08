import axios from '@/utils/request'

const api = {
    UserInfo: 'bili/x/web-interface/nav',
    Rcmd: 'bili/x/web-interface/index/top/feed/rcmd',
    QRCode: {
        Url: 'passport/qrcode/getLoginUrl',
        Info: 'passport/qrcode/getLoginInfo'
    },
    Locs: 'bili/x/web-show/res/locs',
    Loc: 'bili/x/web-show/res/loc',
    Suggest: 'search/suggest',
    SearchDefault: 'bili/x/web-interface/search/default',
    Live: 'live/xlive/web-interface/v1/webMain/getList?platform=web',
    LiveMore: 'live/xlive/web-interface/v1/webMain/getMoreRecList?platform=web',
    LiveWatching: 'live/relation/v1/feed/feed_list',
    RegionDynamic: 'bili/x/web-interface/dynamic/region',
    RegionRanking: 'bili/x/web-interface/ranking/region',
    TimeLine: 'bili/pgc/web/timeline/v2',
    pgcRanking: 'bili/pgc/web/rank/list',
    SlideShow: 'bili/pgc/operation/api/slideshow',
    Online: 'bili/x/web-interface/online',
    RcmdComics: 'self/twirp/comic.v1.Comic/GetRecommendComics',
    HomeHotComics: 'self/twirp/comic.v1.Comic/HomeHot',
    HomeFansComics: 'self/twirp/comic.v1.Comic/HomeFans',
    SpecialRcmd: 'self/sprcmd',
    Banner: 'bili/x/web-show/page/header',
    UserStatCnt: 'bili/x/web-interface/nav/stat',
    Logout: 'passport/login/exit/v2',
    FramePreview: 'bili/x/player/videoshot',
    Danmu: 'bili/x/v2/dm/ajax'
}

//登录个人信息
export function getUserInfo() {
    return axios.get(api.UserInfo)
}

//换一换首页推荐视频
export function getRcmd() {
    return axios.get(api.Rcmd)
}

//获取登录二维码
export function getQRCode() {
    return axios.get(api.QRCode.Url)
}

//检验二维码登录信息
export function checkQRCode(data) {
    return axios.post(api.QRCode.Info, data)
}

//获取本地数据(如推广，电竞赛事)
export function getLocs(params) {
    return axios.get(api.Locs, {
        params
    })
}

//获取单个本地数据(轮播图)
export function getLoc(params) {
    return axios.get(api.Loc, {
        params
    })
}

//搜索建议
export function getSuggest(term) {
    return axios.get('search/suggest', {
        params: {
            term,
            highlight: ''
        }
    })
}

//搜索框默认词
export function getSearchDefault() {
    return axios.get(api.SearchDefault)
}

//正在直播
export function getLive() {
    return axios.get(api.Live)
}

export function getLiveMore() {
    return axios.get(api.LiveMore)
}

//关注的主播
export function getLiveWatching(params) {
    return axios.get(api.LiveWatching, {
        params
    })
}

// 获取分区最新视频
export function getRegionDynamic(params) {
    return axios.get(api.RegionDynamic, {
        params
    })
}

// 获取分区最新排行
export function getRegionRanking(params) {
    return axios.get(api.RegionRanking, {
        params
    })
}

// 获取番剧(国创)时间表
export function getTimeLine(params) {
    return axios.get(api.TimeLine, {
        params
    })
}

// 获取番剧（国创）排行
export function getPgcRanking(params) {
    return axios.get(api.pgcRanking, {
        params
    })
}

// 获取推荐图片
export function getSlideShow(params) {
    return axios.get(api.SlideShow, {
        params
    })
}

// 获取各分区投稿人数
export function getOnline() {
    return axios.get(api.Online)
}
/*      分区表
rid     分区名         备注
1       动画
3       音乐
4       游戏
5       娱乐
11      电视剧         放映厅
13      番剧
17      单机游戏       游戏/更多
23      电影           放映厅
36      知识
75      动物综合       动物圈
76      美食制作       美食
119     鬼畜
129     舞蹈
138     搞笑           生活/更多
155     时尚
160     生活
165     广告           已撤除
167     国创
177     纪录片         放映厅
181     影视
188     科技
202     资讯
211     美食           更多
217     动物圈         更多
223     汽车           更多
234     运动           更多
*/

// 获取推荐漫画
export function getRcmdComics(data) {
    return axios.post(api.RcmdComics, data)
}

/* 获取漫画排行
    api        type      榜单
    HomeHot     1       免费榜
    HomeHot     2       飙升榜
    HomeFans    1       月票榜
    HomeFans    0       应援榜/投喂榜
*/
export function getHomeHotComics(type) {
    return axios.post(api.HomeHotComics, {
        type
    })
}

export function getHomeFansComics(type) {
    return axios.post(api.HomeFansComics, {
        type
    })
}

// 底部特别推荐
export function getSpecialRcmd() {
    return axios.get(api.SpecialRcmd)
}

// 顶部横幅和logo
export function getBanner(resource_id) {
    return axios.get(api.Banner, {
        params: {
            resource_id
        }
    })
}

// 获取用户状态数（关注数，粉丝数，动态数）
export function getUserStatCnt() {
    return axios.get(api.UserStatCnt)
}

// 退出登录
export function Logout(biliCSRF) {
    return axios.post(api.Logout, {
        biliCSRF
    })
}

// 获取视频预览帧
export function getFramePreview(aid) {
    return axios.get(api.FramePreview, {
        params: {
            aid,
            index: 1
        }
    })
}

// 获取预览弹幕
export function getDanmu(aid) {
    return axios.get(api.Danmu, {
        params: {
            aid
        }
    })
}