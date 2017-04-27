import axios from 'axios'
import config from '@/config';
import common from '@/assets/js/common';

export function fetch(url, type, params, token) {

	if(token) params.token = common.getJsonLocal("user").token;

    return new Promise((resolve, reject) => {
    	if(type == 'get' || type == 'GET'){
    		var param = '';
    		for(var key in params){
				param += '&' + key + '=' + params[key]
			}
			param = param.replace('&','');

	    	axios.get(url + '?' + param)
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
  	fetch(config.ip.user + '/login?','get',{
  		openId : config.start.testOpenId,
  		loginType : 2
  	}).then(function(data){
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
    }).then(function (data) {
        cb(data)
    })
  },


//房卡  房间内
	//进入房间
	enterRoom(cb,data){
	  	fetch(config.ip.room + '/enterRoom','get',data,true).then(function(data){
	  		cb(data)
	  	})
	},
	//开始游戏
	startGame(cb,data){
	  	fetch(config.ip.room + '/startGame','get',data,true).then(function(data){
	  		cb(data)
	  	})
	},
	//抢红包
	rob(cb,data){
	  	fetch(config.ip.room + '/rob','get',data,true).then(function(data){
	  		cb(data)
	  	})
	},

// 房卡
  roomCardlogin(cb,openid) {
  	fetch(config.ip.user + '/login','get',{
  		openId : openid,
  		loginType : 2
  	}).then(function(data){
  		cb(data)
  	})
  },
  gameLobby(cb){
  	fetch(config.ip.room + '/gameLobby','get',{},true).then(function(data){
  		cb(data)
  	})
  },
  myResult(cb){
  	fetch(config.ip.room + '/myResult','get',{},true).then(function(data){
  		cb(data)
  	})
  },
  getRoomCard(cb,data){
  	fetch(config.ip.room + '/getRoomCard','get',data,true).then(function(data){
  		cb(data)
  	})
  },
  hotRecommend(cb){
  	fetch(config.ip.room + '/hotRecommend','get',{},true).then(function(data){
  		cb(data)
  	})
  },
//  设置房间
  setRoom(cb){
    fetch(config.ip.room + '/getRuleAndExtraAward','get',{},true).then(function(data){
      cb(data)
    })
  },
  //  创建房间
  createRoom(cb,data){
    fetch(config.ip.room + '/createRoom','get',data,true).then(function(data){
      cb(data)
    })
  }
}
