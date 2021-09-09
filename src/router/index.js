
import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes.js';

//调用vuerouter插件
Vue.use(VueRouter);

export default new VueRouter({

    mode: 'history',

    routes
});
