<template>
  <div class="groupInfo flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="content flex-con-1">
      <div class="scroll">
          <div class="groupInfo">
              <ul class="flex-wrap">
                  <li><img src="/static/images/roomCard/ic_head.png" alt=""><div class="person-name">樱花树下</div></li>
                  <li><img src="/static/images/roomCard/ic_head.png" alt=""><div class="person-name">樱花树下</div></li>
                  <li><img src="/static/images/roomCard/ic_head.png" alt=""><div class="person-name">樱花树下</div></li>
                  <li><img src="/static/images/roomCard/ic_head.png" alt=""><div class="person-name">樱花树下</div></li>
                  <li><img src="/static/images/roomCard/ic_head.png" alt=""><div class="person-name">樱花树下</div></li>
                  <li><img src="/static/images/roomCard/ic_head.png" alt=""><div class="person-name">樱花树下</div></li>
                  <li><i class="ic_add"></i></li>
                  <li><i class="ic_reduce"></i></li>
              </ul>
          </div>
          <div class="group-Box margin-Top"><span>房号</span><span>897692</span> </div>
          <div class="group-Box"><span>游戏模式</span><span>红包接龙</span> </div>
          <div class="group-Box"><span>游戏规则</span><span class="set-right">查看详情<i class="ic-arrow-bg"></i></span></div>
          <div class="game-rule">
              <p>1.100点/4包，1局20包，抢最小的发下一包，<em style="color: #f1294a">为游戏公正公平，避免逃包，由系统代发；</em></p>
              <p style="margin: 0.5rem 0">2.每包抽取20点作为额外奖励，奖励如下：</p>
              <ul>
                  <li>一份情（开出0.01点，奖励100点）</li>
                  <li>大豹子（如77.77～11.11，奖励420点）</li>
                  <li>小豹子（如9.99～1.11，奖励200点）</li>
                  <li>大顺子（如67.89～12.34，奖励420点）</li>
                  <li>小顺子（如7.89～1.23，奖励180点）</li>
              </ul>
              <p style="margin-top: 0.5rem">3.每局须房主花费1张门卡开启，抢完后自动公布本局参与结果；</p>
              <p style="margin: 0.5rem 0">4.开局后，所有玩家参与掷骰子，<em style="color: #f1294a">投出最小的发第一包，超过5秒未投将直接被请退；</em></p>
              <p>5.游戏进行的过程中，红包超过1分钟未抢完，则由系统收回重发，如仍未抢完则本局自动结束。</p>
          </div>
          <div class="group-Box margin-Top set-height"><span>房间期限</span><em>如房间超过24小时未进行游戏，将自动被收回</em> </div>
          <div class="group-Box"><span>房间密码</span><span class="set-right" style="color: #fa9d3b">修改密码<i class="ic-arrow-rg"></i></span> </div>
          <div class="group-Box margin-Top"><span>投诉</span><span class="set-right"><i class="ic-arrow-rg"></i></span></div>
          <input type="button" value="解散房间" class="dissolve-room-btn"  @click="showMd('mdDissolve')">
      </div>
    </div>
    <!--解散房间-->
    <!--弹出层-->
    <div class="md-mask" :class="{ 'active': md.mask }"></div>
    <div class="md-modal md-effect-1 md-dissolve-info" :class="{ 'md-show': md.mdDissolve }">
      <div class="md-content">
        <i class="md-close ic-close-gray" @click="closeMd('mdDissolve')"></i>
        <div class="title">解散房间</div>
        <div class="main-text">解散房间，不会消耗房卡，届时房间玩家将会被清空。</div>
        <div class="flex-wrap dissolve-btn">
          <input type="button" class="confirm-btn" value="确认解散">
          <input type="button" class="cancel-btn" value="取消操作" @click="closeMd('mdDissolve')">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'groupInfo',
    data(){
      return{
        user: this.$store.state.user,
        headerMag:{
          title:'群组信息',
          rightMsg: '设置',
          rightUrl: ''
        },
        md:{
          active: '',
          mask: true,
          mdDissolve : true
        }
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
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/groupInfo.scss";

</style>


