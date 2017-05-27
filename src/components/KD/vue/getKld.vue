<template>
  <!--new 充值现金弹窗-->
  <div class="getKldBox">
    <div class="md-mask" :class="{ 'active': getKldParam.isShow}"></div>
    <div class="md-modal md-effect-1 getKld" :class="{ 'md-show': getKldParam.isShow}">
      <div class="md-content">
        <div class="getKld-img"><img src="/static/images/goodsAuction/get_beans.png" alt=""></div>
        <i class="dialog-close"></i>
        <div class="kldBox">
          <div class="mykld">我的快乐豆：{{getKldParam.myBeanNum | KLD_f}}<em></em><span>快乐豆明细</span></div>
        </div>
        <div class="kldNumber flex-wrap">
          <div class="kld-reduce" @click="kldReduce"></div>
          <div class="kld-number flex-con-1">
            <i class="number-kld"></i>
            <span><em>{{getKldParam.needPayBean}}</em>豆</span>
          </div>
          <div class="kld-add" @click="kldAdd"></div>
        </div>
        <div class="payRMB">支付金额：<em>{{getKldParam.needPayBean | changePrice | RMB_f}}</em>元</div>
        <input type="button" class="kld-pay" value="立即支付" @click="goPay">
        <div class="close" @click="closeGetKld"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    data () {
      return {
        getKldParam : this.$store.getters.getKldParam
      }
    },
    filters: {
      changePrice: function (value) {
        return value / 10
      },
    },
    methods: {
      showMd: function (md) {
        this.md[md] = true;
        this.md.mask = true;
      },
      closeMd: function (md) {
        this.md[md] = false
        this.md.mask = false
      },
      closeGetKld:function () {

        this.getKldParam.isShow=false
      },
      kldReduce:function () {
         let _range = this.range ? this.range :this.getKldParam.range;
         if(this.getKldParam.needPayBean>=_range){
             this.getKldParam.needPayBean=this.getKldParam.needPayBean-_range;
         }
      },
      kldAdd:function () {
          let _range = this.range ? this.range :this.getKldParam.range;
          this.getKldParam.needPayBean=this.getKldParam.needPayBean+ _range;
      },
      goPay:function () {
        this.getKldParam.isShow=false;
        this.$store.getters.getKdPay.payPrice = this.getKldParam.needPayBean/10;
        this.$store.getters.getKdPay.show = true;
      },
    },
    props:[
      'range'
    ],
    mounted() {

    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../assets/sass/config.scss";
  @import "../../../assets/sass/icon.scss";
  @import "../../../assets/sass/dialog.scss";
  .active{
    opacity: 1;
    visibility: visible;
  }
.getKld{
  overflow: visible;
  .md-content{
    background: #302627;
    padding-bottom:1.15rem;
    box-sizing: border-box;
  .getKld-img{
    position: absolute;
    img{
      width: 90%;
      margin: 0 auto;
      margin-top: -4rem;
    }
  }
  .kldBox{
    width: 20.8rem;
    margin: 0 auto;
    position: relative;
    line-height: 1.6rem;
    color: #ecdbdb;
  .mykld{
    line-height: 2rem;
    padding-top:3rem;
  em{
    color: #d43a39;
  }
  span{
    position: absolute;
    right:0;
  }
  }

  span{
    color: #ffb1b1;
  &:active{
     opacity: 0.6;
   }
  }
  }
  .kldNumber{
    width: 20.8rem;
    height: 3.5rem;
    margin: 0.8rem auto;
    background: #201718;
    border-radius: 0.35rem;
    position: relative;
  .kld-reduce{
    width: 4.36rem;
    height: 3.5rem;
    background: no-repeat center url(/static/images/goodsAuction/ic_kld_reduce.png);
    background-size: 36%;
    background-color:#641e1e;
    border-radius: 0.35rem 0 0 0.35rem;
  &:active{
     opacity: 0.6;
   }
  }
  .kld-add{
    width: 4.36rem;
    height: 3.5rem;
    background: no-repeat center url(/static/images/goodsAuction/ic_kld_add.png);
    background-size: 36%;
    background-color:#cd3938;
    border-radius: 0 0.35rem 0.35rem 0;
  &:active{
     opacity: 0.6;
   }
  }
  .kld-number{
    text-align: center;
    line-height: 3.62rem;
    color: #ecdbdb;
    font-size: 1.54rem;

  .number-kld span{
    height: 3.62rem;
    display: inline-block;
    vertical-align: top;
    line-height: 3.62rem;
  }
  &:before{
     display: inline-block;
     content: '';
     width: 2.14rem;
     height: 2.14rem;
     background: no-repeat center url(/static/images/goodsAuction/ic_dou.png);
     background-size: 1.55rem;
     position: relative;
     top: 0.5rem;
   }
  span {
  em{
    font-weight: bold;
  }
  }
  }
  }
  .payRMB{
    color: #d99898;
    font-size: 1.15rem;
    padding: 0 1.15rem;
  }
  .kld-pay{
    display: block;
    width: 20.4rem;
    height: 3.14rem;
    background: #d43a39;
    color: #fff;
    margin: 1rem auto 0 auto;
    border: 0;
    border-radius: 0.3rem;
    font-size: 1.35rem;
  &:active{
     opacity: 0.6;
   }
  }
  .close{
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    right: 1rem;
    top:-4rem;
  }
  }

}
</style>

