<template>
  <div class="groupInfo flex-wrap">
    <div class="header">
      <div class="header-left">
        <i class="ic-close-gray"></i>
        <span>全部玩家</span>
        <em></em>
      </div>
      <div class="header-right">历史记录</div>
    </div>
    <div class="content flex-con-1">
      <div class="scroll">


      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'groupInfo',
    data(){
      return{
        user: this.$store.state.user,
        md:{
          active: '',
          mask: false,
          mdDissolve : false,
          gameRule : false
        }
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
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/allPlayers.scss";

</style>



