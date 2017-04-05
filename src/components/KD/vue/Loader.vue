<template>

	<!-- loader 1 -->
	<div class="loader">
	    <div class="ball-clip-rotate">
	      <div></div>
	    </div>
	</div> 	

</template>

		<!-- 
		<div class="loader">
		    <div class="ball-clip-rotate-pulse">
		      <div></div>
		      <div></div>
		    </div>
		</div>
		

		<div class="loader">
		    <div class="ball-scale-multiple">
		      <div></div>
		      <div></div>
		      <div></div>
		    </div>
		</div>

		<div class="loader">
		    <div class="line-scale-pulse-out">
		      <div></div>
		      <div></div>
		      <div></div>
		      <div></div>
		      <div></div>
		    </div>
		</div>

		<div class="loader">
		    <div class="ball-triangle-path">
		      <div></div>
		      <div></div>
		      <div></div>
	    	</div>
	    </div>	
		-->

<style rel="stylesheet/scss" lang="scss">
	
@import "../../../assets/sass/config.scss";
.loader {
	width: toRem(100px);
    height: toRem(100px);
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    margin-left: toRem(-50px);
    margin-top: toRem(-50px);
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
    border-radius:toRem(5px);
}

.ball-clip-rotate > div {
    background-color: #fff;
    width: toRem(15px);
    height: toRem(15px);
    border-radius: 100%;
    margin: toRem(2px);
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    border: toRem(2px) solid #fff;
    border-bottom-color: transparent;
    height: toRem(28px);
    width: toRem(28px);
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
    -webkit-transform: translate(toRem(-16px),toRem(-16px));
    -ms-transform: translate(toRem(-16px),toRem(-16px));
    transform: translate(toRem(-16px),toRem(-16px));
}

.ball-clip-rotate-pulse > div {
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 100%;
}

.ball-clip-rotate-pulse > div:first-child {
    background: #fff;
    height: toRem(16px);
    width: toRem(16px);
    top: toRem(9px);
    left: toRem(9px);
    -webkit-animation: scale 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
    animation: scale 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
}

.ball-clip-rotate-pulse > div:last-child {
    position: absolute;
    border: toRem(2px) solid #fff;
    width: toRem(30px);
    height: toRem(30px);
    background: transparent;
    border: toRem(2px) solid;
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
    -webkit-transform: translateY(toRem(-30px));
    -ms-transform: translateY(toRem(-30px));
    transform: translateY(toRem(-30px));
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
    margin: toRem(2px);
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute;
    left: toRem(-30px);
    top: 0;
    opacity: 0;
    margin: 0;
    width: toRem(60px);
    height: toRem(60px);
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
    width: toRem(4px);
    height: toRem(35px);
    border-radius: toRem(2px);
    margin: toRem(2px);
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
    width: toRem(4px);
    height: toRem(35px);
    border-radius: toRem(2px);
    margin: toRem(2px);
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
        -webkit-transform: translate(toRem(25px), toRem(-50px));
        transform: translate(toRem(25px), toRem(-50px));
    }

    66% {
        -webkit-transform: translate(toRem(50px), 0);
        transform: translate(toRem(50px), 0);
    }

    100% {
        -webkit-transform: translate(0, 0);
        transform: translate(0, 0);
    }
}

@keyframes ball-triangle-path-1 {
    33% {
        -webkit-transform: translate(toRem(25px), toRem(-50px));
        transform: translate(toRem(25px), toRem(-50px));
    }

    66% {
        -webkit-transform: translate(toRem(50px), 0);
        transform: translate(toRem(50px), 0);
    }

    100% {
        -webkit-transform: translate(0, 0);
        transform: translate(0, 0);
    }
}

@-webkit-keyframes ball-triangle-path-2 {
    33% {
        -webkit-transform: translate(toRem(25px), toRem(50px));
        transform: translate(toRem(25px), toRem(50px));
    }

    66% {
        -webkit-transform: translate(toRem(-25px), toRem(50px));
        transform: translate(toRem(-25px), toRem(50px));
    }

    100% {
        -webkit-transform: translate(0, 0);
        transform: translate(0, 0);
    }
}

@keyframes ball-triangle-path-2 {
    33% {
        -webkit-transform: translate(toRem(25px), toRem(50px));
        transform: translate(toRem(25px), toRem(50px));
    }

    66% {
        -webkit-transform: translate(toRem(-25px), toRem(50px));
        transform: translate(toRem(-25px), toRem(50px));
    }

    100% {
        -webkit-transform: translate(0, 0);
        transform: translate(0, 0);
    }
}

@-webkit-keyframes ball-triangle-path-3 {
    33% {
        -webkit-transform: translate(toRem(-50px), 0);
        transform: translate(toRem(-50px), 0);
    }

    66% {
        -webkit-transform: translate(toRem(-25px), toRem(-50px));
        transform: translate(toRem(-25px), toRem(-50px));
    }

    100% {
        -webkit-transform: translate(0px, 0px);
        transform: translate(0px, 0px);
    }
}

@keyframes ball-triangle-path-3 {
    33% {
        -webkit-transform: translate(toRem(-50px), 0);
        transform: translate(toRem(-50px), 0px);
    }

    66% {
        -webkit-transform: translate(toRem(-25px), toRem(-50px));
        transform: translate(toRem(-25px), toRem(-50px));
    }

    100% {
        -webkit-transform: translate(0px, 0px);
        transform: translate(0px, 0px);
    }
}

.ball-triangle-path {
    position: relative;
    -webkit-transform: translate(toRem(-30px), toRem(-30px));
    -ms-transform:  translate(toRem(-30px), toRem(-30px));
    transform:  translate(toRem(-30px), toRem(-30px));
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
    width: toRem(10px);
    height: toRem(10px);
    border-radius: 100%;
    border: toRem(1px) solid #fff;
}

.ball-triangle-path > div:nth-of-type(1) {
    top: toRem(50px);
}

.ball-triangle-path > div:nth-of-type(2) {
    left: toRem(25px);
}

.ball-triangle-path > div:nth-of-type(3) {
    top: toRem(50px);
    left: toRem(50px);
}

</style>