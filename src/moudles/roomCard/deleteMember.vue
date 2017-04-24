
<template>
  <div class="groupInfo flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="content flex-con-1">
      <div class="scroll">
         <div class="flex-wrap flex-center delete-img">
            <img src="../../../static/images/roomCard/ic_head.png" alt="">
         </div>
         <div class="flex-wrap flex-center delete-member">
            <div class="choose-menber active"></div>
            <img src="../../../static/images/roomCard/ic_head.png" alt="">
            <div class="name">岁月杀猪dao</div>
         </div>
         <div class="flex-wrap flex-center delete-member">
            <div class="choose-menber"></div>
            <img src="../../../static/images/roomCard/ic_head.png" alt="">
            <div class="name">岁月杀猪dao</div>
         </div>
         <div class="flex-wrap flex-center delete-member">
            <div class="choose-menber"></div>
            <img src="../../../static/images/roomCard/ic_head.png" alt="">
            <div class="name">岁月杀猪dao</div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        user: this.$store.state.user,
        headerMag:{
          title:'删除成员',
          rightMsg: '删除(2)',
          rightUrl: ''
        },
      }
    },
    methods:{

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/deleteMember.scss";

</style>



