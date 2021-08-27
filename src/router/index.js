import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Home from '@/page/Home'
import Login from '@/page/Login'

export default new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: Login
        }
    ]
})