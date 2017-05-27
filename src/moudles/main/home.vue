<template>
<div class="flex-wrap" id="home">
	<header class="header">
		<router-link class="user-info flex-wrap" tag="div" to="/personal">
			<img class="user-head" :src="user.userImage" alt="" />
			<div class="info">
				<div class="user-name">{{user.alias}}</div>
				<div class="user-id">ID:{{user.userCode}}</div>
			</div>
		</router-link>
		<router-link tag="div" class="user-balance" to="/balance"><i class="ic-balance"></i>余额(元): {{user.balance | RMB_f}}</router-link>
	</header>
	<div class="content flex-con-1" ref="wrapper">
		<div class="scroll">
			<div class="welfare-box">
				<div class="welfare-title">{{welfare.title}}</div>
				<div class="welfare-status">{{redpack.time | welfareTime}}</div>
				<div class="welfare-amonut">红包总金额：{{redpack.total}}元</div>
				<router-link :to='"/welfare/index"' class="welfare-btn">{{welfare.btn}}</router-link>
			</div>
			<ul class="home-nav flex-wrap">
				<router-link tag="li" to="/goodsAuction/myAuction" class="flex-con-1">
					<p>我的抢拍</p>
				</router-link>
				<router-link tag="li" to="/shop" class="flex-con-1">
					<p>乐豆商城</p>
				</router-link>
				<router-link tag="li" to="/vip" class="flex-con-1">
					<p>vip特权</p>
				</router-link>
				<router-link tag="li" to="/news" class="flex-con-1">
					<p>消息通知</p>
				</router-link>
				<router-link tag="li" to="/customer" class="flex-con-1">
					<p>客服中心</p>
				</router-link>
			</ul>
			<ul class="activity-box flex-wrap">
				<router-link tag="li" to="/redpackPK/index" class="hbjc flex-wrap">
					<div class="activity-logo"></div>
					<div class="activity-info">
						<div class="activity-name">红包竞猜</div>
						<div class="activity-tips">多人竞猜领红包</div>
					</div>
					<i class="ic-tj"></i>
				</router-link>
				<router-link tag="li" to="/redpackKld/index" class="ddjl flex-wrap">
					<div class="activity-logo"></div>
					<div class="activity-info">
						<div class="activity-name">豆豆接龙</div>
						<div class="activity-tips">全凭手气抢红包</div>
					</div>
				</router-link>
			</ul>
			<ul class="activity-box flex-wrap">
				<li class="xzdd flex-wrap" @click=goXZDD>
					<div class="activity-logo"></div>
					<div class="activity-info">
						<div class="activity-name">血战到底</div>
						<div class="activity-tips">欢迎参与内测</div>
					</div>
				</li>
				<li class="jqqd flex-wrap">
					<div class="activity-logo"></div>
					<div class="activity-info">
						<div class="activity-name">敬请期待</div>
						<div class="activity-tips">正在制作中</div>
					</div>
				</li>
			</ul>
			<div class="goods-candid">
				<div class="goods-candid-title"><i class="ic-candid"></i>全民抢拍<span>（抢不到全额退豆）</span></div>
				<ul class="goods-list clearfix">
					<router-link tag="li" :to="'/goodsAuction/index/'+goods.goodsId" v-for="goods in goodsLis">
						<div class="JD-price"><p><span>￥</span>{{goods.jdPrice | toInt}}</p></div>
						<img v-lazy="goods.goodsImg">
						<div class="goods-name">{{goods.goodsName}}</div>
						<div class="current-price">
							往期价:<span>￥<em>{{goods.upPrice | RMB_f}}</em></span>
						</div>
						<input type="button" value="抢购" class="candidBtn"/>
					</router-link>
					<li class="empty" v-if="goodsLis.length%2 != 0">

					</li>
				</ul>
			</div>
			<div class="copyright">快点生活出品</div>
		</div>
	</div>

	<div class="md-mask" :class="{ 'active': md.mask }" @click="closeMd('all')"></div>

	<div class="md-modal md-effect-1 md-login" :class="{ 'md-show': md.login }">
		<div class="md-content">
			<i class="md-close" @click="closeMd('integral')"></i>

		</div>
	</div>

  <!--开红包-->
  <div class="md-mask" :class="{ 'active': md.mask}"></div>
  <div class="md-modal md-effect-1 openRedpack" :class="{ 'md-show': md.openRedpack}">
    <div class="md-content">
      <div class="openRedpack_top">
        <img src="http://k.kuaidian.cn/userImage/ic_head.png" alt=""/>
        <div class="openRedpack_name">快点红包</div>
        <div class="openRedpack_text">整点福利红包，金额随机</div>
        <div class="openRedpack_mainName">恭喜发财，大吉大利！</div>
      </div>
      <i class="money"></i>
    </div>
  </div>


  <!--开红包-->
  <div class="md-modal md-effect-1 openingRp" :class="{ 'md-show': md.openingRp}">
    <div class="md-content">
      <div class="cash_num"><em>0.00</em>元</div>
      <div class="cash_state">现金已存入个人帐户</div>
      <input type="button" class="goRobBtn" value="继续抢红包"/>
      <i class="red_close"></i>
      <div class="goTime"></div>
    </div>
  </div>

	<div class="ic-cash-logo pulse" @click=goDFW></div>
