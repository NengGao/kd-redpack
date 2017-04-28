<template>
  <div class="setRoom flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="content flex-con-1">
        <div class="scroll">
            <div class="setRoom-Box">
               <span class="setRoom-left">游戏模式</span>
               <span class="setRoom-right">红包接龙</span>
            </div>
            <div class="setRoom-Box" @click="rulePull">
              <span class="setRoom-left">游戏规则</span>
              <span class="setRoom-right set-right"><span>{{ruleMsg}}</span><i class="ic-arrow-rg"></i></span>
            </div>

            <div class="setRoom-Box margin-Top" @click="numberPull(index)" v-for="(item,index) in defaultLis">
              <span class="setRoom-left">{{item.title}}</span>
              <span class="setRoom-right set-right">{{item.type}}<i class="ic-arrow-rg"></i></span>
            </div>

            <div class="setRoom-Box margin-Top set-right" @click="showMd('mdGamePlay')">
              <span class="setRoom-left">游戏打赏</span>
              <span class="setRoom-right set-right">每包抽{{percent}}%<i class="ic-arrow-rg"></i></span>
            </div>
            <div class="setRoom-Box" @click="pullUp">
              <span class="setRoom-left">额外奖励</span>
              <span class="setRoom-right set-right">已选{{chooseNum}}项<i class="ic-arrow-bg"></i></span>
            </div>
            <!--<div class="setRoom-Box margin-Top">-->
              <!--<span class="setRoom-left">房间密码</span>-->
              <!--<span class="setRoom-right set-right" style="color: #b8b8b8">设置密码<i class="ic-arrow-rg"></i></span>-->
            <!--</div>-->
            <div class="setRoom-Box margin-Top" @click="showMd('mdGameWX')">
              <span class="setRoom-left">群主微信号<em>（认领成功后显示）</em></span>
              <span class="setRoom-right set-right"><i class="ic-arrow-rg"></i></span>
            </div>
            <p style="margin-top: 1rem">重要提示：</p>
            <p>• 创建房间须消耗1张房卡，游戏未开始不消耗房卡；</p>
            <p>• 可设置房间密码，好友通过输入房间号和密码进入房间；</p>
            <p>• 每局须群主确定开始，第一包将由群主发放。</p>
            <input type="button" class="create-room-btn" value="创建房间" @click="createRoom">
        </div>
    </div>
    <!--选择游戏规则-->
    <div class="rule-box" v-show="activeBox.rule" :class="{'pullUp': activeBox.ruleAddClass}">
       <div class="rule-title">选择游戏规则</div>
       <div class="rule-choose" @click="addActive('ruleLis',index,1)" v-for="(rule,index) in setRoomData.ruleList">
           <div class="rule-main">
            	<p :class="{'active':rule.active}">{{rule.ruleName}}</p>
              <p>{{rule.ruleDesc}}</p>
           </div>
           <i :class="{'ic-choose':rule.active}"></i>
       </div>
       <i class="ic-close-gray" @click="rulePull"></i>
    </div>
