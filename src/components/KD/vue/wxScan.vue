<template>
	<div class="wxScan" v-show=wxScan.show>
		<div class="header">
			<i class="ic-back-fff" @click="wxScanClose"></i>
			<h1>支付二维码</h1>
		</div>
		<div class="payCode">
			<img :src="wxScan.url" alt="" />
		</div>
		<input type="button" class="wxScanBtn" @click=saveImage value="保存图片并打开微信"/>
	</div>
</template>

<script>
	
	import common from '@/assets/js/common'
	
	export default {
		props:{
			wxScan:{
	        	type: Object
	      	}
		},
		methods:{
			wxScanClose(){
				this.wxScan.show = false;
			},
			saveImage(){
				this.wxScan.show = false;
				common.saveImage(this.wxScan.url)
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">

	@import "../../../assets/sass/config.scss";
	@import "../../../assets/sass/icon.scss";
	.wxScan{
		width: 100%;
		height: 100%;
		background: #fff;
		position: absolute;
		top:0;
		left:0;
		z-index:12;
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
		}
		.payCode{
			width: 22rem;
			margin: 1rem auto;
			img{
				width: 100%;
			}
		}
		.wxScanBtn{
			width: 22rem;
			height: 3.5rem;
			background: $red;
			color: #fff;
			font-size: toRem(16px);
			display: block;
			margin: 0 auto;
			border: 0;
			border-radius: toRem(4px);
			&:active{
				opacity: 0.8;
			}
		}
	}
</style>