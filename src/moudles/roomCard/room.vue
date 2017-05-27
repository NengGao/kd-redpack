<template>
	<div class="hot flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="inform flex-wrap" id="inform">
			<div class="informList flex-con-1">
				<ul class="inform-info">
					<li>血战到底，仅限玩家互相娱乐，请勿沉迷！</li>
				</ul>
			</div>
			<div class="more" @click=mdMore>
				<ul class="moreLis" v-show=md.more>
					<router-link tag="li" to="/roomCard/myRecord" class="flex-con-1"><i class="create-room"></i>我的战绩</router-link>
					<li @click="">热门活动</li>
					<li>返回首页</li>
				</ul>
			</div>
		</div>
		<div class="game-info">
			<div class="owner"><img :src="activeRoom.createByImg" alt="" /></div>
			<div class="owner-name">{{activeRoom.createByName}}</div>
			<div class="owner-account">房间简介：{{activeRoom.weixinNo}}</div>
			<div class="game-tips"></div>
			<div class="game-rule">游戏规则：{{activeRoom.gameRuleName}}</div>
			<div class="game-explain">每包抽取{{activeRoom.award}}点作为额外奖励，奖励如下：</div>
			<ul class="game-award">
				<li v-for="award in activeRoom.awardRules">◆ {{award.awardName}}（{{award.awardDesc}}，奖{{award.awardMultiple}}倍）</li>
			</ul>
		</div>
		<div class="content flex-con-1" ref="wrapper" id="wrapper">
	
			<div class="scroll" id="scroll" ref="scroll">
				<div class="redpack-row" v-for="(msg,i) in contentMsg">
					<div class="rank-box" v-if='msg.msgType == 0'>
						<div class="rank-head-box" v-if="rank.userCode == user.userCode" v-for="(rank,o) in msg.params">
							<div class="rank-title">
								<div class="rank-num-room">
									<span>房号:{{$route.params.roomid}}</span>
									<span>编号:{{rank.boutId | boutId_f}}局</span>
								</div>
							</div>
							<div class="flex-wrap flex-center rank-host">
								<img :src="msg.fromUserImg" alt=""><i class="ic_hat"></i>
								<span>{{msg.fromUserName}}<em>(房主)</em></span>
							</div>
						</div>
						<ul class="flex-wrap flex-center rank-h1">
							<li>排名</li>
							<li>昵称</li>
							<li>盈亏/剩余</li>
						</ul>
						<div class="rank-list">
							<div :class="{'flex-wrap':true,'flex-center':true,'rank-li':true,'active':rank.userCode == user.userCode}" v-for="(rank,o) in msg.params">
								<div class="flex-wrap flex-center rank-left">
									<i class="ic-rank ic-rank-1" v-if="o == 0"></i>
									<i class="ic-rank ic-rank-2" v-if="o == 1"></i>
									<i class="ic-rank ic-rank-3" v-if="o == 2"></i>
									<i class="ic-rank" v-if="o > 2">{{ o + 1 }}</i>
									<img :src="rank.userImg" alt="" class="rank-head-img">
									<div class="rank-name">{{rank.userName}}</div>
								</div>
								<div class="rank-right">
									<p>{{rank.closeAmount | grades_f}}</p>
									<span>{{rank.balance}}</span>
								</div>
							</div>
						</div>
					</div>

					<div class="flex-wrap" v-if='msg.msgType == 1'>
						<div class="send-head"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" /></div>
						<div class="send-info">
							<div class="send-name">系统提示</div>
							<div class="news-box" v-if="msg.countDown != 0"><span>{{ redpackState.redpackCountDown | redpackTime}}</span></div>
							<div class="news-box" v-if="msg.countDown == 0"><span>Go</span></div>
						</div>
					</div>

					<div class="next-sender" v-if='(msg.msgType == 2) && (i != 0)'><img :src="msg.fromUserImg" alt="" />下个红包将由<em>{{msg.fromUserName}}</em>发出</div>

					<div class="flex-wrap" v-if='msg.msgType == 3'>
						<div class="send-head"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" /></div>
						<div class="send-info">
							<div class="send-name">系统提示</div>
							<div class="news-box">
								{{msg.msg}}
							</div>
						</div>
					</div>
					
					<div class="my-news clearfix" v-if='msg.msgType == 4'>
						<div class="send-head fr"><img :src="msg.fromUserImg" alt="" /></div>
						<div class="send-info fr">
							<div class="send-name">{{msg.fromUserName}}</div>
							<div class="news-box">{{msg.msgNote}}</div>
						</div>
					</div>
					

					<div class="flex-wrap" v-if='msg.msgType == 1000'>
						<div class="send-head" @click="goToAddScore(msg.fromUserCode)"><img :src="msg.fromUserImg" alt="" /></div>
						<div class="send-info">
							<div class="send-name">{{msg.fromUserName}}</div>
							<div class="news-box">
								{{msg.msgNote}}
							</div>
						</div>
					</div>
					
					<div class="flex-wrap" v-if='msg.msgType == 1003'>
						<div class="take-result"><img :src="msg.fromUserImg" alt="" />“{{msg.fromUserName}}”领取了”{{msg.toUserName}}”的<em>红包</em></div>
					</div>

					<div class="flex-wrap" v-if='msg.msgType == 1004'>
						<div class="send-head" @click="goToAddScore(msg.fromUserCode)"><img :src="msg.fromUserImg" alt="" /></div>
						<div class="send-info">
							<div class="send-name">{{msg.fromUserName}}</div>
							<div class="redpack" @click="showMdOpen('redpackOpen',msg.nowPackets)">
								<div class="ic-redpack"></div>
								<div class="redpack-tip">
									<p>恭喜发财大吉大利</p><span>领取红包</span></div>
								<div class="redpack-info">血战到底（<em>第{{msg.nowPackets}}包</em>/共{{msg.packetsPerBout}}包）</div>
							</div>
						</div>
					</div>

					<div class="flex-wrap prize-info" v-if='msg.msgType == 1008'>
						<img :src="msg.fromUserImg">
						<p>恭喜{{msg.fromUserName}}中<em>{{msg.awardName}}奖</em>，奖励积分：<em>{{msg.amount}}</em>分</p>
					</div>
					
				</div>
				<div id="scroll-mark" class="scroll-mark" style="width: 1px;height: 1px;"></div>
			</div>
		</div>
		
		<ul class="flex-wrap btn-box" v-if="md.start">
			<li class="flex-con-1">
				<div class="invite" @click=share><i class="ic-wx"></i>邀请好友</div>
			</li>
			<li class="flex-con-1">
				<div class="start" @click="startGame"><i class="ic-play"></i>开始本局</div>
			</li>
		</ul>
		<div class="toBottom" v-show="toBottom > 0" @click=scrollBottom>{{toBottom}}条新消息</div>
		<ul class="flex-wrap btn-box" v-if="md.over">
			<li class="flex-con-1">
				<div class="share" @click=shareImage>分享到微信</div>
			</li>
			<li class="flex-con-1" v-if="user.userCode != activeRoom.createByCode">
				<div class="save" @click=saveImage>保存到手机</div>
			</li>
			<li class="flex-con-1" v-if="user.userCode == activeRoom.createByCode">
				<div class="again" @click=nextGame>继续下一局</div>
			</li>
		</ul>
		<div class="footer flex-wrap" id="footer">
			<div class="integral">
				<div class="title">我的积分</div>
				<div class="number">{{activeRoom.userScore | RMB_f}}</div>
			</div>
			<div class="chatInp">
				<div class="inp flex-wrap">
					<input type="text" class="feedIn flex-con-1" id="" v-model="sendmsg" placeholder="说点什么吧.." />
					<i class="ic-face"></i>
					<input type="button" :class="{'send':true,'active': sendActive}" value="发送" @keyup.enter="sendMsg" @click="sendMsg"/>
				</div>
			</div>
			<div class="integral-tips" v-show=integralTips.show>
				<div class="title">{{integralTips.tips}}</div>
				<div class="num">{{integralTips.num | grades_f}}</div>
			</div>
		</div>

		<router-link tag="div" :to="'/roomCard/allPlayers/'+$route.params.roomid" class="point" v-if="user.userCode == activeRoom.createByCode"></router-link>

		<!--弹出层-->

		<div class="md-mask" :class="{ 'active': md.mask }" @click="closeMd('all')"></div>
		<div class="md-modal md-effect-1 md-redpack-open" :class="{ 'md-show': md.redpackOpen }">
			<div class="md-content">
				<div class="md-top">
					<img :src="redpack.fromUserImg" class="md-user-head" alt="" />
					<div class="user-name">{{redpack.fromUserName}}</div>
					<div class="" v-show=!redpackState.takeOver>
						<div class="tips">发了一个红包，金额随机</div>
						<div class="title">恭喜发财，大吉大利！</div>
					</div>
					<div class="takeOver title" v-show=redpackState.takeOver>
						手慢了，红包抢完了！
					</div>
				</div>
				<div class="lookDetail" v-show=redpackState.takeOver @click="showTakeDetails(redpackState.details)">查看大家手气 </div>
				<div class="open" v-show=!redpackState.takeOver :class="{'overturn' : redpackState.openActive}" @click="open(redpackState.packets)"></div>
			</div>
		</div>

		<div class="md-modal md-effect-1 md-redpack-result" :class="{ 'md-show': md.redpackResult }">
			<div class="md-content">
				<i class="md-close ic-close-gray" @click="closeMd('redpackResult')"></i>
				<div class="md-top">
					<img :src="redpack.fromUserImg" class="md-user-head" alt="" />
				</div>
				<div class="fromUser">来自“{{redpack.fromUserName}}”的红包</div>
				<div class="result"><span>{{redpack.robAmt | RMB_f}}</span></div>
				<div class="info">已汇入本局战绩</div>
				<div class="tips">Tips:本平台仅限玩家间互动娱乐,请勿沉迷！</div>
				<input type="button" class="btn" value="查看手气" v-show="redpackState.lookLuck" @click="showTakeDetails(redpackState.details)" />
				<input type="button" class="btn" value="确定" v-show="!redpackState.lookLuck" @click="closeMd('redpackResult')" />
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


