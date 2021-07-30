import Vue from 'vue'
import App from './App.vue'

import './assets/font/bilifont/bilifont.css'
import clickoutside from 'element-ui/src/utils/clickoutside'
import SvgIcon from './components/SvgIcon.vue'

import {
    Swipe,
    SwipeItem,
    Lazyload
} from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.directive("clickoutside", clickoutside);
Vue.component('SvgIcon', SvgIcon)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')