<!--3个红包数弹窗 -->
    <div class="rule-box" v-show="activeBox.redpack" :class="{'pullUp': activeBox.numberAddClass}">
      <div class="rule-title">{{aMountLis[index].title}}</div>
      <div class="rule-choose" @click="aMountActive(aMountLis[index].list,ix,1)" v-for="(item,ix) in aMountLis[index].list">
        <div class="rule-main">
          <p :class="{'active':aMountLis[index].list[ix].active}">{{item.type}}{{item.dataType}}</p>
        </div>
        <i :class="{'ic-choose':aMountLis[index].list[ix].active}"></i>
      </div>
      <i class="ic-close-gray" @click="numberPull(index)"></i>
    </div>

    <!--游戏打赏-->
    <div class="md-mask" :class="{ 'active': md.mask }"></div>
    <div class="md-modal md-effect-1 md-game-play" :class="{ 'md-show': md.mdGamePlay }">
      <div class="md-content">
        <i class="md-close ic-close-gray" @click="closeMd('mdGamePlay')"></i>
        <div class="title">游戏打赏</div>
        <div class="text">每包抽取部分金额，作为额外奖励发放给玩家</div>
        <div class="flex-wrap flex-center get-reward">
          <input type="tel" pattern="\d*" class="number" placeholder="输入每包抽取比例" ref="percent" maxlength="3"><em>%</em>
        </div>
        <input type="button" value="确定" class="confirm-btn" @click="confirm('mdGamePlay')">
      </div>
    </div>

    <!--输入微信号-->
    <div class="md-modal md-effect-1 md-game-play" :class="{ 'md-show': md.mdGameWX }">
      <div class="md-content">
        <i class="md-close ic-close-gray" @click="closeMd('mdGameWX')"></i>
        <div class="title">微信号</div>
        <div class="flex-wrap flex-center get-reward">
          <input type="text" class="number" placeholder="输入微信号" ref="wxNum">
        </div>
        <input type="button" value="确定" class="confirm-btn" @click="confirmWX('mdGameWX')">
      </div>
    </div>
    <!--设置奖励倍数-->
    <div class="mask-rule" v-show="md.maskRule"></div>
    <div class="md-modal md-effect-1 md-game-play" :class="{ 'md-show': md.mdGameReward }">
      <div class="md-content">
        <i class="md-close ic-close-gray" @click="editReward"></i>
        <div class="title">设置奖励倍数</div>
        <div class="text">如每包金额100点，奖励倍数为2.0倍，若中则奖励200点。</div>
        <div class="flex-wrap flex-center get-reward">
          <input type="tel" pattern="\d*" class="reward-number" placeholder="请输入倍数" v-model="inputVal" maxlength="8">
        </div>
        <input type="button" value="确定" class="reward-confirm-btn" :class="{'changeBg':activeBox.changeBg}" @click="rewardConfirm">
      </div>
    </div>
    <!--额外奖励-->
    <div class="extra-reward" v-show="activeBox.rewardShow" :class="{'pullUp': activeBox.pullUpShow}">
       <div class="extra-reward-title">额外奖励</div>
       <div class="extra-reward-text">以每包金额为基准的额外奖励</div>
       <div class="flex-wrap flex-center reward-type" @click="rewardActive('awardList',index)" v-for="(reward,index) in setRoomData.awardList">
         <div class="left-content">
           <p :class="{'font-active' :setRoomData.awardList[index].active}">{{reward.awardName}}</p>
           <p>{{reward.awardDesc}}</p>
         </div>
         <div class="flex-wrap right-content">
           <span @click="editReward">奖励x{{reward.multiple}}倍</span>
           <div class="choose-type" :class="{'active': setRoomData.awardList[index].active}"></div>
           <div class="tap-edit" v-if="index==0"><span></span><em>点击可修改</em></div>
         </div>
        </div>
        <i class="ic-close-gray" @click="pullUp"></i>
    </div>
  </div>
</template>

