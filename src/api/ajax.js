
/*
对axios2次进行封装为一个能够发送ajax请求的函数
*/

import axios from 'axios';
import qs from 'qs';
import { Indicator, Toast } from 'mint-ui';
import store from '@/vuex/store.js';
import router from '@/router/index.js';

const instence = axios.create({
  // baseURL: 'http://localhost:4000', //出现跨域请求问题
  baseURL: '/api',
  timeout: 20000
})

//请求拦截器request
instence.interceptors.request.use((config) => {
  Indicator.open();

  //3.对请求体参数经行urlencode处理，而不是默认的json方式(后台接口不支持)
  const data = config.data;
  if (data instanceof Object) {
    config.data = qs.stringify(data);
  }

  const token = store.state.user.token;

  if (token) {
    config.headers['Authorization'] = token;
  }else {
    //当前接口需要token 但是又没有token 不发送请求 进入错误流程
    const needCheck = config.headers.needCheck;
    if (needCheck) {
      throw new Error('没有登录，不能发请求');
    }
  }

  return config
})

//相应拦截器response
instence.interceptors.response.use(
  response => {
    Indicator.close();

    // return response
    //2.异步请求成功的数据不是response而是response.data
    return response.data;
  },

  error => {
    Indicator.close();

    const response = error.response;
    if (!response) {
      router.replace('/login');
      Toast(error.message);
    }else {
      if (error.response.status === 401) {
        const path = router.currentRroute.path;
        if (path !== '/login') {
          router.dispatch('/login');
          Toast('登录过期');
        }

      }else {
        // return Promise.reject(error);
        //1.统一处理请求异常
        alert('请求出错' + error.message)
      }
    }

    
    return new Promise(() => {});
  }

)

export default instence
