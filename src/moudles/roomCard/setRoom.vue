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
            <div class="setRoom-Box margin-Top set-right" @click="showMd('mdGamePlay')">
              <span class="setRoom-left">游戏打赏</span>
              <span class="setRoom-right set-right">每包抽15%<i class="ic-arrow-rg"></i></span>
            </div>
            <div class="setRoom-Box" @click="pullUp">
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
    <!--游戏打赏-->
    <div class="md-mask" :class="{ 'active': md.mask }"></div>
    <div class="md-modal md-effect-1 md-game-play" :class="{ 'md-show': md.mdGamePlay }">
      <div class="md-content">
        <i class="md-close ic-close-gray" @click="closeMd('mdGamePlay')"></i>
        <div class="title">游戏打赏</div>
        <div class="text">每包抽取部分金额，作为额外奖励发放给玩家</div>
        <div class="flex-wrap flex-center get-reward">
          <input type="number" pattern="\d*" class="number" placeholder="输入每包抽取比例"><em>%</em>
        </div>
        <input type="button" value="确定" class="confirm-btn">
      </div>
    </div>
    <!--设置奖励倍数-->
    <div class="md-modal md-effect-1 md-game-play" :class="{ 'md-show': md.mdGameReward }">
      <div class="md-content">
        <i class="md-close ic-close-gray" @click="closeMd('mdGameReward')"></i>
        <div class="title">设置奖励倍数</div>
        <div class="text">如每包金额100点，奖励倍数为2.0倍，若中则奖励200点。</div>
        <div class="flex-wrap flex-center get-reward">
          <input type="number" pattern="\d*" class="reward-number" placeholder="请输入倍数">
        </div>
        <input type="button" value="确定" class="reward-confirm-btn">
      </div>
    </div>
    <!--额外奖励-->
    <div class="extra-reward" v-show="activeBox.rewardShow" :class="activeBox.pullUpShow ? 'pullUp' : 'pullDown'">
       <div class="extra-reward-title">额外奖励</div>
       <div class="extra-reward-text">以每包金额为基准的额外奖励</div>
       <div class="flex-wrap flex-center reward-type" @click="toggle">
         <div class="left-content">
           <p :class="{'font-active' :activeBox.fontActive}">一份情</p>
           <p>抢到0.01点</p>
         </div>
         <div class="flex-wrap right-content">
           <span>奖励x0.8倍</span>
           <div class="choose-type" :class="{'active': activeBox.isActive}"></div>
         </div>
        </div>
        <div class="flex-wrap flex-center reward-type" @click="toggle">
          <div class="left-content">
            <p :class="{'font-active' :activeBox.fontActive}">大豹子</p>
            <p>位数相同，如11.11、22.22</p>
          </div>
          <div class="flex-wrap right-content">
            <span>奖励x0.8倍</span>
            <div class="choose-type" :class="{'active': activeBox.isActive}"></div>
          </div>
        </div>
        <div class="flex-wrap flex-center reward-type" @click="toggle">
          <div class="left-content">
            <p :class="{'font-active' :activeBox.fontActive}">小豹子</p>
            <p>位数相同，如1.11、2.22</p>
          </div>
          <div class="flex-wrap right-content">
            <span>奖励x0.8倍</span>
            <div class="choose-type" :class="{'active': activeBox.isActive}"></div>
          </div>
        </div>
        <div class="flex-wrap flex-center reward-type" @click="toggle">
          <div class="left-content">
            <p :class="{'font-active' :activeBox.fontActive}">大顺子</p>
            <p>位数依次排序，如12.34、1.23</p>
          </div>
          <div class="flex-wrap right-content">
            <span>奖励x0.8倍</span>
            <div class="choose-type" :class="{'active': activeBox.isActive}"></div>
          </div>
        </div>
        <div class="flex-wrap flex-center reward-type" @click="toggle">
          <div class="left-content">
            <p :class="{'font-active' :activeBox.fontActive}">小顺子</p>
            <p>位数依次排序，如1.23、4.56</p>
          </div>
          <div class="flex-wrap right-content">
            <span>奖励x0.8倍</span>
            <div class="choose-type" :class="{'active': activeBox.isActive}"></div>
          </div>
        </div>
        <div class="flex-wrap flex-center reward-type" @click="toggle">
          <div class="left-content">
            <p :class="{'font-active' :activeBox.fontActive}">衰神奖</p>
            <p>连续抢3包最小</p>
          </div>
          <div class="flex-wrap right-content">
            <span>奖励x0.8倍</span>
            <div class="choose-type" :class="{'active': activeBox.isActive}"></div>
          </div>
        </div>
        <i class="ic-close-gray" @click="pullUp"></i>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'setRoom',
    data(){
      return{
        activeBox:{
          fontActive:false,
          isActive: false,
          rewardShow:false,
          pullUpShow:false,
        },
        rulebox:{
          rule:false,
          mask:false,
        },
        user: this.$store.state.user,
        headerMag:{
          title:'设置房间属性',
          rightMsg: '',
          rightUrl: ''
        },
        md:{
          active: '',
          mask: false,
          mdGamePlay : false,
          mdGameReward : false,
        }
      }
    },
    methods:{
      showMd: function(md){
        this.md[md] = true;
        this.md.mask = true;
      },
      closeMd :function(md){
        this.md[md] = false;
        this.md.mask = false;
      },
      toggle :function(){
        this.activeBox.isActive=!this.activeBox.isActive;
        this.activeBox.fontActive=!this.activeBox.fontActive;
      },
      pullUp :function () {
        this.activeBox.rewardShow=!this.activeBox.rewardShow;
        this.activeBox.pullUpShow=!this.activeBox.pullUpShow;
        this.md.mask=!this.md.mask;
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/setRoom.scss";
</style>

