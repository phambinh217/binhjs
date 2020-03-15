import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

require('@/assets/scss/bundle.scss')
require('bootstrap')

window.$ = window.jQuery = require('jquery')
window._ = require('lodash')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
