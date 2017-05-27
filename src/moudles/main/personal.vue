<template>
	<div class="personal flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="content flex-con-1">
			<ul class="scroll">
				<li class="user-info flex-wrap">
					<img class="user-head" :src="user.userImage" alt="" />
					<div class="info">
						<div class="user-name">{{user.alias}}</div>
						<div class="user-id">ID:{{user.userCode}}</div>
					</div>
					<div class="editInfo">修改资料</div>
					<i class="ic-arrow-rw"></i>
				</li>
				<li class="lineBox marginTop flex-wrap">
					<div class="lineBox-icon ic-kld"></div>
					<div class="lineBox-title">我的快乐豆：<span>{{user.syceeTotal | KLD_f}}豆</span></div>
					<div class="lookDetail">明细</div>
					<i class="ic-arrow-rw"></i>
				</li>
				<ul class="flex-wrap kld-box">
					<router-link tag="li" to="/buy" class="flex-con-1"><i class="ic-buy"></i>购买快乐豆</router-link>
					<router-link tag="li" to="/shop" class="flex-con-1"><i class="ic-exchange"></i>快乐豆商城</router-link>
				</ul>
				<router-link tag="li" to="/news" class="lineBox marginTop flex-wrap">
					<div class="lineBox-icon ic-news"></div>
					<div class="lineBox-title">消息通知</div>
					<i class="ic-arrow-rw"></i>
				</router-link>
				<router-link tag="li" to="/goodsAuction/myAuction" class="lineBox flex-wrap">
					<div class="lineBox-icon ic-auction"></div>
					<div class="lineBox-title">我的抢拍</div>
					<i class="ic-arrow-rw"></i>
				</router-link>
				<router-link tag="li" to="/vip" class="lineBox marginTop flex-wrap">
					<div class="lineBox-icon ic-vip"></div>
					<div class="lineBox-title">升级vip特权</div>
					<i class="ic-arrow-rw"></i>
				</router-link>
				<ul class="flex-wrap vip-box">
					<li class="flex-con-1">红包次数</li>
					<li class="flex-con-1">奖励丰厚</li>
					<li class="flex-con-1">vip专享</li>
				</ul>
				<router-link tag="li" to="/customer" class="lineBox flex-wrap">
					<div class="lineBox-icon ic-waiter"></div>
					<div class="lineBox-title">在线客服</div>
					<i class="ic-arrow-rw"></i>
				</router-link>
				<router-link tag="li" to="/about" class="lineBox flex-wrap">
					<div class="lineBox-icon ic-about"></div>
					<div class="lineBox-title">关于我们</div>
					<i class="ic-arrow-rw"></i>
				</router-link>
				<li class="lineBox exit" id="exit" @click=exitLogin>
					<i class="lineBox-icon ic-exit"></i>退出登录
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	export default{
		name: 'personal',
		data(){
			return{
				user: this.$store.state.user,
				headerMag:{
					title:'个人中心',
					rightMsg: '<i class="ic-balance"></i>余额(元): '+ this.$store.state.user.balance,
					rightUrl: '/balance'
				}
			}
		},
		methods:{
			exitLogin(){
				localStorage.clear();
				Toast({
				  message: '退出成功',
				  duration: 1500,
				  iconClass: 'ic-toast-success'
				});
				let self = this;
				setTimeout(function(){
					self.$router.push('/')
				},1700)
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/main/personal.scss";
</style>
