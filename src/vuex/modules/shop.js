
/*
商店相关模块
 */
import Vue from 'vue'

import {
  reqGoods,
  reqInfo,
  reqRatings
} from '@/api';

import {
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  ADD_FOOD_COUND,
  REDUCE_FOOD_COUND,
  CLEAR_CART
} from '../mutations_types';


export default {
  state: {
    goods: [],
    info: {},
    ratings: [],
    cartFoods: []
  },

  mutations: {
    [RECEIVE_GOODS](state, { goods }) {
      state.goods = goods;
    },

    [RECEIVE_INFO](state, { info }) {
      state.info = info;
    },

    [RECEIVE_RATINGS](state, { ratings }) {
      state.ratings = ratings;
    },

    //添加数量
    [ADD_FOOD_COUND](state, { food }) {
      if (food.cound) {
        food.cound++
      } else {
        //如果food没有cound属性 则添加cound属性 并设置属性值为1
        Vue.set(food, 'cound', 1);

        state.cartFoods.push(food);
      }
    },

    [REDUCE_FOOD_COUND](state, { food }) {
      if (food.cound > 0) {
        food.cound--
        if (food.cound === 0) {
          state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
        }
      }
    },

    [CLEAR_CART](state) {
      state.cartFoods.forEach(food => food.cound = 0);

      state.cartFoods = []
    }
  },

  actions: {
    //mock goods数据
    async getGoods({ commit }, callback) {
      const result = await reqGoods();
      if (result.code === 0) {
        const goods = result.data;
        commit(RECEIVE_GOODS, { goods });

        typeof callback === 'function' && callback();
      }
    },

    //mock info数据
    async getInfo({ commit }, callback) {
      const result = await reqInfo();
      if (result.code === 0) {
        const info = result.data;
        commit(RECEIVE_INFO, { info });

        typeof callback === 'function' && callback();
      }
    },

    //mock ratings数据
    async getRatings({ commit }, callback) {
      const result = await reqRatings();
      if (result.code === 0) {
        const ratings = result.data;
        commit(RECEIVE_RATINGS, { ratings });

        typeof callback === 'function' && callback();
      }
    },

    //更新food中的数量 同步action
    updateFoodCound({ commit }, { isAdd, food }) {
      if (isAdd) {
        commit(ADD_FOOD_COUND, { food });
      } else {
        commit(REDUCE_FOOD_COUND, { food })
      }
    }
  },

  getters: {
    totaleCound(state) {
      return state.cartFoods.reduce((pre, food) => pre + food.cound, 0)
    },

    totalePrice(state) {
      return state.cartFoods.reduce((pre, food) => pre + food.cound * food.price, 0)
    }
  }
}
