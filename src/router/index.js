
import Vue from 'vue';
import VueRouter from 'vue-router';

import MSite from '@/pages/MSite/MSite.vue';
import Order from '@/pages/Order/Order.vue';
import Profile from '@/pages/Profile/Profile.vue';
import Search from '@/pages/Search/Search.vue';

//调用vuerouter插件
Vue.use(VueRouter);

export default new VueRouter({

    mode: 'history',

    routes: [
        {
            path: '/msite',
            component: MSite
        },

        {
            path: '/order',
            component: Order
        },

        {
            path: '/profile',
            component: Profile
        },

        {
            path: '/search',
            component: Search
        },

        {
            path: '/',
            redirect: '/msite'
        }
    ]
});
