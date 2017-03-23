import loaderComponent from './Loader.vue'

const Loader = {
	install: function(Vue) {
		Vue.component('Loader', loaderComponent)
	}
};

export default Loader