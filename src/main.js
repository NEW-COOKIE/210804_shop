import Vue from 'vue'
import App from './App.vue'

import router from './router/index.js';

import "lib-flexible";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),

  router
}).$mount('#app')
