
<template>
	<div class="hot flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="content flex-con-1">
	       	<div class="scroll">
	          	<ul class="hot-room-list">
	          		<li class="no-record" v-if="hotArr.length == 0"><div class="no-record-img"></div><div class="no-record-info">暂无热门推荐</div></li>
	          	 	<li class="flex-wrap" @click="addRoom(hot.roomNumber,'')" v-for="hot in hotArr">
                  <div class="owner-head">
                    <img :src="hot.houseOwner" alt="" />
                    <i class="owner-identify"></i>
                  </div>
                  <div class="room-info">
                    <div class="room-code">房间号（{{hot.roomNumber}}）<span :class="{ 'room-state': true, 'active': hot.roomStatus == 'P'}">{{hot.roomStatus | roomStatus_f}}</span></span></div>
                    <div class="room-tips" v-if="hot.awardStatus == 'Y'">玩法：{{hot.gameplay}}    额外加奖</div>
                    <div class="room-tips" v-if="hot.awardStatus == 'N'">玩法：{{hot.gameplay}}</div>
                    <i class="ic-arrow-rw"></i>
                  </div>
                </li>
	          	</ul>
	        </div>
		</div>
		<!--弹出层-->
		<div class="md-mask" :class="{ 'active': md.mask }"></div>
		<div class="md-modal md-effect-1 md-room-info" :class="{ 'md-show': md.mdRoomInfo }">
			<div class="md-content">
				<i class="md-close ic-close-gray" @click="closeMd('mdRoomInfo')"></i>

			</div>
		</div>

	</div>
</template>

<script>
import Vue from 'vue'
import Api from '@/fetch/api'
import common from '@/assets/js/common'
import { Toast,Indicator } from 'mint-ui'
export default{
	data(){
		return{
			headerMag:{
				title:'热门推荐',
				rightMsg: '',
				rightUrl: ''
			},
			md:{
				mask: false,
				mdRoomInfo : false
			},
			hotArr : []
		}
	},
	beforeCreate(){
		let self = this;
		Indicator.open();
		Api.hotRecommend(function(data){
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
			Api.enterRoom(function(data) {
				if(data.msgCode == '200') {
					self.$store.dispatch('activeRoom', data);
					self.$router.push('/roomCard/room/' + roomId)
				} else if(data.msgCode == '301') {
					Toast({ message: '房间号不存在', duration: 1300 });
				}
			}, {
				roomId: roomId,
				roomPwd: roomPwd
			})
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/roomCard/hotRoom.scss";
</style>
