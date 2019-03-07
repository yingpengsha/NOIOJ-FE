import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/views/layout/Layout.vue';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   meta: {
    //     title: 'home',
    //     auth: false, // 是否需要登录
    //     keepAlive: false,
    //   },
    //   component: () => import('@/views/Home.vue'),
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('@/views/About.vue'),
    // },
    {
      path: '',
      component: Layout,
      redirect: '/',
      children: [
        {
          path: '/',
          name: 'index',
          component: () => import('@/views/welcome/index.vue'),
        },
      ],
    },
  ],
});

/**
 * 路由前置检查
 */
router.beforeEach((to, from, next) => {
  // 合法性校验
  if (to.meta.auth) {
    console.log('into auth');
    next();
  }
  next();
});
router.afterEach(() => {
  // 在即将进入新的页面组件前操作
});

export default router;
