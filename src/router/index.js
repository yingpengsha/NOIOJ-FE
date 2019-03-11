import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/views/layout/Layout.vue';
import accountLayout from '@/views/layout/account-Layout.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
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
      redirect: '/homepage',
      children: [
        {
          path: '/homepage',
          name: 'homepage',
          meta: {
            title: '信奥训练平台',
          },
          component: () => import('@/views/homepage/index.vue'),
        },
      ],
    },
    {
      path: '/user',
      component: Layout,
      redirect: '/user/index',
      children: [
        {
          path: '/index',
          name: 'userIndex',
          meta: {
            title: '个人主页',
          },
          component: () => import('@/views/user/index.vue'),
        },
      ],
    },
    {
      path: '/problems',
      component: Layout,
      redirect: '/problems/index',
      children: [
        {
          path: 'index',
          name: 'problems',
          meta: {
            title: '常见问题',
          },
          component: () => import('@/views/problems/index.vue'),
        },
      ],
    },
    {
      path: '/account',
      component: accountLayout,
      redirect: '/account/login',
      children: [
        {
          path: 'login',
          name: 'login',
          meta: {
            title: '登录',
          },
          component: () => import('@/views/account/login.vue'),
        },
        {
          path: 'register',
          name: 'register',
          meta: {
            title: '注册',
          },
          component: () => import('@/views/account/register.vue'),
        },
      ],
    },
  ],
});

/**
 * 路由前置检查
 */
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
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
