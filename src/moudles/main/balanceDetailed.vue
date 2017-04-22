<template>
  <div class="flex-wrap">
      <kd-header :headerMsg=headerMag></kd-header>
      <div class="content flex-con-1">
          <div class="flex-wrap balance-head">
             <div class="balance-tab">资金变动明细</div>
             <div class="balance-tab">提现记录（近三个月）</div>
          </div>
          <div class="scroll">
             <div class="flex-wrap flex-center balanceList">
                <div class="content-left">
                    <div class="dot"></div>
                    <div class="content-main">
                       <p>订单回购</p>
                       <p>2017-04-19 09:38:41</p>
                    </div>
                </div>
                <div class="content-right"><em>98.00</em>元</div>
             </div>
          </div>
      </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        headerMag:{
          title:'资金明细',
          rightMsg: '联系客服',
          rightUrl: '/'
        },
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/main/balanceDetailed.scss";
</style>
