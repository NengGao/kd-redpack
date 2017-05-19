<template>
  <div class="groupInfo flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="content flex-con-1">
      <div class="scroll">
        <div class="my-room">
          <ul class="hot-room-list">
            <li class="no-record" v-if="hotArr.hotRoomList==''||hotArr.hotRoomList==null"><div class="no-record-img"></div><div class="no-record-info" v-if="page">暂无房间，快去创建吧</div></li>
            <li class="hotLis" v-for="(item,index) in hotArr.hotRoomList" @click="addRoom(item.roomNumber,'')">
              <div class="hotLis-box">
                <img :src="item.houseOwner" alt="">
                <div class="hot-text">
                  <p>{{item.notice}}</p>
                  <div class="star-box">
                    <div class="star-left">
                      <i :class="{'ic_no_star':item.starLevel==0,'ic_half_star':item.starLevel==1,'ic_star':item.starLevel>=2}"></i>
                      <i :class="{'ic_no_star':item.starLevel-2<=0,'ic_half_star':item.starLevel-2==1,'ic_star':item.starLevel-2>=2}"></i>
                      <i :class="{'ic_no_star':item.starLevel-4<=0,'ic_half_star':item.starLevel-4==1,'ic_star':item.starLevel-4>=2}"></i>
                      <i :class="{'ic_no_star':item.starLevel-6<=0,'ic_half_star':item.starLevel-6==1,'ic_star':item.starLevel-6>=2}"></i>
                    </div>
                    <div class="star-right">
                      <div class="room-box">
                        <i class="ic_house"></i>
                        <span>房号：{{item.roomNumber}}</span>
                      </div>
                      <div class="person-box">
                        <i class="ic_person"></i>
                        <span><em>{{item.onlineNumber}}</em>/{{item.headCount}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--<i class="ic_today_tj" v-if="index<2"></i>-->
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
        hotArr : [],
        page: true,
        headerMag:{
          title:'我的房间',
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
	      Api.mineRoom(function(data){
	        Indicator.close();
	        self.hotArr = data
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
      addRoom(roomId, roomPwd) {
        let self = this;
        Indicator.open();
        Api.enterRoom(function(data) {
          Indicator.close();
          if(data.msgCode == '200') {
            self.$store.dispatch('activeRoom', data);
            self.$router.push('/roomCard/room/' + roomId)
          }else{
            Toast({ message: data.msgNote, duration: 1500 });
          }
        }, {
          roomId: roomId,
          roomPwd: roomPwd
        })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/myRoom.scss";
</style>