<script>
  import Api from '@/fetch/api'
  import common from '@/assets/js/common'
  import { Toast } from 'mint-ui';

  export default{
    name: 'setRoom',
    data(){
      return{
        inputVal:"",
        chooseNum:0,
        percent:15,
        setRoompara:{
           jsonRoom:{ruleId:"LastMinGameRule",packetAmt: "100", packetSplitNum: "4",packetsPerBout: "20", commissionRate: "15", weixinNo:""},
           extraAward : "W",
        },
        ruleLis:'',
        aMountLis:[
          {title:'每包金额数',list:[{type:'100',dataType:'点',active:true},{type:'200',dataType:'点',active:false},{type:'300',dataType:'点',active:false}],active:true},
          {title:'每包红包数',list:[{type:'4',dataType:'个',active:true},{type:'5',dataType:'个',active:false}],active:true},
          {title:'一局发放的包数',list:[{type:'25',dataType:'包',active:true}],active:true},
        ],
        defaultLis:[//默认的
          {title:'每包金额数',type:'100点'},
          {title:'每包红包数',type:'4个'},
          {title:'一局发放的包数',type:'25包'},
        ],
        ruleMsg:'尾数最小的发',
        i:'',
        index:0,
        activeBox:{
          fontActive:false,
          isActive: false,
          rewardShow:false,
          pullUpShow:false,
          rule:false,
          ruleAddClass:false,
          ruleActive:1,
          numberAddClass:false,
          redpack:false,
          changeBg:false
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
          maskRule :false,
          mdGameWX: false
        },
        setRoomData:"",
        extraAward:""
      }
    },
    watch:{
      inputVal :function (val) {
         if(val.length>0){
             this.activeBox.changeBg=true;
         }else {
           this.activeBox.changeBg=false;
         }
      }
    },
    methods:{
      showMd: function(md){
        this.md[md] = true;
        this.md.mask = true;
      },
      closeMd: function(md){
        this.md[md] = false;
        this.md.mask = false;
      },
      confirm:function (md) {
        this.md[md] = false;
        this.md.mask = false;
        this.percent=this.$refs.percent.value;
        this.setRoompara.jsonRoom.commissionRate=this.percent;
      },
      confirmWX:function (md) {
        var data = this.setRoompara;
        if(typeof data.jsonRoom=='string'){
          data.jsonRoom=JSON.parse(data.jsonRoom);
        }
        this.md[md] = false;
        this.md.mask = false;
        this.setRoompara.jsonRoom.weixinNo=this.$refs.wxNum.value;
      },
      addActive : function(arr,index,type){
      		if(type != 1){
      			this[arr][index].active = !this[arr][index].active;
      		}else{
      			var _arr = this[arr];
      			for(let i=0;i<_arr.length;i++){
      				_arr[i].active = false;
      			}
      			this[arr][index].active = true;
            this.ruleMsg=this.ruleLis[index].ruleName;
            this.setRoompara.jsonRoom.ruleId=this.ruleLis[index].ruleId;
      		}
      },
      aMountActive: function (arr,index) {
        for(let i=0;i<arr.length;i++){
          arr[i].active = false;
        }
         arr[index].active = true;
         this.defaultLis[this.index].type=this.aMountLis[this.index].list[index].type+this.aMountLis[this.index].list[index].dataType;
         this.setRoompara.jsonRoom.packetAmt=this.aMountLis[this.index].list[index].type;


      },
      rewardActive: function (arr,index) {
          this.i=index;
          this.extraAward="";
          this.chooseNum = 0;
          this.setRoomData[arr][index].active = !this.setRoomData[arr][index].active;
          let num=this.setRoomData[arr];
          for (let i=0;i<num.length;i++){
              if(num[i].active==true){
                this.chooseNum ++;
                this.extraAward += num[i].awardRuleId+":"+num[i].multiple + ',';
              }
          }
          this.setRoompara.extraAward=this.extraAward;
      },
      editReward:function () {
        this.md.mdGameReward =!this.md.mdGameReward;
        this.md.maskRule =!this.md.maskRule;
      },
      rewardConfirm: function(){
        if(this.inputVal==""){

        }else {
          this.setRoomData.awardList[this.i].multiple=this.inputVal;
        }
        this.md.mdGameReward =!this.md.mdGameReward;
        this.md.maskRule =!this.md.maskRule;
      },
      pullUp: function () {
        this.activeBox.rewardShow=!this.activeBox.rewardShow;
        this.activeBox.pullUpShow=!this.activeBox.pullUpShow;
        this.md.mask=!this.md.mask;
      },
      rulePull: function () {
        this.activeBox.rule = !this.activeBox.rule;
        this.activeBox.ruleAddClass=!this.activeBox.ruleAddClass;
        this.md.mask=!this.md.mask;
      },
      numberPull: function (index) {
        this.index=index;
        this.activeBox.redpack = !this.activeBox.redpack;
        this.activeBox.numberAddClass = !this.activeBox.numberAddClass;
        this.md.mask=!this.md.mask;
      },
      createRoom: function () {
          if(this.setRoompara.jsonRoom.weixinNo==""||this.setRoompara.jsonRoom.weixinNo==undefined||this.setRoompara.jsonRoom.weixinNo==null){
            Toast('请输入微信号！')
          }else {
            var data = this.setRoompara;
            data.jsonRoom =JSON.stringify(data.jsonRoom);
            Api.createRoom(function (data) {
               this.$refs.createRoomBtn.style.disabled="";
               if(data.msgCode==200){
                 Toast({
                   message: '创建成功！',
                   duration: 1000
                 });
                 window.history.back();
               }else if(data.msgCode==707){
                 Toast('房卡不足！')
               }else if(data.msgCode==602){
                 Toast('创建失败！')
               }else if(data.msgCode==605){
                 Toast('操作太频繁！')
               }
            },data)
          }

      }
    },
    beforeCreate(){
       const self=this;
       Api.setRoom(function (data) {
        for(let i =0;i< data.awardList.length;i++) {
          data.awardList[i].active = false;
          data.awardList[i].multiple = 0.8;
        }
         for(let i =0;i< data.ruleList.length;i++) {
            if(i==0){data.ruleList[0].active = true;}else {
              data.ruleList[i].active = false;
            }
         }
         self.setRoomData=data;
         self.ruleLis=data.ruleList;
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/setRoom.scss";
</style>

