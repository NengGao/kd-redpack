<template>
	<div class="news flex-wrap">
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
					title:'我的消息',
					rightMsg: '',
					rightUrl: ''
				}
			}
		}
	}
</script>
	
<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/main/news.scss";
</style>