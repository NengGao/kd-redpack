<template>
	<div class="flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="content flex-con-1">
			<div class="scroll">
				<div class="topBack">
				<div class="top-div">
					<img class="" src="/static/images/main/about.png"/>
					<p>快点抢福利</p>
				</div>
				<div class="content-div">
					<p class="title-p">快点抢红包，专业的移动互动购物平台。</p>
					<p class="cont-p">在快点红包夺宝，您可以参与丰富的平台活动，获得现金及其他奖励，最终以超值价格获得自己心仪的商品</p>
					<p class="title-p">每日整点免费福利红包</p>
					<p class="cont-p">每日整点现金红包任性抢，拼的是手速，讲究的是运气，抢到的现金可以随时提现到微信零钱。</p>
				</div>
				</div>
				
				<ul class="chooseLis">
				  <router-link tag="li" to="" class="">
					 版本更新
					 <span class="colour-red">(v1.2.6)</span>
					 <span class="right-t">已是最新版本</span>
				  </router-link>
				  <router-link tag="li" to="" class="">
					用户协议
				  </router-link>
	
			    </ul>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				headerMag:{
					title:'关于我们',
					rightMsg: '',
					rightUrl: ''
				},
				user: this.$store.getters.getUserInfo
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/main/about.scss";
</style>
