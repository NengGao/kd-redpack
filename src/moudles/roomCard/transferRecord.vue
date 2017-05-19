<template>
  <div class="groupInfo flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="flex-wrap tab-box">
      <div class="tab-type flex-con-1" :class="{'active': item.active}" v-for="(item,index) in tabType" @click="tabActive(index)">{{item.title}}</div>
    </div>
    <div class="content flex-con-1">
      <div class="scroll">
        <div class="no-info" v-show="md.noInfo">
           <i class="ic-no-info"></i>
           <p>暂无任何记录</p>
        </div>
        <router-link tag="div" :to="{path:'/roomCard/transferDetail',query: {recordId: item.cdk}}" class="flex-wrap flex-center recordLis" v-for="(item,i) in transferRecord">
          <div class="flex-wrap flex-center user-info">
            <img :src="item.img" alt="">
            <div class="record-text">
              <p>{{item.name}}<em>（ID:{{item.userCode}}）</em></p>
              <p>{{item.time}}</p>
            </div>
          </div>
          <div class="score">
             <div class="type" v-if="item.orderStatus=='D'">待支付</div>
             <div class="type" v-else-if="item.orderStatus=='Y'" style="color: #333">已完成</div>
             <div class="type" v-else-if="item.orderStatus=='Q'" style="color: #999">已取消</div>
             <div class="num">{{item.cardAmount}}张</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/fetch/api'
  import common from '@/assets/js/common'
  import { Toast } from 'mint-ui';
  import { Indicator } from 'mint-ui';

  export default{
    name: 'historyRecord',
    data(){
      return{
        user: this.$store.state.user,
        headerMag:{
          title:'房卡转让记录',
          rightMsg: '',
          rightUrl: ''
        },
        md:{
          active: '',
          mask: false,
          noInfo:false,
        },
        tabType:[{title:'全部',active:true},{title:'待支付',active:false},{title:'已完成',active:false},{title:'已取消',active:false}],
        transferRecord:'',
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
      payState:function (type,self) {
        Api.roomCardMakeOverRecord(function (data) {
          Indicator.close();
          if(data.length==0){
            self.md.noInfo=true;
          }
          self.transferRecord=data;
        },type);
      },
      tabActive: function (index) {
        const self=this;
        self.md.noInfo=false;
        Indicator.open();
        for(let i=0;i<this.tabType.length;i++){
          this.tabType[i].active=false;
        }
        this.tabType[index].active=true;
        if(index==0){
          this.payState('T',self);
        }else if(index==1){
          this.payState('D',self);
        }else if(index==2){
          this.payState('Y',self);
        }else if(index==3){
          this.payState('Q',self);
        }

      }
    },
    created(){
        const self=this;
        const type='T';// 订单状态:D待支付 Y已完成 Q已取消 T全部
        Indicator.open();
        Api.roomCardMakeOverRecord(function (data) {
          Indicator.close();
          if(data.length==0){
              self.md.noInfo=true;
          }
          self.transferRecord=data;
        },type)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/transferRecord.scss";

</style>