<!--		<div class="md-modal md-effect-1 md-" :class="{ 'md-show': md.integral }">
			<div class="md-content">
				<i class="md-close ic-close-gray" @click="closeMd('integral')"></i>
				<div class="integral-img"></div>
				<div class="integral-title">分数不足，请联系房主上分</div>
				<div class="integral-tips">为保证游戏公平公正，避免逃包现象发生，<em>帐户积分不得少于100点</em>。</div>
				<input type="button" class="integral-btn" id="" value="联系房主" />
			</div>
		</div>-->
		
		
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
		
		<!--热门活动-->
	    <div class="hotActivity" v-show="md.showActivity" :class="{'pullUp':md.showActivity}">
	      <div class="title">热门活动</div>
	      <div class="flex-wrap activity-box">
	        <img src="/static/images/roomCard/ic_activity_1.png" alt="">
	        <div class="activity-text">
	          <p>冲榜瓜分万元现金</p>
	          <p>每日排行前100名瓜分现金</p>
	        </div>
	        <!--<div class="plan"><span>0</span>/30</div>-->
	        <input type="button" value="前往" class="toGet">
	      </div>
	      <div class="flex-wrap activity-box">
	        <img src="/static/images/roomCard/ic_activity_2.png" alt="">
	        <div class="activity-text">
	          <p>创建房间邀朋友一起玩</p>
	          <p style="color: #ff2739">玩30局奖励88元现金</p>
	        </div>
	        <div class="plan"><span>0</span>/30</div>
	      </div>
	      <div class="flex-wrap activity-box">
	        <img src="/static/images/roomCard/ic_activity_3.png" alt="">
	        <div class="activity-text">
	          <p>完成3局对战</p>
	          <p style="color: #ff9933">奖励：18乐豆</p>
	        </div>
	        <div class="plan"><span>0</span>/30</div>
	      </div>
	      <div class="flex-wrap activity-box">
	        <img src="/static/images/roomCard/ic_activity_4.png" alt="">
	        <div class="activity-text">
	          <p>完成5局对战</p>
	          <p style="color: #ff9933">奖励：38乐豆</p>
	        </div>
	        <div class="plan"><span>0</span>/30</div>
	      </div>
	      <div class="flex-wrap activity-box">
	        <img src="/static/images/roomCard/ic_activity_5.png" alt="">
	        <div class="activity-text">
	          <p>获得“1分情”奖励</p>
	          <p style="color: #ff9933">奖励：18乐豆</p>
	        </div>
	        <div class="plan"><span>0</span>/30</div>
	      </div>
	      <i class="ic-close-gray" @click="closeMd('showActivity')"></i>
	    </div>
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
					title: '房间号（' + this.$route.params.roomid + '）',
					rightMsg: '<i class="ic-ganapati"></i>',
					rightUrl: '/roomCard/groupInfo/' + this.$route.params.roomid
				},
				md: {
					more : false,
					mask: false,
					start: false,
					over: false,
					redpackOpen: false,
					redpackResult: false,
					integral: false,
					showActivity : false
				},
				integralTips: {
					show: false,
					tips: '房主已为您上分',
					num: 0
				},
				sendmsg : '',
				sendActive : false,
				imageUrl : '',
				toBottom : 0,
				takeDetails : false,
				takeDetailsInfo : {
					robRecordDetail : []
				},
				contentMsg: common.getJsonLocal("history_" + this.$route.params.roomid) || [],
				newRedpack: '',
				redpack : '',
				redpackState: {
					packets: 0,
					currentPackets: 0,
					openActive: false,
					takeOver: false,
					sw: true,
					details : 0,
					lookLuck : false,
					flag : false,
					redpackCountDown: ''
				}
			}
		},
		filters: {
			boutId_f : function(value){
				if(!value) return
				return value.substring(7,value.length)
			}
		},
		watch: {
			'sendmsg': function(val) {
				if(val == ' ') {
					this.sendmsg = '';
					return
				}else if(val.length > 0) {
					this.sendActive = true
				}else{
					this.sendActive = false
				}
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
	        Api.enterRoom(function(data) {
	          	if(data.msgCode == '200') {
	          		self.activeRoom = data;
		            self.$store.commit('setActiveRoom', data);
		            self.isStart();
					self.wsService(self.$route.params.roomid);
	         	}else{	
					Toast({ message: data.msgNote, duration: 1500 });
				}
	        }, {
	          roomId: self.$route.params.roomid,
	          roomPwd: ''
	        })
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
			mdMore(){
				this.md['more'] = !this.md['more'];
			},
			//查看手气
			showTakeDetails(packets){
				let self = this;
				Api.robDetails(function(data){
					if(data.msgCode == '200'){
						//找出最大值 设置运气王
						let j = 0;
						for(let i = 0;i<data.robRecordDetail.length;i++){
							if(i != 0) {
								if(data.robRecordDetail[i].robAmt > data.robRecordDetail[j].robAmt){
									j = i
								}
							}
						}
						data.robRecordDetail[j].luck = true;
						self.takeDetailsInfo = data;
					}else{
						Toast({ message: data.msgNote, duration: 1500 });
					}
				},{
					roomId : self.$route.params.roomid,
					packets : packets
				})
				this.closeMd('all');
				this.takeDetails = true;
			},
			closeTakeDetails(){
				this.takeDetails = false;
			},
			showMdOpen(md, n) {
				this.md.mask = true;
				this.redpackState.details = n;
				this.redpackState.takeOver = false;
				this.redpack = this.newRedpack;
				if(n == this.redpackState.currentPackets) {
					this.md.redpackOpen = true;
					this.open(0,1200);
				} else {
					this.redpackState.packets = n;
					this.open(n,0);
				}
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
			share(){
				common.shareContent({
					title : '快加入我的房间（'+ this.$route.params.roomid +'）战个痛快！',
					content : '点击下载快点生活app，进入血战到底，加入房间',
					shareUrl : 'http://d.kuaidian.cn'
				})
			},
			shareImage(){
				//MessageBox('提示', '内测中，暂时不能分享');
				let _url = this.imageUrl;
				common.weixinShareImage(_url);
			},
			saveImage(){
				let _url = this.imageUrl;
				common.saveImage(_url,function(){
					Toast({ message: '保存成功', duration: 1300 });
				})
			},
			isStart() {
				
				//从 历史记录里面取 当前房间抢包记录  
			
				for(let i=0;i<this.contentMsg.length;i++){
					if(this.contentMsg[i].msgType == '1004'){
						console.log( "当前局数：" + this.activeRoom.boutCount + '，历史记录记录的局数' + this.contentMsg[i].boutCount);
						if(this.contentMsg[i].boutCount != this.activeRoom.boutCount){
							// 局数不同 清除历史记录
							this.contentMsg = [];
							localStorage.removeItem("history_" + this.$route.params.roomid);
						}else{
							// 局数相同 继续塞历史记录
							this.newRedpack = this.contentMsg[i];
							this.redpackState.currentPackets = this.newRedpack.nowPackets;
						}
					}else if(this.contentMsg[i].msgType == '1'){
						// 把 历史红包 的倒计时  改成  Go
 						this.contentMsg[i].countDown = 0;
					}
				}				
				// 处理  未抢完的包
				if(this.activeRoom.roomMessage != null){
					//如果有未抢完的包
					if((this.newRedpack.nowPackets < this.activeRoom.roomMessage.nowPackets) || !this.newRedpack.nowPackets ){
						let self = this;
						let time = this.activeRoom.roomMessage.delay == -1 ? 0 : this.activeRoom.roomMessage.delay;
						if(time > 0){
							let _data = {
								msgType : 3,
								msg : "红包即将发出，请稍等！"
							}
							self.contentMsg.push(_data);
							self._initScroll()
						}
						setTimeout(function(){
							self.activeRoom.roomMessage.boutCount = self.activeRoom.boutCount;
							self.redpackState.currentPackets = self.activeRoom.roomMessage.nowPackets;
							self.newRedpack = self.activeRoom.roomMessage;
							self.contentMsg.push(self.activeRoom.roomMessage);
							self._initScroll()
						},time)
					}else{
						
					}
				}else{
					
					localStorage.removeItem("history_" + this.$route.params.roomid);
					this.contentMsg = [];
				}			
				if(this.user.userCode == this.activeRoom.createByCode && (this.activeRoom.roomStatus == 'W'||this.activeRoom.roomStatus == 'E')) {
					this.md.start = true;
				}else if(this.activeRoom.roomStatus == 'W'||this.activeRoom.roomStatus == 'E'){
					let _data = {
						msgType : 3,
						msg : "欢迎加入房间，房主正在准备游戏！请等待"
					}
					if(this.activeRoom.roomStatus == 'E'){_data.msg = '本局游戏已结束！如需开始游戏，请联系房主'}
					this.contentMsg.push(_data);
					this._initScroll()
				}
			},
			goToAddScore(userCode){
				if(this.user.userCode == this.activeRoom.createByCode){
					this.$router.push('/roomCard/searchPage/' + this.$route.params.roomid + '/' + userCode)
				}
			},
			startGame() {
				let self = this;
				Api.startGame(function(data) {
					if(data.msgCode == '200') {
						self.md.start = false;
						self.activeRoom.roomStatus = 'P';
						self.$store.dispatch('activeRoom', self.activeRoom);
					}else{
						Toast({ message: data.msgNote, duration: 1500 });
					}
				}, {
					roomId: self.$route.params.roomid
				})
			},
			nextGame() {
				this.contentMsg = [];
				this.md.over = false;
				this.md.start = true;
			},
			open(packets,time) {
				let self = this;
				if(!this.redpackState.sw) {
					return
				} else {
					this.redpackState.sw = false
				} 
				this.redpackState.openActive = true;
				setTimeout(function() {
					Api.rob(function(data) {
						self.redpackState.openActive = false;
						self.redpackState.sw = true;
						if(data.msgCode == '200') {
							self.md.redpackOpen = false;
							self.md.redpackResult = true;
							self.redpack.robAmt = data.robRecordDetail.robAmt;
							if(data.robRecordDetail.userImg){
								self.redpack.fromUserImg = data.robRecordDetail.userImg;
								self.redpack.fromUserName = data.robRecordDetail.userName;
							}
							// 是否是历史包
							if(!data.robRecordDetail.history){
								self.redpackState.lookLuck = false;
								self.redpackState.currentPackets ++;
								self.redpackState.flag = false;
								self.activeRoom.userScore = data.robRecordDetail.balance;
							}else{
								console.log(packets +','+ self.redpackState.currentPackets);
								if(self.redpackState.flag || (packets < (self.redpackState.currentPackets-1) && packets != 0) ){
									self.redpackState.lookLuck = true;
								}
								self.md.redpackResult = true;
							}
						} else if(data.msgCode == '701') {
							self.md.redpackOpen = true;
							self.redpackState.takeOver = true;
						} else if(data.msgCode == '901') {
							self.closeMd('redpackOpen');
							self.showMd('integral');
						}else{
							self.md.mask = false;
							self.closeMd('all');
							Toast({ message: data.msgNote, duration: 1500 });
						}
					}, {
						roomId: self.$route.params.roomid,
						packets: packets
					})
				}, time);
			},
			sendMsg(){
				if(this.sendmsg == '') return
				let _data = {      
				    "msgKind": "200",
				    "roomId" : this.$route.params.roomid,
				    "content": this.sendmsg,
				    "contentType": "TXT"
				}
				this.ws.send(JSON.stringify(_data));
				this.sendmsg = ''
			},
			// 以下是  .ws 
			wsService(roomId) {
				let interval;
				let self = this;
				let ws = this.ws;
				ws.onerror = function(evt) {
					console.log("错误：" + evt)
				};
				ws.onmessage = function(message) {
					var _data = JSON.parse(message.data);
					if(_data.roomId != self.$route.params.roomid){
						return
					}
					if(message.data) {
						
						var data = JSON.parse(message.data);
						if(data.msgType == 1000){
							if(data.fromUserCode == self.user.userCode){
								data.msgType = 4
							}
							self.contentMsg.push(data);
							self._initScroll();
							
						}else if(data.msgType == 1003){
							self.contentMsg.push(data);
							self.redpackState.flag = true;
							common.setJsonLocal("history_" + self.$route.params.roomid,self.contentMsg);
							self._initScroll();
						}else if(data.msgType == 1004) {
							if(data.nowPackets == 1){
								self.md.over = false
							}
							let redpackCountDown = {
								msgType: 1,
								time: data.delay
							}
							let nextSend = {
								msgType: 2,
								fromUserImg: data.fromUserImg,
								fromUserName: data.fromUserName
							}
							let index = self.contentMsg.length;
							self.contentMsg.push(nextSend);
							self.contentMsg.push(redpackCountDown);
							self.redpackState.redpackCountDown = data.delay;
							self._initScroll();
							let inter = setInterval(function() {
								self.redpackState.redpackCountDown = self.redpackState.redpackCountDown - 1000;
								if(self.redpackState.redpackCountDown < 1000) {
									self.contentMsg[index+1].countDown = 0;
									clearInterval(inter)
								}
							}, 1000)
							setTimeout(function() {
								self.newRedpack = data;
								self.redpackState.currentPackets = data.nowPackets;
								data.boutCount = self.activeRoom.boutCount;
								
								self.contentMsg.push(data);
								if(data.nowPackets == data.packetsPerBout){
									self.activeRoom.roomMessage = '';
								}else{
									self.activeRoom.roomMessage = data;
									self.activeRoom.roomMessage.delay = self.activeRoom.roomMessage.delay - 1000;
								}
								//房主抽水
								if(self.user.userCode == self.activeRoom.createByCode){
									self.activeRoom.userScore = parseFloat(self.activeRoom.userScore) + parseFloat(self.activeRoom.award);
								}
								//谁发包扣谁钱
								if(data.fromUserCode == self.user.userCode) {
									self.activeRoom.userScore = data.balance;
								}
								self._initScroll();
								common.setJsonLocal("history_" + self.$route.params.roomid,self.contentMsg);
							}, data.delay)
						} else if(data.msgType == 1005) {
							
							
							self.imageUrl = data.url;
							
							//游戏结束
							let _data = {
								msgType : 3,
								msg : "本局结束，即将公布本局抢红包结果。"
							}
							self.contentMsg.push(_data);
							self._initScroll();
					
							
							setTimeout(function(){
								self.contentMsg = [];
								let gameOver = data;
								gameOver.msgType = 0;
								self.contentMsg.push(gameOver);
								self.md.over = true;	
								localStorage.removeItem("history_" + self.$route.params.roomid);
								self._initScroll()
							},1000)
						} else if(data.msgType == 1007) {
							//房主踢人
							if(data.fromUserCode == self.user.userCode) {
								Toast({ message: '您已被房主请出', duration: 1500 });
								setTimeout(function() {
									self.$router.go(-1);
								}, 1700)
							}
						} else if(data.msgType == 1008) {
							//中奖
							if(data.fromUserCode == self.user.userCode){
								self.activeRoom.userScore = parseFloat(self.activeRoom.userScore) + parseFloat(data.amount);
							}
							if(self.user.userCode == self.activeRoom.createByCod){
								self.activeRoom.userScore = parseFloat(self.activeRoom.userScore) - parseFloat(data.amount);
							}
							self.contentMsg.push(data);
							self._initScroll()
						} else if(data.msgType == 1009) {
							//上分
							self.integralTips.show = true;
							self.integralTips.tips = '房主已为您上分';
							self.integralTips.num = data.amount;
							setTimeout(function() {
								self.activeRoom.userScore = data.balance;
								self.integralTips.show = false;
							}, 1800)
						} else if(data.msgType == 1010) {
							//下分
							self.integralTips.show = true;
							self.integralTips.tips = '房主已为您下分';
							self.integralTips.num = data.amount;
							setTimeout(function() {
								self.activeRoom.userScore = data.balance;
								self.integralTips.show = false;
							}, 1800)
						} else if(data.msgType == 1014){
							Toast({ message: "您的账号已在别处登录", duration: 1500 });
							ws.close()
						}	
					}
					//存入历史记录
					common.setJsonLocal("history_" + self.$route.params.roomid,self.contentMsg);
				}
			} 
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/roomCard/room.scss";
</style>