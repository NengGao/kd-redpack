<template>
  <div class="groupInfo flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="auctionResultHead">
      <div class="auctionInfoBox">
        <div class="auctionInfo">获拍者信息:</div>
        <div class="flex-wrap flex-center auctionUser">
          <div class="flex-wrap auctionLeft">
            <img :src="getReward.img" alt="">
            <div class="auctionMain">
              <p>{{getReward.name}}</p>
              <p>{{getReward.createTime}}</p>
            </div>
          </div>
          <div class="auctionRight">
            <p>成拍价：<em>{{getReward.price| KLD_f}}豆</em></p>
            <p>折合￥{{getReward.price | changePrice | RMB_f}}</p>
          </div>
        </div>
        <i class="ic_success_mark"></i>
      </div>
      <div class="lastRecordTitle">本期出价记录<span>不成拍，乐豆全额退返</span></div>
    </div>
    <div class="content flex-con-1">
      <div class="scroll">
        <div class="recordBox">
          <div class="lastCostRecord" v-for="item in myRecord">
            <div class="flex-wrap flex-center lastRecordList">
              <div class="flex-wrap lastRecordLeft">
                <img :src="item.img" alt="">
                <div class="userInfo">
                  <p style="font-size: 1rem;color: #333">{{item.name}}</p>
                  <p style="font-size: 0.875rem;color: #999">{{item.createTime}}</p>
                </div>
              </div>
              <div class="needKld">
                <p style="color: #333">出价：{{item.price| KLD_f }}豆</p>
                <div class="needKldNum" style="font-size: 0.875rem;color: #999;text-align: right">折合￥{{item.price | changePrice | RMB_f}}</div>
              </div>
            </div>
          </div>
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
    data(){
      return{
        user: this.$store.state.user,
        period:this.$route.params.period,
        myRecord:'',
        getReward:{
          img:'',
          name:'',
          price:'',
          createTime:'',
        },
        isCheck:'',
        headerMag: {
          title: '',
          rightMsg: '',
          rightUrl: ''
        },
        md:{
          active: '',
          mask: false,
        },
      }
    },
    created(){
      let self=this;
      self.headerMag.title="第"+self.period.substring(7,self.period.length)+"期抢拍结果";
      Api.checkRecord(function(data){
       self.myRecord=data;
        self.myRecord.forEach(function (item,index) {
          if(item.ifWin=='A'){
             self.getReward.img=item.img;
             self.getReward.name=item.name;
             self.getReward.price=item.price;
             self.getReward.createTime=item.createTime;
          }
        })
      },self.period);
    },
    filters:{
      substrPeriod:function (value) {
        if(value){
          return value.substring(7,value.length)
        }
      },
      changePrice:function (value) {
        return value/10
      },

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
  @import "../../assets/sass/goodsAuction/auctionRecord.scss";
</style>




