<template>
	<div class="roomCard flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="card-number" @click="payRoomCard">{{roomCard.roomCardAmount}}</div>
		<div class="content flex-wrap flex-con-1">
			<ul class="flex-wrap nav">
				<li class="flex-con-1" :class="{ active: page }" @click=changePage(true)><span>游戏大厅</span></li>
				<li class="flex-con-1" :class="{ active: !page }" @click=changePage(false)><span>我的战绩</span></li>
			</ul>
			<div class="room-card-content flex-con-1">
				<!-- 游戏大厅 -->
				<div class="game-lobby" v-show="page">
					<ul class="card-room flex-wrap">
						<router-link tag="li" :to="'/roomCard/setRoom'" class="flex-con-1"><i class="create-room"></i>创建房间</router-link>
						<li class="flex-con-1" @click="showMd('joinRoom')"><i class="add-room"></i>加入房间</li>
					</ul>
					<div class="my-room">
						<div class="my-room-title">
							<span>我的房间</span>
							<router-link tag="div" :to="'/roomCard/hot'" class="hot-room">热门推荐</router-link>
						</div>
						<ul class="my-room-list">
							<li @click="addRoom(room.roomNumber,'')" class="flex-wrap" v-for="room in roomCard.myRoomList">
								<div class="owner-head">
									<img :src="room.houseOwner" alt="" />
									<i class="owner-identify"></i>
								</div>
								<div class="room-info">
									<div class="room-code">房间号（{{room.roomNumber}}）<span class="room-state" :class="{'active':room.roomStatus == 'P'}">{{room.roomStatus | roomStatus_f}}</span></div>
									<div class="room-tips" v-if="room.awardStatus == 'Y'">玩法：{{room.gameplay}}    额外加奖</div>
									<div class="room-tips" v-if="room.awardStatus == 'N'">玩法：{{room.gameplay}}</div>
									<i class="ic-arrow-rw"></i>
								</div>
							</li>
						</ul>
					</div>
					<div class="my-room">
						<div class="my-room-title">
							<span>我参与的房间</span>
						</div>
						<ul class="my-room-list">
							<li @click="addRoom(room.roomNumber,'')" class="flex-wrap" v-for="room in roomCard.recentlyInList">
								<div class="owner-head">
									<img :src="room.houseOwner" alt="" />
									<i class="owner-identify"></i>
								</div>
								<div class="room-info">
									<div class="room-code">房间号（{{room.roomNumber}}）<span class="room-state" :class="{'active':room.roomStatus == 'P'}">{{room.roomStatus | roomStatus_f}}</span></div>
									<div class="room-tips" v-if="room.awardStatus == 'Y'">玩法：{{room.gameplay}}    额外加奖</div>
									<div class="room-tips" v-if="room.awardStatus == 'N'">玩法：{{room.gameplay}}</div>
									<i class="ic-arrow-rw"></i>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<!-- 我的战绩 -->
				<div class="my-record" v-show="!page">
					<ul class="record-list">
						<li class="flex-wrap" v-for="record in myRecord">
							<div class="owner-head">
								<img :src="record.houseOwner" alt="" />
								<i class="owner-identify"></i>
							</div>
							<div class="room-info">
								<div class="room-code">房间号（1100）<span class="game-code">(10025局)</span></div>
								<div class="room-tips">05 -21 16:42</div>
								<div class="grade active">{{record.grades | grades_f}}</div>
								<i class="ic-arrow-rw"></i>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="flex-wrap buy-room-card" v-show="page">
			<i class="ic-room-card"></i>
			<div class="buy-card-info">
				<p>购买房卡<em>(5元/张)</em></p>
				<span>创建房间必备道具</span>
			</div>
			<input type="button" name="" class="room-card-btn" id="" value="立即购买" @click="payRoomCard"/>
		</div>


		<!--弹出层-->
		<div class="md-mask" :class="{ 'active': md.mask }"></div>
		<div class="md-modal md-effect-1 join-room" :class="{ 'md-show': md.joinRoom }">
			<div class="md-content">
				<i class="md-close ic-close-gray" @click="closeMd('joinRoom')"></i>
				<div class="title">加入房间</div>
				<input type="number" class="inp" placeholder="请输入6位房间号" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"/>
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
        <div class="ic_room-card"><div class="room-card-num">0张</div></div>
        <div class="room-card-title">您的房卡不足，请购买房卡</div>
        <div class="room-card-text">创建房间须使用房卡道具</div>
        <input type="button" value="立即购买" class="to-buy-btn">
      </div>
    </div>

    <!--购买房卡-->
    <div class="pay-room-card" v-show="md.payRoomCard" :class="{'pullUp': md.payRoomCard}">
      <div class="title">获取房卡</div>
      <div class="text">创建房间和开局必备道具</div>
      <div class="room-card-num">
        <p class="buy-text">选择购买数量</p>
        <div class="flex-wrap room-card-box">		
        	<div class="flex-con-1 flex-wrap flex-center room-card-type" :class="{'active': buy.active}" @click="buyListChange(i)" v-for="(buy,i) in buyList">
	             <div class="main-content">
	               <p :class="{'active': buy.active}">房卡x{{buy.num}}张</p>
	               <p :class="{'active': buy.active}">{{buy.price}}元</p>
	             </div>
          	</div>
        </div>
      </div>
      <div class="choose-pay-type">
      	<i class="ic-close-gray" @click="payRoomCard"></i>
        <p class="choose-pay-text">选择支付方式</p>
        <div class="pay-type-box">
          <div class="flex-wrap flex-center pay-type-list" @click="changePayWay(i)" v-for="(pay,i) in payList"> 
            <div class="is-choose"><i :class="{'active': pay.active}"></i></div>
            <div class="pay-text">
              <p>{{pay.title}}</p>
              <div class="pay-SM" v-if="pay.favorable">
                 <span></span>
                 <em>支付随机减免</em>
              </div>
              <p v-if="pay.type=='ye'">我的余额：{{user.balance | RMB_f}}元</p>
            </div>
          </div>
        </div>
      </div>
      <input type="button" value="立即支付" class="to-pay-btn" @click=buyCard>
    </div>
	</div>
