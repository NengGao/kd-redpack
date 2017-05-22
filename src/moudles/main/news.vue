<template>
	<div class="news flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="content flex-con-1">
       <div class="scroll">
          <!--<div class="no-message">-->
             <!--<img src="/static/images/main/no_message_bg.png" alt=""/>-->
             <!--<div class="no-message_text">您还没有接收到消息～</div>-->
          <!--</div>-->
          <router-link class="flex-wrap vip" :to="{name: 'newsDetail'}">
             <div class="vip-img"><img src="/static/images/main/ic_task1.png" alt=""/></div>
             <div class="vip-title">
               <div class="vip-title-text">现金帐户</div>
               <div class="vip-title-state">您有一笔现金提现到微信</div>
             </div>
             <div class="box-time">10-12 12:30</div>
             <div class="notice-num">5</div>
             <i class="arrows-right-gray"></i>
          </router-link>
       </div>
		</div>
	</div>
</template>

<script>
  import Vue from 'vue'
  import Api from '@/fetch/api'
  import common from '@/assets/js/common'
  import {mapGetters,mapActions} from 'vuex'

	export default{
		name: 'vip',
		data(){
			return{
				user: this.$store.state.user,
        toMessageCenter: this.$store.state.toMessageCenter,
				headerMag:{
					title:'我的消息',
					rightMsg: '',
					rightUrl: ''
				}
			}
		},
		created() {
       var self = this;
       Api.toMessageCenter(function (data) {

       })

    },
    method:{

		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/main/news.scss";
</style>
