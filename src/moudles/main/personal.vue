<template>
	<div class="personal flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="content flex-con-1">
			
		</div>
	</div>
</template>

<script>
	export default{
		name: 'personal',
		data(){
			return{
				headerMag:{
					title:'个人中心',
					rightMsg: '余额（元）',
					rightUrl: '/'
				}
			}
		}
	}
</script>
	
<style rel="stylesheet/scss" lang="scss" scoped>

	.content{
		background: #fff;
	}


</style>