
/*
首页相关模块
 */
import {
  reqAddress,
  reqCategorys,
  reqShops
} from '@/api';

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS
} from '../mutations_types';

export default {
  state: {
    latitude: 22.67513,
    longitude: 114.00447,
    address: {},
    categorys: [],
    shops: [],
  },

  mutations: {
    [RECEIVE_ADDRESS](state, address) {
      state.address = address
    },

    [RECEIVE_CATEGORY](state, categorys) {
      state.categorys = categorys
    },

    [RECEIVE_SHOPS](state, shops) {
      state.shops = shops
    },
  },

  actions: {
    //获取详细地理位置
    async getAddress({ commit, state }) {
      const { longitude, latitude } = state;

      const result = await reqAddress(longitude, latitude);
      if (result.code === 0) {
        const address = result.data;
        commit(RECEIVE_ADDRESS, address);
      }

    },

    //获取导航分类
    async getcategory({ commit }, callback) {
      const result = await reqCategorys();
      if (result.code === 0) {
        const categorys = result.data;
        commit(RECEIVE_CATEGORY, categorys);
      }

      typeof callback === 'function' && callback();

    },

    //获取商品列表
    async getshops({ commit, state }) {
      const { longitude, latitude } = state;

      const result = await reqShops({ longitude, latitude });
      if (result.code === 0) {
        const shops = result.data;
        commit(RECEIVE_SHOPS, shops);
      }

    },
  },

  getters: {

  }
}
