import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/views/layout/Layout.vue';
import accountLayout from '@/views/layout/account-Layout.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
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
      path: '/match',
      component: Layout,
      redirect: '/match/index',
      children: [
        {
          path: '/match/index',
          name: 'match',
          meta: {
            title: '竞赛',
          },
          component: () => import('@/views/match/index.vue'),
        },
      ],
    },
    {
      path: '/rank',
      component: Layout,
      redirect: '/rank/index',
      children: [
        {
          path: '/rank/index',
          name: 'rank',
          meta: {
            title: '排行榜',
          },
          component: () => import('@/views/rank/index.vue'),
        },
      ],
    },
    {
      path: '/lesson',
      component: Layout,
      redirect: '/lesson/index',
      children: [
        {
          path: '/lesson/index',
          name: 'lesson',
          meta: {
            title: '在线课程',
          },
          component: () => import('@/views/lesson/index.vue'),
        },
      ],
    },
    {
      path: '/user',
      component: Layout,
      redirect: '/user/index',
      children: [
        {
          path: '/user/index',
          name: 'userIndex',
          meta: {
            auth: true,
            title: '个人主页',
          },
          component: () => import('@/views/user/index.vue'),
        },
        {
          path: '/user/info',
          name: 'userInfo',
          redirect: '/user/info/basic',
          meta: {
            title: '个人档案',
          },
          component: () => import('@/views/user/user-info.vue'),
          children: [
            {
              path: '/user/info/basic',
              name: 'userBasicInfo',
              meta: {
                title: '个人档案',
              },
              component: () => import('@/views/user/user-info-basic.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/problems',
      component: Layout,
      redirect: '/problems/index',
      children: [
        {
          path: '/problems/index',
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
          path: '/account/login',
          name: 'login',
          meta: {
            title: '登录',
          },
          component: () => import('@/views/account/login.vue'),
        },
        {
          path: '/account/register',
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
