<template>
  <div class="groupInfo flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="content flex-con-1">
      <div class="scroll">
         <router-link tag="div" :to="'/roomCard/transferSearch'" class="flex-wrap flex-center input-info"><i class="ic-search"></i><span>输入对方ID号</span></router-link>
         <div class="recentlyContent">
            <div class="title"><i class="ic-history"></i>最近转让</div>
            <div class="flex-wrap flex-center recently-lis" @click="showTransfer(index)" v-for="(item,index) in recentlyLis">
               <div class="flex-wrap lis-left">
                  <img :src="item.img" alt="">
                  <div class="text">
                    <p>{{item.name}}</p>
                    <p>ID:{{item.id}}</p>
                  </div>
               </div>
               <i class="ic-arrow-rg"></i>
            </div>
         </div>
         <div class="no-info" v-show="md.noInfo">
          <i class="ic-no-info"></i>
          <p>暂无转让记录</p>
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
              <img :src="recentlyLisCopy.img" alt="">
              <div class="user-text">
                <p>{{recentlyLisCopy.name}}</p>
                <p>ID:{{recentlyLisCopy.id}}</p>
              </div>
            </div>
          </div>
          <div class="flex-wrap flex-center price-box">
            <div class="left">
              <p>房卡单价(元)</p>
              <p>官方指导价：3～5元</p>
            </div>
            <input type="number" class="right" v-model="tranferPrice" @keyup="clearNoNum(tranferPrice)">
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

  export default{
    name: 'roomCardTransfer',
    data(){
      return{
        user: this.$store.state.user,
        headerMag:{
          title:'房卡转让',
          rightMsg: '转让记录',
          rightUrl: '/roomCard/transferRecord'
        },
        md:{
          active: '',
          mask: false,
          roomTransfer:false,
          noInfo:false,
        },
        recentlyLisCopy:{img:'',name:'',id:''},
        recentlyLis:'',
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
        this.md[md] = false
        this.md.mask = false
      },
      showTransfer: function (index) {
        this.recentlyLisCopy.img=this.recentlyLis[index].img;
        this.recentlyLisCopy.name=this.recentlyLis[index].name;
        this.recentlyLisCopy.id=this.recentlyLis[index].id;
        this.md.roomTransfer = true;
        this.md.mask = true;
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
      confirmTap: function () {
         const self=this;
         const userCode=this.recentlyLisCopy.id;
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
           Toast('房卡不足');
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
      let roomCardAmount=localStorage.getItem("roomCardAmount");
      self.roomCardNum=roomCardAmount;
      if(self.roomCardNum>=5){
          self.tranferNum=5;
      }else {
        self.tranferNum=self.roomCardNum;
      }

    },
    updated(){
      this.totalPrice=this.tranferNum*this.tranferPrice;
    },
    created(){
      const self=this;
      Api.getPastRecord(function (data) {
        if(data.length==0){
          self.md.noInfo=true;
        }else {
          self.md.noInfo=false;
          self.recentlyLis=data;
        }
      });

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/roomCardTransfer.scss";

</style>


