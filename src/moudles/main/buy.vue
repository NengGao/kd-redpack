<template>
	<div class="news flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="my-kld">
			<i class="ic-kld"></i>我的快乐豆：<span><em>294.7</em>豆</span>
			<div class="right">明细<i class="ic-arrow-rg"></i></div>
		</div> 
		<div class="kld-title">选择购买数量</div>
		<ul class="kld-list">
			<li>100豆</li>
			<li>200豆</li>
		</ul>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Api from '@/fetch/api'
	import common from '@/assets/js/common'
	import BScroll from 'better-scroll'
	
	export default {
		name: 'buy',
		data() {
			return {
				user: this.$store.state.user,
				headerMag: {
					title: '购买快乐豆',
					rightMsg: '',
					rightUrl: ''
				}
			}
		},
		created() {
			
		},
		method: {

		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/main/buy.scss";
</style>