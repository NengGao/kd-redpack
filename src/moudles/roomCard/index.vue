<template>
	<div class="roomCard flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="card-number" @click="payRoomCard">{{roomCard.roomCardAmount}}</div>
		<div class="content flex-wrap flex-con-1">
			<mt-swipe :auto="3000">
				<mt-swipe-item><img src="/static/images/roomCard/banner.png" alt="" class="bannar"></mt-swipe-item>
				<mt-swipe-item><img src="/static/images/roomCard/banner.png" alt="" class="bannar"></mt-swipe-item>
			</mt-swipe>
			<div class="room-card-content flex-con-1">
				<!-- 游戏大厅 -->
				<div class="game-lobby">

		        <!--信息滚动组件-->
		        <infoScroll :messageList=messageList :messageType="1"></infoScroll>

					<ul class="card-room flex-wrap">
						<li class="flex-con-1" @click="showMd('joinRoom')"><i class="add-room"></i>
							<p>加入房间</p>
						</li>
						<router-link tag="li" :to="'/roomCard/setRoom'" class="flex-con-1"><i class="create-room"></i>
							<p>创建房间</p>
						</router-link>
						<router-link tag="li" :to="'/roomCard/myRoom'" class="flex-con-1"><i class="my-room"></i>
							<p>我的房间</p>
						</router-link>
					</ul>
					<ul class="flex-wrap nav">
						<li class="flex-con-1" :class="{ active: page }" @click=changePage(true)><span>热门推荐</span></li>
						<li class="flex-con-1" :class="{ active: !page }" @click=changePage(false)><span>最近参与</span></li>
					</ul>
					<!--热门推荐 最近参与-->
					<ul class="hot-room-list">
						<li class="no-record" v-if="hotArr.hotRoomList == '' || hotArr.hotRoomList == null">
							<div class="no-record-img"></div>
							<div class="no-record-info" v-if="page">暂无热门推荐</div>
							<div class="no-record-info" v-if="!page">暂无参与记录</div>
						</li>
						<router-link class="flex-wrap hotLis" v-for="(item,index) in hotArr.hotRoomList" :to="'/roomCard/room/' + item.roomNumber">
							<div class="flex-wrap hotLis-box">
								<img :src="item.houseOwner" alt="">
								<div class="hot-text">
									<p>{{item.notice}}</p>
									<div class="star-box">
                    					<star :starLevel="item.starLevel"></star>
										<div class="star-right">
											<div class="room-box">
												<i class="ic_house"></i>
												<span>房号：{{item.roomNumber}}</span>
											</div>
											<div class="person-box">
												<i class="ic_person"></i>
												<span><em>{{item.onlineNumber}}</em>/{{item.headCount}}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<i class="ic_today_tj" v-show="page" v-if="index<2"></i>
						</router-link>
					</ul>
				</div>

			</div>
		</div>

		<!--群主特权-->
		<div class="group-box" v-show="md.massBuyCard">
			<div class="title">群主特权</div>
			<div class="buy-cards" @click="showMassBuyCard">批量买卡<i class="ic-arrow-rg"></i></div>
			<router-link tag="div" :to="'/roomCard/roomCardTransfer'" class="cards-transfer">房卡转让 <i class="ic-arrow-rg"></i></router-link>
			<i class="ic-close-white" @click="closeMassBuyCard"></i>
		</div>
		<!--弹出层-->
		<div class="md-mask" :class="{ 'active': md.mask }"></div>
		<div class="md-modal md-effect-1 join-room" :class="{ 'md-show': md.joinRoom }">
			<div class="md-content">
				<i class="md-close ic-close-gray" @click="closeMd('joinRoom')"></i>
				<div class="title">加入房间</div>
				<input type="number" class="inp" placeholder="请输入6位房间号" v-model="intoRoomId" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" />
				<div class="tips">tips:可向房主获取房间号和密码，或自建房间邀朋友一起玩。</div>
			</div>
		</div>
		<!--3次密码输入错误-->
		<div class="md-modal md-effect-1 password-error" :class="{ 'md-show': md.passwordError }">
			<div class="md-content">
				<i class="md-close ic-close-gray" @click="closeMd('passwordError')"></i>
				<div class="ic_error_3"></div>
				<div class="password-text">密码输入错误已累计3次，您将无法参与本局游戏。请联系群主获取密码。</div>
				<input type="button" value="我知道了" class="know-btn" @click="closeMd('passwordError')">
			</div>
		</div>
		<!--房卡不足-->
		<div class="md-modal md-effect-1 no-room-card" :class="{ 'md-show': md.noRoomCard }">
			<div class="md-content">
				<i class="md-close ic-close-gray" @click="closeMd('noRoomCard')"></i>
				<div class="ic_room-card">
					<div class="room-card-num">0张</div>
				</div>
				<div class="room-card-title">您的房卡不足，请购买房卡</div>
				<div class="room-card-text">创建房间须使用房卡道具</div>
				<input type="button" value="立即购买" class="to-buy-btn">
			</div>
		</div>

		<!--购买房卡-->
		<div class="mass-buy-card" v-show="md.payRoomCard" :class="{'pullUp': md.payRoomCard}">
			<div class="title">购买房卡</div>
			<div class="main-content">
				<div class="buy-cards-text"><span>选择购卡数量</span></div>
				<div class="flex-wrap choose-type-box">
					<div class="choose-type" :class="{'active':item.active}" v-for="(item,index) in buyList" @click="chooseType(index)" v-if="!item.ifmass">
						<div class="card-num" :class="{'active':item.active}">房卡x{{item.num}}张</div>
						<div class="card-price" :class="{'active':item.active}">{{item.price}}元</div>
					</div>
				</div>
			</div>
			<i class="ic-close-gray" @click="closeMd('payRoomCard')"></i>
		</div>
		<!--批量买卡-->
		<div class="mass-buy-card" v-show="md.massToBuy">
			<div class="title">批量买卡</div>
			<div class="main-content">
				<div class="buy-cards-text"><span>选择购卡数量</span><em><群主特权>购卡6折，即3元/张</em></div>
				<div class="flex-wrap choose-type-box">
					<div class="choose-type" :class="{'active':item.active}" v-for="(item,index) in buyList" @click="chooseType(index)" v-if="item.ifmass">
						<div class="card-num" :class="{'active':item.active}">房卡x{{item.num}}张</div>
						<div class="card-price" :class="{'active':item.active}">{{item.price}}元</div>
					</div>
				</div>
			</div>
			<i class="ic-close-gray" @click="closeMd('massToBuy')"></i>
		</div>
		
		
		
		<!-- 快点支付  -->
		<kd-pay :paySet=paySet></kd-pay>
	</div>
