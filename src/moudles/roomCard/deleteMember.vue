
<template>
  <div class="groupInfo flex-wrap">
    <kd-header :headerMsg=headerMag></kd-header>
    <div class="content flex-con-1">
      <div class="scroll">
         <div class="flex-wrap flex-center delete-img">
            <img src="/static/images/roomCard/ic_head.png" alt="">
         </div>
         <div class="flex-wrap flex-center delete-member" @click="deleteMember">
            <div class="choose-menber" :class="{'active': deleteActive.chooseActive}"></div>
            <img src="/static/images/roomCard/ic_head.png" alt="">
            <div class="name">岁月杀猪dao1</div>
         </div>
         <div class="flex-wrap flex-center delete-member" @click="deleteMember">
            <div class="choose-menber" :class="{'active': deleteActive.chooseActive}"></div>
            <img src="/static/images/roomCard/ic_head.png" alt="">
            <div class="name">岁月杀猪dao2</div>
         </div>
         <div class="flex-wrap flex-center delete-member" @click="deleteMember">
            <div class="choose-menber" :class="{'active': deleteActive.chooseActive}"></div>
            <img src="/static/images/roomCard/ic_head.png" alt="">
            <div class="name">岁月杀猪dao3</div>
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
        deleteActive:{
          chooseActive: true
        }
      }
    },
    methods:{
      deleteMember: function () {
        this.deleteActive.chooseActive=!this.deleteActive.chooseActive;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/deleteMember.scss";

</style>



