<template>
<div class="flex-wrap" id="home">
	<header class="header">
		<router-link class="user-info flex-wrap" tag="div" to="/personal">
			<img class="user-head" :src="user.userHead" alt="" />
			<div class="info">
				<div class="user-name">{{user.userName}}</div>
				<div class="user-id">ID:{{user.userId}}</div>
			</div>
		</router-link>
		<router-link tag="div" class="user-balance" to="/balance"><i class="ic-balance"></i>余额(元):{{user.balance}}</router-link>
	</header>
	<div class="content flex-con-1" ref="wrapper">
		<div class="scroll">
			<div class="welfare-box">
				<div class="welfare-title">下一场整点免费红包</div>
				<div class="welfare-status">{{welfareInfo.time}}</div>
				<div class="welfare-amonut">红包总金额：888.88元</div>
				<input type="button" class="welfare-btn" @click=goWelfare value="点击开枪"/>
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
import router from '@/router'

export default {
  name: 'home',
  data(){
    return {
    	user:{
    		userHead:'http://wx.qlogo.cn/mmopen/9ZQcUxWXzDoib8YOibgX9wLIDKPIg1P9hBst3H0t8GO1icwENm4TSGkx2Sc4nBzkG5V9NfJYxPs6yuIg6emVsiadW6kZ7ic3OezrS/0',
	      	userName:'丶偏执',
	      	userId:'10351',
	      	balance:'1000.00'
    	},
    	welfareInfo:{
    		time: '00:12:50' 
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
        });
	},
	goWelfare(){
		router.push("welfare")
	}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/main/home.scss";
</style>