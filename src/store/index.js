
import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/fetch/api'
import common from '@/assets/js/common';

Vue.use(Vuex)

const state = {
  	user: common.getJsonLocal("user") || '',
  	socket : null,
  	redpack:'',
  	welfare: {
  		title : '下个整点福利包',
  		btn : '还未开始，请稍后..'
  	},
  	kdPay :{
  		payPrice : 0,
  		show : false,
  		payList : [],
  		type: '',
  		returnUrl : '',
  		bussinessData : ''
  	},
    kldParam:{
      myBeanNum:0,
      needPayBean:100,
      isShow:false,
      range: 100,
    },
 //房卡
 	activeRoom: common.getJsonLocal("activeRoom") || ''
}
const actions = {
	socket : (context,data) => {
		context.commit("setSocket",data);
	},
    changeUserInfo: (context,vm) => {
    /*	Api.oldLogin(function(data){
    		Api.login(function(data2){
    			data.token = data2.token;
    			vm.user = data;
    			context.commit("setUserInfo",data);
    		})
    	});*/
    	Api.login(function(data){
			vm.user = data;
			context.commit("setUserInfo",data);
		})
    },
    changeRedpackInfo: (context,params) => {
    	Api.redpackInfo(function(data){
    		params.self.redpack = data;
       		context.commit("setRedpackInfo",data);
       		params.countDown();
       	})
    },
    changeWelfare: (context,data) => {
       	context.commit("setWelfare",data);
    },
  	toMessageCenter: (context,data) => {
    	context.commit("setMessageCenter",data);
  	},
  	//房卡
  	activeRoom : (context,data) => {
  		common.setJsonLocal("activeRoom",data);
    	context.commit("setActiveRoom",data);
  	},
  	setkdPay :(context,data) => {
		context.commit("setKdPay",data);
	},
  setKldParam : (context,data) => {
    context.commit("setKldParam",data);
  }

}
const getters = {

	getSocket: state => {
		return state.socket
	},
  	getUserInfo: state => {
      return state.user
    },
    getWelfare: state => {
      return state.welfare
    },
    getRedpackInfo: state => {
      return state.redpack
    },
    toMessageCenter: state => {
  	  return state.toMessageCenter
    },
 //房卡
 	getActiveRoom : state => {
 		return state.activeRoom
    },
    getKdPay : state => {
 		return state.kdPay
    },
    getKldParam : state => {
      return state.kldParam
    }
}
const mutations = {
	//ws
	setSocket :(state,data) =>  {
		state.socket = data;
	},
	//设置 支付信息
	setKdPay :(state,data) =>  {
		state.kdPay = data;
	},
	//设置用户信息
  	setUserInfo: (state,data) => {
  		state.user = data;
  		common.setJsonLocal("user",data);
    },
    setRedpackInfo: (state,data) => {
  		state.redpack = data;
    },
    setWelfare: (state,welfare) => {
  		state.welfare = welfare;
    },
    setMessageCenter: (state,toMessageCenter) => {
      state.toMessageCenter = toMessageCenter;
  	},
//房卡
    setActiveRoom: (state,data) => {
      state.activeRoom = data;
  	},
//   抢拍
    setKldParam:(state,data) => {
	   state.kldParam=data;
	   console.log(data)
    }
}
export default new Vuex.Store({
    state,
	actions,
	getters,
	mutations
})
