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
  goodsHome(cb) {
  	fetch(config.ip.robBuy + '/goodsHome','get')
  	.then(function(data){
  		cb(data)
  	})
  },
  //news
  toMessageCenter(cb) {
    var messageId = localStorage.getItem("messageId");
    if(messageId=='undefined'||messageId==undefined||messageId==""||messageId==null){
      messageId=0;
    }
    fetch(config.ip.portal + '/messageCenter/toMessageCenter','post',{
      messageId : messageId
    })
      .then(function (data) {
        cb(data)
      })
  }

}
