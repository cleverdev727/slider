let len = 0;
let stepVal = 7;
let startVal, endVal;
let res = '';
let swiper;
const xhttp = new XMLHttpRequest();
xhttp.onload = async function() {
	res = JSON.parse(xhttp.responseText);
	len = res.length;
	startVal = len - stepVal;
	endVal = stepVal;

	for (let i = startVal; i < len; i ++) {
		document.getElementsByClassName('swiper-wrapper')[0].innerHTML += '<div class="swiper-slide" data-target="'+ res[i].url +'" data-div1="'+ res[i].div1 +'" data-div2="'+ res[i].div2 +'"><img src="'+ res[i].img +'">'+ res[i].text +'</div>';
	}
	for (let i = 0; i <= endVal; i ++ ) {
		if (i === 0) {
			document.getElementById('div1').innerHTML = res[i].div1;
			document.getElementById('div2').innerHTML = res[i].div2;
		}
		document.getElementsByClassName('swiper-wrapper')[0].innerHTML += '<div class="swiper-slide" data-target="'+ res[i].url +'" data-div1="'+ res[i].div1 +'" data-div2="'+ res[i].div2 +'"><img src="'+ res[i].img +'">'+ res[i].text +'</div>';
	}

	swiper = new Swiper('.swiper', {
		speed: 200,
		spaceBetween: 50,
		direction: 'horizontal',
		slidesPerView: 5,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		centeredSlides: true,
		centerInsufficientSlides: true,
		initialSlide: stepVal,
		// slideToClickedSlide: true,
		updateOnImagesReady: false,
		preloadImages: false,
		// mousewheel: {
		// 	// invert: false,
		// },
		// keyboard: {
        //   // enabled: true,
        // },
	});

	swiper.on('slideChangeTransitionEnd', function() {
		const activeIndexVal = swiper.activeIndex;
		const step = activeIndexVal - stepVal;
		console.log(activeIndexVal);
		console.log(swiper.slides[activeIndexVal]);
		document.getElementById('div1').innerHTML = swiper.slides[activeIndexVal].dataset.div1;
		document.getElementById('div2').innerHTML = swiper.slides[activeIndexVal].dataset.div2;
		drawSlide(step);
	});

	swiper.on('doubleClick', function(swiper, event) {
		redirectPage(swiper.slides[swiper.activeIndex].dataset.target);
	});
}
xhttp.open('GET', 'sample.json');
xhttp.send();

function redirectPage(url) {
	fetch(url).then((response) => {
	    return response.text();
	}).then((html) => {
	    document.getElementsByTagName('html')[0].innerHTML = html;
	})
}

function drawSlide(step) {
	console.log(startVal, endVal);
	if (step > 0) {
		for (let i = 0; i < step; i ++) {
			swiper.removeSlide(0);
		}
		for (let i = 0; i < step; i ++) {
			endVal = getRealVal(endVal + 1);
			startVal = getRealVal(startVal + 1)
			// const tempImg = new Image();
			// tempImg.src = res[endVal].img;
			// tempImg.onload = function() {
				swiper.appendSlide('<div class="swiper-slide" data-target="'+ res[endVal].url +'" data-div1="'+ res[endVal].div1 +'" data-div2="'+ res[endVal].div2 +'"><img src="'+ res[endVal].img +'">'+ res[endVal].text +'</div>');
			// }
		}
	} else {
		const tempStep = Math.abs(step);
		for (let i = 0; i < tempStep; i ++) {
			swiper.removeSlide(swiper.slides.length - 1);
		}
		for (let i = 0; i < tempStep; i ++) {
			startVal = getRealVal(startVal - 1);
			endVal = getRealVal(endVal - 1);
			swiper.prependSlide('<div class="swiper-slide" data-target="'+ res[startVal].url +'" data-div1="'+ res[startVal].div1 +'" data-div2="'+ res[startVal].div2 +'"><img src="'+ res[startVal].img +'">'+ res[startVal].text +'</div>');
		}
	}
}

function getRealVal(num) {
	num >= len && (num -= len);
	num < 0 && (num += len);
	return num;
}

function direction(param) {
		console.log(param);
	if (param === 'vertical') {
		swiper.params.slidesPerView = 3;
		swiper.changeDirection('vertical');
	} else if (param === 'horizontal') {
		swiper.params.slidesPerView = 5;
		swiper.changeDirection('horizontal');
	}
}

function nextPage() {
	swiper.slideTo(7 + swiper.params.slidesPerView);
}

function prevPage() {
	swiper.slideTo(7 - swiper.params.slidesPerView);
}


document.addEventListener('keydown', (e) => {
	console.log(e.keyCode);
	if (e.keyCode === 13) {
		redirectPage(swiper.slides[swiper.activeIndex].dataset.target);
	} else if (e.keyCode === 86) {
		swiper.params.direction === 'horizontal' && direction('vertical');
	} else if (e.keyCode === 72) {
		swiper.params.direction === 'vertical' && direction('horizontal');
	} else if (e.keyCode === 37) {
		swiper.slidePrev();
	} else if (e.keyCode === 39) {
		swiper.slideNext();
	} else if (e.keyCode === 33) {
		prevPage();
	} else if (e.keyCode === 34) {
		nextPage();
	}
});

window.addEventListener('gamepadconnected', (event) => {
	console.log('connected:', event.gamepad.connected);
});

window.addEventListener('gamepaddisconnected', (event) => {
	console.log('disconnected:', event.gamepad.connected);
});

setInterval(() => {
	const myGamepad = navigator.getGamepads()[0];
	if (myGamepad) {
		myGamepad.buttons[15].pressed && swiper.slideNext();
		myGamepad.buttons[14].pressed && swiper.slidePrev();
		swiper.params.direction === 'horizontal' && myGamepad.buttons[12].pressed && direction('vertical');
		swiper.params.direction === 'vertical' && myGamepad.buttons[13].pressed && direction('horizontal');
		myGamepad.buttons[10].pressed && redirectPage(swiper.slides[swiper.activeIndex].dataset.target);
		myGamepad.buttons[8].pressed && nextPage();
		myGamepad.buttons[9].pressed && prevPage();
	}
}, 100);