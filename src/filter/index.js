import Vue from 'vue'

Vue.filter('KLD_f', function(value){
	if(!value) return '0.0';
	return parseFloat(value).toFixed(1);
});
Vue.filter('RMB_f', function(value){
	if(!value) return '0.00';
	return parseFloat(value).toFixed(2);
});