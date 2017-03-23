import loaderComponent from './vue/Loader.vue'
import headerComponent from './vue/Header.vue'

/*import '@/assets/sass/components/Header.scss'*/

const Loader = {
	install: function(Vue) {
		Vue.component('Loader', loaderComponent)
	}
}
const Header = {
	install: function(Vue) {
		Vue.component('kdHeader', headerComponent)
	}
}

const KD = {
	Loader : Loader,
	Header : Header
}

export default KD