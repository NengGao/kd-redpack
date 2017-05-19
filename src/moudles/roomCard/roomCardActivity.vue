<template>
  <div class="roomCardActivity flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="content flex-con-1">
      <div class="scroll">
          <div class="banner"><img src="/static/images/roomCard/roomCard_banner.png" alt=""></div>
          <infoScroll :messageList="messageList" :noticeType="2" :messageType="0"></infoScroll>
          <div class="roomCard-box">
             <div class="roomCard-head">
                <span>剩余房卡数：<em>93219张</em></span>
                <span>前往开通vip</span>
             </div>
             <div class="get-roomCard">
                <div class="coupon">
                  <div class="toGet"></div>
                </div>
                <div class="coupon2">
                  <div class="toGet"></div>
                </div>
             </div>
          </div>
          <div class="activity-rule">
             <div class="title">活动规则</div>
             <p>1.活动时间：2017年05月15日-06月15日；</p>
             <p>2.活动期间，所有登录app玩家，均可参与“免费领房卡，体验创建私人房间，畅玩红包游戏”活动;</p>
             <p style="color: #ff5931">3.普通用户每人限领2张，vip用户5张；</p>
             <p>4.本活动最终解释权归快点生活科技所有，如发现违法或作弊参与活动行为，我们将取消其参与资格并保留追究权利。</p>
          </div>
      </div>
    </div>
    <!--立即开通vip-->
    <div class="md-mask" :class="{ 'active': md.mask }"></div>
    <div class="md-modal md-effect-1 openVip" :class="{ 'md-show': md.openVip }">
      <div class="md-content">
         <div class="title">亲，您还未开通VIP哦！</div>
         <img src="/static/images/roomCard/ic_upvip.png" alt="">
         <div class="openVip-Text">vip让您特立独行，<a href="">了解更多特权</a></div>
         <input type="button" value="立即开通vip" class="goVip-btn">
         <i class="ic-close-white" @click="closeMd('openVip')"></i>
      </div>
    </div>
    <!--领取房卡-->
    <div class="md-modal md-effect-1 getCard" :class="{ 'md-show': md.getCard }">
      <div class="md-content">
        <div class="title">领卡成功！</div>
        <p>亲，恭喜您获得<em>两</em>张房卡</p>
        <i class="ic_room_card_2"></i>
        <div class="openVip-Text">房卡已放入您的帐户，<a href="">前往大厅查看</a></div>
        <input type="button" value="立即开房体验" class="goVip-btn">
        <i class="ic-close-white" @click="closeMd('getCard')"></i>
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
    name: 'roomCardActivity',
    data(){
      return{
        user: this.$store.state.user,
        activeRoom: this.$store.getters.getActiveRoom || '',
        headerMag:{
          title:'10万房卡免费送..',
          rightMsg: '分享到微信',
          rightUrl: ''
        },
        md:{
          active: '',
          mask: true,
          openVip: false,
          getCard: true,
        },
        messageList:[
          {userName:"fjifh",roomCard:2},
          {userName:"f发个梵蒂冈h",roomCard:3},
          {userName:"放松放松",roomCard:5},
        ],
      }
    },
    created(){

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
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/roomCardActivity.scss";
</style>
