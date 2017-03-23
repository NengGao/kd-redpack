<template>
	<div class="loaders">
		<!-- loader 1 -->
		<div class="loader">
		    <div class="ball-clip-rotate">
		      <div></div>
		    </div>
		</div> 

		
		<!-- loader 2
		<div class="loader">
		    <div class="ball-clip-rotate-pulse">
		      <div></div>
		      <div></div>
		    </div>
		</div>
		-->
		
<!--	
		<div class="loader">
		    <div class="ball-scale-multiple">
		      <div></div>
		      <div></div>
		      <div></div>
		    </div>
		</div>
-->
<!--		
		<div class="loader">
		    <div class="line-scale-pulse-out">
		      <div></div>
		      <div></div>
		      <div></div>
		      <div></div>
		      <div></div>
		    </div>
		</div>
-->


<!--
		<div class="loader">
		    <div class="ball-triangle-path">
		      <div></div>
		      <div></div>
		      <div></div>
	    	</div>
  		</div>	
 --> 		
	</div>
</template>


<style scoped>
	

.loader {
	width: 100px;
    height: 100px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
    box-sizing: border-box;
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 25%;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.6);
    border-radius:5px;
}

.ball-clip-rotate > div {
    background-color: #fff;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    border: 2px solid #fff;
    border-bottom-color: transparent;
    height: 28px;
    width: 28px;
    background: transparent !important;
    display: inline-block;
    -webkit-animation: rotate 0.75s 0s linear infinite;
    animation: rotate 0.75s 0s linear infinite;
}


@keyframes rotate {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    50% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes scale {
    30% {
        -webkit-transform: scale(0.3);
        transform: scale(0.3);
    }
    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}




.ball-clip-rotate-pulse {
    position: relative;
    -webkit-transform: translate(-16px,-16px);
    -ms-transform: translate(-16px,-16px);
    transform: translate(-16px,-16px);
}

.ball-clip-rotate-pulse > div {
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: 100%;
}

.ball-clip-rotate-pulse > div:first-child {
    background: #fff;
    height: 16px;
    width: 16px;
    top: 9px;
    left: 9px;
    -webkit-animation: scale 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
    animation: scale 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
}

.ball-clip-rotate-pulse > div:last-child {
    position: absolute;
    border: 2px solid #fff;
    width: 30px;
    height: 30px;
    background: transparent;
    border: 2px solid;
    border-color: #fff transparent #fff transparent;
    -webkit-animation: rotate 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
    animation: rotate 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
}




@-webkit-keyframes ball-scale-multiple {
    0% {
        -webkit-transform: scale(0);
        transform: scale(0);
        opacity: 0;
    }

    5% {
        opacity: 1;
    }

    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 0;
    }
}

@keyframes ball-scale-multiple {
    0% {
        -webkit-transform: scale(0);
        transform: scale(0);
        opacity: 0;
    }

    5% {
        opacity: 1;
    }

    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 0;
    }
}

.ball-scale-multiple {
    position: relative;
    -webkit-transform: translateY(-30px);
    -ms-transform: translateY(-30px);
    transform: translateY(-30px);
}

.ball-scale-multiple > div:nth-child(2) {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
}

.ball-scale-multiple > div:nth-child(3) {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
}

.ball-scale-multiple > div {
    background-color: #fff;
    border-radius: 100%;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute;
    left: -30px;
    top: 0;
    opacity: 0;
    margin: 0;
    width: 60px;
    height: 60px;
    -webkit-animation: ball-scale-multiple 1s 0s linear infinite;
    animation: ball-scale-multiple 1s 0s linear infinite;
}


@-webkit-keyframes line-scale-pulse-out {
    0% {
        -webkit-transform: scaley(1);
        transform: scaley(1);
    }

    50% {
        -webkit-transform: scaley(0.4);
        transform: scaley(0.4);
    }

    100% {
        -webkit-transform: scaley(1);
        transform: scaley(1);
    }
}

@keyframes line-scale-pulse-out {
    0% {
        -webkit-transform: scaley(1);
        transform: scaley(1);
    }

    50% {
        -webkit-transform: scaley(0.4);
        transform: scaley(0.4);
    }

    100% {
        -webkit-transform: scaley(1);
        transform: scaley(1);
    }
}

.line-scale-pulse-out > div {
    background-color: #ff0000;
    width: 4px;
    height: 35px;
    border-radius: 2px;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
    -webkit-animation: line-scale-pulse-out 0.9s 0s infinite cubic-bezier(.85, .25, .37, .85);
    animation: line-scale-pulse-out 0.9s 0s infinite cubic-bezier(.85, .25, .37, .85);
}

.line-scale-pulse-out > div:nth-child(2), .line-scale-pulse-out > div:nth-child(4) {
    -webkit-animation-delay: 0.2s !important;
    animation-delay: 0.2s !important;
}

.line-scale-pulse-out > div:nth-child(1), .line-scale-pulse-out > div:nth-child(5) {
    -webkit-animation-delay: 0.4s !important;
    animation-delay: 0.4s !important;
}

