import Vue from 'vue'

Vue.filter('KLD_f', function(value){
	if(!value) return '0.0';
	return parseFloat(value).toFixed(1);
});
Vue.filter('RMB_f', function(value){
	if(!value) return '0.00';
	return parseFloat(value).toFixed(2);
});
Vue.filter('toInt', function(value){
	if(!value) return '0';
	return parseInt(value);
});
Vue.filter('grades_f', function(value){
	if(!value) return '0';
	if(value > 0){
		return '+' + value;
	}else{
		return  value;
	}
});
