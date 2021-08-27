import Vue from 'vue'
import VueCookies from 'vue-cookies'
import axios from './utils/request'
import * as format from '@/utils/format'
import store from './store'
import router from './router'
import App from './App.vue'

import './assets/font/bilifont/bilifont.css'
import './assets/font/bilifooterfont/bilifooterfont.css'
import clickoutside from 'element-ui/src/utils/clickoutside'
import SvgIcon from './components/SvgIcon.vue'
import VueLazyload from 'vue-lazyload'
import {
    Popover
} from 'element-ui'

import Video from './plugins/Video'

Vue.prototype.$axios = axios
Vue.prototype.$format = format
Vue.use(Popover)
Vue.use(VueCookies)
Vue.use(Video)
Vue.use(VueLazyload, {
    preLoad: 1.0,
    attempt: 1,
    lazyComponent: true
})
Vue.directive("clickoutside", clickoutside);
Vue.component('SvgIcon', SvgIcon)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')