@-webkit-keyframes line-scale-pulse-out-rapid {
    0% {
        -webkit-transform: scaley(1);
        transform: scaley(1);
    }

    80% {
        -webkit-transform: scaley(0.3);
        transform: scaley(0.3);
    }

    90% {
        -webkit-transform: scaley(1);
        transform: scaley(1);
    }
}

@keyframes line-scale-pulse-out-rapid {
    0% {
        -webkit-transform: scaley(1);
        transform: scaley(1);
    }

    80% {
        -webkit-transform: scaley(0.3);
        transform: scaley(0.3);
    }

    90% {
        -webkit-transform: scaley(1);
        transform: scaley(1);
    }
}

.line-scale-pulse-out-rapid > div {
    background-color: #ff0000;
    width: 4px;
    height: 35px;
    border-radius: 2px;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
    -webkit-animation: line-scale-pulse-out-rapid 0.9s 0s infinite cubic-bezier(.11, .49, .38, .78);
    animation: line-scale-pulse-out-rapid 0.9s 0s infinite cubic-bezier(.11, .49, .38, .78);
}

.line-scale-pulse-out-rapid > div:nth-child(2), .line-scale-pulse-out-rapid > div:nth-child(4) {
    -webkit-animation-delay: 0.25s !important;
    animation-delay: 0.25s !important;
}

.line-scale-pulse-out-rapid > div:nth-child(1), .line-scale-pulse-out-rapid > div:nth-child(5) {
    -webkit-animation-delay: 0.5s !important;
    animation-delay: 0.5s !important;
}



@-webkit-keyframes ball-triangle-path-1 {
    33% {
        -webkit-transform: translate(25px, -50px);
        transform: translate(25px, -50px);
    }

    66% {
        -webkit-transform: translate(50px, 0px);
        transform: translate(50px, 0px);
    }

    100% {
        -webkit-transform: translate(0px, 0px);
        transform: translate(0px, 0px);
    }
}

@keyframes ball-triangle-path-1 {
    33% {
        -webkit-transform: translate(25px, -50px);
        transform: translate(25px, -50px);
    }

    66% {
        -webkit-transform: translate(50px, 0px);
        transform: translate(50px, 0px);
    }

    100% {
        -webkit-transform: translate(0px, 0px);
        transform: translate(0px, 0px);
    }
}

@-webkit-keyframes ball-triangle-path-2 {
    33% {
        -webkit-transform: translate(25px, 50px);
        transform: translate(25px, 50px);
    }

    66% {
        -webkit-transform: translate(-25px, 50px);
        transform: translate(-25px, 50px);
    }

    100% {
        -webkit-transform: translate(0px, 0px);
        transform: translate(0px, 0px);
    }
}

@keyframes ball-triangle-path-2 {
    33% {
        -webkit-transform: translate(25px, 50px);
        transform: translate(25px, 50px);
    }

    66% {
        -webkit-transform: translate(-25px, 50px);
        transform: translate(-25px, 50px);
    }

    100% {
        -webkit-transform: translate(0px, 0px);
        transform: translate(0px, 0px);
    }
}

@-webkit-keyframes ball-triangle-path-3 {
    33% {
        -webkit-transform: translate(-50px, 0px);
        transform: translate(-50px, 0px);
    }

    66% {
        -webkit-transform: translate(-25px, -50px);
        transform: translate(-25px, -50px);
    }

    100% {
        -webkit-transform: translate(0px, 0px);
        transform: translate(0px, 0px);
    }
}

@keyframes ball-triangle-path-3 {
    33% {
        -webkit-transform: translate(-50px, 0px);
        transform: translate(-50px, 0px);
    }

    66% {
        -webkit-transform: translate(-25px, -50px);
        transform: translate(-25px, -50px);
    }

    100% {
        -webkit-transform: translate(0px, 0px);
        transform: translate(0px, 0px);
    }
}

.ball-triangle-path {
    position: relative;
    -webkit-transform: translate(-30px, -30px);
    -ms-transform:  translate(-30px, -30px);
    transform:  translate(-30px, -30px);
}

.ball-triangle-path > div:nth-child(1) {
    -webkit-animation-name: ball-triangle-path-1;
    animation-name: ball-triangle-path-1;
    -webkit-animation-delay: 0;
    animation-delay: 0;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
}

.ball-triangle-path > div:nth-child(2) {
    -webkit-animation-name: ball-triangle-path-2;
    animation-name: ball-triangle-path-2;
    -webkit-animation-delay: 0;
    animation-delay: 0;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
}

.ball-triangle-path > div:nth-child(3) {
    -webkit-animation-name: ball-triangle-path-3;
    animation-name: ball-triangle-path-3;
    -webkit-animation-delay: 0;
    animation-delay: 0;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
}

.ball-triangle-path > div {
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    border: 1px solid #fff;
}

.ball-triangle-path > div:nth-of-type(1) {
    top: 50px;
}

.ball-triangle-path > div:nth-of-type(2) {
    left: 25px;
}

.ball-triangle-path > div:nth-of-type(3) {
    top: 50px;
    left: 50px;
}

</style>