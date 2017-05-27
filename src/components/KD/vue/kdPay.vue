<template>
	<div class="kd-pay" v-show="kdPay.show">

		<div class="kd-pay-mask"></div>
		<div class="confirm-pay">
			<div class="title">确认付款</div>
			<div class="pay-head">
				<p>待付款</p>
				<div class="pay-price">￥{{kdPay.payPrice | RMB_f}}</div>
			</div>
			<div class="choose-box">
				<div class="choose-text">选择支付方式</div>
				<div class="choose-pay-type-box">
					<div class="flex-wrap flex-center choose-pay-type" @click="changeType(item.methodId)" v-for="(item,index) in kdPay.payList" v-if=item.show>
						<div class="flex-wrap flex-center pay-left">
							<i :class="{'ic_balance_pay':item.methodName=='余额支付','ic_wx_smpay':item.methodName=='微信扫码','ic_wx_pay':item.methodName=='微信支付','ic_zfb_pay':item.methodName=='支付宝'}"></i>
							<div class="pay-title">
								<p>{{item.methodName}}</p>
								<p v-if="item.type=='ye'">帐户余额：￥{{ user.balance | RMB_f }}</p>
								<div class="pay-SM" v-if="item.methodId == 'wxScan'">
									<span></span>
									<em>支付随机减免</em>
								</div>
							</div>
						</div>
						<i :class="{'ic-choose':item.active}"></i>
					</div>
				</div>
			</div>
			<input type="button" value="立即支付" class="to-pay-btn" @click="buy">
			<i class="ic-close-gray" @click="closePay"></i>
		</div>
		<wx-scan :wxScan=wxScan></wx-scan>
	</div>
</template>

<script>
	import common from '@/assets/js/common'
	import Api from '@/fetch/api'
	import { Toast } from 'mint-ui'

	export default {
		data() {
			return {
				kdPay: this.$store.getters.getKdPay,
				user: this.$store.getters.getUserInfo,
				wxScan: { show: false, url: '' }
			}
		},
		props: {
			paySet: {
				type: Object
				// type  业务类型
				// payPrice 支付金额
				// balance 是否有余额支付
				// balancePay  余额支付方法
			}
		},
		created() {
			let self = this;

			Api.getPayMethod(function(data) {
				if(data.msgCode == '200') {

					let _data = data.list;
					if(self.paySet.balance) {
						let data = {
							methodId: 'ye',
							methodName: '余额支付'
						}
						_data.unshift(data)
					}
					for(let i = 0; i < _data.length; i++) {
						_data[i].show = true;
						if(i == 0) {
							_data[i].active = true;
							self.kdPay.type = _data[i].methodId;
						} else {
							_data[i].active = false;
						}
					}
					self.kdPay.payList = _data;

				} else {
					Toast({ message: data.msgNote, duration: 1500 });
				}
			}, {
				orderType: this.paySet.type
			})
		},
		methods: {
			setkdPay(data) {
				this.$store.dispatch('setkdPay', data);
			},
			closePay() {
				this.kdPay.show = false;
			},
			changeType(type) {
				for(let i = 0; i < this.kdPay.payList.length; i++) {
					this.kdPay.payList[i].active = false;
					if(this.kdPay.payList[i].methodId == type) {
						this.kdPay.payList[i].active = true;
					}
				}
				this.kdPay.type = type;
			},
			buy() {
				let self = this;
				let type = self.kdPay.type;
				let returnUrl = self.kdPay.returnUrl;
				if(type == 'ye') {
					this.paySet.balancePay()
					return
				}
				Api.submit(function(data) {
					if(data.msgCode == '200') {
						let payResult = data.data;
						//支付宝
						if(type == 'alipay') {
							common.toAlipay(payResult, returnUrl);
						}
						//微信App
						if(type == 'wxAppPay') {
							if(data.official) {
								//官方微信支付
								let official = data.official;
								let weixinPay = data;
								delete weixinPay.official;
								delete weixinPay.msgCode;
								weixinPay.returnCode = 'SUCCESS';
								common.toWxPay(JSON.stringify(weixinPay), official);
							} else {
								let tokenId = data.tokenId;
								let appId = data.appId;
								try {
									common.toWxPay(tokenId, data.official, returnUrl, appId)
								} catch(e) {
									Toast({ message: '调起微信支付失败', duration: 1300 });
								}
							}
						}
						if(type == 'wxScan') {
							self.wxScan.show = true;
							self.wxScan.url = data.imgUrl;
						}
					} else {
						Toast({ message: data.msgNote, duration: 1500 });
					}
				}, {
					orderType: self.paySet.type,
					amount: self.kdPay.payPrice,
					userCode: self.user.userCode,
					payMethod: self.kdPay.type,
					returnUrl: self.paySet.returnUrl,
					bussinessData: self.kdPay.bussinessData
				})
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	@import "../../../assets/sass/config.scss";
	@import "../../../assets/sass/icon.scss";
	.kd-pay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	.kd-pay-mask {
		z-index: 900;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.75);
		transition: all 0.4s;
	}
	
	.confirm-pay {
		position: absolute;
		bottom: 0;
		background: #fff;
		padding: $padding;
		box-sizing: border-box;
		width: 100%;
		z-index: 997;
		.title {
			@include setfont(toRem(19px), #333, toRem(19px));
		}
		.pay-head {
			border-bottom: $border;
			padding-top: 1rem;
			padding-bottom: 0.5rem;
			P {
				@include setfont(toRem(14px), #666, toRem(28px));
			}
			.pay-price {
				@include setfont(toRem(24px), #333, toRem(32px));
			}
		}
		.choose-box {
			padding-top: 1rem;
			.choose-text {
				@include setfont(toRem(14px), #999, toRem(14px));
			}
			.choose-pay-type-box {
				max-height: toRem(200px);
				overflow-y: scroll;
				margin-top: 0.8rem;
				.choose-pay-type {
					height: toRem(112px/2);
					border-bottom: $border;
					position: relative;
					@include flex-pack-justify();
					&:active {
						background-color: $bodyBg;
					}
					.pay-left {
						.pay-title {
							margin-left: 1rem;
							p:nth-of-type(1) {
								@include setfont(toRem(16px), #666, toRem(18px));
							}
							p:nth-of-type(2) {
								@include setfont(toRem(14px), #999, toRem(18px));
							}
							.pay-SM {
								position: relative;
								span {
									width: 0;
									height: 0;
									border-top: 0rem solid transparent;
									border-bottom: 0.9rem solid transparent;
									border-right: 0.8rem solid #f22435;
									position: absolute;
									left: -0.3rem;
									top: 0.15rem;
								}
								em {
									display: inline-block;
									width: 100%;
									background: #f22435;
									border-radius: 0.8rem;
									color: #ffffff;
									font-size: toRem(12px);
									padding: 0 0.2rem;
									text-align: center;
									line-height: toRem(16px);
								}
							}
						}
					}
				}
			}
		}
		.to-pay-btn {
			@include setBtn(100%, toRem(48px), toRem(19px), #fff, #ff2739);
			margin-top: 1rem;
		}
		.ic-close-gray {
			position: absolute;
			right: 0.5rem;
			top: 0.5rem;
		}
	}
</style>