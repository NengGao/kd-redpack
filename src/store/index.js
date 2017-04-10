
import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/fetch/api'

Vue.use(Vuex)

const state = {
  	user: ''
}
const actions = {
	
    changeUserInfo: (context,vm) => {
       context.commit("setUserInfo",vm);
    }
}
const getters = {
  	getUserInfo: state => {
      return state.user
    }
}
const mutations = {
  	setUserInfo: (state,vm) => {
  		Api.userInfo(function(data){
  			state.user = data;
  			vm.user = data;
  		})
    }
}
export default new Vuex.Store({
    state,
	actions,
	getters,
	mutations
})