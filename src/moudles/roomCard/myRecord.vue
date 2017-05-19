<template>
  <div class="groupInfo flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="content flex-con-1">
      <div class="scroll">
        <!-- 我的战绩 -->
        <div class="my-record">
        <ul class="record-list">
        <li class="no-record" v-if="myRecord.length == 0">
        <div class="no-record-img"></div>
        <div class="no-record-info">暂无记录</div>
        </li>
        <li class="flex-wrap" v-for="record in myRecord" @click="recordDetails(record.bout,record.roomNumber,record.createBy)">
        <div class="owner-head">
        <img :src="record.houseOwner" alt="" />
        <i class="owner-identify"></i>
        </div>
        <div class="room-info">
        <div class="room-code">房间号（{{record.roomNumber}}）<span class="game-code">({{record.bout}}局)</span></div>
        <div class="room-tips">{{record.time}}</div>
        <div class="grade active"></div>
        <i class="ic-arrow-rw"></i>
        </div>
        </li>
        </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/fetch/api'
  import config from '@/config'
  import common from '@/assets/js/common'
  import { Toast,Indicator } from 'mint-ui'
  export default{
    name: 'myRoom',
    data(){
      return{
        user: this.$store.state.user,
        activeRoom: this.$store.getters.getActiveRoom || '',
        roomCard: common.getJsonLocal("roomCard") || '',
        myRecord:'',
        headerMag:{
          title:'我的战绩',
          rightMsg: '',
          rightUrl: ''
        },
        md:{
          active: '',
          mask: false,
        },
      }
    },
    created(){
      let self=this;
      Indicator.open();
      Api.myResult(function(data){
        Indicator.close();
        self.myRecord = data
      })
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
      recordDetails(b,r,u){
        this.$router.push('/roomCard/recordDetails/' + b + '/' + r + '/' + u)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/myRecord.scss";
</style>


