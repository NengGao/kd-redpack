<template>
  <div class="hot flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="noticeBox">
      <div class="flex-wrap flex-center content">
        <div class="flex-wrap section">
          <div class="ic_hornBox"><i class="ic_horn"></i></div>
          <div class="noticeList">
            <ul>
              <li class="list">红包竞猜，仅限玩家互动娱乐，请勿过度沉迷。</li>
              <li class="list">djiehfiehfoefevd果然果然够芙蓉果然个人</li>
              <li class="list">访问父母为了发金额个个人感染人热热</li>
            </ul>
          </div>
        </div>
        <div class="flex-wrap section1">
          <div class="rightBox" id="ic_kldShop"><img src="/static/images/redpackPK/ic_kldShop.png" alt=""></div>
          <div class="rightBox ic_options"><img src="/static/images/redpackPK/ic_more.png" alt=""></div>
        </div>
      </div>
    </div>
    <div class="content flex-con-1" ref="wrapper" id="wrapper">

      <div class="scroll" id="scroll" ref="scroll">
        <div class="redpack-row">

          <div class="flex-wrap">
            <div class="send-head"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" /></div>
            <div class="send-info">
              <div class="send-name">系统提示</div>
              <!--<div class="news-box" v-if="msg.countDown != 0"><span>{{ redpackState.redpackCountDown | redpackTime}}</span></div>-->
              <div class="news-box"><span>Go</span></div>
            </div>
          </div>

          <div class="flex-wrap">
            <div class="send-head"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" /></div>
            <div class="send-info">
              <div class="send-name">系统提示</div>
              <div class="news-box">
                测试数据
              </div>
            </div>
          </div>

          <div class="textBox">
            <div class="ic_head"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt=""/></div>
            <div class="box_right">
              <div class="box_title">红包竞猜</div>
              <div class="box_content changebg">
                <span></span>
                <span></span>
                <div class="guessAmount">
                  <p style="color: #3d3d3c;font-size: 1.15rem;line-height: 2rem">猜猜哪个红包金额大？</p>
                  <div class="flex-wrap guess">
                    <div class="guessleft">
                      <p class="whichBig"><i class="ic_guess"></i>第1个红包大</p>
                      <p class="addreward">奖励x1.8倍</p>
                      <div class="guessplan"><em></em></div>
                      <div class="addNum">+20</div>
                    </div>
                    <div class="guessright">
                      <input type="button" value="投入A" class="chooseType" guess="1">
                      <p>已投400豆</p>
                    </div>
                  </div>

                  <div class="flex-wrap guess">
                    <div class="guessleft">
                      <p class="whichBig"><i class="ic_guess guess_B"></i>第1个红包大</p>
                      <p class="addreward">奖励x1.8倍</p>
                      <div class="guessplan"><em></em></div>
                      <div class="addNum">+20</div>
                    </div>
                    <div class="guessright">
                      <input type="button" value="投入B" class="chooseType"guess="2">
                      <p>已投400豆</p>
                    </div>
                  </div>

                  <div class="flex-wrap guess">
                    <div class="guessleft">
                      <p class="whichBig"><i class="ic_guess guess_C"></i>第1个红包大</p>
                      <p class="addreward">奖励x1.8倍</p>
                      <div class="guessplan"><em></em></div>
                      <div class="addNum">+20</div>
                    </div>
                    <div class="guessright">
                      <input type="button" value="投入C" class="chooseType"guess="3">
                      <p>已投400豆</p>
                    </div>
                  </div>
                </div>
                <div class="ic_pk_time">20秒</div>
              </div>

            </div>
            <div class="boxMask hide"></div>
          </div>

          <!--本期结果揭晓-->
          <div class="resultBox">本期揭晓：<em>第1包大</em></div>


          <div class="getRedpack"><div class="userGet"><i class="ic_getRedpack"></i><em>“赔了几十万”</em>抢到了 <span>0.36元</span></div></div>


          <div class="flex-wrap">
            <div class="send-head"><img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="" /></div>
            <div class="send-info">
              <div class="send-name">纠结的偏执</div>
              <div class="redpack" @click="showMdOpen('redpackOpen',0)">
                <div class="ic-redpack"></div>
                <div class="redpack-tip">
                  <p>恭喜发财大吉大利</p><span>领取红包</span></div>
                <div class="redpack-info">快点生活</div>
              </div>
            </div>
          </div>

        </div>
        <div id="scroll-mark" class="scroll-mark" style="width: 1px;height: 1px;"></div>
      </div>
    </div>
    <!--结果揭晓-->
    <div class="publicResult">
      <span class="pR_mark">结果揭晓</span>
      <span class="pR_text"></span>
      <span class="pR_which"></span>
    </div>

    <!--中奖消息-->
    <div class="rewardInfoBox">
      <div class="flex-wrap flex-center rewardInfo">
        <img src="http://k.kuaidian.cn/userImage/ic_head.png" alt="">
        <div class="rewardBox">
          <div class="rewardUser">东山再起</div>
          <div class="rewardNum">获得<em>288豆</em>奖励</div>
        </div>
      </div>
    </div>


    <footer class="footer">
      <div class="footBox flex-wrap">
        <div class="foot_l">
          <div class="balance">我的快乐豆<span></span></div>
          <div class="beansNum">--</div>
        </div>
        <div class="foot_r">
          <div class="myJoinBeans">投入越多，猜对后赢得乐豆越多！</div>
          <div class="beansType">
            <ul class="flex-wrap">
              <li class="selected"><span>20</span></li>
              <li><span>50</span></li>
              <li><span>100</span></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>


    <!--弹出层-->

    <div class="md-mask" :class="{ 'active': md.mask }" @click="closeMd('all')"></div>
    <div class="md-modal md-effect-1 md-redpack-open" :class="{ 'md-show': md.redpackOpen }">
      <div class="md-content">
        <div class="md-top">
          <img src="http://k.kuaidian.cn/userImage/ic_head.png" class="md-user-head" alt="" />
          <div class="user-name">纠结的偏执</div>
          <div class="">
            <div class="tips">发了一个红包，金额随机</div>
            <div class="title">恭喜发财，大吉大利！</div>
          </div>
          <!--		<div class="takeOver title" v-show=redpackState.takeOver>
                            手慢了，红包抢完了！
                        </div>-->
        </div>
        <!--<div class="lookDetail">查看大家手气 </div>-->
        <div class="open"></div>
      </div>
    </div>

    <div class="md-modal md-effect-1 md-redpack-result" :class="{ 'md-show': md.redpackResult }">
      <div class="md-content">
        <i class="md-close ic-close-gray" @click="closeMd('redpackResult')"></i>
        <div class="md-top">
          <img src="http://k.kuaidian.cn/userImage/ic_head.png" class="md-user-head" alt="" />
        </div>
        <div class="fromUser">来自“1515”的红包</div>
        <div class="result"><span>15.2</span></div>
        <div class="info">已汇入本局战绩</div>
        <div class="tips">Tips:本平台仅限玩家间互动娱乐,请勿沉迷！</div>
        <!--<input type="button" class="btn" value="查看手气" v-show="redpackState.lookLuck" @click="showTakeDetails(redpackState.details)" />-->
        <input type="button" class="btn" value="确定" @click="closeMd('redpackResult')" />
      </div>
    </div>


    <!--
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
            </div>-->

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
          title: '红包竞猜',
          rightMsg: '',
          rightUrl: ''
        },
        md: {
          mask: false,
          redpackOpen: false,
          redpackResult: false
        },
        toBottom : 0,
      }
    },
    filters: {
      redpackTime: function(value) {
        value = parseInt(value) / 1000;
        if(value == 0) {
          return 'Go'
        }
        return value
      }
    },
    watch: {

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

      //this.createService()
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
      showMdOpen(md, n) {
        this.md.mask = true;
        this.md.redpackOpen = true;
      },
      // 以下是  .ws
      createService() {

        let interval;
        let self = this;
        if(!this.ws){
          this.ws = new ReconnectingWebSocket(config.ws.roomCard + "/createLobbyService?token=" + this.user.token);
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
          }
        }

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/redpackPK/redpackPK.scss";
</style>
