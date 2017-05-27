<template>
	<div class="hot flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>

		<div class="content flex-con-1" ref="wrapper" id="wrapper">
	
			<div class="scroll" id="scroll" ref="scroll">
				
				<div class="redpack-row" v-for="item in content">


					<div class="next-sender" v-if="item.msgType == 1"><img :src="item.fromUserImg" alt="" />下个红包将由<em>{{item.fromUserName}}</em>发出</div>

					<div class="flex-wrap" v-if="item.msgType == 2">
						<div class="send-head"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" /></div>
						<div class="send-info">
							<div class="send-name">系统提示</div>
							<div class="news-box" v-if='item.delay != 0'><span>{{ item.delay | redpackTime}} </span></div>
							<div class="news-box" v-else='item.delay != 0'><span>Go</span></div>
						</div>
					</div>

					
					<div class="flex-wrap" v-if="item.msgType == 3">
						<div class="send-head"><img :src="item.fromUserImg" alt="" /></div>
						<div class="send-info">
							<div class="send-name">{{item.fromUserName}}</div>
							<div class="news-box">{{item.msgNote}}</div>
						</div>
					</div>

					
					<div class="flex-wrap"  v-if="item.msgType == 1003">
						<div class="take-result"><img :src="item.fromUserImg" alt="" />“{{item.fromUserName}}”领取了”{{item.toUserName}}”的<em>红包</em></div>
					</div>

					<div class="flex-wrap" v-if="item.msgType == 1004">
						<div class="send-head"><img :src="item.fromUserImg" alt="" /></div>
						<div class="send-info">
							<div class="send-name">{{item.fromUserName}}</div>
							<div class="redpack" @click="rob(item.nowPackets)">
								<div class="ic-redpack"></div>
								<div class="redpack-tip">
									<p>恭喜发财大吉大利</p><span>领取红包</span></div>
								<div class="redpack-info">快点生活</div>
							</div>
						</div>
					</div>
					
										
					<div class="flex-wrap prize-info" v-if='item.msgType == 1008'>
						<img :src="msg.fromUserImg">
						<p>恭喜{{msg.fromUserName}}中<em>{{msg.awardName}}奖</em>，奖励积分：<em>{{msg.amount}}</em>分</p>
					</div>
				</div>
				<div id="scroll-mark" class="scroll-mark" style="width: 1px;height: 1px;"></div>
			</div>
		</div>
		

		<div class="toBottom" v-show="toBottom > 0" @click=scrollBottom>{{toBottom}}条新消息</div>

		<div class="footer flex-wrap" id="footer">
			<div class="user-balance">
				<p>账户余额/元</p>
				<div class="balance-box">{{user.balance | RMB_f}}<i class="ic-add" @click="showMd('recharge')"></i></div>
			</div>
			<ul class="games-function">
				<li><i class="ic-options"></i></li>
				<li><i class="ic-tool"></i><i class="ic-lock"></i></li>
				<li><i class="ic-chat"></i><i class="ic-lock"></i></li>
			</ul>
		</div>


		<!--弹出层-->

		<div class="md-mask" :class="{ 'active': md.mask }" @click="closeMd('all')"></div>
		<div class="md-modal md-effect-1 md-redpack-open" :class="{ 'md-show': md.redpackOpen }">
			<div class="md-content">
				<div class="md-top">
					<img :src="redpackObj[redpackState.packet].fromUserImg" class="md-user-head" alt="" />
					<div class="user-name">{{redpackObj[redpackState.packet].fromUserName}}</div>
					<div class="" v-show=!redpackState.over>
						<div class="tips">发了一个红包，金额随机</div>
						<div class="title">恭喜发财，大吉大利！</div>
					</div>
					<div class="takeOver title" v-show=redpackState.over>
						手慢了，红包抢完了！
					</div>
				</div>
				<div class="lookDetail" v-show=redpackState.over @click="showTakeDetails(redpackState.packet)">查看大家手气 </div>
				<div class="open overturn" v-show=!redpackState.over></div>
			</div>
		</div>

		<div class="md-modal md-effect-1 md-redpack-result" :class="{ 'md-show': md.redpackResult }">
			<div class="md-content">
				<i class="md-close ic-close-gray" @click="closeMd('redpackResult')"></i>
				<div class="md-top">
					<img :src="redpackObj[redpackState.packet].fromUserImg" class="md-user-head" alt="" />
				</div>
				<div class="fromUser">来自“{{redpackObj[redpackState.packet].fromUserName}}”的红包</div>
				<div class="result"><span>{{redpackState.amount}}</span></div>
				<div class="info">已汇入本局战绩</div>
				<div class="tips">Tips:本平台仅限玩家间互动娱乐,请勿沉迷！</div>
				<input type="button" class="btn" value="查看手气" v-show="redpackState.lookLuck" @click="showTakeDetails(redpackState.packet)" />
				<input type="button" class="btn" value="确定" v-show="!redpackState.lookLuck"  @click="closeMd('redpackResult')" />
			</div>
		</div>

		<div class="md-modal md-effect-1 md-integral" :class="{ 'md-show': md.integral }">
			<div class="md-content">
				<i class="md-close" @click="closeMd('integral')"></i>
				<div class="integral-title"></div>
				<div class="integral-img"></div>
				<div class="integral-info">您的余额不足，请充值</div>
				<div class="integral-balance"><p>当前账户余额：</p><p>{{user.balance}}</p></div>
				<div class="integral-tips">Tips：为保障游戏公正公平，避免用户逃包,<em>帐户余额必须大于10元</em>，且由系统代为发包。</div>
				<input type="button" class="integral-btn" id="" value="充点小钱玩玩" @click="integralBuy()"/>
			</div>
		</div>
		
		
		<div class="md-modal md-effect-1 balance-recharge" :class="{ 'md-show': md.recharge }">
			<div class="md-content">
				<i class="md-close" @click="closeMd('recharge')"></i>
				<div class="balance-recharge-title"></div>
				<div class="user-balance">账户余额（元）：<span>{{user.balance | RMB_f}}</span></div>
				<counter :counter=Counter></counter>
				<div class="tips">存入的现金直接到账帐户余额，可随时提现。</div>
				<input type="button" class="balance-btn" value="立即支付" @click="kdPay()" />
			</div>
		</div>
	
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
		</div>
		<div class="ic_medallion pulse"><em>x0</em></div>
		<kd-pay :paySet=paySet></kd-pay>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Api from '@/fetch/api'
	import config from '@/config';
	import common from '@/assets/js/common'
	import { Toast,MessageBox } from 'mint-ui'
	import BScroll from 'better-scroll'

	export default {
		data() {
			return {
				user: this.$store.getters.getUserInfo || '',
				ws : this.$store.getters.getSocket,
				roomid : '',
				redpackObj : {
					'_0' : {
						fromUserImg : 'imgurl',
						fromUserName : '大富翁'
					}
				},
				Counter : {
					init: 10,
	        		unit: "元",
	        		spacing: 10,
	        		min : 10
				},
				paySet:{
					type : 'DFW',
					returnUrl : 'http://' + config.host + encodeURIComponent('/#/cashRedpack/index'),
					balance : false,
	        		balancePay : ''
				},
				redpackState :{
					packet : '_0',
					over : false,
					amount : '',
					nowPacket : '',
					lookLuck : false
				},
				headerMag: {
					title: '超级大富翁',
					rightMsg: '<i class="ic-ganapati"></i>',
					rightUrl:  ''
				},
				md: {
					mask: false,
					integral : false,
					redpackOpen: false,
					redpackResult: false,
					recharge : false
				},	
				content : [],
				toBottom : 0,
				takeDetails: false,
				takeDetailsInfo : {
					robRecordDetail : []
				}
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
			
			let self = this;
			let intoRoom = {
				msgType : 3,
				fromUserImg : 'http://k.kuaidian.cn/userImage/ic_head.png',
				fromUserName : '温馨提示',
				msgNote : '抢包金额最小的发，系统自动代发！红包正在派发中，请稍后！'
			}

			this.content.push(intoRoom);
			common.createService(self);
			Api.getRoom(function(data){
				if(data.msgCode == 200){
					self.roomid = data.roomId;
					self.headerMag.rightUrl = '/cashRedpack/groupInfo/' + data.roomId;
					Api.enterRoom(function(data) {
						if(data.msgCode == '200') {
							self.wsServer();
							self.user.balance = data.userScore;
						}else{
							Toast({ message: data.msgNote, duration: 1300 });
						}
					}, {
						roomId: data.roomId,
						roomPwd: ''
					});
					Api.rechargeCount(function(data){
						if(data.msgCode == 200){
							let rechargeCount = data.rechargeCount;
							self.Counter.init = rechargeCount == 0 ? 10 : 20;
						}
					});
				}
			},{
				roomType : 'DFW'
			});

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
			integralBuy(){
				this.md['recharge'] = true;
				this.md['integral'] = false;
			},
			rob(packet) {
				let self = this;
				self.redpackState.packet = '_' + packet;
				packet = self.nowPacket == packet ? 0 : packet;
				Api.rob(function(data) {
					if(data.msgCode == 200){
						let detail = data.robRecordDetail;
						self.redpackState.over = false;
						self.md.mask = true;
						self.redpackState.amount = detail.robAmt;
						if(!detail.history){
							self.md.redpackOpen = true;
							self.redpackState.lookLuck = false;
							setTimeout(function(){
								self.user.balance = data.robRecordDetail.balance;
								self.md.redpackOpen = false;
								self.md.redpackResult = true;
							},1000);
						}else{
							if(packet != 0){
								self.redpackState.lookLuck = true;
							}
							self.md.redpackResult = true;
						}
					}else if(data.msgCode == 701){
						self.md.mask = true;
						self.redpackState.over = true;
						self.md.redpackOpen = true;
					}else if(data.msgCode == 901){
						self.showMd('integral');
					}else{
						Toast({ message: data.msgNote, duration: 1500 });
					}
				}, {
					packets: packet,
					roomId: this.roomid
				})
			},
			//查看手气
			showTakeDetails(packets){
				let self = this;
				let packet = packets.replace('_', '');
				Api.robDetails(function(data){
					if(data.msgCode == '200'){
						//找出最大值 设置运气王
						let j = 0;
						for(let i = 0;i<data.robRecordDetail.length;i++){
							if(i != 0) if(data.robRecordDetail[i].robAmt > data.robRecordDetail[j].robAmt)j = i
						}
						data.robRecordDetail[j].luck = true;
						self.takeDetailsInfo = data;
					}else{
						Toast({ message: data.msgNote, duration: 1500 });
					}
				},{
					roomId : self.roomid,
					packets : packet
				});
				this.closeMd('all');
				this.takeDetails = true;
			},
			closeTakeDetails(){
				this.takeDetails = false;
			},
			kdPay(){
				this.closeMd('recharge');
				let data = this.$store.getters.getKdPay;
				data.payPrice = this.Counter.init;
				data.show = true;
			},
			wsServer(){
				let ws = this.ws;
				let vm = this;
				ws.onerror = function(evt) {
					console.log("错误：" + evt)
				};
				ws.onmessage = function(message) {
					let data = JSON.parse(message.data);
					if(data.msgType == 1003 || data.msgType == 1008){
						vm.content.push(data);
						vm._initScroll();
					}else if(data.msgType == 1004){
						let next = {
							msgType : 1,
							fromUserName : data.fromUserName,
							fromUserImg : data.fromUserImg
						}
						let countDown = {
							msgType : 2,
							delay : data.delay
						}
						vm.content.push(next);
						vm.content.push(countDown);
						vm._initScroll();
						vm.nowPacket = data.nowPackets;
						let down = setInterval(function(){
							vm.content[vm.content.length-1].delay  = vm.content[vm.content.length-1].delay - 1000;
							if(vm.content[vm.content.length-1].delay < 0){
								clearInterval(down)
							}
						},900);
						setTimeout(function(){
							vm.content.push(data);
							vm._initScroll();
							if(data.fromUserCode == vm.user.userCode){
								vm.user.balance = parseFloat(vm.user.balance) + parseFloat(data.amount);
							}
						},data.delay - 100);
						vm.redpackObj["_" + data.nowPackets] = data;
					}else if(data.msgType == 1014){
						Toast({ message: "您的账号已在别处登录", duration: 1500 });
						ws.close()
					}
				}
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/cashRedpack/cashRedpack.scss";
</style>