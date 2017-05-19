<template>
  <div class="informList">
    <!--noticeType==1 黑色  noticeType==2 黄色-->
    <i class="ic_notice" :class="{'ic_notice2':noticeType==2}"></i>
    <ul class="inform-info" :style="{ top }">
      <li v-if="messageList==''||messageList==null">24小时畅玩，欢乐不间断，大奖不断，金牌服务</li>
      <li v-else-if="messageType==0" v-for="item in messageList" style="color: #746554">恭喜玩家“{{item.userName}}”成功领取<em style="color: #ff5931">{{item.roomCard}}张房卡</em></li>
      <li v-else-if="messageType==1" v-for="item in messageList">恭喜<span>{{item.fromUserName}}</span>中<em>{{item.awardName}}</em>赢得<em>{{item.amount | RMB_f}}点</em>!</li>
    </ul>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    data () {
      return {
        activeIndex: 0,
      }
    },
    props:["messageList","noticeType","messageType"],//messageType 0 领房卡的信息；1中奖信息
    computed: {
      top() {
        return - this.activeIndex * 2.285 + 'rem';
      }
    },

    mounted() {
      let self=this;
      setInterval(_ => {
        if(self.activeIndex < self.messageList.length-1) {
          self.activeIndex += 1;
        } else {
          self.activeIndex = 0;
        }
      }, 3000);
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../assets/sass/config.scss";
  @import "../../../assets/sass/icon.scss";
  .informList{
    height: toRem(32px);
    line-height: toRem(32px);
    overflow: hidden;
    position: relative;
    .ic_notice{
      width: toRem(35px);
      height: toRem(30px);
      background: no-repeat center url(/static/images/roomCard/ic_notice.gif);
      background-size: 1rem;
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
    }
   .ic_notice2{
    width: toRem(35px);
    height: toRem(30px);
    background: no-repeat center url(/static/images/roomCard/ic_notice2.gif);
    background-size: 1rem;
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
  }
  .inform-info{
    width: 90%;
    padding-left: 10%;
    border-radius: toRem(16px);
    color: #d9cecf;
    position: relative;
    transition: top 0.5s;
    left: 0;
    top: 0;
  li{
    height: toRem(32px);
    line-height: toRem(32px);
  span{
    display: inline-block;
    max-width: 10rem;
    color: #cc3945;
    font-size: toRem(14px);
  @include overEllipsis();
    vertical-align: middle;
  }
  em{
    color: #cc8c39;
    font-size: toRem(14px);
  }
  }
  }
  }

</style>
