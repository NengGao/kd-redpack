import axios from 'axios'
import config from '@/config';
import common from '@/assets/js/common';

export function fetch(url, type, params, token) {

  if(!params) params = {};
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
  	fetch(config.ip.user + '/login','get',{
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


//支付
	getPayMethod(cb,data){
	  	fetch(config.ip.trade + '/getPayMethod','get',data,true).then(function(data){
	  		cb(data)
	  	})
	},
	submit(cb,payJson){
			fetch(config.ip.trade + '/submit','get',payJson,true).then(function(data){
	  		cb(data)
	  	})
	},


//房卡

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
  roomCardlogin(cb,params) {
  	fetch('http://' + config.host + '/roomLogin','get',{
  		openId : params.oid,
  		loginType : 2
  	}).then(function(data){
  		data.openid = params.oid;
  		params.self.user = data;
  		cb(data)
  	})
  },
//  首页房间列表
  gameLobby(cb){
  	fetch(config.ip.room + '/gameLobby','get',{},true).then(function(data){
  		cb(data)
  	})
  },
//  我的战绩
  myResult(cb){
  	fetch(config.ip.room + '/myResult','get',{},true).then(function(data){
  		cb(data)
  	})
  },
// 战绩详情
  resultDetail(cb,data){
  	fetch(config.ip.room + '/resultDetail','get',data,true).then(function(data){
  		cb(data)
  	})
  },
//  购买房卡
  getRoomCard(cb,data){
  	fetch(config.ip.room + '/getRoomCard','get',data,true).then(function(data){
  		cb(data)
  	})
  },
//  热门房间
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
  },
  //解散房间
  dissolve(cb,data){
    fetch(config.ip.room + '/close','get',data,true).then(function(data){
      cb(data)
    })
  },
  //踢人
  removeUsers(cb,data){
    fetch(config.ip.room + '/removeUsers','get',data,true).then(function(data){
      cb(data)
    })
  },
  //查看手气
  robDetails(cb,data){
    fetch(config.ip.room + '/robDetails','get',data,true).then(function(data){
      cb(data)
    })
  },
  getRoomUserScore(cb,data){
    fetch(config.ip.room + '/getRoomUserScore','get',data,true).then(function(data){
      cb(data)
    })
  },
  //上下分
   upDownScore(cb,data){
    fetch(config.ip.room + '/upDownScore','get',data,true).then(function(data){
      cb(data)
    })
  },
  //  最近转让历史记录
  getPastRecord(cb,data){
    fetch(config.ip.room + '/getPastRecord','get',data,true).then(function(data){
      cb(data)
    })
  },
  //  转让查询
  getUserInfo(cb,userCode){
    fetch(config.ip.room + '/getUserInfo','get',{
      userCode:userCode
    },true).then(function(data){
      cb(data)
    })
  },
  //  转让查询
  createOrder(cb,userCode,amount,unitPrice){
  fetch(config.ip.room + '/createOrder','get',{
    userCode:userCode,
    amount:amount,
    unitPrice:unitPrice
  },true).then(function(data){
    cb(data)
  })
   },
  //  转让记录
  roomCardMakeOverRecord(cb,type){
  fetch(config.ip.room + '/roomCardMakeOverRecord','get',{
    type:type,
  },true).then(function(data){
    cb(data)
  })
  },
  //  转让详情
  makeOverDetail(cb,recordId){
    fetch(config.ip.room + '/makeOverDetail','get',{
      recordId:recordId,
    },true).then(function(data){
      cb(data)
    })
  },
  //  修改房间
  updateRoom(cb,data){
    fetch(config.ip.room + '/updateRoom','get',data,true).then(function(data){
      cb(data)
    })
  },
  //结束本局
  terminate(cb,data){
    fetch(config.ip.room + '/terminate','get',data,true).then(function(data){
      cb(data)
    })
  },
  //  修改房间中的信息
  getRoomInfo(cb,roomId){
  fetch(config.ip.room + '/getRoomInfo','get',{
    roomId:roomId
  },true).then(function(data){
    cb(data)
  })
  },
  //  上下分的历史记录
  getRoomScoreRecord(cb,roomId,scoreType,page,pageSize){
    fetch(config.ip.room + '/getRoomScoreRecord','get',{
      roomId:roomId,
      scoreType:scoreType,
      page:page,
      pageSize:pageSize,
    },true).then(function(data){
      cb(data)
    })
  },
//  血战到底首页
  xzddHome(cb){
    fetch(config.ip.room + '/xzddHome','get',{},true).then(function(data){
      cb(data)
    })
  },
//  血战到底首页 最近参与
  recentJoin(cb){
  fetch(config.ip.room + '/recentJoin','get',{},true).then(function(data){
    cb(data)
  })
   },
//  我的房间
  mineRoom(cb){
  fetch(config.ip.room + '/mineRoom','get',{},true).then(function(data){
    cb(data)
  })
},
  //  清空所有用户积分
  clearScore(cb,roomId){
    fetch(config.ip.room + '/clearScore','get',{
      roomId:roomId
    },true).then(function(data){
      cb(data)
    })
  }
}
