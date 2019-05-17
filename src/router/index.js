import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Layout from '@/views/layout/Layout.vue';
import accountLayout from '@/views/layout/accountLayout.vue';
import store from '@/store';
import * as problem from '@/api/problem';
import { Message } from 'element-ui';

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
            title: '首页',
          },
          component: () => import('@/views/homepage/index.vue'),
        },
      ],
    },
    {
      path: '/problem',
      component: Layout,
      redirect: '/problem/index',
      children: [
        {
          path: '/problem/index',
          name: 'problem',
          meta: {
            title: '全部题目',
          },
          component: () => import('@/views/problem/index.vue'),
        },
        {
          path: '/problem/package',
          name: 'problemPackage',
          meta: {
            title: '全部题包',
          },
          component: () => import('@/views/package/index.vue'),
        },
        {
          path: '/problem/package/detail/:id',
          name: 'problemPackageDetail',
          meta: {
            title: '题包详情',
          },
          component: () => import('@/views/package/detail.vue'),
        },
        {
          path: '/problem/package/upload',
          name: 'problemPackageUpload',
          meta: {
            title: '上传题目',
          },
          component: () => import('@/views/package/upload.vue'),
        },
      ],
    },
    {
      path: '/problem/solve',
      component: accountLayout,
      children: [
        {
          path: '/problem/solve/detail/:id',
          name: 'problemDetail',
          meta: {
            auth: true,
            title: '题目详情',
          },
          component: () => import('@/views/problem/detail/index.vue'),
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
            auth: true,
            title: '公开竞赛',
          },
          component: () => import('@/views/match/index.vue'),
        },
        {
          path: '/match/detail/:id',
          name: 'MatchDetail',
          meta: {
            auth: true,
            title: '竞赛详情',
          },
          component: () => import('@/views/match/detail.vue'),
        },
        {
          path: '/match/problem/:id',
          name: 'MatchProblem',
          meta: {
            auth: true,
            title: '题目详情',
          },
          component: () => import('@/views/match/problem.vue'),
        },
      ],
    },
    {
      path: '/ladder',
      component: Layout,
      redirect: '/ladder/index',
      children: [
        {
          path: '/ladder/index',
          name: 'ladder',
          meta: {
            auth: true,
            title: '天梯竞技',
          },
          component: () => import('@/views/ladder/index.vue'),
        },
        {
          path: '/ladder/problem',
          name: 'ladderProblem',
          meta: {
            auth: true,
            title: '题目详情',
          },
          component: () => import('@/views/ladder/problem.vue'),
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
        {
          path: '/lesson/detail/:id',
          name: 'lessonDetail',
          meta: {
            title: '课程详情',
          },
          component: () => import('@/views/lesson/detail.vue'),
        },
      ],
    },
    {
      path: '/lesson/video/:id',
      name: 'Video',
      meta: {
        title: '在线学习',
      },
      component: () => import('@/views/lesson/video.vue'),
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
            auth: true,
            title: '个人档案',
          },
          component: () => import('@/views/user/infoDetail/index.vue'),
          children: [
            {
              path: '/user/info/basic',
              name: 'userBasicInfo',
              meta: {
                auth: true,
                title: '个人档案',
              },
              component: () => import('@/views/user/infoDetail/userInfo.vue'),
            },
            {
              path: '/user/info/wallet',
              name: 'wallet',
              meta: {
                auth: true,
                title: '钱包管理',
              },
              component: () => import('@/views/user/infoDetail/wallet.vue'),
            },
            {
              path: '/user/info/submitLog',
              name: 'submitLog',
              meta: {
                auth: true,
                title: '提交记录',
              },
              component: () => import('@/views/user/infoDetail/submitLog.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/questions',
      component: Layout,
      redirect: '/questions/index',
      children: [
        {
          path: '/questions/index',
          name: 'questions',
          meta: {
            title: '常见问题',
          },
          component: () => import('@/views/questions/index.vue'),
        },
      ],
    },
    {
      path: '/shopping',
      component: Layout,
      redirect: '/shopping/index',
      children: [
        {
          path: '/shopping/index/:id',
          name: 'Shopping',
          meta: {
            auth: true,
            title: '支付中心',
          },
          component: () => import('@/views/shopping/index.vue'),
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
          params: {
            history: '',
          },
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

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});

/**
 * 路由前置检查
 */
router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = `${to.meta.title}_信奥训练平台`;
  // 合法性校验
  if (to.meta.auth && !store.getters.isLogin) {
    next({ name: 'login', params: { history: to.path } });
  }

  if (to.name === 'login' && !to.params.history) {
    to.params.history = from.path;
    next();
  }

  if (to.name === 'problemDetail') {
    problem.isHaveToBuy(to.params.id)
      .then((result) => {
        console.log(result);
        if (result.data.isBuy === 1) {
          next();
        } else {
          next({ name: 'problemPackageDetail', params: { id: result.packetId } });
          Message({
            message: '请先购买题包！',
            type: 'warning',
            duration: 5 * 1000,
          });
        }
      });
  }
  next();
});
router.afterEach(() => {
  // 在即将进入新的页面组件前操作
  NProgress.done();
});

export default router;
