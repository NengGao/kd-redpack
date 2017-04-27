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
	},
	getUrlParam : function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },
    clearActive : function (arr){
    	for(let i=0;i<arr.length;i++){
    		arr[i].active = false
    	}
    	return arr
    },
    getArrItem : function(arr,item){
    	for(let i = 0;i < arr.length;i++){
    		if(arr[i].active){
    			return arr[i][item]
    		}
    	}
    }
}
