const len = 100;
let stepVal = 7;
let startVal = len - stepVal;
let endVal = stepVal;
for (let i = startVal; i < len; i ++) {
	document.getElementsByClassName('swiper-wrapper')[0].innerHTML += '<div class="swiper-slide" data-target="'+ i +'.html"><img src="./img/cuore7_00000.png">Slide '+ i +'</div>';
}
for (let i = 0; i <= endVal; i ++ ) {
	document.getElementsByClassName('swiper-wrapper')[0].innerHTML += '<div class="swiper-slide" data-target="'+ i +'.html"><img src="./img/cuore7_00000.png">Slide '+ i +'</div>';
}
const swiper = new Swiper('.swiper', {
	speed: 200,
	spaceBetween: 50,
	direction: 'horizontal',
	slidesPerView: 5,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	// watchSlidesProgress: true,
	// watchOverflow: true,
	// loop: true,
	centeredSlides: true,
	// centeredSlidesBounds: true,
	// loopPreventsSlide: false,
	// longSwipes: false,
	centerInsufficientSlides: true,
	initialSlide: stepVal,
	// grabCursor: true,
	// followFinger: true,
	slideToClickedSlide: true,
	// updateOnImagesReady: false,
	// preloadImages: false,
	// onAny(eventName, ...args) {
	// 	console.log('Event: ', eventName);
	// 	console.log('Event data: ', args);
	// },
	// zoom: {
	// 	maxRatio: 2,
	// },
	mousewheel: {
		// invert: false,
	},
	keyboard: {
      enabled: true,
    },
});

function drawSlide(step) {
	console.log(startVal, endVal);
	if (step > 0) {
		for (let i = 0; i < step; i ++) {
			swiper.removeSlide(0);
		}
		for (let i = 0; i < step; i ++) {
			endVal = getRealVal(endVal + 1);
			startVal = getRealVal(startVal + 1)
			swiper.appendSlide('<div class="swiper-slide" data-target="'+ endVal +'.html"><img src="./img/cuore7_00000.png">Slide '+ endVal +'</div>');
		}
	} else {
		const tempStep = Math.abs(step);
		for (let i = 0; i < tempStep; i ++) {
			swiper.removeSlide(swiper.slides.length - 1);
		}
		for (let i = 0; i < tempStep; i ++) {
			startVal = getRealVal(startVal - 1);
			endVal = getRealVal(endVal - 1);
			swiper.prependSlide('<div class="swiper-slide" data-target="'+ startVal +'.html"><img src="./img/cuore7_00000.png">Slide '+ startVal +'</div>');
		}
	}
}

swiper.on('slideChangeTransitionEnd', function() {
	const step = swiper.activeIndex - stepVal;
	drawSlide(step);
});

swiper.on('doubleClick', function(swiper, event) {
	window.open(swiper.slides[swiper.activeIndex].dataset.target);
});

function getRealVal(num) {
	num >= len && (num -= len);
	num < 0 && (num += len);
	return num;
}