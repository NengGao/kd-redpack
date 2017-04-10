import axios from 'axios'
import config from '@/config';

export function fetch(url, type, params) {
	
    return new Promise((resolve, reject) => {
    	if(type == 'get' || type == 'GET'){
	    	axios.get(url).then(response => {
	            resolve(response.data);
	        }).catch((error) => {
	            console.log(error)
	            reject(error)
	        })	
    	}else{
    		axios.post(url, params).then(response => {
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
  userInfo(cb) {
  	fetch(config.ip.user + '/login?openId=' + config.start.testOpenId + '&loginType=2','get').then(function(data){
  		cb(data)
  	})
  }
}