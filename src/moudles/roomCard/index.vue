<template>
	<div class="roomCard flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="card-number">0</div>	
		<div class="content flex-wrap flex-con-1">
			<ul class="flex-wrap nav">
				<li class="flex-con-1" :class="{ active: page }" @click=changePage(true)><span>游戏大厅</span></li>
				<li class="flex-con-1" :class="{ active: !page }" @click=changePage(false)><span>我的战绩</span></li>
			</ul>
			<div class="room-card-content flex-con-1">
				<!-- 游戏大厅 -->
				<div class="game-lobby" v-show="page">
					<ul class="card-room flex-wrap">
						<li class="flex-con-1"><i class="create-room"></i>创建房间</li>
						<li class="flex-con-1" @click="showMd('joinRoom')"><i class="add-room"></i>加入房间</li>
					</ul>
					<div class="my-room">
						<div class="my-room-title">
							<span>我的房间</span>
							<router-link tag="div" :to="'/roomCard/hot'" class="hot-room">热门推荐</router-link>
						</div>
						<ul class="my-room-list">
							<li class="flex-wrap">
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
							<li class="flex-wrap">
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
							<li class="flex-wrap">
								<div class="owner-head">
									<img src="http://wx.qlogo.cn/mmopen/WdJ2BLGuxzOm43YiaMwnyrmoGqSekH86zoyJmicPcyrCjwPPhPZKOLB23zLc25q1ktzLCicsN8UsD6tmib8V9Z53VHR2daFenvBg/0" alt="" />
									<i class="owner-identify"></i>
								</div>
								<div class="room-info">
									<div class="room-code">房间号（1100）<span class="room-state">已过期</span></div>
									<div class="room-tips">玩法：红包接龙(100点/4包)     额外加奖</div>
									<i class="ic-arrow-rw"></i>
								</div>
							</li>
						</ul>
					</div>
				</div>
				
				<!-- 我的战绩 -->
				<div class="my-record" v-show="!page">
					<ul class="record-list">
						<li class="flex-wrap">
							<div class="owner-head">
								<img src="http://wx.qlogo.cn/mmopen/WdJ2BLGuxzOm43YiaMwnyrmoGqSekH86zoyJmicPcyrCjwPPhPZKOLB23zLc25q1ktzLCicsN8UsD6tmib8V9Z53VHR2daFenvBg/0" alt="" />
								<i class="owner-identify"></i>
							</div>
							<div class="room-info">
								<div class="room-code">房间号（1100）<span class="game-code">(10025局)</span></div>
								<div class="room-tips">05 -21 16:42</div>
								<div class="grade active">+ 1000</div>
								<i class="ic-arrow-rw"></i>
							</div>
						</li>
						<li class="flex-wrap">
							<div class="owner-head">
								<img src="http://wx.qlogo.cn/mmopen/WdJ2BLGuxzOm43YiaMwnyrmoGqSekH86zoyJmicPcyrCjwPPhPZKOLB23zLc25q1ktzLCicsN8UsD6tmib8V9Z53VHR2daFenvBg/0" alt="" />
								<i class="owner-identify"></i>
							</div>
							<div class="room-info">
								<div class="room-code">房间号（1100）<span class="game-code">(10025局)</span></div>
								<div class="room-tips">05 -21 16:42</div>
								<div class="grade active">+ 1000</div>
								<i class="ic-arrow-rw"></i>
							</div>
						</li>
						<li class="flex-wrap">
							<div class="owner-head">
								<img src="http://wx.qlogo.cn/mmopen/WdJ2BLGuxzOm43YiaMwnyrmoGqSekH86zoyJmicPcyrCjwPPhPZKOLB23zLc25q1ktzLCicsN8UsD6tmib8V9Z53VHR2daFenvBg/0" alt="" />
								<i class="owner-identify"></i>
							</div>
							<div class="room-info">
								<div class="room-code">房间号（1100）<span class="game-code">(10025局)</span></div>
								<div class="room-tips">05 -21 16:42</div>
								<div class="grade">- 1000</div>
								<i class="ic-arrow-rw"></i>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="flex-wrap buy-room-card" v-show="page">
			<i class="ic-room-card"></i>
			<div class="buy-card-info">
				<p>购买房卡<em>(5元/张)</em></p>
				<span>创建房间必备道具</span>
			</div>
			<input type="button" name="" class="room-card-btn" id="" value="立即购买" />
		</div>
		
		
		<!--弹出层-->
		<div class="md-mask" :class="{ 'active': md.mask }"></div>
		<div class="md-modal md-effect-1 join-room" :class="{ 'md-show': md.joinRoom }">
			<div class="md-content">
				<i class="md-close ic-close-gray" @click="closeMd('joinRoom')"></i>
				<div class="title">加入房间</div>
				<input type="text" class="inp" placeholder="请输入6位房间号"/>
				<div class="tips">tips:可向房主获取房间号和密码，或自建房间邀朋友一起玩。</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default{
	
		data(){
			return{
				page: true,
				headerMag:{
					title:'血战到底',
					rightMsg: '',
					rightUrl: ''
				},
				md:{
					mask: false,
					joinRoom: false,
				}
			}
		},
		methods:{
			changePage(type){
				if((type && this.page) || (!type && !this.page)) return
				this.page = !this.page
			},
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
	@import "../../assets/sass/roomCard/roomCard.scss";
</style>