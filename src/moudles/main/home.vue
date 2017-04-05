<template>
<div class="flex-wrap" id="home">
	<header class="header">
		<router-link class="user-info flex-wrap" tag="div" to="/personal">
			<img class="user-head" :src="user.userImage" alt="" />
			<div class="info">
				<div class="user-name">{{user.alias}}</div>
				<div class="user-id">ID:{{user.userCode}}</div>
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
	<loader></loader>
</div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name: 'home',
  data(){
    return {
    	user:'',
    	welfareInfo:{
    		time: '00:12:50' 
    	}
    }
  },
  created(){
	
	this.$http.get('http://m.go16888.cn/user/login?openId=o3Z-wwEbs0SlBadtmaubO9tVhdAs&loginType=2').then(res => {
	    // success callback
	    this.user = res.data
	    this.user.balance = '100.00'
	}, err => {
	    // error callback
	})
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
		this.$router.push("/welfare/index")
	}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/main/home.scss";
</style>