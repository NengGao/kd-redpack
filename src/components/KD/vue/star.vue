<template>
  <div class="starBox">
    <i :class="{'ic_no_star':starLevel<=0,'ic_half_star':starLevel==1,'ic_star':starLevel>=2}"></i>
    <i :class="{'ic_no_star':starLevel-2<=0,'ic_half_star':starLevel-2==1,'ic_star':starLevel-2>=2}"></i>
    <i :class="{'ic_no_star':starLevel-4<=0,'ic_half_star':starLevel-4==1,'ic_star':starLevel-4>=2}"></i>
    <i :class="{'ic_no_star':starLevel-6<=0,'ic_half_star':starLevel-6==1,'ic_star':starLevel-6>=2}"></i>
  </div>
</template>

<script>

  export default {
    data(){
      return{
        star:'',
      }
    },
    props:["starLevel"],
    methods:{

    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../../assets/sass/config.scss";
  @import "../../../assets/sass/icon.scss";
  .starBox{
    display: inline-block;
  }
</style>
