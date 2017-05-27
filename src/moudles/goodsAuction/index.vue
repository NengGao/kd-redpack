
<template>
  <div class="groupInfo flex-wrap">
    <div class="content flex-con-1">
      <div class="scroll">
        <div class="goodsDetailInfo">
          <div class="JDprice"><span>￥<em>{{indexData.jingDongPrice}}</em></span></div>
          <div class="swiper-container">
            <mt-swipe :auto="0" :show-indicators="false" @change="handleChange">
              <mt-swipe-item class="goods_img" v-for="item in indexImg"><img :src="item" alt=""/></mt-swipe-item>
            </mt-swipe>
            <div class="page"><span>{{currentPage}}</span>/<span>{{indexImg.length}}</span></div>
            <div class="ic_backBox" @click="goback"><i class="ic_back"></i></div>
            <div class="ic_rule" @click="showMd('auctionRule')">抢拍规则</div>
            <div class="joininfo">
              <div class="flex-wrap flex-align-center toCost">
                <img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="">
                <div class="flex-wrap joinUser"><p>亚当斯密就方式</p><em>参与出价</em></div>
              </div>
            </div>
            <div class="flex-wrap flex-center goodsInfoBox" :class="{'changeBg':md.isEnd}">
              <div class="goodsInfo">
                <div class="goodsName">{{indexData.goodsName}}</div>
                <div class="lastPrice">往期成拍价(折合)：<span>￥</span><em>{{indexData.upPrice}}</em><span>.00</span></div>
              </div>
              <div class="endTimeBox">
                <span></span>
                <div class="period">第{{indexData.atPresentPeriod | substrPeriod}}期</div>
                <p style="color: #666;line-height: 2rem;text-align: center" v-if="indexData.countDown<=0">已结束</p>
                <div v-else class="peroid_end">
                  <p>结束倒计时</p>
                  <div class="endTime">{{indexData.countDown | timer}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lastAuctionBox">
          <ul class="flex-wrap">
            <li v-if="indexData.beforeRecordList">
              <div class="lastPeroid">{{indexData.beforeRecordList[2].period | substrPeriod}}期</div>
              <div class="lastPeroidPrice"><span>￥</span><em>{{indexData.beforeRecordList[2].winPrice | changePrice}}</em><span>.00</span></div>
            </li>
            <li v-if="indexData.beforeRecordList">
              <div class="lastPeroid">{{indexData.beforeRecordList[1].period | substrPeriod}}期</div>
              <div class="lastPeroidPrice"><span>￥</span><em>{{indexData.beforeRecordList[1].winPrice | changePrice}}</em><span>.00</span></div>
            </li>
            <li v-if="indexData.beforeRecordList">
              <div class="lastPeroid">{{indexData.beforeRecordList[0].period | substrPeriod}}期</div>
              <div class="lastPeroidPrice"><span>￥</span><em>{{indexData.beforeRecordList[0].winPrice | changePrice}}</em><span>.00</span></div>
            </li>
            <li>
              <div class="lastPeroid">{{indexData.atPresentPeriod | substrPeriod}}期</div>
              <div class="lastPeroidPrice">
                <em style="font-size: 0.875rem;color:#e78f4b" v-if="!md.isEnd">待揭晓</em>
                <em style="font-size: 0.875rem;color:#e78f4b" v-if="md.isEnd">已揭晓</em>
              </div>
            </li>
            <li>
              <div class="lastPeroid">{{indexData.atPresentPeriod | addPeriod}}期</div>
              <div class="lastPeroidPrice"><em style="font-size: 0.875rem;color:#b8b8b8" v-if="!md.isEnd">未开始</em></div>
              <div class="lastPeroidPrice"><em style="font-size: 0.875rem;color:#333" v-if="md.isEnd">正在进行</em></div>
            </li>
          </ul>
        </div>
        <!--本期结束获奖者-->
        <router-link tag="div" :to="'/goodsAuction/auctionRecord/'+indexData.atPresentPeriod" class="rewardBox" v-show="md.successGetBox">
          <div class="flex-wrap flex-center successGetBox">
            <div class="flex-wrap successGet">
              <img :src="successGet.userImg" alt="">
              <div class="successGetInfo">
                <div class="successGetName">本期获拍者：{{successGet.userName}}</div>
                <div class="successGetPrice">成拍价：<em>{{successGet.price | KLD_f}}豆</em>(折合￥{{successGet.price | changePrice |RMB_f}})</div>
              </div>
            </div>
            <i class="ic_white_right"></i>
          </div>
        </router-link>
        <!--前十名-->
        <div class="rankBox" v-show="md.rankBox">
          <div class="flex-wrap flex-center rankHead">
            <div class="rankLeft">
              <p>本期出价前十名</p>
              <p>按参与时间排序，不代表出价金额</p>
            </div>
            <div class="rankRight">
              <p>(共{{indexData.joinNumber}}人参与)</p>
              <p><i class="refresh"></i>实时更新</p>
            </div>
          </div>
          <div class="flex-wrap flex-center rank_10">
            <ul v-if="indexData.bidTop">
              <li v-for="item in indexData.bidTop.list">
                <img :src="item.userImg" alt="">
                <p>{{item.userName}}</p>
              </li>
              <!--<li>-->
                <!--<img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="">-->
                <!--<p>东山再起</p>-->
              <!--</li>-->
              <!--<li>-->
                <!--<img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="">-->
                <!--<p>东山再起</p>-->
              <!--</li>-->
              <!--<li>-->
                <!--<img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="">-->
                <!--<p>东山再起</p>-->
              <!--</li>-->
              <!--<li>-->
                <!--<img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="">-->
                <!--<p>东山再起</p>-->
              <!--</li>-->
              <!--<li>-->
                <!--<img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="">-->
                <!--<p>东山再起</p>-->
              <!--</li>-->
              <!--<li>-->
                <!--<img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="">-->
                <!--<p>东山再起</p>-->
              <!--</li>-->
              <!--<li>-->
                <!--<img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="">-->
                <!--<p>东山再起</p>-->
              <!--</li>-->
              <!--<li>-->
                <!--<img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="">-->
                <!--<p>东山再起</p>-->
              <!--</li>-->
              <!--<li>-->
                <!--<img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="">-->
                <!--<p>东山再起</p>-->
              <!--</li>-->

            </ul>
          </div>
        </div>

        <!--往期抢拍-->
        <div class="lastRecordBox">
          <div class="lastRecordTitle">往期抢拍<span>不成拍，乐豆全额退返</span></div>
          <div class="lastRecord">
            <div class="flex-wrap flex-center lastRecordList" v-for="item in indexData.beforeRecordList">
              <div class="flex-wrap lastRecordLeft">
                <img :src="item.userImg" alt="">
                <div class="userInfo">
                  <p>第{{item.period | substrPeriod}}期-获得者</p>
                  <p>{{item.userName}}</p>
                </div>
              </div>
              <div class="needKld">
                 <p>成拍价</p>
                 <div class="needKldNum">{{item.winPrice | KLD_f}}豆</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!--foot底部-->
    <div class="foot">
      <div class="footLeft">
        <!--立即出价-->
        <div class="toPrice">
          <div class="myPrice" v-if="indexData.bidStatus=='L'">上期成拍价:<i style="color:#ff3c4c">￥</i><em>{{indexData.upPrice | RMB_f}}</em></div>
          <div class="myBeans" v-if="indexData.bidStatus=='S'">我的出价:<em>{{indexData.addBid | KLD_f}}豆</em><span class="cost" style="color: #e78f4b!important;">(折合{{indexData.addBid | changePrice | RMB_f}}元)</span></div>
          <p style="color: #999" v-if="isRankTen==0">您还未出价，参与抢拍吧～</p>
          <p style="color: #999" v-else-if="isRankTen==1">提示:恭喜您进入前10名，敬请期待～</p>
          <p style="color: #999" v-else-if="isRankTen==2">提示:本次出价未进前10名哦～</p>
          <p style="color: #999" v-else>本期您未成拍，乐豆已退返</p>
        </div>

      </div>
      <div v-if="indexData.countDown<=0" class="joinNext" @click="refresh">参与下一期</div>
      <div v-else class="footRight" @click="confirmPay">
        <div class="change_p" v-if="indexData.bidStatus=='L'">立即出价</div>
        <div class="change_p" v-if="indexData.bidStatus=='S'">我要加价</div>
        <div class="change_num">本期改价:<em>{{indexData.count}}</em>次</div>
      </div>
    </div>

    <div class="md-mask" :class="{ 'active': md.mask }"></div>
    <!--乐豆退回提示-->
    <div class="md-modal md-effect-1 tipBox" :class="{ 'md-show': md.tipBox }">
      <div class="md-content">
        <div class="tip_title">温馨提示</div>
        <p>本期已结束，您未拍到该商品，花费的<span>{{indexData.addBid | KLD_f}}乐豆</span>已退回到您的帐户。</p>
        <div class="flex-wrap btn_main">
          <input type="button" value="查看帐户" class="lookAccount">
          <input type="button" value="确定" class="confirmBtn" @click="closeMd('tipBox')">
        </div>
        <i class="red_close"@click="closeMd('tipBox')"></i>
      </div>
    </div>

    <!--次数已用完-->
    <div class="md-modal md-effect-1 auctionNum" :class="{ 'md-show': md.auctionNum }">
      <div class="md-content">
        <img src="/static/images/goodsAuction/numOut_img.png" alt=""/>
        <div class="auctionNum_title">本期改价次数不足</div>
        <p>次数用完，无法变更参拍报价</p>
        <div class="auctionNum_notice">提示:每期商品参与抢拍修改出价,普通用户3次，vip用户6次。</div>
        <input type="button" value="前往开通vip" id="auctionNumBtn"/>
        <i class="red_close"@click="closeMd('auctionNum')"></i>
      </div>
    </div>

    <!--修改出价-->
    <div class="editPrice" v-show="md.editPrice" :class="{'pullUp':md.editPrice}">
      <div class="md-content">
        <div class="priceBox">
          <div class="editPrice_title">我要加价</div>
          <div class="price_num"><span>当前出价：{{indexData.addBid}}豆</span><span>本期加价：{{indexData.count}}次</span></div>
          <div class="flex-wrap priceSection">
            <div class="reduce" @click="reduceEvent(1)"></div>
            <div class="priceNum"><em style="font-size: 1.35rem">{{addBeans}}</em>豆</div>
            <div class="add" @click="addEvent(1)"></div>
          </div>
          <p>我的乐豆：{{indexData.balance | KLD_f}}</p>
        </div>
        <input type="button" value="确定" class="confirmPayBtn" @click="toPay(addBeans)">
        <p style="font-size: 1rem;color: #b7635d;line-height: 1.2rem">特别说明：<em style="color: #ff2739">抢拍全程使用乐豆参与，</em>如不成拍，乐豆全额退返到个人帐户，可用于下次抢拍。</p>
        <i class="ic-close-gray" @click="closeMd('editPrice')"></i>
      </div>
    </div>
    <!--全民竞拍规则-->
    <div class="auctionRule" v-show="md.auctionRule" :class="{'pullUp':md.auctionRule}">
      <div class="md-content">
        <h1>全民抢拍说明</h1>
        <div class="auctionRuleBox">
          <p style="color: #ff2739">1.所有商品均为京东全新商品，抢拍出价全程采用乐豆进行支付，如乐豆不足将先获取乐豆后参与抢拍；</p>
          <p>2.每期结束，将公布所有参与者出价，出价高者将获得该期商品，如相同则先出价者获得；</p>
          <p style="color: #ff2739">3.不成拍全额退返乐豆至个人帐户，乐豆可参与下一期抢拍，直到拍中为止；</p>
          <p>4.出价后，如对出的价格信心不足，可进行修改（普通用户每期3次，vip用户6次）。</p>
        </div>
        <div class="stepBox">
          <div class="step">01</div>
          <span>选择心仪的商品</span>
          <em></em>
        </div>
        <div class="stepBox">
          <div class="step">02</div>
          <span>参与抢拍并支付</span>
          <em></em>
        </div>
        <div class="stepBox">
          <div class="step">03</div>
          <span>竞拍成功<i style="color: #e78f4b">(不成拍退返乐豆)</i></span>
          <em></em>
        </div>
        <div class="stepBox">
          <div class="step">04</div>
          <span>安排配送（京东商城）</span>
        </div>
        <input type="button" value="我同意上述规则" id="myKnowBtn" @click="closeMd('auctionRule')"/>
        <i class="red_close" @click="closeMd('auctionRule')"></i>
      </div>
    </div>
    <!--确认支付-->
    <div class="confirmPay" v-show="md.confirmPay" :class="{'pullUp':md.confirmPay}">
      <div class="md-content">
        <div class="flex-wrap flex-center goodsBox">
          <img :src="indexImg[0]" alt="">
          <div class="goodsA">
            <div class="goods_name">{{indexData.goodsName}}</div>
            <div class="goods_price">
              <em>京东价:</em><span><i>￥</i>{{indexData.jingDongPrice | RMB_f}}</span>
            </div>
          </div>
        </div>
        <div class="priceBox">
          <div class="priceText">我要出价<span>*不成拍，乐豆将全额退回</span></div>
          <div class="flex-wrap priceSection">
            <div class="reduce" @click="reduceEvent(0)"></div>
            <div class="priceNum"><em style="font-size: 1.35rem">{{myCostBeans}}</em>豆</div>
            <div class="add" @click="addEvent(0)"></div>
          </div>
          <p>我的乐豆：{{indexData.balance}}</p>
        </div>
        <input type="button" value="确定" class="confirmPayBtn" @click="toPay(myCostBeans)">
        <p style="font-size: 1rem;color: #b7635d;line-height: 1.2rem">特别说明：<em style="color: #ff2739">抢拍全程使用乐豆参与，</em>如不成拍，乐豆全额退返到个人帐户，可用于下次抢拍。</p>
        <i class="red_close" @click="closeMd('confirmPay')"></i>
      </div>
    </div>
    <!--是否进10的弹窗-->
    <div class="md-modal md-effect-1 isRankBox" :class="{ 'md-show': md.isRankBox }">
      <div class="md-content">
        <div class="tip_title">温馨提示</div>
        <p v-if="isRankTen==1">您的出价进入当前出价前十名，请密切关注出价动态。<em>（本期结束后，出价最高者将获得本商品 ）</em></p>
        <p v-if="isRankTen==2">您的出价未进入本期出价前十名，将无缘拍到该商品 。</p>
        <div class="flex-wrap btn_main" v-if="isRankTen==1">
          <input type="button" value="继续加价" class="continueBtn" @click="showEditPrice">
          <input type="button" value="确定" class="confirmBtn" @click="closeMd('isRankBox')">
        </div>
        <div class="flex-wrap btn_main" v-if="isRankTen==2">
          <input type="button" value="遗憾放弃" class="confirmBtn" @click="closeMd('isRankBox')">
          <input type="button" value="立即加价" class="continueBtn" @click="showEditPrice">
        </div>
        <i class="ic-close-gray" @click="closeMd('isRankBox')"></i>
      </div>
    </div>
    <!--快乐豆不足 购买快乐豆-->
    <div class="md-modal md-effect-1 noBeans" :class="{ 'md-show': md.noBeans }">
      <div class="md-content">
        <div class="ic_tip_bg"><img src="/static/images/goodsAuction/ic_tip_bg.png" alt=""/></div>
        <img src="/static/images/goodsAuction/ic_kld.png" alt="" class="ic_kld"/>
        <p>快乐豆不足，您还需{{getKldParam.needPayBean | KLD_f}}豆</p>
        <div class="noBeansBtn">
          <input type="button" class="cancel" value="取消" @click="closeMd('noBeans')"/>
          <input type="button" id="goGet" value="立即获取" @click="toPayBean"/>
        </div>
      </div>
    </div>
    <!--获取快乐豆弹窗-->
    <getKld :range="10"></getKld>
    <kd-pay :paySet=paySet></kd-pay>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Api from '@/fetch/api'
  import config from '@/config'
  import common from '@/assets/js/common'
  import { Toast,Indicator } from 'mint-ui'
  import { Swipe, SwipeItem } from 'mint-ui';
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);

  export default{
    name: 'goodsAuction',
    data(){
      return{
        user: this.$store.state.user,
        ws : this.$store.getters.getSocket,
        indexData:'',
        indexImg:'',
        isRankTen:0,
        myCostBeans:'',//出价豆
        addBeans:10,//加价豆
        successGet:'',//成功竞拍则
        kldNum:'',
        i:0,
        md:{
          active: '',
          mask: false,
          tipBox:false,
          auctionNum:false,
          auctionRule:false,
          editPrice:false,
          confirmPay:false,
          noBeans:false,
          successGetBox:false,
          rankBox:true,
          isEnd:false,
          isRankBox:false,
        },
        getKldParam: this.$store.getters.getKldParam,
        paySet:{
          type : 'QP',
          returnUrl : 'http://' + config.host + encodeURIComponent('/#/goodsAuction/index/'+this.$route.params.goodsCode),
          balance : true,
          balancePay : this.balancePay
        },
        currentPage:'1',
      }
    },
    created(){
      let self=this;
      Api.robBuyEnterRoom(function(data){
          if(data.msgCode=="200"){
            self.indexData = data;
            self.indexImg=data.goodsImage;
            self.indexImg=self.indexImg.split(",");
            self.render();
          }else if(data.msgCode=="602"){
              Toast("商品已下架!");
            setTimeout(function () {
              self.$router.push('/')
            },1000)
          }else if(data.msgCode=="502"){
            Toast("session超时");
          }
      },this.$route.params.goodsCode);
    },
    computed:{

    },
    filters:{
      substrPeriod:function (value) {
          if(value){
            return value.substring(7,value.length)
          }
      },
      addPeriod:function (value) {
        if(value){
          let newValue=(parseInt(value)+1).toString();
          return newValue.substring(7,newValue.length);
        }
      },
      changePrice:function (value) {
         return value/10
      },

      timer:function (value) {
        /*本期结束倒计时*/
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
      },
    },
    methods:{
      showMd: function(md){
        this.md[md] = true;
        this.md.mask = true;
      },
      closeMd :function(md){
        this.md[md] = false
        this.md.mask = false
      },
      handleChange:function (index) {
        this.currentPage=index+1;
      },
      refresh:function(){
        window.location.reload();
      },
      goback:function () {
        this.$router.go(-1);
      },
      toPayBean:function () {
       this.closeMd('noBeans');
       this.getKldParam.isShow=true;
      },
      showEditPrice:function () {
        this.closeMd('isRankBox');
        this.showMd('editPrice');
      },
      confirmPay:function () {
          if(this.indexData.count==0){
            this.showMd('auctionNum');
          }else {
            if(this.indexData.bidStatus=="L"){
              this.showMd('confirmPay');
            }else if(this.indexData.bidStatus=="S"){
              this.showMd('editPrice');
            }
          }

      },
      addEvent:function (type) {
          if(type==0){
            this.myCostBeans=this.myCostBeans+10;
          }else {
            this.addBeans=this.addBeans+10;
          }

      },
      reduceEvent:function (type) {
          if(type==0){
            if(this.myCostBeans>=20){
              this.myCostBeans=this.myCostBeans-10;
            }
          }else {
            if(this.addBeans>=20){
              this.addBeans=this.addBeans-10;
            }
          }

      },
      toPay:function (kldNum) {
          let self=this;
        Api.kldPay(function (data) {
            if(data.msgCode=="200"){
              self.closeMd('confirmPay');
              self.closeMd('editPrice');
//              Toast({
//                message: '操作成功',
//                duration: 3000,
//                iconClass: 'ic-toast-success'
//              });
            }else if(data.msgCode=="603"){//快乐都不足
              self.closeMd('confirmPay');
              self.closeMd('editPrice');
              if(self.indexData.bidStatus=="L"){
                self.getKldParam.needPayBean=self.myCostBeans-self.indexData.balance;
                self.$store.dispatch('setKldParam',self.getKldParam);
              }else {
                self.getKldParam.needPayBean=self.addBeans-self.indexData.balance;
                self.$store.dispatch('setKldParam',self.getKldParam);
              }
              self.showMd('noBeans');
            }else if(data.msgCode=="604"){
              Toast("暂时无法出价！");
            }else if(data.msgCode=="605"){
              Toast("次数不足！");
            }else if(data.msgCode=="610"){
              Toast("加价超过了限制");
            }

        },"Y",this.$route.params.goodsCode,kldNum);
      },
      isRank10:function () {
        let self=this;
        if(self.indexData.countDown>0){
          if(self.indexData.bidStatus=="L"){//未出价
            self.isRankTen=0;
          }else {
            if(self.indexData.bidTop){
              let k=0;
              self.indexData.bidTop.list.forEach(function (item,index) {
                let userCode=item.userCode;
                if(self.user.userCode==userCode){
                  self.isRankTen=1;//进10
                  k=1;
                }else {
                  if(k==0){
                    self.isRankTen=2;//未进10
                  }
                }
              });
            }
          }
        }else {
          self.isRankTen=3;//结束
        }
      },
      render:function () {
        let self=this;
       //我的出价
        self.getKldParam.myBeanNum=self.indexData.balance;
        self.myCostBeans=self.indexData.upPrice*10;
        //      倒计时
        setInterval(function () {
          if(self.indexData.countDown>=1000){
            self.indexData.countDown=self.indexData.countDown-1000;
          }
        },1000);
//      是否进入前十标志
        self.isRank10();
//*********end
        self.createService();
      },
      createService() {

        let interval;
        let self = this;
        if(!this.ws){
          this.ws = new WebSocket(config.ws.robBuy + "/createService?token=" + this.user.token + "&goodsCode="+this.$route.params.goodsCode);
          this.ws.debug = false;
          this.ws.timeoutInterval = 5400;
          this.$store.dispatch('socket', this.ws);
        }
        //
        let ws = this.ws;
        ws.onopen = function() {
          console.log("创建会话");
          interval = setInterval(function() {
            ws.send('{"msgKind":100}');
          }, 30000);
        };
        ws.onclose = function() {
          clearInterval(interval);
        };
        ws.onerror = function(evt) {
          console.log("错误：" + evt)
        };
        ws.onmessage = function(message) {
          var _data = JSON.parse(message.data);
          if(_data.msgType == 1014){
            Toast({ message: "您的账号已在别处登录", duration: 3000 });
            ws.close()
          }else if(_data.msgType == "701"){ //信息滚动

          }else if(_data.msgType=="702"){ //排行10名
            self.indexData.bidTop.list=_data.list;
            let k=0;
            self.indexData.bidTop.list.forEach(function (item,index) {
              let userCode=item.userCode;
              if(self.indexData.bidStatus=="S"){//出嫁
                if(self.user.userCode==userCode){
                  self.isRankTen=1;//进10
                  k=1;//列表我进10
                  self.i=parseInt(self.i)+1;
                }else {
                  if(k==0){//列表没有进10
                    self.isRankTen=2;//未进10
                  }
                }
              }
            });
            if(k==0&&self.i!=0){//显示一次的弹窗
              self.showMd('isRankBox');
              self.i=0;
            }
          }else if(_data.msgType=="703"){ //成功获得
            if(_data.userCode!=self.user.userCode){
              if(self.indexData.bidStatus=="S"){
                self.isRankTen=3;
              }
            }
            self.successGet=_data;
            self.md.isEnd=true;
            self.md.successGetBox=true;
            self.md.rankBox=false;
            self.indexData.countDown=0;
            ws.close();
          }else if(_data.msgType=="704"){ //参与人数
             self.indexData.joinNumber=_data.joinNumber;
          }else if(_data.msgType=="705"){  //出价成功后
            self.indexData.balance=_data.balance;
            self.indexData.bidStatus='S';
            self.indexData.addBid=_data.bidAddSum;
            self.indexData.count=_data.surplusTime;
            self.isRank10();
            self.showMd('isRankBox');
          }else if(_data.msgType=="706"){
            console.log("退款")
            var newgoodsCode=_data.goodsCode;
            if(newgoodsCode==self.$route.params.goodsCode){
              console.log("退款")
              self.showMd('tipBox');
              ws.close()
            }
          }
        }

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/goodsAuction/goodsAuction.scss";
</style>



