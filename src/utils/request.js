/* eslint-disable arrow-body-style */

import axios from 'axios';
import router from 'vue-router';
import store from '@/store';
import { Message } from 'element-ui';
import { getToken, removeToken } from '@/utils/auth';

export const API_ROOT = 'http://192.168.10.103:8080';

// 创建一个 axios 实例
const service = axios.create({
  baseURL: API_ROOT,
  timeout: 5000, // 请求超时设置
});

// 封装请求拦截
service.interceptors.request.use(
  (config) => {
    if (getToken()) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken();
    }
    return config;
  },
  error => Promise.reject(error),
);

// 封装响应拦截，判断token是否过期
service.interceptors.response.use(
  (response) => {
    // 正常返回请求
    // 如果需要请求成功后的判断也可以放到此处
    // 如伟哥的写法，1是成功，0是失败，则可以直接在此处判断
    return response.data;
  },
  (error) => {
    console.error(error.response);
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录/token过期
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          console.error('401:未登录或Token过期');
          removeToken();
          // FIXME:修改 vuex 内的登录状态，请自行修改
          store.commit('SET_ISLOGIN', false);
          setTimeout(() => {
            router.replace({
              name: 'login',
              query: {
                redirect: router.currentRoute.fullPath,
              },
            });
          }, 1000);
          break;

          // 404请求不存在
        case 404:
          console.error('404:请求不存在');
          break;

          // 其他错误，直接抛出错误提示
        default:
          console.error(error.response.data.message);
      }
    }
    return Promise.reject(error.response);
  },
);
export default service;
