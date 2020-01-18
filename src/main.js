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

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
