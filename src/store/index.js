
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
 //房卡
 	activeRoom: common.getJsonLocal("activeRoom") || ''
}
const actions = {
	socket : (context,data) => {
		context.commit("setSocket",data);
	},
    changeUserInfo: (context,vm) => {
    	Api.oldLogin(function(data){
    		Api.login(function(data2){
    			data.token = data2.token;
    			vm.user = data;
    			context.commit("setUserInfo",data);
    		})
    	})
    },
    changeRedpackInfo: (context,vm) => {
    	Api.redpackInfo(function(data){
    		vm.redpack = data;
       		context.commit("setRedpackInfo",data);
       	})
    },
    changeWelfare: (context,data) => {
       	context.commit("setWelfare",data);
    },
  	toMessageCenter: (context,data) => {
    	context.commit("setMessageCenter",data);
  	},
  	//房卡
  	roomCardlogin : (context,param) => {
  		Api.roomCardlogin(function(data){
  			context.commit("setUserInfo",data);
  			if(param.page == 0){
	          Api.xzddHome(function(data){
	            param.self.roomCard.roomCardAmount = data.roomCardAmount;
	            localStorage.setItem("roomCardAmount",data.roomCardAmount);
	            param.self.hotArr = data;
	            param.self.messageList=data.messageList;
	            common.setJsonLocal("hotArr",data);
	            common.setJsonLocal("messageList",data.messageList);
	          })
	        }else {
	          Api.recentJoin(function(data){
	            param.self.roomCard.roomCardAmount = data.roomCardAmount;
	            param.self.hotArr = data;
	            common.setJsonLocal("hotArr",data);
	          })
	        }
	       param.callback
  		},param)
  	},
  	activeRoom : (context,data) => {
  		common.setJsonLocal("activeRoom",data);
    	context.commit("setActiveRoom",data);
  	},
  	
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
}
const mutations = {
	//ws
	setSocket :(state,data) =>  {
		state.socket = data;
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
}
export default new Vuex.Store({
    state,
	actions,
	getters,
	mutations
})
