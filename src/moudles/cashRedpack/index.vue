<template>
	<div class="hot flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>

		<div class="content flex-con-1" ref="wrapper" id="wrapper">
	
			<div class="scroll" id="scroll" ref="scroll">
				<div class="redpack-row">

					<div class="flex-wrap">
						<div class="send-head"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" /></div>
						<div class="send-info">
							<div class="send-name">系统提示</div>
							<!--<div class="news-box" v-if="msg.countDown != 0"><span>{{ redpackState.redpackCountDown | redpackTime}}</span></div>-->
							<div class="news-box"><span>Go</span></div>
						</div>
					</div>

					<div class="next-sender"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" />下个红包将由<em>纠结的偏执</em>发出</div>

					<div class="flex-wrap">
						<div class="send-head"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" /></div>
						<div class="send-info">
							<div class="send-name">系统提示</div>
							<div class="news-box">
								测试数据
							</div>
						</div>
					</div>
					
					<div class="my-news clearfix">
						<div class="send-head fr"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" /></div>
						<div class="send-info fr">
							<div class="send-name">纠结的偏执</div>
							<div class="news-box">我发出的消息</div>
						</div>
					</div>
					

					<div class="flex-wrap">
						<div class="send-head"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" /></div>
						<div class="send-info">
							<div class="send-name">纠结的偏执2</div>
							<div class="news-box">
								别人的消息
							</div>
						</div>
					</div>
					
					<div class="flex-wrap">
						<div class="take-result"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" />“我”领取了”纠结的偏执”的<em>红包</em></div>
					</div>

					<div class="flex-wrap">
						<div class="send-head"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" /></div>
						<div class="send-info">
							<div class="send-name">纠结的偏执</div>
							<div class="redpack" @click="showMdOpen('redpackOpen',0)">
								<div class="ic-redpack"></div>
								<div class="redpack-tip">
									<p>恭喜发财大吉大利</p><span>领取红包</span></div>
								<div class="redpack-info">快点生活</div>
							</div>
						</div>
					</div>

					<div class="flex-wrap prize-info">
						<img src="http://k.kuaidian.cn/userImage/ic_head.png">
						<p>恭喜纠结的偏执中<em>豹子奖</em>，奖励金额：<em>66.6</em>元</p>
					</div>
					
				</div>
				<div id="scroll-mark" class="scroll-mark" style="width: 1px;height: 1px;"></div>
			</div>
		</div>
		

		<div class="toBottom" v-show="toBottom > 0" @click=scrollBottom>{{toBottom}}条新消息</div>

		<div class="footer flex-wrap" id="footer">
			
		</div>


		<!--弹出层-->

		<div class="md-mask" :class="{ 'active': md.mask }" @click="closeMd('all')"></div>
		<div class="md-modal md-effect-1 md-redpack-open" :class="{ 'md-show': md.redpackOpen }">
			<div class="md-content">
				<div class="md-top">
					<img src="http://k.kuaidian.cn/userImage/ic_head.png" class="md-user-head" alt="" />
					<div class="user-name">纠结的偏执</div>
					<div class="">
						<div class="tips">发了一个红包，金额随机</div>
						<div class="title">恭喜发财，大吉大利！</div>
					</div>
			<!--		<div class="takeOver title" v-show=redpackState.takeOver>
						手慢了，红包抢完了！
					</div>-->
				</div>
				<!--<div class="lookDetail">查看大家手气 </div>-->
				<div class="open"></div>
			</div>
		</div>

		<div class="md-modal md-effect-1 md-redpack-result" :class="{ 'md-show': md.redpackResult }">
			<div class="md-content">
				<i class="md-close ic-close-gray" @click="closeMd('redpackResult')"></i>
				<div class="md-top">
					<img src="http://k.kuaidian.cn/userImage/ic_head.png" class="md-user-head" alt="" />
				</div>
				<div class="fromUser">来自“1515”的红包</div>
				<div class="result"><span>15.2</span></div>
				<div class="info">已汇入本局战绩</div>
				<div class="tips">Tips:本平台仅限玩家间互动娱乐,请勿沉迷！</div>
				<!--<input type="button" class="btn" value="查看手气" v-show="redpackState.lookLuck" @click="showTakeDetails(redpackState.details)" />-->
				<input type="button" class="btn" value="确定" @click="closeMd('redpackResult')" />
			</div>
		</div>

		<div class="md-modal md-effect-1 md-integral" :class="{ 'md-show': md.integral }">
			<div class="md-content">
				<i class="md-close ic-close-gray" @click="closeMd('integral')"></i>
				<div class="integral-img"></div>
				<div class="integral-title">分数不足，请联系房主上分</div>
				<div class="integral-tips">为保证游戏公平公正，避免逃包现象发生，<em>帐户积分不得少于10点</em>。</div>
				<input type="button" class="integral-btn" id="" value="我知道了" @click="closeMd('integral')"/>
			</div>
		</div>
		
