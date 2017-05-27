<template>
	<div class="flex-wrap counter">
		<div class="counter-subtract" @click="subtract"></div>
		<div class="counter-number flex-con-1"> {{counter.init}} {{counter.unit}}</div>
		<div class="counter-add" @click="add"></div>
	</div>
</template>

<script>
	
	import common from '@/assets/js/common'
	import { Toast } from 'mint-ui'
	
	export default {
		props:{
			counter:{
	        	type: Object
	        	// init  初始值
	        	// unit  单位
	        	// spacing  跨度 一次加减数量
	        	// max 
	        	// min 
	        	// skin
	      	}
		},
		methods:{
			add(){
				let max = this.counter.max ? this.counter.max : 100000;
				if(this.counter.init >= max){
					Toast({ message: '已经不能再加啦！', duration: 1500 });
					return
				}
				this.counter.init = this.counter.init + this.counter.spacing
			},
			subtract(){
				let min = this.counter.min ? this.counter.min : 0;
				if(this.counter.init <= min){
					Toast({ message: '已经不能再减啦！', duration: 1500 });
					return
				}
				this.counter.init = this.counter.init - this.counter.spacing
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">

	@import "../../../assets/sass/config.scss";
	@import "../../../assets/sass/icon.scss";
	.counter{
		width: 20rem;
	    height: 3.6rem;
	    margin: 0.8rem auto .8rem;
	    background: #201718;
	    border-radius: .35rem;
	    .counter-number{
	    	text-align: center;
		    line-height: 3.6rem;
		    color: #ecdbdb;
		    font-size: 1.54rem;
	    }
	    .counter-add{
	    	width: 4.36rem;
    		height: 3.6rem;
	    	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAQMAAABtzGvEAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAABlJREFUGNNjYGBgf8AAAoOH+g8GxFCDz/EAWaNJw8vomyQAAAAASUVORK5CYII=) center no-repeat #cd3938;
		    background-size: 36%;
		    border-radius: 0 .35rem .35rem 0;
		    &:active{
		    	opacity: 0.8;
		    }
	    }
	    .counter-subtract{
	    	width: 4.36rem;
    		height: 3.6rem;
	    	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAGAQMAAAC/7490AAAAA1BMVEXVlJTOd9JCAAAAC0lEQVQI12MgGgAAACoAAXbMpCAAAAAASUVORK5CYII=) center no-repeat #641e1e;
		    background-size: 36%;
		    border-radius: .35rem 0 0 .35rem;
		    &:active{
		    	opacity: 0.8;
		    }
	    }
	}
</style>