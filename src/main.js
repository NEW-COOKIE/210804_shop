import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible';

import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import CartControle from './components/CartControle/CartControle.vue';
import { Button } from 'mint-ui'

import router from './router/index.js'
import store from './vuex/store.js'
import VueLazyload from 'vue-lazyload'
import loading from '@/common/images/1.gif'
import *as API from './api/index.js'

import '@/mock/mock-server.js'
import './validate.js'
import i18n from './i18n'
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading
})

Vue.prototype.$API = API

Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControle', CartControle)
Vue.component(Button.name, Button)

new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')