<!--		
		<div class="take-details" v-show=takeDetails>
			<span class="close" @click=closeTakeDetails>关闭</span>
			<div class="title">红包结果</div>
			<div class="content">
				<div class="take-details-top">
					<div class="red-top"></div>
					<img :src="takeDetailsInfo.userImg" alt="" class="create-head"/>
					<div class="form-user">来自“{{takeDetailsInfo.userName}}”的红包</div>
					<div class="tips">恭喜发财，大吉大利！</div>
				</div>
				<div class="list-title">红包已领{{takeDetailsInfo.robRecordDetail.length}}包</div>
				<ul class="list">
					<li class="flex-wrap" v-for="robRecord in takeDetailsInfo.robRecordDetail">
						<div class="head"><img :src="robRecord.userImg" alt="" /></div>
						<div class="info">
							<div class="user-name">{{robRecord.userName}}</div>
							<div class="take-time">{{robRecord.robTime}}</div>
						</div>
						<div class="amount">{{robRecord.robAmt | grades_f}}</div>
						<div class="luck" v-if=robRecord.luck>手气最佳</div>
					</li>
				</ul>
			</div>
		</div>-->
		
	</div>
</template>

<script>
	import Vue from 'vue'
	import Api from '@/fetch/api'
	import config from '@/config'
	import common from '@/assets/js/common'
	import { Toast,MessageBox } from 'mint-ui'
	import BScroll from 'better-scroll'
	import ReconnectingWebSocket from '@/assets/js/reconnecting-websocket.min'
	export default {
		data() {
			return {
				user: this.$store.getters.getUserInfo || '',
				ws : this.$store.getters.getSocket,
				activeRoom: this.$store.getters.getActiveRoom || '',
				headerMag: {
					title: '超级大富翁',
					rightMsg: '<i class="ic-ganapati"></i>',
					rightUrl: '/cashRedpack/groupInfo'
				},
				md: {
					mask: false,
					redpackOpen: false,
					redpackResult: false
				},	
				toBottom : 0,
			}
		},
		filters: {
			redpackTime: function(value) {
				value = parseInt(value) / 1000;
				if(value == 0) {
					return 'Go'
				}
				return value
			}
		},
		watch: {
			
		},
		mounted(){
			this.$nextTick(() => {
				let self = this;
				let oWrapper = document.getElementById("wrapper");
				let oScroll = document.getElementById("scroll")
				self.scroll = new BScroll(self.$refs.wrapper, {
					click: true,
					preventDefault: true
				});
				let h = oScroll.offsetHeight - oWrapper.offsetHeight;
				if(h > 0) self.scroll.scrollTo(0, -h);
			});
		},
		created() {
			
			
		},
		methods: {
			//刷新 滚动条
			_initScroll() {
				let self = this;
				if(!this.scroll) return
				this.$nextTick(() => {
					self.scroll.refresh();	
					let oScroll = document.getElementById("scroll");
					let oWrapper = document.getElementById("wrapper");
					let h = oScroll.offsetHeight - oWrapper.offsetHeight;
					let turn = true;
					if(common.isElementInViewport(document.getElementById("scroll-mark"))){
						if(h > 0 && turn) self.scroll.scrollTo(0, -h, 400);
						self.toBottom = 0;
					}else if(h > 0){
						self.toBottom ++
					}
				})
			},
			scrollBottom : function(){
				this.toBottom = 0;
				let oScroll = document.getElementById("scroll");
				let oWrapper = document.getElementById("wrapper");
				let h = oScroll.offsetHeight - oWrapper.offsetHeight;
				this.scroll.scrollTo(0, -h, 400);
			},
			showMd(md) {
				this.md[md] = true;
				this.md.mask = true;
			},
			closeMd(md) {
				if(md == 'all') {
					for(let Key in this.md) {
						this.md[Key] = false;
						this.md.mask = false;
					}
				} else {
					this.md[md] = false
					this.md.mask = false
				}
			},
			showMdOpen(md, n) {
				this.md.mask = true;
				this.md.redpackOpen = true;
				
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/cashRedpack/cashRedpack.scss";
</style>