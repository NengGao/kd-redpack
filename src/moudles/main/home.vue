<template>
<div class="flex-wrap" id="home">
	<header class="header">
		<div class="user-info flex-wrap">
			<img class="user-head" :src="user.userHead" alt="" />
			<div class="info">
				<div class="user-name">{{user.userName}}</div>
				<div class="user-id">ID:{{user.userId}}</div>
			</div>
		</div>
		<div class="user-balance">余额(元):{{user.balance}}</div>
	</header>
	<div class="content flex-con-1" ref="wrapper">
		<div class="scroll">
			<div class="welfare-box">
				
				
			</div>
			<ul class="home-nav flex-wrap">
				<li class="flex-con-1">
					<p>我的抢拍</p>
				</li>
				<li class="flex-con-1">
					<p>乐豆商城</p>
				</li>
				<li class="flex-con-1">
					<p>vip特权</p>
				</li>
				<li class="flex-con-1">
					<p>消息通知</p>
				</li>
				<li class="flex-con-1">
					<p>客服中心</p>
				</li>
			</ul>
			<ul class="activity-box flex-wrap">
				<li></li>
				<li></li>
			</ul>
			<ul class="activity-box flex-wrap">
				<li></li>
				<li></li>
			</ul>
			<div class="goods-candid">
				
			</div>
		</div>
	</div>
</div>
</template>

<script>

import BScroll from 'better-scroll';

export default {
  name: 'home',
  data(){
    return {
    	user:{
    		userHead:'http://wx.qlogo.cn/mmopen/9ZQcUxWXzDoib8YOibgX9wLIDKPIg1P9hBst3H0t8GO1icwENm4TSGkx2Sc4nBzkG5V9NfJYxPs6yuIg6emVsiadW6kZ7ic3OezrS/0',
	      	userName:'丶偏执',
	      	userId:'10351',
	      	balance:'1000.00'
    	}

    }
  },
  created(){
   		
  },
  mounted(){
  	this._initScroll();
  },
  methods: {
  	_initScroll() {
        this.scroll = new BScroll(this.$refs.wrapper, {
          	click: true
        })
	}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
	@import "../../assets/sass/main/home.scss";
</style>