
import headerComponent from './vue/Header.vue'

import wxscanComponent from './vue/wxScan.vue'
import kdpayComponent from './vue/kdPay.vue'
import counterComponent from './vue/counter.vue'
import infoScrollComponent from './vue/infoScroll.vue'
import starComponent from './vue/star.vue'
import getKldComponent from './vue/getKld.vue'

const Header = {
	install: function(Vue) {
		Vue.component('kdHeader', headerComponent)
	}
}
const wxScan = {
	install: function(Vue) {
		Vue.component('wxScan', wxscanComponent)
	}
}
const kdPay = {
	install: function(Vue) {
		Vue.component('kdPay', kdpayComponent)
	}
}
const Counter = {
	install: function(Vue) {
		Vue.component('counter', counterComponent)
	}
}
const infoScroll = {
  install: function(Vue) {
    Vue.component('infoScroll', infoScrollComponent)
  }
}
const star = {
  install: function(Vue) {
    Vue.component('star', starComponent)
  }
}
const getKld = {
  install: function(Vue) {
    Vue.component('getKld', getKldComponent)
  }
}
const KD = {
	Header : Header,
	wxScan : wxScan,
	kdPay : kdPay,
	Counter : Counter,
  	informList : infoScroll,
  	star:star,
  getKld:getKld,
}

export default KD
