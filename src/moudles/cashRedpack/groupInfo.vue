<template>
  <div class="groupInfo flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="content flex-con-1">
      <div class="scroll">
          <div class="groupInfo">
              <ul class="flex-wrap">
                  <li v-for="_user in userList"><div class="user-head"><img :src="_user.userImg" alt=""><i class="owner-identify" v-if='_user.userCode == activeRoom.createByCode'></i></div><div class="person-name">{{_user.userName}}</div></li>
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
              <p>3.游戏进行的过程中，红包超过1分钟未抢完，则由系统收回重发，如仍未抢完则本局自动结束。</p>
          </div>
          <div class="group-Box margin-Top"><span>投诉</span><span class="set-right"><i class="ic-arrow-rg"></i></span></div>
          <input type="button" v-if="user.userCode == activeRoom.createByCode && activeRoom.roomStatus == 'P'" value="本局结束" class="dissolve-room-btn"  @click="showMd('mdDissolve')">
      </div>
    </div>
    <!--弹出层-->
    <div class="md-mask" :class="{ 'active': md.mask }"></div>
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


