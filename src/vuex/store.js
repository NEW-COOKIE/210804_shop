
import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

import msite from './modules/msite.js';
import user from './modules/user.js';
import shop from './modules/shop.js';
Vue.use(Vuex);

export default new Vuex.Store({
  mutations,
  actions,
  getters,
  modules: {
    msite,
    user,
    shop
  }
});
