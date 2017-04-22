<template>
	<div class="flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="content flex-con-1">
			<div class="scroll">
				<div class="balance-box">
					<div class="balance-title">账户余额(元)</div>
					<div class="balance-num">{{user.userMoney | RMB_f}}</div>
					<input type="button" class="draw-btn" value="微信红包"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				headerMag:{
					title:'账户余额',
					rightMsg: '资金明细',
					rightUrl: '/balanceDetailed'
				},
				user: this.$store.getters.getUserInfo
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/main/balance.scss";
</style>
