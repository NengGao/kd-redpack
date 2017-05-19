<template>
  <div class="setRoom flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="content flex-con-1">
      <div class="scroll">
        <div class="flex-wrap flex-center setRoom-Box">
          <span class="setRoom-left">游戏模式</span>
          <span class="setRoom-right">红包接龙</span>
        </div>
        <div class="flex-wrap flex-center setRoom-Box" style="margin-bottom: 0.5rem" @click="rulePull">
          <span class="setRoom-left">游戏规则</span>
          <span class="setRoom-right set-right"><span>{{defaultData.ruleMsg}}</span><i class="ic-arrow-rg"></i></span>
        </div>
        <!--@click="numberPull(index)"-->
        <div class="flex-wrap flex-center setRoom-Box" v-for="(item,index) in defaultLis" @click="numberPull(index)">
          <span class="setRoom-left">{{item.title}}</span>
          <span class="setRoom-right set-right" style="margin-right: 0.8rem">{{item.type}}</span>
        </div>

        <!--<div class="setRoom-Box margin-Top set-right" @click="showMd('mdGamePlay')">-->
        <!--<span class="setRoom-left">游戏打赏</span>-->
        <!--<span class="setRoom-right set-right">每包抽{{defaultData.percent}}%<i class="ic-arrow-rg"></i></span>-->
        <!--</div>-->
        <div class="flex-wrap flex-center reward-Box margin-Top" @click="pullUp">
          <div class="reward-left">
            <span class="setRoom-left" style="line-height: 1.5rem">游戏奖励</span>
            <div class="reward-text">添加额外的奖励，如顺子,豹子等</div>
          </div>
          <span class="setRoom-right set-right"><i class="ic-arrow-rg"></i></span>
        </div>

        <div class="room-language margin-Top">
          <div class="title">房间欢迎语</div>
          <input type="text" class="input-language" placeholder="写一句欢迎语，让大家都能看到~" maxlength="40" v-model="inputText">
        </div>
        <!--<div class="flex-wrap flex-center setRoom-Box margin-Top" @click="showMd('mdGameWX')">-->
        <!--<span class="setRoom-left">群主微信号<em>（认领成功后显示）</em></span>-->
        <!--<span class="setRoom-right set-right"><i class="ic-arrow-rg"></i></span>-->
        <!--</div>-->
        <input type="button" class="create-room-btn" value="确认修改" @click="resetRoom" :disabled="disabled">
        <p style="margin-top: 1rem">重要提示：</p>
        <p>• 每局开始须消耗1张房卡，第一包将由房主发放；</p>
        <p>• 如有疑问请联系在线客服（工作日09:00-18:00）。</p>
      </div>
    </div>
    <!--选择游戏规则-->
    <div class="rule-box" v-show="md.rule" :class="{'pullUp': md.ruleAddClass}">
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
    <div class="rule-box" v-show="md.redpack" :class="{'pullUp': md.numberAddClass}">
      <div class="rule-title">{{aMountLis[index].title}}</div>
      <div class="rule-choose" @click="aMountActive(aMountLis[index].list,ix)" v-for="(item,ix) in aMountLis[index].list">
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
          <input type="number" pattern="\d*" class="number" placeholder="输入每包抽取比例" v-model="inputPercent"><em>%</em>
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
        <div class="text">设置中奖奖励分数。</div>
        <div class="flex-wrap flex-center get-reward">
          <input type="number" pattern="\d*" class="reward-number" placeholder="请输入奖励分数" v-model="inputVal" @keyup="clearNoNum(inputVal)">
        </div>
        <input type="button" value="确定" class="reward-confirm-btn" :class="{'changeBg':md.changeBg}" @click="rewardConfirm">
      </div>
    </div>
    <!--额外奖励-->
    <div class="extra-reward" v-show="md.rewardShow" :class="{'pullUp': md.pullUpShow}">
      <div class="extra-reward-title">游戏奖励</div>
      <div class="flex-wrap flex-center reward-type" @click="rewardActive('awardList',index)" v-for="(reward,index) in setRoomData.awardList">
        <div class="flex-wrap flex-center left-content">
          <div class="choose-type" :class="{'active': setRoomData.awardList[index].active}"></div>
          <div class="nameBox">
            <p :class="{'font-active' :setRoomData.awardList[index].active}">{{reward.awardName}}</p>
            <p>{{reward.awardDesc}}</p>
          </div>
        </div>
        <div class="flex-wrap right-content">
          <span @click.stop="editReward(index)">奖励x{{reward.awardMultiple}} 倍</span>
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
        user: this.$store.state.user,
        headerMag:{
          title:'修改房间玩法',
          rightMsg: '',
          rightUrl: ''
        },
        //设置默认的数据
        defaultLis:[
          {title:'每包金额数',type:'10点'},
          {title:'每包红包数',type:'4个'},
          {title:'一局发放的包数',type:'25包'},
        ],
        defaultData:{
          ruleMsg:'尾数最小的发',
          chooseNum:0,
          percent:15,
        },
        aMountLis:[
          {title:'每包金额数',list:[{type:'10',dataType:'点',active:true}],active:true},
          {title:'每包红包数',list:[{type:'4',dataType:'个',active:true},{type:'2',dataType:'个',active:false}],active:true},
          {title:'一局发放的包数',list:[{type:'25',dataType:'包',active:true}],active:true},
        ],
        //动态数据
        setRoomData:"",
        extraAward:[],
        ruleLis:'',
        //输入框数据
        inputVal:"",
        inputPercent:'',
        inputText:'',
        //提交的数据
        setRoompara:{
          jsonRoom:{ruleId:"LastMinGameRule",packetAmt: 10, packetSplitNum: 4,packetsPerBout: 25, commissionRate: 0.2, weixinNo:""},
          extraAward : "W",
          roomId:"",
        },
        //存传值的数据
        i:'',
        index:0,
        //弹窗的显示状态
        disabled:false,
        md:{
          active: '',
          mask: false,
          mdGamePlay : false,
          mdGameReward : false,
          maskRule :false,
          mdGameWX: false,
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
      }
    },
    watch:{
      inputVal :function (val) {
        if(val.length>0){
          this.md.changeBg=true;
        }else {
          this.md.changeBg=false;
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
      clearNoNum: function (obj) {
        this.inputVal = obj.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
        this.inputVal = obj.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
        this.inputVal = obj.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        this.inputVal = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数

      },
      confirm:function (md) {
        if(this.inputPercent==""||this.inputPercent==null||this.inputPercent==undefined){
          Toast({message: '请输入抽取比例',duration: 2000});
        }else {
          this.md[md] = false;
          this.md.mask = false;
          this.defaultData.percent=this.inputPercent;
          this.setRoompara.jsonRoom.commissionRate=(this.defaultData.percent/100);
        }
      },
      confirmWX:function (md) {
        var data = this.setRoompara;
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
          this.defaultData.ruleMsg=this.ruleLis[index].ruleName;
          this.setRoompara.jsonRoom.ruleId=this.ruleLis[index].ruleId;
          this.md.rule=false;
          this.md.mask=false;
        }
      },
      aMountActive: function (arr,index) {
        for(let i=0;i<arr.length;i++){
          arr[i].active = false;
        }
        arr[index].active = true;
        this.defaultLis[this.index].type=this.aMountLis[this.index].list[index].type+this.aMountLis[this.index].list[index].dataType;
        if(this.index==0){
          this.setRoompara.jsonRoom.packetAmt=this.aMountLis[this.index].list[index].type;
        }else if(this.index==1){
          this.setRoompara.jsonRoom.packetSplitNum=this.aMountLis[this.index].list[index].type;
        }else if(this.index==2){
          this.setRoompara.jsonRoom.packetsPerBout=this.aMountLis[this.index].list[index].type;
        }
        this.md.redpack=false;
        this.md.mask=false;
      },
      rewardActive: function (arr,index) {
        this.i=index;
        this.extraAward=[];
        this.defaultData.chooseNum = 0;
        this.setRoomData[arr][index].active = !this.setRoomData[arr][index].active;
        let num=this.setRoomData[arr];
        for (let i=0;i<num.length;i++){
          if(num[i].active==true){
            this.defaultData.chooseNum ++;
            this.extraAward.push({awardRuleId:num[i].awardRuleId,awardAmt:num[i].awardAmt,awardMultiple:parseFloat(num[i].awardMultiple)});
          }
        }
        this.setRoompara.extraAward=this.extraAward;
      },
      editReward:function (index) {
        this.i=index;
        this.md.mdGameReward =!this.md.mdGameReward;
        this.md.maskRule =!this.md.maskRule;
      },
      rewardConfirm: function(){
        if(this.inputVal<=0){
          Toast("请输入正确的奖励倍数");
        }else {
          this.setRoomData.awardList[this.i].awardMultiple=this.inputVal;
          this.extraAward=[];
          let num=this.setRoomData.awardList;
          for (let i=0;i<num.length;i++){
            if(num[i].active==true){
              this.extraAward.push({awardRuleId:num[i].awardRuleId,awardAmt:num[i].awardAmt,awardMultiple:parseFloat(num[i].awardMultiple)});
            }
          }
          this.setRoompara.extraAward=this.extraAward;
          this.md.mdGameReward =!this.md.mdGameReward;
          this.md.maskRule =!this.md.maskRule;
        }
      },
      pullUp: function () {
        this.md.rewardShow=!this.md.rewardShow;
        this.md.pullUpShow=!this.md.pullUpShow;
        this.md.mask=!this.md.mask;
      },
      rulePull: function () {
        this.md.rule = !this.md.rule;
        this.md.ruleAddClass=!this.md.ruleAddClass;
        this.md.mask=!this.md.mask;
      },
      numberPull: function (index) {
        this.index=index;
        this.md.redpack = !this.md.redpack;
        this.md.numberAddClass = !this.md.numberAddClass;
        this.md.mask=!this.md.mask;
      },
      resetRoom: function () {
        const self=this;
        self.disabled=true;
        var data = this.setRoompara;
        if(typeof data.jsonRoom=='string'){
          data.jsonRoom=JSON.parse(data.jsonRoom);
        }
        this.setRoompara.jsonRoom.weixinNo=this.inputText;
        data.jsonRoom=JSON.stringify(data.jsonRoom);
        data.extraAward=JSON.stringify(data.extraAward);
        data.roomId=common.getJsonLocal("activeRoom").roomId;
        Api.updateRoom(function (data) {
          if(data.msgCode==200){
            Toast({message: '设置成功',duration: 800,iconClass: 'ic-toast-success'});
            setTimeout(function () {
              window.history.back();
            },1000);
          }else if(data.msgCode==613){
            Toast('当前状态无法修改！')
          }else if(data.msgCode==612){
            Toast('修改失败！')
          }else if(data.msgCode==605){
            Toast('操作太频繁！')
          }
        },data);
        setTimeout(function () {
          self.disabled=false;
        },500)

      }
    },
    created(){
      const self=this;
      Api.setRoom(function (data) {
        let roomId=common.getJsonLocal("activeRoom").roomId;
        if(data.awardList!=""||data.awardList!=undefined||data.awardList!=null){
          for(let i =0;i< data.awardList.length;i++) {
            data.awardList[i].active = false;
            data.awardList[i].awardMultiple = 10;//倍数
            data.awardList[i].awardAmt = 0;//固定奖励
          }
        }
        if(data.ruleList!=""||data.ruleList!=undefined||data.ruleList!=null) {
          for (let i = 0; i < data.ruleList.length; i++) {
            if (i == 0) {
              data.ruleList[0].active = true;
            } else {
              data.ruleList[i].active = false;
            }
          }
          self.ruleLis=data.ruleList;
        }
        self.setRoomData=data;

        Api.getRoomInfo(function (data) {
          self.defaultData.ruleMsg=data.ruleName;
          self.defaultLis[0].type=data.packetAmt+"点";
          self.defaultLis[1].type=data.packetSplitNum+"个";
          self.defaultLis[2].type=data.packetPerBout+"包";
         //    开始时赋值的点 个 包 数
          self.setRoompara.jsonRoom.packetAmt=data.packetAmt;
          self.setRoompara.jsonRoom.packetSplitNum=data.packetSplitNum;
          self.setRoompara.jsonRoom.packetsPerBout=data.packetPerBout;
          self.setRoompara.jsonRoom.ruleId=data.ruleId;
          self.setRoompara.jsonRoom.weixinNo=data.introduction;
         for(let i=0;i<self.setRoomData.ruleList.length;i++){
             if(self.setRoomData.ruleList[i].ruleId==data.ruleId){
               self.defaultData.ruleMsg=self.setRoomData.ruleList[i].ruleName;

             }
         }
         // 开始时赋值的奖励倍数
          for (let i=0;i<data.list.length;i++){
            self.extraAward.push({awardRuleId:data.list[i].awardRuleId,awardAmt:data.list[i].awardAmt,awardMultiple:parseFloat(data.list[i].awardMultiple)});
          }
          self.setRoompara.extraAward=self.extraAward;
         //  开始时选中的奖励
          self.inputText=data.introduction;
          for(let j=0;j<self.setRoomData.awardList.length;j++){
            for(let i=0;i<data.list.length;i++){
              if(data.list[i].awardRuleId==self.setRoomData.awardList[j].awardRuleId){
                self.setRoomData.awardList[j].active=true;
                self.setRoomData.awardList[j].awardMultiple=data.list[i].awardMultiple;
              }
            }
          }

          // self.setRoomData.awardList     roomId
        },roomId);

      });

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/resetRoom.scss";
</style>

