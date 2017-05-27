<template>
	<div class="news flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="my-kld">
			<i class="ic-kld"></i>我的快乐豆：<span><em>{{user.syceeTotal | KLD_f}}</em>豆</span>
			<div class="right">明细<i class="ic-arrow-rg"></i></div>
		</div>
		<div class="kld-title">选择购买数量</div>
		<ul class="kld-list clearfix">
			<li :class='{"active" : kld.active}' v-for="kld in kldLis" @click="toggleKld(kld.price)"><p><span>{{kld.num}}</span>豆</p><div class="price">售价：￥{{kld.price}}</div></li>
		</ul>
		<input type="button" class="buy-btn" value="立即购买" @click=pay />
		<!-- 快点支付  -->
		<kd-pay :paySet=paySet></kd-pay>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Api from '@/fetch/api'
	import config from '@/config';
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
				},
				kldLis : [
					{num: 100,price: 10, active : true},
					{num: 200,price: 20, active : false},
					{num: 500,price: 50, active : false},
					{num: 1000,price: 100, active : false},
					{num: 2000,price: 200, active : false},
					{num: 5000,price: 500, active : false}
				],
				paySet:{
					payPrice : 10,
					type : 'KLDCZ',
					returnUrl : 'http://' + config.host + encodeURIComponent('/#/roomCard/index/0'),
					balance : true,
	        		balancePay : this.balancePay
				}
			}
		},
		created() {

		},
		methods: {
			toggleKld(price){
				for(let i=0;i<this.kldLis.length;i++){
					this.kldLis[i].active = false;
					if(this.kldLis[i].price == price){
						this.kldLis[i].active = true;
					}
				}
				this.paySet.payPrice = price;
			},
			balancePay(){
				alert("余额支付")
			},
			pay(){
				this.$store.getters.getKdPay.show = true;
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/main/buy.scss";
</style>
