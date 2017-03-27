<template>
  <div id="app">
  	<transition :name="transitionName">
    	<router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      	transitionName: 'fade'
    }
  },
  watch: {
	  '$route' (to, from) {
		    const toDepth = to.path.split('/').length
		    const fromDepth = from.path.split('/').length
		    if(toDepth != fromDepth) return
		    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
	  }
	}
}
</script>
 
<style lang="scss">
		#app{
				width: 100%;
				height: 100%;
				.child-view {
						flex-direction:column;
						position: absolute;
					  top:0;
					  left: 0;
					  width: 100%;
						height: 100%;
					  transition: all .1s cubic-bezier(1,0.8,.1,0.3);
				}
				.fade-enter-active, .fade-leave-active {
				  	transition: opacity .15s ease;
				}
				.fade-enter, .fade-leave-active {
				  	opacity: 0
				}
				.slide-left-enter, .slide-right-leave-active {
					  opacity: 0;
					  -webkit-transform: translate(30%, 0);
					  transform: translate(30%, 0);
				}
				.slide-left-leave-active, .slide-right-enter {
					  opacity: 0;
					  -webkit-transform: translate(-30%, 0);
					  transform: translate(-30%, 0);
				}
		}
</style>