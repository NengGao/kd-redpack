// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import config from './config'
import store from './store'
import filter from './filter'
import KD from './components/KD'



import './assets/css/base.css'

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(KD.Loader);
Vue.use(KD.Header);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
