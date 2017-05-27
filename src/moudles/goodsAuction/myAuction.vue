<template>
  <div class="groupInfo flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="flex-wrap goodsState">
      <div class="goodsWay" :class="{'redcolor':isCheck==0}" @click="isCheckWay(0)">正在进行</div>
      <div class="goodsWay" :class="{'redcolor':isCheck==1}" @click="isCheckWay(1)">未成拍</div>
      <div class="goodsWay" :class="{'redcolor':isCheck==2}" @click="isCheckWay(2)">已成拍</div>
    </div>
    <div class="content flex-con-1">
      <div class="scroll">
        <div class="noInfo" v-show="md.noInfo">
          <img src="/static/images/goodsAuction/ic_empty.png" alt=""/>
          <div class="no_record">没有任何信息哦～</div>
        </div>
        <!--正在进行-->
        <div class="goodsListBox" v-if="myRecord!=null||myRecord!=''||myRecord!=undefined" v-for="(item,index) in myRecord">
          <div class="goodsList">
            <div class="flex-wrap goodsListHead">
              <span>{{item.period}}期</span>
              <span style="color: #999;font-size: 1rem" v-if="isCheck==1&&item.ifRefund=='A'">已处理</span>
              <span style="color: #999;font-size: 1rem" v-if="isCheck==1&&item.ifRefund=='B'">待处理</span>
              <span style="color: #999;font-size: 1rem" v-if="isCheck==2&&item.orderStatus==0">待处理</span>
              <span style="color: #999;font-size: 1rem" v-if="isCheck==2&&item.orderStatus==1">已处理</span>
              <div class="endTime" v-if="isCheck==0&&item.countDown>0">距结束<em>{{item.countDown | timer(1)}}</em><span>:</span><em>{{item.countDown | timer(2)}}</em><span>:</span><em>{{item.countDown | timer(3)}}</em></div>
            </div>
            <div class="flex-wrap goodsListMiddle">
              <img :src="item.goodsImg" alt=""/>
              <div class="goodsListInfo">
                <div class="goodsName">{{item.goodsName}}</div>
                <p style="color: #666;line-height: 1.2rem">京东价:￥{{item.jdPrice}}</p>
                <div class="auctionPrice">我的出价：<em>{{item.bid | KLD_f}}豆(折合￥{{item.bid | changePrice | RMB_f}})</em></div>
              </div>
            </div>
            <!--正在进行-->
            <div class="flex-wrap flex-center goodsListBottom" v-if="isCheck==0">
              <p></p>
              <p><input type="button" value="前往抢拍" class="goAuction" @click="toAuction(item.goodsCode)"></p>
            </div>
            <!--未成拍-->
            <div class="flex-wrap flex-align-center goodsListBottom" v-if="isCheck==1">
              <div class="backBean" v-if="item.ifRefund=='A'">乐豆已全额退回</div>
              <div class="backBeanA" v-if="item.ifRefund=='B'">乐豆暂未退回</div>
              <div class="toAccount"><span>乐豆帐户</span><i class="ic-arrow-rg"></i></div>
            </div>
          </div>
          <!--已结束-->
          <div class="flex-wrap flex-align-center goodsListBottom" v-if="isCheck==2">
            <div class="exchangeRedpack" v-if="item.receiveStatus=='A'"><input type="button" value="领取商品" class="getGoodsBtn"></div>
            <div class="exchangeRedpack" v-if="item.receiveStatus=='A'"><input type="button" value="兑换为红包" class="exchangeBtn"></div>
            <div class="hasExchange" v-if="item.receiveStatus=='B'&&item.orderStatus==0">待处理</div>
            <div class="hasExchange" v-if="item.receiveStatus=='B'&&item.orderStatus==1">已发货</div>
            <div class="hasExchange" v-if="item.receiveStatus=='C'&&item.orderStatus==0">待处理</div>
            <div class="hasExchange" v-if="item.receiveStatus=='C'&&item.orderStatus==1">已兑换为红包</div>
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
        myRecord:'',
        isCheck:'',
        headerMag: {
          title: '我的竞拍',
          rightMsg: '',
          rightUrl: ''
        },
        md:{
          active: '',
          mask: false,
          noInfo: false,
        },
      }
    },
    created(){
      let self=this;
      Indicator.open();
      Api.myRobBuy(function(data){
        if(data.msgCode==502){
            Toast("session超时")
        }
        Indicator.close();
        self.myRecord = data;
        if(data==""||data==null||data==undefined){
            self.md.noInfo=true;
        }
      },"Z");
//     倒计时
        setInterval(function () {
          for(let i=0;i<self.myRecord.length;i++){
            if(self.myRecord[i].countDown>=1000){
              self.myRecord[i].countDown=self.myRecord[i].countDown-1000;
            }else {
                if(self.isCheck==0){
                  self.myRobBuy("Z");
                }
            }
          }
        },1000);
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
      timer:function (value,type) {
        let self=this;
        /*本期结束倒计时*/
        let times = value/1000;
        if(type==1){
          let ss = Math.floor(times / 60 / 60 % 24).toString();
          if (ss.length <= 1) {
            ss = "0" + ss;       //时
          }
          return ss
        }else if(type==2){
          let fs = Math.floor(times / 60 % 60).toString();
          if (fs.length <= 1) {
            fs = "0" + fs;       //分
          }
          return fs
        }else if(type==3){
          let ms = Math.floor(times % 60).toString();
          if (ms.length <= 1) {
            ms = "0" + ms;     //秒
          }
          return ms
        }
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
      toAuction:function (goodsCode) {
        this.$router.push("/goodsAuction/index/"+goodsCode);
      },
      myRobBuy:function (type) {
         let self=this;
        Api.myRobBuy(function(data){
          Indicator.close();
          self.myRecord = data;
          if(data==""||data==null||data==undefined){
            self.md.noInfo=true;
          }else {
            self.md.noInfo=false;
          }
        },type);
      },
      isCheckWay:function (type) {
         this.isCheck=type;
         Indicator.open();
         if(type==0){
           this.myRobBuy("Z");
         }else if(type==1){
           this.myRobBuy("W");
         }else if(type==2){
           this.myRobBuy("Y");
         }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/goodsAuction/myAuction.scss";
</style>




