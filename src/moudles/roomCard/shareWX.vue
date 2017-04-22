<template>
  <div class="setRoom flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="content flex-con-1">
      <div class="scroll">
          <div class="rank-box">
              <div class="rank-title">
                  <div class="rank-num-room">
                      <span>房号:897692</span>
                      <span>编号:04697局</span>
                  </div>
              </div>
              <div class="flex-wrap rank-h1">
                  <span>本局排行榜</span>
                  <div class="flex-wrap rank-host">
                     <img src="/static/images/roomCard/ic_head.png" alt="">
                     <span>冬天的冬<em>(房主)</em></span>
                  </div>
              </div>
              <div class="rank-list">
                  <div class="flex-wrap rank-li">
                      <div class="flex-wrap rank-left">
                         <img src="/static/images/roomCard/ic_rank_1.png" alt="" class="ic-rank">
                         <img src="/static/images/roomCard/ic_head.png" alt="" class="rank-head-img">
                         <div class="rank-name">大三洋摩托</div>
                      </div>
                      <div class="rank-right">＋1049.28</div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    <div class="share-btn">
      <input type="button" class="to-share-btn" value="立即分享">
    </div>
  </div>
</template>

<script>
  export default{
    name: 'shareWX',
    data(){
      return{
        user: this.$store.state.user,
        headerMag:{
          title:'分享到微信',
          rightMsg: '关闭',
          rightUrl: ''
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/shareWX.scss";
</style>

