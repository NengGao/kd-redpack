
<template>
	<div class="hot flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>

		<div class="content flex-wrap flex-con-1">
			<div class="inform flex-wrap">
				<div class="informList flex-con-1">
					
				</div>
				<div class="more"></div>
			</div>
	       	<div class="scroll flex-con-1">
          		
				
	        </div>
		</div>
		<div class="footer flex-wrap">
			<div class="integral">
				<div class="title">本局积分</div>
				<div class="number">0.00</div>
			</div>
			<div class="chatInp flex-con-1">
				<div class="inp flex-wrap">
					<input type="text" class="feedIn flex-con-1" id="" value="" placeholder="说点什么吧.."/>
					<i class="ic-face"></i>
					<input type="button" class="send" value="发送"/>
				</div>
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

export default{
	data(){
		return{
			headerMag:{
				title: '房间号（'+ this.$route.params.id +'）',
				rightMsg: '<i class="ic-ganapati"></i>',
				rightUrl: '/roomCard/groupInfo'
			},
			md:{
				mask: false,
				mdRoomInfo : false
			}
		}
	},
	methods:{
		
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/roomCard/room.scss";
</style>