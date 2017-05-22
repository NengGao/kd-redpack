// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import config from './config'
import store from './store'
import filter from './filter'
import FastClick from 'fastclick'
import KD from './components/KD'
import Mint from 'mint-ui'

import './assets/css/base.css'
import 'mint-ui/lib/style.css';


if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(Mint);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(KD.Header);
Vue.use(KD.wxScan);
Vue.use(KD.informList);
Vue.use(KD.star);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