</div>
</template>

<script>

import Vue from 'vue'
import Api from '@/fetch/api'
import common from '@/assets/js/common'
import { Toast,Lazyload } from 'mint-ui'
import {mapGetters,mapActions} from 'vuex'

export default {
  name: 'home',
  data(){
    return {
    	user: this.$store.getters.getUserInfo || '',
    	ws : this.$store.getters.getSocket,
    	redpack: this.$store.getters.getRedpackInfo || '',
    	welfare : this.$store.getters.getWelfare || '',
    	goodsLis : common.getJsonLocal("goodsLis") || '',
		md: {
			mask: false,
			login : false,
      openingRp : false,
      openRedpack : false,
		}
    }
  },
  created() {
  	var self = this;
  	if(this.ws){
  		this.ws.close();
  		self.$store.dispatch('socket',false);
  	}
  	self.$store.dispatch('changeUserInfo',this);
  	self.$store.dispatch('changeRedpackInfo',{self:this,countDown:this.countDown});
  	Api.goodsHome(function(data){
  		common.setJsonLocal("goodsLis",data);
	    self.goodsLis = data;
	});
  },
  filters:{

  	welfareTime: function(value) {
		if(!value && value != 0) return
		if(value <= 1000){
			return '正在进行中'
		}else{
			let times = value/1000;
			let ss = Math.floor(times / 60 / 60 % 24).toString();
	        if (ss.length <= 1) {
	            ss = "0" + ss;       //时
	        }
	        let fs = Math.floor(times / 60 % 60).toString();
	        if (fs.length <= 1) {
	            fs = "0" + fs;       //分
	        }
	        let ms = Math.floor(times % 60).toString();
	        if (ms.length <= 1) {
	            ms = "0" + ms;     //秒
	        }
			return ss + ':' + fs + ":" + ms
		}
	}
  },
  methods: {

	countDown(){

		if(this.redpack.time == 0){
			let welfare = {
				title : "整点福利包",
				btn : '立即开抢'
			}
			this.welfare = welfare;
		}
		if(!this.redpack.time) return

		let self = this;
		if(self.redpack.time != 0){
			let welfare = {
				title : "下个整点福利包",
				btn : '还未开始，请稍后..'
			}
			self.welfare = welfare;
			self.$store.dispatch('changeWelfare',welfare);
		}
		var _countDown = setInterval(function(){
			if(self.redpack.time <= 0){
				let welfare = {
					title : "整点福利包",
					btn : '立即开抢'
				}
				self.welfare = welfare;
				self.$store.dispatch('changeWelfare',welfare);
				clearInterval(_countDown);
				return
			}else{

				self.redpack.time = self.redpack.time - 1000;
			}
		},1000)
	},
	goXZDD(){
		this.$router.push('/roomCard/index/0')
	},
	goDFW(){
		this.$router.push('/cashRedpack/index')
	}

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/main/home.scss";
</style>
