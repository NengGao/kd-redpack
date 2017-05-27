<template>
	<div class="welfare flex-wrap">
		<kd-header :headerMsg=headerMag></kd-header>
		<div class="content flex-con-1">
			<div class="scroll">

        <div class="nostartMain">
          <div class="welfare_main">
            <div class="welfare_head">
              <div class="welfare_head_lt">
                <i class="welfare_head_lt_img"></i>
                <span class="num">-</span>
                <span class="left_num">剩余次数：-.-</span>
              </div>
              <a href="javascript:void(0);" class="activity_rule">活动规则</a>
            </div>
            <!--未开始-->
            <div class="welfare_content">
              <i class="noStart_bg"></i>
              <div class="welfare_text">您来早了，活动还未开始</div>
              <div class="welfare_cash">红包总金额： <em>--</em>元</div>
            </div>
            <!--开始抢-->
            <div class="start-rob">
              <div class="welfare_content">
                <i class="moneyBag_bg"></i>
                <div class="leftRpNum"> <em>--</em> <span>/--</span>个</div>
                <div class="total_redpack">红包总金额： <em>--</em>元</div>
              </div>

              <input type="button" class="robingBtn" value="立即抢红包"/>
              <!--0次-->
              <div class="startNoNum">
                <div class="numOut">提示：今日免费抢红包次数已用完</div>
                <input type="button" class="noNumBtn" value="立即抢红包"/>
              </div>
            </div>
          </div>
        </div>

       <!--红包列表-->
        <div class="isShow-y">

          <div class="cashLisBox">
            <div class="cashLisTitle">超级大富翁 <span>前往抢红包</span></div>
            <ul>
              <li class="flex-wrap">
                  <div class="userHead"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt=""></div>
                  <div class="userInfo">
                      <div class="userName">用户名</div>
                      <div class="time">10-24 09:29:32</div>
                  </div>
                  <div class="takeNum">抢红包得<span><em>8.16</em>元</span></div>
              </li>
            </ul>
          </div>

        </div>

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

    <!--抢完了-->
    <div class="md-modal md-effect-1 noRobRedpack" :class="{ 'md-show': md.noRobRedpack}">
      <div class="md-content">
        <i class="red_close"></i>
        <div class="goTime"></div>
        <i class="noRobRedpack_bg"></i>
        <div class="noCash_state">下手太慢，红包抢完了！</div>
        <input type="button" class="noRobBtn" value="继续抢红包"/>
      </div>
    </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				headerMag:{
					title:'整点福利场',
					rightMsg: '',
					rightUrl: ''
				},
				md:{
          mask:false,
          openRedpack:false,
          openingRp:false,
          noRobRedpack:false,
        }
			}
		},
		methods:{
			changePage(type){
				if((type==1 && this.page) || (!type && !this.page)) return
				this.page = !this.page
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/sass/welfare/welfare.scss";
</style>
