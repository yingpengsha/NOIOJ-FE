import * as token from '@/utils/auth';
import * as users from '@/api/users';

const login = {
  state: {
    isLogin: !!token.getToken(),
    avator: null,
  },
  mutations: {
    SET_ISLOGIN(state, isLogin) {
      state.isLogin = isLogin;
    },
    SET_AVATOR(state, avator) {
      state.avator = avator;
    },
  },
  actions: {
    login({ dispatch, commit }, data) {
      return new Promise((resolve) => {
        users.login(data.email, data.password)
          .then((res) => {
            switch (res.code) {
              case '0':
                token.removeToken();
                commit('SET_ISLOGIN', false);
                resolve('0');
                break;
              case '1':
                token.setToken(res.token);
                commit('SET_ISLOGIN', true);
                dispatch('getAvator');
                resolve('1');
                break;
              default:
                break;
            }
          });
      });
    },
    getAvator({ commit }) {
      users.userAvator()
        .then((result) => {
          switch (result.code) {
            case '1':
              commit('SET_AVATOR', result.url);
              break;
            default:
              break;
          }
        });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('SET_ISLOGIN', false);
        commit('SET_AVATOR', null);
        token.removeToken();
        resolve();
      });
    },
  },
};

export default login;
