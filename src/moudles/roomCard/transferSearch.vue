<template>
  <div class="groupInfo flex-wrap">
    <div class="flex-wrap flex-center header">
      <i class="ic-close-white" @click="goback"></i>
      <div class="flex-wrap flex-center input-box">
        <i class="ic-search"></i>
        <input type="text" placeholder="输入对方ID号" class="searchId" v-model="inputId">
        <i class="ic_del" @click="deteleId"></i>
      </div>
      <div class="cancel" @click="searchId">搜索</div>
    </div>
    <div class="content flex-con-1">
      <div class="scroll">
        <div class="no-find-user" v-show="md.noInfoShow">
          <i class="ic-eye"></i>
          <p>未找到该用户</p>
          <p>请核实该用户ID号后重试</p>
        </div>
        <div class="recentlyContent" v-show="md.InfoShow">
          <div class="title"><i class="ic-history"></i>搜索结果</div>
          <div class="flex-wrap flex-center recently-lis" @click="showMd('roomTransfer')">
             <div class="flex-wrap lis-left">
               <img :src="recentlyLis.img" alt="">
               <div class="text">
                 <p>{{recentlyLis.name}}</p>
                 <p>ID:{{recentlyLis.id}}</p>
               </div>
             </div>
             <i class="ic-arrow-rg"></i>
          </div>
        </div>
      </div>
    </div>
    <!--房卡转让弹窗-->
    <div class="md-mask" :class="{ 'active': md.mask }"></div>
    <div class="md-modal md-effect-1 md-room-transfer" :class="{ 'md-show': md.roomTransfer }">
      <div class="md-content">
         <i class="md-close ic-close-gray" @click="closeMd('roomTransfer')"></i>
         <div class="title">房卡转让</div>
         <div class="main-content">
            <div class="flex-wrap flex-center transfer-user">
               <span>转让对象</span>
               <div class="flex-wrap user-info">
                  <img :src="recentlyLis.img" alt="">
                  <div class="user-text">
                     <p>{{recentlyLis.name}}</p>
                     <p>ID:{{recentlyLis.id}}</p>
                  </div>
               </div>
            </div>
            <div class="flex-wrap flex-center price-box">
               <div class="left">
                 <p>房卡单价</p>
                 <p>官方指导价：3～5元</p>
               </div>
               <input type="number" value="4" class="right" v-model="tranferPrice" @keyup="clearNoNum(tranferPrice)">
            </div>
            <div class="transfer-num">
               <p>转让数量</p>
               <div class="flex-wrap change-num">
                  <i class="ic-decrease" @click="decreaseTap"></i>
                  <input type="number" class="num" v-model="tranferNum" @keyup="inputInt(tranferNum)">
                  <i class="ic-increase" @click="creaseTap"></i>
               </div>
               <div class="my-info">
                 <span>金额：<em>{{totalPrice}}元</em></span>
                 <span>我的房卡：<em>{{roomCardNum}}张</em></span>
               </div>
            </div>
            <div class="tip">提示：如对方在30分钟内未完成支付，交易将自动取消，房卡退回原有帐户。</div>
            <input type="button" value="确认" class="confirm-btn" @click="confirmTap">
         </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/fetch/api'
  import common from '@/assets/js/common'
  import { Toast } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  import router from '@/router'

  export default{
    name: 'allPlayers',
    data(){
      return{
        user: this.$store.state.user,
        md:{
          active: '',
          mask: false,
          rightBox:true,
          playAddBox:false,
          roomTransfer:false,
          noInfoShow:false,
          InfoShow:false,
        },
        inputData:10,
        index:0,
        markType:'+',
        recentlyLis:'',
        inputId:'',
        roomCardNum:'',
        totalPrice:'',
        tranferNum:5,
        tranferPrice:4,
      }
    },
    methods:{
      showMd: function(md){
        this.md[md] = true;
        this.md.mask = true;
      },
      closeMd :function(md){
        this.md[md] = false;
        this.md.mask = false
      },
      decreaseTap: function () {
        if(this.tranferNum>=1){
          this.tranferNum=this.tranferNum-1;
        }
      },
      creaseTap: function () {
        if(this.roomCardNum>this.tranferNum){
          this.tranferNum=parseInt(this.tranferNum)+1;
        }else {
          Toast('已经不能再加了');
        }
      },
      inputInt: function (obj) {
        this.tranferNum=obj.replace(/[^0-9]/g,'');
      },
      clearNoNum: function (obj) {
        this.tranferPrice = obj.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
        this.tranferPrice = obj.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
        this.tranferPrice = obj.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        this.tranferPrice = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
        if(obj.indexOf(".")< 0 && obj !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          this.tranferPrice= parseFloat(obj);
        }
      },
      goback: function () {
        router.back();
      },
      totalTap: function (type) {
        document.body.addEventListener('touchstart', function () { });
        this.md.rightBox=false;
        this.md.playAddBox=true;
        this.markType=type;
        if(this.inputData==0){
          this.inputData=parseFloat(this.inputData)+10;
        }
      },
      addEvent: function () {
        if(this.inputData==null||this.inputData==""||this.inputData==undefined){
          this.inputData=0;
        }
        if(this.markType=='-'){

        }else if(this.markType=='+'){
          this.inputData=parseFloat(this.inputData)+10;
        }

      },
      reduceEvent: function () {
        if(this.inputData>=10){
          this.inputData=this.inputData-10;
        }else if(this.inputData==0){
          this.md.rightBox=true;
          this.md.playAddBox=false;
        }else {
          if(this.inputData<1){
            this.inputData=0;
          } else {
            this.inputData=this.inputData-1;
          }

        }
      },
      searchId: function () {
        const self=this;
        const userCode=this.inputId;
        self.md.noInfoShow=false;
        self.md.InfoShow=false;
        Indicator.open({
          spinnerType: 'fading-circle'
        });
        if(userCode==""||userCode==null){
          Toast('请输入对方ID号')
        }else {
          Api.getUserInfo(function (data) {
            Indicator.close();
            if(data.id==""||data.id==null||data.id==undefined){
                self.md.noInfoShow=true;
            }else {
              self.md.InfoShow=true;
              self.recentlyLis=data;
            }
          },userCode)
        }
      },
      deteleId: function(){
        this.md.noInfoShow=false;
        this.md.InfoShow=false;
        this.inputId="";
      },
      confirmTap: function () {
        const self=this;
        const userCode=this.recentlyLis.id;
        const amount=this.tranferNum;
        const unitPrice=this.tranferPrice;
        if(unitPrice==""||unitPrice==null||unitPrice==undefined){
          Toast('请输入房卡单价');
        }else if(amount==""||amount==null||amount==undefined){
          Toast('请输入房卡数量');
        }else if(unitPrice<3){
          Toast('房卡单价不能少于3元');
        }else if(unitPrice>5){
          Toast('房卡单价不能高于5元');
        }else if(amount>self.roomCardNum){
          Toast('请输入正确的房卡数');
        }else {
          Api.createOrder(function (data) {
            const msgCode=data.msgCode;
            if(msgCode==200){
              self.roomCardNum=data.roomCardAmount;
              self.md.roomTransfer = false;
              self.md.mask = false;
              Toast({message: '转让成功',duration: 1500,iconClass: 'ic-toast-success'});
            }else {
              Toast({message: '转让失败',duration: 1500});
            }
          },userCode,amount,unitPrice);
        }
      }
    },
    beforeMount(){
      const self=this;
      const roomCard=common.getJsonLocal("roomCard");
      self.roomCardNum=roomCard.roomCardAmount;

    },
    updated(){
      this.totalPrice=this.tranferNum*this.tranferPrice;
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/transferSearch.scss";

</style>



