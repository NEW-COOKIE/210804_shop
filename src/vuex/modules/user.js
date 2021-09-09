
/*
用户相关模块
 */
import {
  reqAutoLogin
} from '@/api';

import {
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN,
  RESET_USER
} from '../mutations_types';


export default {
  state: {
    user: {},
    token: localStorage.getItem('token_key') || '',
  },

  mutations: {
    [RECEIVE_USER](state, user) {
      state.user = user
    },

    [RECEIVE_TOKEN](state, token) {
      state.token = token
    },

    [RESET_USER](state) {
      state.user = {}
    },

    [RESET_TOKEN](state) {
      state.token = ''
    },
  },

  actions: {
    //获取用户信息
    saveUser({ commit }, user) {
      //获取user数据中的token
      const token = user.token;

      //将token存储到local中
      localStorage.setItem('token_key', token);

      //删除user数据中的token
      delete user.token;

      //将user存储到state中
      commit(RECEIVE_USER, user);
      //将token存储到state中
      commit(RECEIVE_TOKEN, token);
    },

    //自动登录
    async autoLogin({ commit, state }) {
      if (state.token && !state.user._id) {

        //发送登录请求
        const result = await reqAutoLogin();

        if (result.code === 0) {
          const user = result.data;
          commit(RECEIVE_USER, user);
        }
      }
    },

    //推出登录
    logout({ commit }) {
      localStorage.removeItem('token_key');
      commit(RESET_USER);
      commit(RESET_TOKEN);
    },
  },

  getters: {

  }
}
