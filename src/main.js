import Vue from 'vue';
import Element from 'element-ui';
import mavonEditor from 'mavon-editor';
import App from './App.vue';
import router from './router';
import store from './store';

import './icons';

import './styles/index.scss';

import 'element-ui/lib/theme-chalk/index.css';
import './styles/element-variables.scss';
import 'mavon-editor/dist/css/index.css';


Vue.use(Element);
Vue.use(mavonEditor);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
