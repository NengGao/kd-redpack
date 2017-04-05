export default {
	setLocal : function(name,val){
		localStorage.setItem(name,val)
	},
	getLocal : function(name){
		localStorage.getItem(name)
	}
}
