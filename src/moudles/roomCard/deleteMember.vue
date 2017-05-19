
<template>
  <div class="groupInfo flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="deleteUser" @click=removeUsers>删除（{{removeArr.length}}）</div>
    <div class="flex-wrap flex-center delete-img">
        <img v-for="_user in removeArr" :src="_user.userImg" alt="">
    </div>
    <div class="content flex-con-1">
      <div class="scroll">
         <div class="flex-wrap flex-center delete-member" @click="deleteMember(i)" v-for="(_user,i) in userList" v-if="_user.userCode != user.userCode">
            <div class="choose-menber" :class="{'active': _user.active}"></div>
            <img :src="_user.userImg" alt="">
            <div class="name">{{_user.userName}}</div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>

	import Vue from 'vue'
	import Api from '@/fetch/api'
	import config from '@/config'
	import common from '@/assets/js/common'
	import { Toast } from 'mint-ui'

  export default{
    data(){
      return{
        user: this.$store.state.user,   
        userList : common.getJsonLocal("userList"),
        removeArr : [],
        removeCode :[],
        headerMag:{
          title:'踢出成员',
          rightMsg: '',
          rightUrl: ''
        }
      }
    },
    methods:{
      deleteMember: function (i) {
          let userCode = this.userList[i].userCode;
          this.userList[i].active=!this.userList[i].active;
          if(this.userList[i].active){
          		this.removeArr.push(this.userList[i]);
          		this.removeCode.push(this.userList[i].userCode);
          }else{
          		for(let j=0;j<this.removeArr.length;j++){
          				
          				if(this.removeArr[j].userCode == userCode){
          						alert(this.removeArr[j].userCode);
          						this.removeArr.splice(j,1);
          				}
          		}
          		for(let j=0;j<this.removeCode.length;j++){
          				if(this.removeCode[j] == userCode){
          						this.removeArr.splice(j,1);
          				}
          		}
          }
      },
      removeUsers: function(){
      	let self = this;
      	let userCodes = '';
      	for(let j=0;j < this.removeCode.length;j++){
  				 userCodes += this.removeCode[j] + ','
  		  }
      	Api.removeUsers(function(data){
    			if(data.msgCode == '200'){
						  Toast({message: '踢出成功',duration: 1300,iconClass: 'ic-toast-success'});
						  setTimeout(function(){
						  	self.$router.go(-2)
						  },1500)
    			}
    		},{
    			roomId: self.$route.params.roomid,
    			userCodes : userCodes
    		})
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/deleteMember.scss";

</style>



