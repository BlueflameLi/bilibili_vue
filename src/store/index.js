import Vue from 'vue'
import Vuex from 'vuex'

import {
    getUserInfo,
    getLocs
} from '@/api'

import * as TYPE from './mutation-types'

Vue.use(Vuex)

const state = {
    userInfo: null,
    locsData: {},
    elevatorData: [{
            id: "live",
            name: "直播"
        },
        {
            id: "douga",
            name: "动画"
        },
        {
            id: "anime",
            name: "番剧"
        },
        {
            id: "guochuang",
            name: "国创"
        }, {
            id: "manga",
            name: "漫画"
        },
        {
            id: "music",
            name: "音乐"
        },
        {
            id: "dance",
            name: "舞蹈"
        },
        {
            id: 'game',
            name: "游戏"
        },
        {
            id: 'knowledge',
            name: "知识"
        },
        {
            id: 'cheese',
            name: "课堂"
        },
        {
            id: 'tech',
            name: "科技"
        },
        {
            id: 'car',
            name: "汽车"
        },
        {
            id: 'life',
            name: "生活"
        },
        {
            id: 'food',
            name: "美食"
        },
        {
            id: 'animal',
            name: "动物圈"
        },
        {
            id: 'kichiku',
            name: "鬼畜"
        },
        {
            id: 'fashion',
            name: "时尚"
        },
        {
            id: 'information',
            name: "资讯"
        },
        {
            id: 'ent',
            name: "娱乐"
        },
        {
            id: 'read',
            name: "专栏"
        },
        {
            id: 'movie',
            name: "电影"
        },
        {
            id: 'teleplay',
            name: "TV剧"
        },
        {
            id: 'cinephile',
            name: "影视"
        },
        {
            id: 'documentary',
            name: "纪录片"
        },
        {
            id: 'sports',
            name: "运动"
        }
    ],
    scrollTop: window.pageYOffset,
    viewHeight: window.innerHeight
}

const getters = {
    storyBanner: state => {
        return {
            live: state.locsData['40'] ? state.locsData['40'][0] : {},
            anime: state.locsData['42'] ? state.locsData['42'][0] : {},
            manga: state.locsData['44'] ? state.locsData['44'][0] : {}
        }
    },
}

const actions = {
    getLocsData({
        commit
    }) {
        getLocs({
            pf: '0',
            ids: '29,31,34,40,42,44,1550,3449,2836'
        }).then(
            response => {
                commit(TYPE.SET_LOCS, response.data)
            })
    },
    getScrollTop({
        commit
    }) {
        let scrollTop = window.pageYOffset
        commit(TYPE.SET_SCROLL_TOP, scrollTop)
    },
    getViewHeight({
        commit
    }) {
        let viewHeight = window.innerHeight
        commit(TYPE.SET_VIEW_HEIGHT, viewHeight)
    },
    setUserInfo({
        commit
    }) {
        return new Promise(resolve => {
            getUserInfo().then(
                response => {
                    commit(TYPE.SET_USER_INFO, response.data)
                    resolve()
                })

        })

    },
}

const mutations = {
    [TYPE.SET_LOCS](state, locsData) {
        state.locsData = locsData
    },
    [TYPE.SET_SCROLL_TOP](state, val) {
        state.scrollTop = val
    },
    [TYPE.SET_VIEW_HEIGHT](state, val) {
        state.viewHeight = val
    },
    [TYPE.SET_USER_INFO](state, val) {
        state.userInfo = val
    },
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    strict: process.env.NODE_ENV !== 'production',
})