</template>

<script>

	import Api from '@/fetch/api'
	import common from '@/assets/js/common'
	import { Toast } from 'mint-ui';
	export default{

		data(){
			return{
				user: this.$store.getters.getUserInfo || '',
				buyList :[
					{num:"1",price:"5",active:true},
					{num:"50",price:"250",active:false},
					{num:"500",price:"2500",active:false}
				],
				payList :[
					{title:"余额支付",type:"ye",active:true,favorable:false},
					{title:"微信扫码支付",type:"wxScan",active:false,favorable:true},
					{title:"微信支付",type:"wxApp",active:false,favorable:false},
					{title:"支付宝支付",type:"wxApp",active:false,favorable:false}
				],
				page: true,
				headerMag:{
					title:'血战到底',
					rightMsg: '',
					rightUrl: ''
				},
				roomCard : common.getJsonLocal("roomCard") || '',
				myRecord : '',
				md:{
					mask: false,
					joinRoom: false,
			        payRoomCard: false,
			        passwordError: false,
			        noRoomCard: false
				}
			}
		},
		beforeCreate(){
			var data = {
				oid : this.$route.params.oid,
				self : this
			}
		  	this.$store.dispatch('roomCardlogin',data);
		},
		methods:{
			_initScroll() {
		  		console.log(this.$refs.wrapper);
		        this.scroll = new BScroll(this.$refs.wrapper, {
		          	click: true
		        });
			},
			changePage(type){
				if((type && this.page) || (!type && !this.page)) return
				this.page = !this.page
				if(!this.page){
					const self = this;
					Api.myResult(function(data){
				  		self.myRecord = data
				  	})
				}
			},
			buyListChange(index){
		    	common.clearActive(this.buyList);
		      	this.buyList[index].active = true;
		   },
		    changePayWay(index){
		    	common.clearActive(this.payList);
		      	this.payList[index].active = true;
		    },
			showMd(md){
				this.md[md] = true;
				this.md.mask = true;
			},
			closeMd(md){
				this.md[md] = false
				this.md.mask = false
			},
		    payRoomCard () {
		        this.md.mask = !this.md.mask;
		        this.md.payRoomCard = !this.md.payRoomCard;
		    },
		    buyCard (){
		    	let num = common.getArrItem(this.buyList,"num");
		    	let type = common.getArrItem(this.payList,"type");
		    	if(type == 'ye'){
		    		let self = this;
		    		Api.getRoomCard(function(data){
		    			if(data.msgCode == '200'){
		    				self.payRoomCard();
		    				self.user.balance = data.balance;
		    				self.roomCard.roomCardAmount = self.roomCard.roomCardAmount + parseInt(num);
	    					Toast({message: '购买成功',duration: 1500,iconClass: 'ic-toast-success'});
		    			}
		    		},{
		    			amount : num
		    		})
		    	}
		    },
		    addRoom(roomId,roomPwd){
		    	let self = this;
		    	Api.enterRoom(function(data){
					if(data.msgCode == '200'){
						self.$store.dispatch('activeRoom',data);
						self.$router.push('/roomCard/room/'+roomId)
					}
				},{
					roomId: roomId,
					roomPwd : roomPwd
				})
		    }
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/roomCard/roomCard.scss";
</style>
