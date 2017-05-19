<template>
  <div class="groupInfo flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="flex-wrap tab-box">
       <div class="tab-type flex-con-1" :class="{'active': item.active}" v-for="(item,index) in tabType" @click="tabActive(index)">{{item.title}}</div>
       <!--<div class="tab-type flex-con-1">上分记录</div>-->
       <!--<div class="tab-type flex-con-1">下分记录</div>-->
    </div>
    <div class="content flex-con-1">
      <div class="scroll">
        <ul v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="30"
            infinite-scroll-immediate-check=true>
          <li class="flex-wrap flex-center recordLis" v-for="(item,index) in dataLis.list">
            <div class="flex-wrap flex-center user-info">
              <img :src="item.userImg" alt="">
              <div class="record-text">
                <p>{{item.userName}}<em>（ID:{{item.userCode}}）</em></p>
                <p>{{item.createDate}}</p>
              </div>
            </div>
            <div class="score" v-if="item.score>0">+{{item.score}}</div>
            <div class="score" v-if="item.score<0">{{item.score}}</div>
          </li>
        </ul>
        <p class="page-infinite-loading" v-show="showLoading"><span><div class="mint-spinner-fading-circle circle-color-76" style="width: 28px; height: 28px;"><div class="mint-spinner-fading-circle-circle is-circle2"></div><div class="mint-spinner-fading-circle-circle is-circle3"></div><div class="mint-spinner-fading-circle-circle is-circle4"></div><div class="mint-spinner-fading-circle-circle is-circle5"></div><div class="mint-spinner-fading-circle-circle is-circle6"></div><div class="mint-spinner-fading-circle-circle is-circle7"></div><div class="mint-spinner-fading-circle-circle is-circle8"></div><div class="mint-spinner-fading-circle-circle is-circle9"></div><div class="mint-spinner-fading-circle-circle is-circle10"></div><div class="mint-spinner-fading-circle-circle is-circle11"></div><div class="mint-spinner-fading-circle-circle is-circle12"></div><div class="mint-spinner-fading-circle-circle is-circle13"></div></div></span>
          加载中...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Api from '@/fetch/api'
  import config from '@/config'
  import common from '@/assets/js/common'
  import { Toast } from 'mint-ui'
  import { InfiniteScroll } from 'mint-ui';
  Vue.use(InfiniteScroll);
  export default{
    name: 'historyRecord',
    data(){
      return{
        user: this.$store.state.user,
        headerMag:{
          title:'历史记录',
          rightMsg: '',
          rightUrl: ''
        },
        loading :false,
        showLoading :false,
        page:1,
        index:0,
        scoreType:'',
        roomId: this.$route.params.roomid,
        dataLis:"",
        md:{
          active: '',
          mask: false,
        },
        tabType:[{title:'全部',active:true},{title:'上分记录',active:false},{title:'下分记录',active:false}]
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
      },
      loadMore() {
        let self=this;
        const roomId=self.roomId;
        self.loading = true;
        self.showLoading = true;
        self.page=self.page+1;
        setTimeout(() => {
          if(self.index==0){
           self.scoreType='O';
          }else if(self.index==1){
            self.scoreType='U';
          }else if(self.index==2){
            self.scoreType='D';
          }
          Api.getRoomScoreRecord(function(data){
            if(data.msgCode == '200'){
              self.dataLis.list=self.dataLis.list.concat(data.list);
              self.showLoading = false;
              self.loading = false;
            }else if(data.msgCode=='708') {
              Toast('暂无更多了哦！');
              self.loading = true;
              self.showLoading = false;
            }
          },roomId,self.scoreType,self.page,10);
        }, 2500);
      },
      getRoomScoreRecord:function (scoreType) {
        const self=this;
        const roomId=self.roomId;
        Api.getRoomScoreRecord(function (data) {
          self.dataLis=data;
        },roomId,scoreType,1,10)//scoreType  U 上分 D 下分  S 发包 R 抢包  O传查全部
      },
      tabActive: function (index) {
          this.index=index;
           this.loading = false;
         for(let i=0;i<this.tabType.length;i++){
           this.tabType[i].active=false;
         }
         this.tabType[index].active=true;
        if(index==0){
          this.getRoomScoreRecord("O")
        }else if(index==1){
          this.getRoomScoreRecord("U")
        }else if(index==2){
          this.getRoomScoreRecord("D")
        }
      }
    },
    created(){
        const self=this;
        const roomId=self.roomId;
        Api.getRoomScoreRecord(function (data) {
          self.dataLis=data;
        },roomId,"O",1,10)//scoreType  U 上分 D 下分  S 发包 R 抢包  O传查全部
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/historyRecord.scss";

</style>


