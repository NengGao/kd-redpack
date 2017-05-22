<template>
	<div class="news flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<router-link tag="li" to="/buy" class="header-right flex-wrap">
			<i class="ic-kld"></i> 
			<span>294.7</span>
			<i class="ic-add"></i>
		</router-link>
		<div class="shop-notice"></div>
		<div class="shop-title">限量抽奖 <span>*抽奖非100%中奖，不中全额退豆</span></div>
		<div class="content flex-con-1">
			<ul class="scroll clearfix goods-list">
				<li>
					<div class="goods-img"><img src="http://k.kuaidian.cn//good/exchange/ic_kld_goods_10.png" alt="" /></div>
					<div class="goods-name">10元全网通电话充值卡</div>
					<div class="goods-tips">京东价:￥10.00</div>
					<div class="goods-btn"><i class="ic-kld"></i>120豆</div>
				</li>
				<li>
					<div class="goods-img"><img src="http://k.kuaidian.cn//good/exchange/ic_kld_goods_iphone.png" alt="" /></div>
					<div class="goods-name">10元全网通电话充值卡</div>
					<div class="goods-tips">京东价:￥10.00</div>
					<div class="goods-btn"><i class="ic-kld"></i>8800豆</div>
				</li>
				<li>
					<div class="goods-img"><img src="http://k.kuaidian.cn//good/exchange/ic_kld_goods_10.png" alt="" /></div>
					<div class="goods-name">10元全网通电话充值卡</div>
					<div class="goods-tips">京东价:￥10.00</div>
					<div class="goods-btn"><i class="ic-kld"></i>120豆</div>
				</li>
				<li>
					<div class="goods-img"><img src="http://k.kuaidian.cn//good/exchange/ic_kld_goods_iphone.png" alt="" /></div>
					<div class="goods-name">10元全网通电话充值卡</div>
					<div class="goods-tips">京东价:￥10.00</div>
					<div class="goods-btn"><i class="ic-kld"></i>8800豆</div>
				</li>
				<li>
					<div class="goods-img"><img src="http://k.kuaidian.cn//good/exchange/ic_kld_goods_10.png" alt="" /></div>
					<div class="goods-name">10元全网通电话充值卡</div>
					<div class="goods-tips">京东价:￥10.00</div>
					<div class="goods-btn"><i class="ic-kld"></i>120豆</div>
				</li>
				<li>
					<div class="goods-img"><img src="http://k.kuaidian.cn//good/exchange/ic_kld_goods_iphone.png" alt="" /></div>
					<div class="goods-name">10元全网通电话充值卡</div>
					<div class="goods-tips">京东价:￥10.00</div>
					<div class="goods-btn"><i class="ic-kld"></i>8800豆</div>
				</li>
				<li>
					<div class="goods-img"><img src="http://k.kuaidian.cn//good/exchange/ic_kld_goods_10.png" alt="" /></div>
					<div class="goods-name">10元全网通电话充值卡</div>
					<div class="goods-tips">京东价:￥10.00</div>
					<div class="goods-btn"><i class="ic-kld"></i>120豆</div>
				</li>
				<li>
					<div class="goods-img"><img src="http://k.kuaidian.cn//good/exchange/ic_kld_goods_iphone.png" alt="" /></div>
					<div class="goods-name">10元全网通电话充值卡</div>
					<div class="goods-tips">京东价:￥10.00</div>
					<div class="goods-btn"><i class="ic-kld"></i>8800豆</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Api from '@/fetch/api'
	import common from '@/assets/js/common'
	import BScroll from 'better-scroll'
	import { mapGetters, mapActions } from 'vuex'

	export default {
		name: 'shop',
		data() {
			return {
				user: this.$store.state.user,
				headerMag: {
					title: '乐豆商城',
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
	@import "../../assets/sass/main/shop.scss";
</style>