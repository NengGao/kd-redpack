import axios from 'axios'
import config from '@/config';

export function fetch(url, type, params) {
	
    return new Promise((resolve, reject) => {
    	if(type == 'get' || type == 'GET'){
	    	axios.get(url)
	    	.then(response => {
	            resolve(response.data);
	        }).catch((error) => {
	            console.log(error)
	            reject(error)
	        })	
    	}else{
    		var param = '';
    		for(var key in params){
				param += '&' + key + '=' + params[key]
			}
			param = param.replace('&',''); 
    		axios.post(url, param, {
				headers: {
				    'Content-Type': 'application/x-www-form-urlencoded',
				}
			})
    		.then(response => {
	            resolve(response.data);
	        }).catch((error) => {
	            console.log(error)
	            reject(error)
	        })	
    	}
    })
}

export default {
  // 获取我的页面的后台数据
  login(cb) {
  	fetch(config.ip.user + '/login?openId=' + config.start.testOpenId + '&loginType=2','get').then(function(data){
  		cb(data)
  	})
  },
  oldLogin(cb){
  	fetch(config.ip.portal + '/redpackUser/login','post',{
  		openid : config.start.testOpenId,
  		loginType:2
  	}).then(function(data){
  		cb(data)
  	})
  },
  redpackInfo(cb) {
  	fetch(config.ip.portal + '/redpackInfo/getRedpackInfo','post',{
  		roomId : 2
  	}).then(function(data){
  		cb(data)
  	})
  },
  getAuctionInfo(cb) {
  	fetch(config.ip.portal + '/cashRedpackInfo/getAuctionInfo','post')
  	.then(function(data){
  		cb(data)
  	})
  }
}