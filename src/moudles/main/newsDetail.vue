<template>
  <div class="news flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="content flex-con-1">
        <div class="scroll">
           <div class="taskRewardBox">
             <div class="boxHead">
               <div class="box-left">
                 <div class="box-left-title">奖励发放通知</div>
               </div>
               <div class="box-right">10-10 08:42</div>
             </div>
             <div class="boxMain">
               <div class="boxMain-head">恭喜获得关注微信公众号奖励！</div>
               <div class="boxMain-content">
                 <div class="boxMain-cash">现金奖励 ： <em>+1.22</em><span>元</span> </div>
                 <div class="boxMain-time">发放时间 ： <em>2016-10-11 16:43:30</em> </div>
                 <div class="boxMain-text">(奖励直接发放至微信零钱，请留意查收)</div>
               </div>
             </div>
             <a class="boxFoot" href="">详情  <i class="arrows-right-gray addclass"></i> </a>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'newsDetail',
    data(){
      return{
        user: this.$store.state.user,
        headerMag:{
          title:'现金帐户',
          rightMsg: '',
          rightUrl: ''
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/main/newsDetail.scss";
</style>

