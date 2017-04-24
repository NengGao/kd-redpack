<template>
	<header class="header">
		<i class="ic-back-fff" @click="goBack"></i>
		<h1>{{headerMsg.title}}</h1>
		<router-link :to=headerMsg.rightUrl class="header-right" v-html=headerMsg.rightMsg></router-link>
	</header>					
</template>

<script>
	import router from '@/router'
	
	export default {
		data(){
			return{
				
			}
		},
		props:{
			headerMsg:{
	        	type: Object
	      	}
		},
		methods:{
			goBack: function(){
				router.back()
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	@import "../../../assets/sass/config.scss";
	@import "../../../assets/sass/icon.scss";
	.header{
	    height: toRem(55px);
	    width: 100%;
	    display: block;
	   	background: $bgColor;
	    position: relative;
	    top: 0;
	    left: 0;
	    color: #fff;
	    z-index: 10;
	    overflow: hidden;
	    h1{
	    	line-height: toRem(55px);
	    	padding-left: 3.2rem;
	    	font-weight: normal;
	    	font-size: toRem(16px);
	    	font-weight: 600;
	    }
	    .header-right{
	    	position: absolute;
	    	right: 1rem;
	    	top: 0;
	    	line-height: toRem(55px);
	    }
	}
</style>