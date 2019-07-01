import Vue from 'vue'
import App from './App.vue'
// 引用VueX插件
import vuex from 'vuex'
Vue.use(vuex)
// 引用axios插件
import axios from 'axios'
Vue.prototype.$axios = axios
// 引入vuex状态管理
import store from '../src/stores/index.js'
// 引入路由文件
import router from '@/routers'
// CSS
import '@/assets/css/reset.css'
import '@/assets/css/common.css'
// 引入UI框架
import mini from 'mint-ui'
import 'mint-ui/lib/style.css'
// 定义整体的主题风格
import '@/assets/css/cs.css'
Vue.use(mini)
// 引入moment时间插件
import moment from 'moment'
Vue.prototype.$moment = moment;
moment.locale('zh-cn');
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

