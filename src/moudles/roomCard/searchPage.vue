<template>
  <div class="groupInfo flex-wrap">
    <div class="flex-wrap flex-center header">
      <i class="ic-close-white" @click="goBack"></i>
      <div class="flex-wrap flex-center input-box">
         <i class="ic-search"></i>
         <input type="text" placeholder="输入对方ID号" class="searchId" v-model="inputId" >
      </div>
      <div class="cancel" @click=search>搜索</div>
    </div>
    <div class="content flex-con-1">
      <div class="scroll">
        <div class="no-find-user" v-show="md.noInfoShow">
          <i class="ic-eye"></i>
          <p>未找到该用户</p>
          <p>请核实该用户ID号后重试</p>
        </div>
        <div class="play-box">
          <div :class="{'flex-wrap':true,'flex-center':true,'play-list':true,'active':_user.active}"  v-for="(_user,i) in userList">
            <div class="play-left flex-wrap">
              <img :src="_user.userImg" alt="">
              <div class="play-info">
                <p>{{_user.userName}}</p>
                <p>ID:{{_user.userCode}}</p>
              </div>
            </div>
            <div class="flex-wrap flex-center play-right-box">
              <div class="play-middle">{{_user.score | RMB_f}}</div>
              <div class="flex-wrap flex-center play-right">
                <i class="ic-add" @click="addPoint(i)"></i>
                <i class="ic-reduce" @click="reducePoint(i)"></i>
                <i class="ic-clean" @click="changeTap(i)"></i>
              </div>
            </div>
            <!--<div class="flex-wrap flex-center play-right-box" v-show="_user.playAddBox">
              <div class="flex-wrap flex-center play-right">
                <i class="ic-reduce-gray" @click="reduceEvent(i)"></i>
                <div class="flex-wrap flex-center play-input">
                   <em>{{_user.score}}</em>
                   <em>{{markType}}</em>
                   <input type="number" class="add-num" v-model="inputData">
                </div>
                <i class="ic-add-white" @click="addEvent(i)"></i>
              </div>
              <i class="ic-yes" @click="confirmEvent(i)"></i>
            </div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="md-mask" :class="{ 'active': md.mask }"></div>
    <!--加分弹窗-->
    <div class="md-modal md-effect-1 md-point" :class="{ 'md-show': md.addPoint }">
      <div class="md-content">
        <i class="md-close ic-close-gray" @click="closeMd('addPoint')"></i>
        <div class="title">增加积分</div>
        <input type="number" class="inp" placeholder="请输入增加分数" v-model="point.add" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"/>
        <div class="tips">玩家分数：<em>{{point.num | RMB_f}}</em></div>
        <input type="button" class="btn" value="确定" @click="confirmEvent(point.index)"/>
      </div>
    </div>

    <!--减分弹窗-->
    <div class="md-modal md-effect-1 md-point" :class="{ 'md-show': md.reducePoint }">
      <div class="md-content">
        <i class="md-close ic-close-gray" @click="closeMd('reducePoint')"></i>
        <div class="title">扣除积分</div>
        <input type="number" class="inp" placeholder="请输入扣除分数" v-model="point.reduce" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"/>
        <div class="tips">玩家分数：<em>{{point.num | RMB_f}}</em></div>
        <input type="button" class="btn" value="确定" @click="confirmEvent(point.index)" />
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/fetch/api'
  import common from '@/assets/js/common'
  import { Toast,MessageBox} from 'mint-ui'
  export default{
    name: 'searchPage',
    data(){
      return{
        user: this.$store.state.user,
        activeRoom: this.$store.getters.getActiveRoom || '',
        md:{
          active: '',
          mask: false,
          filterShow:false,
          reducePoint : false,
          addPoint : false,
          noInfoShow : false,
        },
        point:{
          add:'',
          reduce :'',
          num : '',
          type: true,
          index:　0
        },
        inputId:'',
        selectTitle : "全部玩家",
        selectAll :{
          roomId: this.$route.params.roomid,
          userCode : '',
          orderBy : 'desc',
          selectType : ''
        },
        selectData : {
          roomId: this.$route.params.roomid,
          userCode : '',
          orderBy : 'desc',
          selectType : 'onLine'
        },
        filterLis:[{title:'全部玩家',active:true,},{title:'点数不足',active:false,type:'selectType',val:'notEnough'},{title:'在线玩家',active:false,type:'selectType',val:'onLine'},{title:'离线玩家',active:false,type:'selectType',val:'onLine'},{title:'加入时间•倒序↓',active:false,type:'orderBy',val:'desc'},{title:'加入时间•正序↑',active:false,type:'orderBy',val:'asc'}],
        userList:[]
      }
    },
    methods:{
      showMd: function(md){
        this.md[md] = true;
        this.md.mask = true;
      },
      closeMd: function(md){
        if(md == 'all'){
          for(let Key in this.md){
            this.md[Key] = false;
            this.md.mask = false;
          }
        }else{
          this.md[md] = false
          this.md.mask = false
        }
      },
      changeTap:function (i) {
        //清零功能
        let self=this;
        MessageBox.confirm('是否清零?').then(action => {
          Api.upDownScore(function(data){
            if(data.msgCode == '200'){
              self.userList[i].score=0;
              Toast({message: '操作成功',duration: 1300,iconClass: 'ic-toast-success'});
            }
          },{
            roomId: self.$route.params.roomid,
            userCode : self.userList[i].userCode,
            scores : 0
          })
        });
      },
      pullDown: function () {
        this.md.mask=!this.md.mask;
        this.md.filterShow=!this.md.filterShow;
      },
      goBack: function(){
        this.$router.back()
      },
      addPoint : function(index){
        this.showMd('addPoint');
        this.point.type = true;
        this.point.index = index;
        this.point.num = this.userList[index].score;
      },
      reducePoint : function(index){
        this.showMd('reducePoint');
        this.point.type = false;
        this.point.index = index;
        this.point.num = this.userList[index].score;
      },
      changeSelectData: function(type,val){
        if(!type) this.selectData = this.selectAll;
        this.selectData[type] = val;
      },
      confirmEvent: function (i) {
        let self = this;
        let scores = self.point.type ? self.point.add : -self.point.reduce;
        Api.upDownScore(function(data){
          if(data.msgCode == '200'){
            self.closeMd('all');
            let score = parseFloat(self.userList[i].score) + parseFloat(scores);
            self.activeRoom.userScore = score;
            self.$store.dispatch('activeRoom',self.activeRoom);
            self.userList[i].score = score;

            Toast({message: '操作成功',duration: 1300,iconClass: 'ic-toast-success'});
          }
        },{
          roomId: self.$route.params.roomid,
          userCode : self.userList[i].userCode,
          scores : scores
        })
      },
      getRoomUserScore : function(){
        let self = this;
        Api.getRoomUserScore(function(data){
          if(data.msgCode == '200'){
            self.userList = data.list;
          }
        },self.selectData)
      },
      search: function () {
          this.md.noInfoShow=false;
          if(this.inputId==""||this.inputId==null||this.inputId==undefined){
              Toast("请输入对方的ID号")
          }else {
            const userCode=this.inputId;
            let self = this;
            Api.getRoomUserScore(function(data){
              if(data.msgCode == '200'){
                if(data.list==""||data.list==null||data.list==undefined){
                  self.md.noInfoShow=true;
                }else {
                  self.md.noInfoShow=false;
                  self.userList = data.list;
                }
              }else{
                self.md.noInfoShow=true;
              }

            },{
              roomId: self.$route.params.roomid,
              userCode : userCode,
              orderBy : 'desc',
              selectType : 'all',
              page : 1,
              pageSize  : 10,
            })
          }

      },

    },
   	created(){
				let userCode = this.$route.params.userCode;
				let self = this;
				if(userCode == 0) return;
				Api.getRoomUserScore(function(data){
	          if(data.msgCode == '200'){
	            if(data.list==""||data.list==null||data.list==undefined){
	              self.md.noInfoShow=true;
	            }else {
	              self.md.noInfoShow=false;
	              self.userList = data.list;
	            }
	          }else{
	            self.md.noInfoShow=true;
	          }
        },{
          roomId: self.$route.params.roomid,
          userCode : userCode,
          orderBy : 'desc',
          selectType : 'onLine',
          page : 1,
          pageSize  : 10,
        })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/searchPage.scss";

</style>


