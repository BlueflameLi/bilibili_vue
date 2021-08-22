import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Home from '../components/Home'
import Login from '../components/Login'

export default new VueRouter({
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