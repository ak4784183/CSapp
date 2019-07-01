import Vue from 'vue';
import App from './App.vue';
import router from './router';

// axios插件
import axios from 'axios';
Vue.prototype.$axios = axios;
// 引入vuex状态管理
import vuex from 'vuex'
Vue.use(vuex)
import store from '../src/stores/index.js';
// 引入时间插件
import moment from 'moment'
Vue.prototype.$moment = moment;
moment.locale('zh-cn');
// 重置样式
import '@/assets/css/reset.css';

// 引入elementUI框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
