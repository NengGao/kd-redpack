<template>
  <div class="groupInfo flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="content flex-con-1">
      <div class="scroll">
          <div class="state-box" v-if="recordDetail.orderStatus=='Y'">
             <i class="ic-success-pay"></i>
             <div class="state-type">交易完成</div>
             <div class="state-text">对方已支付，金额已自动转入账户余额</div>
          </div>
          <div class="state-box" v-if="recordDetail.orderStatus=='D'">
            <i class="ic_wait_pay"></i>
            <div class="state-type">等待对方付款</div>
            <div class="state-text">30分钟后对方还未支付，本次交易将自动取消</div>
          </div>
          <div class="state-box" v-if="recordDetail.orderStatus=='Q'">
            <i class="ic_cancel_pay"></i>
            <div class="state-type">交易关闭</div>
            <div class="state-text">对方在30分钟内未支付，本次交易关闭</div>
          </div>
          <div class="main-content">
              <div class="flex-wrap flex-center trade-user marginTop">
                 <div class="trade-type">交易对象</div>
                 <div class="flex-wrap flex-center user-info">
                    <img :src="recordDetail.img" alt="">
                    <div class="user-text">
                       <p>{{recordDetail.name}}</p>
                       <p>ID:{{recordDetail.userCode}}</p>
                    </div>
                 </div>
              </div>
              <div class="room-card-type">
                 <span>房卡数量</span>
                 <span>{{recordDetail.cardAmount}}张</span>
              </div>
              <div class="room-card-type">
                <span>金额</span>
                <span>{{recordDetail.money}}元</span>
              </div>

              <div class="room-card-type marginTop">
                <span>交易发起</span>
                <span>{{recordDetail.time}}</span>
              </div>

              <div class="room-card-type" v-if="recordDetail.orderStatus=='Y'">
                <span>交易完成</span>
                <span>{{recordDetail.finishTime}}</span>
              </div>

              <div class="room-card-type" v-if="recordDetail.orderStatus!='Q'">
                <span>订单编号</span>
                <span>{{recordDetail.orderNo}}</span>
              </div>
          </div>
          <div class="tip">如有疑问请联系在线客服（工作日09:00-18:00）</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/fetch/api'
  import common from '@/assets/js/common'
  import { Toast } from 'mint-ui';

  export default{
    name: 'transferDetail',
    data(){
      return{
        recordId:this.$route.query.recordId,
        user: this.$store.state.user,
        headerMag:{
          title:'转让详情',
          rightMsg: '',
          rightUrl: ''
        },
        md:{
          active: '',
          mask: false,
        },
        recordDetail:'',
      }
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
    },
    created(){
        const self=this;
        Api.makeOverDetail(function (data) {
          self.recordDetail=data
        },this.recordId);
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/transferDetail.scss";

</style>



