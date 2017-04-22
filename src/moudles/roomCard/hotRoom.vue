
<template>
	<div class="hot flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="content flex-con-1">
	       	<div class="scroll">
	          	<ul class="hot-room-list">
	          	 	<li class="flex-wrap" @click="showMd('mdRoomInfo')">
						<div class="owner-head">
							<img src="http://wx.qlogo.cn/mmopen/WdJ2BLGuxzOm43YiaMwnyrmoGqSekH86zoyJmicPcyrCjwPPhPZKOLB23zLc25q1ktzLCicsN8UsD6tmib8V9Z53VHR2daFenvBg/0" alt="" />
							<i class="owner-identify"></i>
						</div>
						<div class="room-info">
							<div class="room-code">房间号（1100）<span class="room-state active">游戏中</span></div>
							<div class="room-tips">玩法：红包接龙(100点/4包)     额外加奖</div>
							<i class="ic-arrow-rw"></i>
						</div>
					</li>
					<li class="flex-wrap" @click="showMd('mdRoomInfo')">
						<div class="owner-head">
							<img src="http://wx.qlogo.cn/mmopen/WdJ2BLGuxzOm43YiaMwnyrmoGqSekH86zoyJmicPcyrCjwPPhPZKOLB23zLc25q1ktzLCicsN8UsD6tmib8V9Z53VHR2daFenvBg/0" alt="" />
							<i class="owner-identify"></i>
						</div>
						<div class="room-info">
							<div class="room-code">房间号（1100）<span class="room-state active">游戏中</span></div>
							<div class="room-tips">玩法：红包接龙(100点/4包)     额外加奖</div>
							<i class="ic-arrow-rw"></i>
						</div>
					</li>
					<li class="flex-wrap" @click="showMd('mdRoomInfo')">
						<div class="owner-head">
							<img src="http://wx.qlogo.cn/mmopen/WdJ2BLGuxzOm43YiaMwnyrmoGqSekH86zoyJmicPcyrCjwPPhPZKOLB23zLc25q1ktzLCicsN8UsD6tmib8V9Z53VHR2daFenvBg/0" alt="" />
							<i class="owner-identify"></i>
						</div>
						<div class="room-info">
							<div class="room-code">房间号（1100）<span class="room-state active">游戏中</span></div>
							<div class="room-tips">玩法：红包接龙(100点/4包)     额外加奖</div>
							<i class="ic-arrow-rw"></i>
						</div>
					</li>
					<li class="flex-wrap" @click="showMd('mdRoomInfo')">
						<div class="owner-head">
							<img src="http://wx.qlogo.cn/mmopen/WdJ2BLGuxzOm43YiaMwnyrmoGqSekH86zoyJmicPcyrCjwPPhPZKOLB23zLc25q1ktzLCicsN8UsD6tmib8V9Z53VHR2daFenvBg/0" alt="" />
							<i class="owner-identify"></i>
						</div>
						<div class="room-info">
							<div class="room-code">房间号（1100）<span class="room-state active">游戏中</span></div>
							<div class="room-tips">玩法：红包接龙(100点/4包)     额外加奖</div>
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
			}
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
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/roomCard/hotRoom.scss";
</style>