<template>
<div class="vip flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
      <div class="content flex-con-1">
          <div class="scroll">
              <div class="vip-Head-Box flex-wrap flex-center">
                 <div class="flex-wrap vip-left">
                     <div class="ic_vip"></div>
                     <div class="vip-Text-Box">
                       <p>vip特权</p>
                       <p>体验vip特权只需199.0快乐豆</p>
                     </div>
                 </div>
                 <input type="button" class="openVip" value="立即开通" @click="on">
              </div>
              <div class="vip-main">
                 <div class="vip-main-title">vip专享特权</div>
                 <table>
                    <tr>
                       <td>特权名称</td>
                       <td>普通用户</td>
                       <td>vip用户</td>
                    </tr>

                    <tr>
                       <td>每日领福利红包</td>
                       <td>2次</td>
                       <td>6次</td>
                    </tr>

                    <tr>
                       <td>抢拍加价次数</td>
                       <td>3次</td>
                       <td>6次</td>
                    </tr>

                    <tr>
                       <td>提现到账</td>
                       <td>-</td>
                       <td>及时到账</td>
                    </tr>

                    <tr>
                       <td>客户服务</td>
                       <td>-</td>
                       <td>24h金牌服务</td>
                    </tr>
                 </table>
              </div>
          </div>
      </div>
      <!--<div class="open-vip-dialog">
        <div class="open-vip-bg"></div>
        <div class="open-vip-Title">尊享vip特权</div>
        <div class="need-beans">开通只需：199.0豆</div>
        <p>您将享受以下特权</p>
        <ul>
          <li>• 每日5次免费福利红包；</li>
          <li>• vip专属红包双开几率提升20%；</li>
          <li>• 提款即时到账；</li>
          <li>• 专属客户服务；</li>
          <li>• vip专属身份</li>
        </ul>
        <input type="button" class="goOpen" value="立即开通">
      </div>-->
 </div>
</template>

<script>

  import Vue from 'vue'
  import Api from '@/fetch/api'
  import common from '@/assets/js/common'
  import BScroll from 'better-scroll'
  import {mapGetters,mapActions} from 'vuex'

	export default{
		name: 'vip',
		data(){
			return{
				user: this.$store.state.user,
				headerMag:{
					title:'升级vip特权',
					rightMsg: '',
					rightUrl: ''
				}
			}
		},
	    methods:{
			on:function () {
				
	        }
	    }
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/main/vip.scss";
</style>
