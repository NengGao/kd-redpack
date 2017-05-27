<template>
	<div class="hot flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="content flex-con-1" ref="wrapper" id="wrapper">
			<div class="scroll" id="scroll" ref="scroll">
				
				<div class="redpack-row">
					<div class="my-news clearfix">
						<div class="send-head fr"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" /></div>
						<div class="send-info fr">
							<div class="send-name">纠结的偏执</div>
							<div class="news-box">我发出的消息</div>
						</div>
					</div>
				</div>	
				<div class="redpack-row">
					<div class="flex-wrap">
						<div class="send-head"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" /></div>
						<div class="send-info">
							<div class="send-name">纠结的偏执2</div>
							<div class="news-box">
								别人的消息
							</div>
						</div>
					</div>
				</div>
				
				
				<div class="redpack-row">
					<div class="my-news clearfix">
						<div class="send-head fr"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" /></div>
						<div class="send-info fr">
							<div class="send-name">纠结的偏执</div>
							<div class="news-box">我发出的消息</div>
						</div>
					</div>
				</div>	
				<div class="redpack-row">
					<div class="flex-wrap">
						<div class="send-head"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" /></div>
						<div class="send-info">
							<div class="send-name">纠结的偏执2</div>
							<div class="news-box">
								别人的消息
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="send-box flex-wrap">
				<input type="text" class="flex-con-1" placeholder="亲，您想问些什么呢？" />
				<div class="send-img"><input type="file" /></div>
				<input type="button" class="send-btn" value="发送"/>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Api from '@/fetch/api'
	
	import common from '@/assets/js/common'
	import { Toast , MessageBox } from 'mint-ui'
	import BScroll from 'better-scroll'

	export default {
		data() {
			return {
				user: this.$store.getters.getUserInfo || '',
				ws : this.$store.getters.getSocket,
				activeRoom: this.$store.getters.getActiveRoom || '',
				headerMag: {
					title: '客服中心',
					rightMsg: '',
					rightUrl: ''
				},
				md: {
					mask: false
				},	
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
					if(h > 0) self.scroll.scrollTo(0, -h, 400);
				})
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
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/customer/customer.scss";
</style>