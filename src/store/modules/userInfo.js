import * as token from '@/utils/auth';
import * as users from '@/api/users';

const login = {
  state: {
    isLogin: !!token.getToken(),
  },
  mutations: {
    SET_ISLOGIN(state, isLogin) {
      state.isLogin = isLogin;
    },
  },
  actions: {
    login({ commit }, data) {
      console.log('login');
      return new Promise((resolve) => {
        users.login(data.email, data.password)
          .then((res) => {
            switch (res.data.code) {
              case '0':
                token.removeToken();
                commit('SET_ISLOGIN', false);
                resolve('0');
                break;
              case '1':
                token.setToken(res.data.token);
                commit('SET_ISLOGIN', true);
                resolve('1');
                break;
              default:
                break;
            }
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('SET_ISLOGIN', false);
        token.removeToken();
        resolve();
      });
    },
  },
};

export default login;
