export default {
	setLocal : function(name,val){
		localStorage.setItem(name,val)
	},
	getLocal : function(name){
	   return localStorage.getItem(name)
	},
	setJsonLocal　:　function(name,json){
		localStorage.setItem(name,JSON.stringify(json))
	},
	getJsonLocal : function(name){
		return JSON.parse(localStorage.getItem(name))
	}
}
