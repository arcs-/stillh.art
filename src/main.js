import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import checkView from 'vue-check-view'
Vue.use(checkView)

import Go from '@/components/utils/Go'
Vue.component('go', Go)

import { isDay } from "@/assets/js/sun"

new Vue({
	data() {
		return {
			darkmode: !isDay(47.039776, 8.310458)
		}
	},
	router,
	render: function (h) { return h(App) }
}).$mount('#app')
