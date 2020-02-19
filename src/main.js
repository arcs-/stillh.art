import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


import checkView from 'vue-check-view'
Vue.use(checkView)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

import Go from '@/components/utils/Go'
Vue.component('go', Go)

function isItDark() {

	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return true

	const hours = new Date().getHours()
	if( hours <= 6 || hours >= 18) return true

	return false
}

new Vue({
	data() {
		return {
			darkmode: isItDark()
		}
	},
	router,
	render: function (h) { return h(App) }
}).$mount('#app')
