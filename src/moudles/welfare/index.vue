<template>
	<div class="welfare flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="content flex-con-1">
			<div class="scroll">
				
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				headerMag:{
					title:'整点福利场',
					rightMsg: '',
					rightUrl: ''
				}
			}
		},
		methods:{
			changePage(type){
				if((type==1 && this.page) || (!type && !this.page)) return
				this.page = !this.page
			}
		}
	}
</script>
	
<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/roomCard/roomCard.scss";
</style>