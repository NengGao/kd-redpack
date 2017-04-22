<template>
  <div class="setRoom flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="content flex-con-1">
        <div class="scroll">
            <div class="setRoom-Box">
               <span class="setRoom-left">游戏模式</span>
               <span class="setRoom-right">红包接龙</span>
            </div>
            <div class="setRoom-Box">
              <span class="setRoom-left">游戏规则</span>
              <span class="setRoom-right set-right">抢最小的发包<i class="ic-arrow-rg"></i></span>
            </div>
            <div class="setRoom-Box margin-Top">
              <span class="setRoom-left">每包金额</span>
              <span class="setRoom-right set-right">100点<i class="ic-arrow-rg"></i></span>
            </div>
            <div class="setRoom-Box">
              <span class="setRoom-left">每包红包数</span>
              <span class="setRoom-right set-right">4个<i class="ic-arrow-rg"></i></span>
            </div>
            <div class="setRoom-Box">
              <span class="setRoom-left">一局发放的包数</span>
              <span class="setRoom-right set-right">20包<i class="ic-arrow-rg"></i></span>
            </div>
            <div class="setRoom-Box margin-Top set-right">
              <span class="setRoom-left">游戏打赏</span>
              <span class="setRoom-right set-right">每包抽15%<i class="ic-arrow-rg"></i></span>
            </div>
            <div class="setRoom-Box">
              <span class="setRoom-left">额外奖励</span>
              <span class="setRoom-right set-right">已选3项<i class="ic-arrow-bg"></i></span>
            </div>
            <div class="setRoom-Box margin-Top">
              <span class="setRoom-left">房间密码</span>
              <span class="setRoom-right set-right" style="color: #b8b8b8">设置密码<i class="ic-arrow-rg"></i></span>
            </div>
            <div class="setRoom-Box margin-Top">
              <span class="setRoom-left">群主微信号<em>（认领成功后显示）</em></span>
              <span class="setRoom-right set-right"><i class="ic-arrow-rg"></i></span>
            </div>
            <p style="margin-top: 1rem">重要提示：</p>
            <p>• 创建房间须消耗1张房卡，游戏未开始不消耗房卡；</p>
            <p>• 可设置房间密码，好友通过输入房间号和密码进入房间；</p>
            <p>• 每局须群主确定开始，第一包将由群主发放。</p>
            <input type="button" class="create-room-btn" value="创建房间">
        </div>
    </div>
    <!--蒙层-->
    <div class="mask" v-show="rulebox.mask"></div>
    <!--选择游戏规则-->
    <div class="rule-box" v-show="rulebox.rule">
       <div class="rule-title">选择游戏规则</div>
       <div class="rule-choose">
           <div class="rule-main">
              <p class="active">抢最小的发包</p>
              <p>总金额最小的发下一红包</p>
           </div>
           <i class="ic_choose"></i>
       </div>
       <div class="rule-choose">
          <div class="rule-main">
             <p>抢末尾尾数最小的发包</p>
             <p>如“0.13”最后一位即“3”</p>
          </div>
        </div>
        <i class="ic-close-gray"></i>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'setRoom',
    data(){
      return{
        rulebox:{
          rule:false,
          mask:false,
        },
        user: this.$store.state.user,
        headerMag:{
          title:'设置房间属性',
          rightMsg: '',
          rightUrl: ''
        }
      }
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/setRoom.scss";
</style>