</template>

<script>

	import Api from '@/fetch/api'
	import config from '@/config';
	import common from '@/assets/js/common'
	import { Toast,Indicator,Swipe,SwipeItem } from 'mint-ui'

	export default {
		data() {
			return {
				user: this.$store.getters.getUserInfo || '',
				ws : this.$store.getters.getSocket,
				intoRoomId: '',
				hotArr: common.getJsonLocal("hotArr") || [],
				messageList: common.getJsonLocal("messageList") || [],
				buyList: [
					{ num: "1", price: "5", active: false, ifmass: false },
					{ num: "10", price: "50", active: false, ifmass: false },
					{ num: "50", price: "250", active: false, ifmass: false },
					{ num: "100", price: "500", active: false, ifmass: false },
					{ num: "300", price: "900", active: false, ifmass: true },
					{ num: "500", price: "1500", active: false, ifmass: true },
					{ num: "1000", price: "3000", active: false, ifmass: true },
					{ num: "5000", price: "20000", active: false, ifmass: true },
				],
				paySet:{
					type : 'XZDD',
					returnUrl : 'http://' + config.host + encodeURIComponent('/#/roomCard/index/0'),
					balance : true,
	        		balancePay : this.balancePay
				},
				page: true,
				headerMag: {
					title: '血战到底',
					rightMsg: '',
					rightUrl: ''
				},
				roomCard: {
					roomCardAmount: 0
				},
				myRecord: '',
				md: {
					mask: false,
					joinRoom: false,
					payRoomCard: false,
					passwordError: false,
					noRoomCard: false,
					massBuyCard: false,
					confirmPayShow: false,
					massToBuy: false,
				}
			}
		},
		watch: {
			'intoRoomId': function(val) {
				if(val.length == 6) {
					this.addRoom(val, '')
				}
			}
		},
		created() {
			let self = this;
			//common.createService(this);
			if(this.$route.params.page == 0){
				this.page = true;
		        Api.xzddHome(function(data){
		            self.roomCard.roomCardAmount = data.roomCardAmount;
		            localStorage.setItem("roomCardAmount",data.roomCardAmount);
		            self.hotArr = data;
		            self.messageList=data.messageList;
		            common.setJsonLocal("hotArr",data);
		            common.setJsonLocal("messageList",data.messageList);
		        })
	        }else {
	        	this.page = false;
		        Api.recentJoin(function(data){
		            self.roomCard.roomCardAmount = data.roomCardAmount;
		            self.hotArr = data;
		            common.setJsonLocal("hotArr",data);
		        })
	        }
		},
		methods: {
			chooseType(index) {
				 this.$store.getters.getKdPay.payPrice = this.buyList[index].price;
				const self = this;
				for(let i = 0; i < self.buyList.length; i++) {
					this.buyList[i].active = false;
				};
				setTimeout(function() {
					self.closeMd('massBuyCard');
					self.closeMd('payRoomCard');
					self.closeMd('massToBuy');
					self.$store.getters.getKdPay.show = true;
				}, 100);
				this.buyList[index].active = true;
			},
			changePage(type) {
				if((type && this.page) || (!type && !this.page)) return
				this.page = !this.page;
				let self = this;
				if(!this.page) {
					this.$router.replace('/roomCard/index/1')
					this.page = false;
					Indicator.open();
					Api.recentJoin(function(data) {
						Indicator.close();
						if(data.msgCode == '200'){
							common.setJsonLocal("hotArr", data);
							self.hotArr = data;
						}
					})
				} else {
					Indicator.open();
					Api.xzddHome(function(data) {
						Indicator.close();
						if(data.msgCode == '200'){
							self.hotArr = data;
							self.messageList = data.messageList;
							common.setJsonLocal("messageList", data.messageList);
							common.setJsonLocal("hotArr", data);
						}
					});
					this.$router.replace('/roomCard/index/0')
				}
			},
			buyListChange(index) {
				common.clearActive(this.buyList);
				this.buyList[index].active = true;
			},
			changePayWay(index) {
				common.clearActive(this.payList);
				this.payList[index].active = true;
			},
			showMd(md) {
				this.md[md] = true;
				this.md.mask = true;
			},
			closeMd(md) {
				this.md[md] = false;
				this.md.mask = false
			},
			closePay(md) {
				let self = this;
				self.md[md] = false;
				self.md.mask = false;
				for(let i = 0; i < self.buyList.length; i++) {
					self.buyList[i].active = false;
				};
			},
			addRoom(roomId, roomPwd) {
				let self = this;
				Api.enterRoom(function(data) {
					if(data.msgCode == '200') {
						self.$store.dispatch('activeRoom', data);
						self.$router.push('/roomCard/room/' + roomId);
					} else if(data.msgCode == '301') {
						Toast({ message: '房间号不存在', duration: 1300 });
					}
				}, {
					roomId: roomId,
					roomPwd: roomPwd
				})
			},
			showMassBuyCard(type) {
				this.md.massToBuy = !this.md.massToBuy;
				this.md.massBuyCard = false;
			
			},
			closeMassBuyCard() {
				this.md.mask = false;
				this.md.massBuyCard = false;
			},
			payRoomCard() {
				for(let i = 0; i < this.buyList.length; i++) {
					this.buyList[i].active = false;
				};
				this.md.mask = !this.md.mask;
				if(this.user.group) {
					this.md.massBuyCard = !this.md.massBuyCard;
				} else {
					this.md.payRoomCard = !this.md.payRoomCard;
				}
			},
			balancePay(){
				let self = this;
				let num = common.getArrItem(this.buyList, "num");
				Api.getRoomCard(function(data) {
					if(data.msgCode == '200') {
						self.md.mask = false;
						self.md.payRoomCard = false;
						self.$store.getters.getKdPay.show = false;
						self.user.balance = data.balance;
						self.roomCard.roomCardAmount = self.roomCard.roomCardAmount + parseInt(num);
						Toast({ message: '购买成功', duration: 1500, iconClass: 'ic-toast-success' });
					} else {
						Toast({ message: data.msgNote, duration: 1500 });
					}
				}, {
					amount: num
				})
			},
			addRoom(roomId, roomPwd) {
				let self = this;
				Indicator.open();
				Api.enterRoom(function(data) {
					Indicator.close();
					if(data.msgCode == '200') {
						self.$store.dispatch('activeRoom', data);
						self.$router.push('/roomCard/room/' + roomId)
					} else {
						Toast({ message: data.msgNote, duration: 1500 });
					}
				}, {
					roomId: roomId,
					roomPwd: roomPwd
				})
			},
			recordDetails(b, r, u) {
				this.$router.push('/roomCard/recordDetails/' + b + '/' + r + '/' + u)
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/roomCard/roomCard.scss";
</style>
