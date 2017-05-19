
import headerComponent from './vue/Header.vue'

import wxscanComponent from './vue/wxScan.vue'

import infoScrollComponent from './vue/infoScroll.vue'

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
const infoScroll = {
  install: function(Vue) {
    Vue.component('infoScroll', infoScrollComponent)
  }
}
const KD = {
	Header : Header,
	wxScan : wxScan,
  informList : infoScroll,
}

export default KD
