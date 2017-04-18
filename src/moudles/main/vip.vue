<template>
	<div class="vip flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="content flex-con-1">
			<div class="scroll">
				
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'vip',
		data(){
			return{
				user: this.$store.state.user,
				headerMag:{
					title:'升级vip特权',
					rightMsg: '',
					rightUrl: ''
				}
			}
		}
	}
</script>
	
<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/main/vip.scss";
</style>