
import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/fetch/api'
import common from '@/assets/js/common';

Vue.use(Vuex)

const state = {
  	user: common.getJsonLocal("user") || '',
  	redpack:'',
  	welfare: {
  		title : '下个整点福利包',
  		btn : '还未开始，请稍后..'
  	}
}
const actions = {

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
  	roomCardlogin : (context,openid) => {
  		Api.roomCardlogin(function(data){
  			context.commit("setUserInfo",data);
  			Api.gameLobby(function(data){
		  		common.setJsonLocal("roomCard",data)
		  	});
  		},openid)
  	}
}
const getters = {
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
    }
}
const mutations = {
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
  }
}
export default new Vuex.Store({
    state,
	actions,
	getters,
	mutations
})
