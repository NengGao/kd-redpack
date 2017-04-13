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
					<div class="lineBox-icon"></div>
					<div class="lineBox-title">我的快乐豆：<span>{{user.inviteCode}}</span></div>
				</li>
				<li class="lineBox flex-wrap">
					
					
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'personal',
		data(){
			return{
				user: this.$store.state.user,
				headerMag:{
					title:'个人中心',
					rightMsg: '<i class="ic-balance"></i>余额(元): '+ this.$store.state.user.userMoney,
					rightUrl: '/'
				}
			}
		}
	}
</script>
	
<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/main/personal.scss";
</style>