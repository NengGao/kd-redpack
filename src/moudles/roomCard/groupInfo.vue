<template>
  <div class="groupInfo flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <router-link :to="'/roomCard/resetRoom'" class="room-set" v-if='user.userCode == activeRoom.createByCode'>设置</router-link>
    <div class="content flex-con-1">
      <div class="scroll">
          <div class="groupInfo">
              <ul class="flex-wrap">
                  <li v-for="_user in userList"><div class="user-head"><img :src="_user.userImg" alt=""><i class="owner-identify" v-if='_user.userCode == activeRoom.createByCode'></i></div><div class="person-name">{{_user.userName}}</div></li>
                  <li><i class="ic_add" @click=share></i></li>
                  <li><router-link :to='"/roomCard/deleteMember/" + $route.params.roomid'><i class="ic_reduce" v-if='user.userCode == activeRoom.createByCode'></i></router-link></li>
              </ul>
          </div>
          <div class="group-Box margin-Top"><span>房号</span><span>{{$route.params.roomid}}</span> </div>
          <div class="group-Box"><span>游戏模式</span><span>红包接龙</span> </div>
          <div class="group-Box"><span>游戏规则</span><span class="set-right" @click="gameRuleShow">查看详情<i class="ic-arrow-bg"></i></span></div>
          <div class="game-rule" v-show="md.gameRule">
              <p>1.{{activeRoom.gameRuleName}}，<em style="color: #f1294a">为游戏公正公平，避免逃包，由系统代发；</em></p>
              <p style="margin: 0.5rem 0">2.每包打赏{{activeRoom.award}}点作为额外奖励，奖励如下：</p>
              <ul>
              	  <li v-for="award in activeRoom.awardRules">{{award.awardName}}（{{award.awardDesc}}，奖{{award.awardMultiple }}倍）</li>
              </ul>
              <p style="margin-top: 0.5rem">3.每局须房主花费1张房卡开启，抢完后自动公布本局参与结果；</p>
              <p>4.游戏进行的过程中，红包超过1分钟未抢完，则由系统收回重发，如仍未抢完则本局自动结束。</p>
          </div>
          <!--<div class="group-Box"><span>房间密码</span><span class="set-right" style="color: #fa9d3b">修改密码<i class="ic-arrow-rg"></i></span> </div>-->
          <div class="group-Box margin-Top"><span>投诉</span><span class="set-right"><i class="ic-arrow-rg"></i></span></div>
          <input type="button" v-if="user.userCode == activeRoom.createByCode && activeRoom.roomStatus == 'P'" value="本局结束" class="dissolve-room-btn"  @click="showMd('mdDissolve')">
      </div>
    </div>
    <!--解散房间-->
    <!--弹出层-->
    <div class="md-mask" :class="{ 'active': md.mask }"></div>
    <div class="md-modal md-effect-1 md-dissolve-info" :class="{ 'md-show': md.mdDissolve }">
      <div class="md-content">
        <i class="md-close ic-close-gray" @click="closeMd('mdDissolve')"></i>
        <div class="title">本局结束</div>
        <div class="main-text">本局游戏结束，房主可使用房卡开始新的一局游戏！</div>
        <div class="flex-wrap dissolve-btn">
          <input type="button" class="confirm-btn" value="确认结束" @click="terminate">
          <input type="button" class="cancel-btn" value="取消操作" @click="closeMd('mdDissolve')">
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
	import { Toast,Indicator } from 'mint-ui'
  export default{
    name: 'groupInfo',
    data(){
      return{
        user: this.$store.state.user,
        activeRoom: this.$store.getters.getActiveRoom || '',
        headerMag:{
          title:'群组信息',
          rightMsg: '',
          rightUrl: ''
        },
        md:{
          active: '',
          mask: false,
          mdDissolve : false,
          gameRule : false
        },
        userList : []
      }
    },
    created(){
    	Indicator.open();
    	this.getRoomUserScore();
    },
    methods:{
      showMd: function(md){
        this.md[md] = true;
        this.md.mask = true;
      },
      closeMd :function(md){
        this.md[md] = false
        this.md.mask = false
      },
      gameRuleShow :function () {
        this.md.gameRule=!this.md.gameRule;
      },
      share: function(){
				common.shareContent({
					title : '快加入我的房间（'+ this.$route.params.roomid +'）战个痛快！',
					content : '点击下载快点生活app，进入血战到底，加入房间',
					shareUrl : 'http://d.kuaidian.cn'
				})
			},
      dissolve : function(){
      	let self = this;
      	Api.dissolve(function(data){
    			if(data.msgCode == '200'){
						Toast({message: '解散成功',duration: 1300,iconClass: 'ic-toast-success'});
						setTimeout(function(){
								self.$route.push('/roomCard/index/' + self.user.openid)
						},1500)
    			}else if(data.msgCode == '705'){
    				self.closeMd('mdDissolve');
    				Toast({message: '正在游戏中',duration: 1300});
    			}
    		},{
    			roomId: self.$router.params.roomid
    		})
      },
      terminate : function(){
      	let self = this;
      		Api.terminate(function(data){
    			if(data.msgCode == '200'){
    				self.closeMd('mdDissolve');
    				localStorage.removeItem("history_" + self.$route.params.roomid);
    				let _data = [];
    				_data.push(data.t);
    				localStorage.setItem("history_" + self.$route.params.roomid,_data);
						Toast({message: '本局结束',duration: 1300,iconClass: 'ic-toast-success'});
						setTimeout(function(){
								self.$router.push('/roomCard/room/' + self.$route.params.roomid)
						},1500)
    			}else{	
    				self.closeMd('mdDissolve');
						Toast({ message: data.msgNote, duration: 1500 });
					}
    		},{
    			roomId: self.$route.params.roomid
    		})
      },
      getRoomUserScore : function(){
      	let self = this;
      	Api.getRoomUserScore(function(data){
      		Indicator.close();
    			if(data.msgCode == '200'){
					   self.userList = data.list;
					   for(let i=0;i<self.userList.length;i++){
					   		self.userList[i].active = false;
					   }
					   common.setJsonLocal("userList",self.userList);
    			}
    		},{
	    			roomId: self.$route.params.roomid,
	    			userCode : '',
	    			orderBy : 'desc',
	    			selectType : 'onLine',
	    			pageSize : 200,
	    			page : 1
    		})
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/groupInfo.scss";
</style>


