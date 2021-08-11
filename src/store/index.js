import Vue from 'vue'
import Vuex from 'vuex'

import {
    getLocs
} from '@/api'

import {
    SET_LOCS
} from './mutation-types'

Vue.use(Vuex)

const state = {
    userInfo: {
        isLogin: false
    },
    locsData: {}
}

const getters = {
    storyBanner: state => {
        return {
            live: state.locsData['40'] ? state.locsData['40'][0] : {},
            anime: state.locsData['42'] ? state.locsData['42'][0] : {},
            manga: state.locsData['44'] ? state.locsData['44'][0] : {}
        }
    }
}

const actions = {
    getLocsData({
        commit
    }) {
        getLocs({
            pf: '0',
            ids: '29,31,34,40,42,44,1550,3449'
        }).then(
            response => {
                console.log(response.data)
                commit(SET_LOCS, response.data)
            })
    },
}

const mutations = {
    [SET_LOCS](state, locsData) {
        state.locsData = locsData
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    strict: process.env.NODE_ENV !== 'production',
})