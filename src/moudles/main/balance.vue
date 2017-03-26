<template>
	<div class="">
		<kd-header :headerMsg=headerMag></kd-header>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				headerMag:{
					title:'账户余额',
					rightMsg: '资金明细',
					rightUrl: '/'
				}
			}
		}
	}
</script>
	
<style>
</style>