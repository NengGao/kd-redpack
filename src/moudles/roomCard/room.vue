
<template>
	<div class="hot flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="inform flex-wrap">
			<div class="informList flex-con-1">
				
			</div>
			<div class="more"></div>
		</div>
		<div class="content flex-wrap flex-con-1" ref="wrapper">
	       	<div class="scroll">
          		<div class="game-info">
          			<div class="owner"><img src="http://wx.qlogo.cn/mmopen/WdJ2BLGuxzOm43YiaMwnyrmoGqSekH86zoyJmicPcyrCjwPPhPZKOLB23zLc25q1ktzLCicsN8UsD6tmib8V9Z53VHR2daFenvBg/0" alt="" /></div>
          			<div class="owner-name">{{activeRoom.createByName}}</div>
          			<div class="owner-account">微信号：{{activeRoom.weixinNo}}</div>
          			<div class="game-tips"></div>
          			<div class="game-rule">游戏规则：{{activeRoom.gameRuleName}}</div>
          			<div class="game-explain" v-if="activeRoom.award > 0">每包抽取{{activeRoom.award}}点作为额外奖励，奖励如下：</div>
          			<ul class="game-award" v-if="activeRoom.award > 0">
          				<li v-for="award in activeRoom.awardRules">◆  {{award.awardName}}（{{award.awardDesc}}，奖{{award.awardAmt / 100}}点）</li>
          			</ul>
          		</div>
          		<div class="flex-wrap redpack-row">
          			<div class="send-head"><img src="http://wx.qlogo.cn/mmopen/WdJ2BLGuxzOm43YiaMwnyrmoGqSekH86zoyJmicPcyrCjwPPhPZKOLB23zLc25q1ktzLCicsN8UsD6tmib8V9Z53VHR2daFenvBg/0" alt="" /></div>
          			<div class="send-info">
          				<div class="send-name">中山大灯亮</div>
          				<div class="redpack">
							<div class="ic-redpack"></div>
							<div class="redpack-tip"><p>恭喜发财大吉大利</p><span>领取红包</span></div>
          					<div class="redpack-info">血战到底（<em>第20包</em>/共20包）</div>
          				</div>
          			</div>
          		</div>
          		<div class="flex-wrap redpack-row">
          			<div class="take-result"><img src="http://wx.qlogo.cn/mmopen/WdJ2BLGuxzOm43YiaMwnyrmoGqSekH86zoyJmicPcyrCjwPPhPZKOLB23zLc25q1ktzLCicsN8UsD6tmib8V9Z53VHR2daFenvBg/0" alt="" />“大三洋摩托”领取了”中山大灯亮”的<em>红包</em></div>
          		</div>
          		<div class="flex-wrap redpack-row">
          			<div class="take-result"><img src="http://wx.qlogo.cn/mmopen/WdJ2BLGuxzOm43YiaMwnyrmoGqSekH86zoyJmicPcyrCjwPPhPZKOLB23zLc25q1ktzLCicsN8UsD6tmib8V9Z53VHR2daFenvBg/0" alt="" />“大三洋摩托”领取了”中山大灯亮”的<em>红包</em></div>
          		</div>
          		<div class="flex-wrap redpack-row">
          			<div class="take-result"><img src="http://wx.qlogo.cn/mmopen/WdJ2BLGuxzOm43YiaMwnyrmoGqSekH86zoyJmicPcyrCjwPPhPZKOLB23zLc25q1ktzLCicsN8UsD6tmib8V9Z53VHR2daFenvBg/0" alt="" />“大三洋摩托”领取了”中山大灯亮”的<em>红包</em></div>
          		</div>
          		<div class="flex-wrap redpack-row">
          			<div class="take-result"><img src="http://wx.qlogo.cn/mmopen/WdJ2BLGuxzOm43YiaMwnyrmoGqSekH86zoyJmicPcyrCjwPPhPZKOLB23zLc25q1ktzLCicsN8UsD6tmib8V9Z53VHR2daFenvBg/0" alt="" />“大三洋摩托”领取了”中山大灯亮”的<em>红包</em></div>
          		</div>
          		
          		<div class="flex-wrap redpack-row">
          			<div class="send-head"><img src="http://wx.qlogo.cn/mmopen/WdJ2BLGuxzOm43YiaMwnyrmoGqSekH86zoyJmicPcyrCjwPPhPZKOLB23zLc25q1ktzLCicsN8UsD6tmib8V9Z53VHR2daFenvBg/0" alt="" /></div>
          			<div class="send-info">
          				<div class="send-name">系统提示</div>
          				<div class="news-box">
          					本局结束，即将公布本局抢红包结果。
          				</div>
          			</div>
          		</div>
	        </div>
		</div>
		<div class="footer flex-wrap">
			<div class="integral">
				<div class="title">本局积分</div>
				<div class="number">0.00</div>
			</div>
			<div class="chatInp flex-con-1">
				<div class="inp flex-wrap">
					<input type="text" class="feedIn flex-con-1" id="" value="" placeholder="说点什么吧.."/>
					<i class="ic-face"></i>
					<input type="button" class="send" value="发送"/>
				</div>
			</div>
		</div>
		<!--弹出层-->
		<div class="md-mask" :class="{ 'active': md.mask }"></div>
		<div class="md-modal md-effect-1 md-room-info" :class="{ 'md-show': md.mdRoomInfo }">
			<div class="md-content">
				<i class="md-close ic-close-gray" @click="closeMd('mdRoomInfo')"></i>
				
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import Api from '@/fetch/api'
import config from '@/config';
import common from '@/assets/js/common'
import BScroll from 'better-scroll'

export default{
	data(){
		return{
			user: this.$store.getters.getUserInfo || '',
			activeRoom: this.$store.getters.getActiveRoom || '',
			
			headerMag:{
				title: '房间号（'+ this.$route.params.roomid +'）',
				rightMsg: '<i class="ic-ganapati"></i>',
				rightUrl: '/roomCard/groupInfo/'+this.$route.params.roomid
			},
			md:{
				mask: false,
				mdRoomInfo : false
			}
		}
	},
	created(){
		this.createService(this.$route.params.roomid)
	},
	mounted(){
		this._initScroll();
	},
	methods:{
		_initScroll() {
	        this.scroll = new BScroll(this.$refs.wrapper, {
	          	click: true
	        });
		},
		createService(roomId){
			let interval;
		    const ws = new WebSocket("ws://"+ config.ws.roomCard +"/room/createService?token=" + this.user.token + "&roomId=" + roomId);
		    ws.onopen = function () {
		        console.log("创建会话");
		        interval = setInterval(function() {
		            //keepalive()
		        },30000);
		    };
		    ws.onclose = function () {
		        console.log('会话关闭');
		        clearInterval(interval)
		    };
		    ws.onerror = function (evt) {
		        console.log("错误：" + evt)
		    };
		    ws.onmessage = function (message) {
		
		        if (sign != message.data) {
		            var data = JSON.parse(message.data);
		            var type = data.msgType,str = '';
		            if ('200' == type) {//初始化房间
		            	
		            }
		        }
			}
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/roomCard/room.scss";
</style>