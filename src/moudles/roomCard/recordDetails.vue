<template>
  <div class="setRoom flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="content flex-con-1">
      <div class="scroll">
        <div class="rank-box">
          <div class="rank-head-box">
            <div class="rank-title">
              <div class="rank-num-room">
                <span>房号:{{userInfo.roomId}}</span>
                <span>编号:{{userInfo.boutId}}局</span>
              </div>
            </div>
            <div class="flex-wrap flex-center rank-h1">
              <div class="flex-wrap flex-center rank-host">
                <img :src="userInfo.houseOwnerImg" alt=""><i class="ic_hat"></i>
                <span>{{userInfo.houseOwnerName}}<em>（房主）</em></span>
              </div>
            </div>
            <div class="flex-wrap rank_p">
               <span class="flex-con-1">排名</span>
               <span class="flex-con-1">昵称</span>
               <span class="flex-con-1">盈亏</span>
            </div>
          </div>


          <div class="rank-list">
            <div class="flex-wrap flex-center rank-li" v-for="(item,index) in userInfo.rankingList">
              <div class="flex-wrap flex-center rank-left">
                <i class="ic-rank ic-rank-1" v-if="index==0"></i>
                <i class="ic-rank ic-rank-2" v-if="index==1"></i>
                <i class="ic-rank ic-rank-3" v-if="index==2"></i>
                <i class="ic-rank" v-if="index>2">{{index+1}}</i>
                <img :src="item.headPortrait" alt="" class="rank-head-img">
                <div class="rank-name">{{item.nickName}}</div>
              </div>
              <div class="rank-right" v-if="index<=3" style="color: #ff2739">{{item.grades}}</div>
              <div class="rank-right" v-if="index>3">{{item.grades}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="myTotal" v-if="userInfo.closeAmount>0">合计收益：<em>+{{userInfo.closeAmount}}点</em></div>
    <div class="myTotal" v-if="userInfo.closeAmount<0">合计收益：<em>{{userInfo.closeAmount}}点</em></div>
    <div class="share-btn">
      <input type="button" class="to-share-btn" value="立即分享" @click=shareImage>
    </div>
  </div>
</template>

<script>

	import Api from '@/fetch/api'
	import config from '@/config';
	import common from '@/assets/js/common'
	import { Toast,Indicator,MessageBox } from 'mint-ui'

  export default{
    name: 'recordDetails',
    data(){
      return{
        user: this.$store.state.user,
        imageUrl : '',
        headerMag:{
          title:'战绩详情',
          rightMsg: '',
          rightUrl: ''
        },
        userInfo:{
          houseOwnerName:"",
          houseOwnerImg:"",
          rankingList:"",
          roomId:"",
          boutId:"",
          closeAmount:"",

        },

      }
    },
    beforeCreate(){
    	 let self = this;
    	 Api.resultDetail(function(data){
    	 		self.imageUrl = data.url;
    	 		self.userInfo.houseOwnerName=data.houseOwnerName;
    	 		self.userInfo.houseOwnerImg=data.houseOwnerImg;
    	 		self.userInfo.rankingList=data.rankingList;
    	 		self.userInfo.closeAmount=data.closeAmount;
    	 		self.userInfo.boutId=self.$route.params.boutid;
    	 		self.userInfo.roomId=self.$route.params.roomid;
    	 },{
    	 		boutId : this.$route.params.boutid,
    	 		roomId : this.$route.params.roomid,
    	 		createBy : this.$route.params.userCode
    	 })
    },
    methods:{
    	shareImage(){
    		//MessageBox('提示', '内测中，暂时不能分享');
				let url = this.imageUrl;
				common.weixinShareImage(url)
			}
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/recordDetails.scss";
</style>

