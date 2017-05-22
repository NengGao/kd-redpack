<template>
  <div class="groupInfo flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="content flex-con-1">
      <div class="scroll" id="wrapper" ref="wrapper">
        <ul ref="scroll">
          <li class="flex-wrap flex-center recordLis">123456</li>
          <li class="flex-wrap flex-center recordLis">123456</li>
          <li class="flex-wrap flex-center recordLis">123456</li>
          <li class="flex-wrap flex-center recordLis">123456</li>
          <li class="flex-wrap flex-center recordLis">让我惹我</li>
          <li class="flex-wrap flex-center recordLis">123456</li>
          <li class="flex-wrap flex-center recordLis">123456</li>
          <li class="flex-wrap flex-center recordLis">123456</li>
          <li class="flex-wrap flex-center recordLis">123456</li>
          <li class="flex-wrap flex-center recordLis">让我惹我</li>
          <li class="flex-wrap flex-center recordLis">123456</li>
          <li class="flex-wrap flex-center recordLis">123456</li>
          <li class="flex-wrap flex-center recordLis">123456</li>
          <li class="flex-wrap flex-center recordLis">就永恒纪元</li>
          <li class="flex-wrap flex-center recordLis">123456</li>
          <li class="flex-wrap flex-center recordLis">123456</li>
          <li class="flex-wrap flex-center recordLis">我认为</li>
          <li class="flex-wrap flex-center recordLis">123456</li>
          <li class="flex-wrap flex-center recordLis">当外人</li>
        </ul>
        <p class="page-infinite-loading" v-show="showLoading"><span><div class="mint-spinner-fading-circle circle-color-76" style="width: 28px; height: 28px;"><div class="mint-spinner-fading-circle-circle is-circle2"></div><div class="mint-spinner-fading-circle-circle is-circle3"></div><div class="mint-spinner-fading-circle-circle is-circle4"></div><div class="mint-spinner-fading-circle-circle is-circle5"></div><div class="mint-spinner-fading-circle-circle is-circle6"></div><div class="mint-spinner-fading-circle-circle is-circle7"></div><div class="mint-spinner-fading-circle-circle is-circle8"></div><div class="mint-spinner-fading-circle-circle is-circle9"></div><div class="mint-spinner-fading-circle-circle is-circle10"></div><div class="mint-spinner-fading-circle-circle is-circle11"></div><div class="mint-spinner-fading-circle-circle is-circle12"></div><div class="mint-spinner-fading-circle-circle is-circle13"></div></div></span>
          加载中...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Api from '@/fetch/api'
  import config from '@/config'
  import common from '@/assets/js/common'
  import { Toast } from 'mint-ui'
  import { InfiniteScroll } from 'mint-ui';
  import BScroll from 'better-scroll'
  Vue.use(InfiniteScroll);
  export default{
    name: 'historyRecord',
    data(){
      return{
        user: this.$store.state.user,
        headerMag:{
          title:'历史记录',
          rightMsg: '',
          rightUrl: ''
        },
        showLoading:false,
        roomId: this.$route.params.roomid,
        md:{
          active: '',
          mask: false,
        },
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

    },
    created(){

    },
    mounted(){

      this.$nextTick(() => {
          let scrollHeight=this.$refs.scroll.offsetHeight;
          let wrapperHeight=this.$refs.wrapper.offsetHeight;
         let scroll=new BScroll(this.$refs.wrapper,{
           probeType: 3,
           preventDefault: false,
           preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }
        });
        scroll.on('scroll', (pos) => {
          console.log(pos.y)
          if((scrollHeight-wrapperHeight)+pos.y<=-30){

          }

        })
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .content{
    height: 100%;
  }
  .scroll{
    width: 100%;
    height: 100%;
  }
  .recordLis{
    height: 80px;
    line-height: 80px;
    background: #5cd451;
    border-bottom: 0.1rem solid #fff0a6;
  }
  .recordLis:active{
    opacity: 0.6;
  }

</style>


