
<template>
	<div class="hot flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="inform flex-wrap">
			<div class="informList flex-con-1">
				
			</div>
			<div class="more"></div>
		</div>
		<div class="content flex-wrap flex-con-1" ref="wrapper">
	       	<div class="scroll">
          		<div class="game-info">
          			<div class="owner"><img src="http://wx.qlogo.cn/mmopen/WdJ2BLGuxzOm43YiaMwnyrmoGqSekH86zoyJmicPcyrCjwPPhPZKOLB23zLc25q1ktzLCicsN8UsD6tmib8V9Z53VHR2daFenvBg/0" alt="" /></div>
          			<div class="owner-name">冬天的东</div>
          			<div class="owner-account">微信号：wx396162610</div>
          			<div class="game-tips"></div>
          			<div class="game-rule">游戏规则：100点/4包，抢最小的发下一包，为避免逃包，由系统代发。</div>
          			<div class="game-explain">每包抽取20点作为额外奖励，奖励如下：</div>
          			<ul class="game-award">
          				<li>◆  一份情（开出0.01点，奖励100点）</li>
          				<li>◆  大豹子（如77.77～11.11，奖励420点）</li>
          				<li>◆  一份情（开出0.01点，奖励100点）</li>
          				<li>◆  大豹子（如77.77～11.11，奖励420点）</li>
          				<li>◆  一份情（开出0.01点，奖励100点）</li>
          				<li>◆  大豹子（如77.77～11.11，奖励420点）</li>
          			</ul>
          		</div>
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
import BScroll from 'better-scroll'

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
	created() {
		
	},
	methods:{
		
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/roomCard/room.scss";
</style>