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
		<router-link tag="div" class="user-balance" to="/balance"><i class="ic-balance"></i>余额(元): {{user.userMoney | RMB_f}}</router-link>
	</header>
	<div class="content flex-con-1" ref="wrapper">
		<div class="scroll">
			<div class="welfare-box">
				<div class="welfare-title">{{welfare.title}}</div>
				<div class="welfare-status">{{redpack.time | welfareTime}}</div>
				<div class="welfare-amonut">红包总金额：{{redpack.total}}元</div>
				<router-link to="/welfare/index"><input type="button" class="welfare-btn" :value="welfare.btn"/></router-link>
			</div>
			<ul class="home-nav flex-wrap">
				<li class="flex-con-1">
					<p>我的抢拍</p>
				</li>
				<li class="flex-con-1">
					<p>乐豆商城</p>
				</li>
				<li class="flex-con-1">
					<p>vip特权</p>
				</li>
				<li class="flex-con-1">
					<p>消息通知</p>
				</li>
				<li class="flex-con-1">
					<p>客服中心</p>
				</li>
			</ul>
			<ul class="activity-box flex-wrap">
				<li class="hbjc flex-wrap" @click=goHBJC>
					<div class="activity-logo"></div>
					<div class="activity-info">
						<div class="activity-name">红包竞猜</div>
						<div class="activity-tips">多人竞猜领红包</div>
					</div>
				</li>
				<li class="ddjl flex-wrap">
					<div class="activity-logo"></div>
					<div class="activity-info">
						<div class="activity-name">豆豆接龙</div>
						<div class="activity-tips">全凭手气抢红包</div>
					</div>
				</li>
			</ul>
			<div class="goods-candid">
				<div class="goods-candid-title"><i class="ic-candid"></i>全民抢拍<span>（抢不到全额退豆）</span></div>
				<ul class="goods-list clearfix">
					<li v-for="goods in goodsLis">
						<img :src="goods.goodsImg">
						<div class="goods-name">{{goods.goodsName}}</div>
						<div class="current-price">
							往期价:<span>￥<em>{{goods.upPrice | RMB_f}}</em></span>
						</div>
						<input type="button" value="抢购" class="candidBtn"/>
					</li>
				</ul>
			</div>
			<div class="copyright">快点生活出品</div>
		</div>
	</div>
	<loader v-show="loaderShow"></loader>
</div>
</template>

<script>

import Vue from 'vue'
import Api from '@/fetch/api'
import common from '@/assets/js/common'
import BScroll from 'better-scroll'
import {mapGetters,mapActions} from 'vuex'

export default {
  name: 'home',
  data(){
    return {
    	user: this.$store.getters.getUserInfo,
    	redpack:this.$store.getters.getRedpackInfo,
    	welfare : this.$store.getters.getWelfare,
    	goodsLis : common.getJsonLocal("goodsLis"),
    	loaderShow: false
    }
  },
  beforeCreate(){
  	var self = this;
  	self.$store.dispatch('changeUserInfo',this);
  	self.$store.dispatch('changeRedpackInfo',this);
  	Api.goodsHome(function(data){
  		common.setJsonLocal("goodsLis",data);
	    self.goodsLis = data
	})
  },
  created() {	
  	this.countDown();
  },
  mounted() {
  	this._initScroll();
  },
  filters:{
  	welfareTime: function(value) {
  		
		if(!value && value != 0) return
		if(value <= 0){
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
  	_initScroll() {
        this.scroll = new BScroll(this.$refs.wrapper, {
          	click: true
        });
	},
	countDown(){
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
	goHBJC(){
		location.href = 'http://192.168.1.114:8080/redpackPK/views/redpackPK.html'
	}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/main/home.scss";
</style>