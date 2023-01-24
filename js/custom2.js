const xhttp = new XMLHttpRequest();
xhttp.onload = async function() {
	const res = JSON.parse(xhttp.responseText);
	for (let i = 0, len = res.length; i < len; i ++ ) {
		document.getElementsByClassName('swiper-wrapper')[0].innerHTML += '<div class="swiper-slide"><img src="'+ res[i].img +'">'+ res[i].text +'</div>';
	}

	const swiper = new Swiper('.swiper', {
		speed: 1000,
		spaceBetween: 50,
		centeredSlides: true,
		direction: 'horizontal',
		slidesPerView: 5,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		watchSlidesProgress: true,
		loop: true,
		centeredSlidesBounds: true,
		loopPreventsSlide: false,
		longSwipes: false,
		centerInsufficientSlides: true,
		initialSlide: 5,
		grabCursor: true,
		followFinger: true,
		longSwipes: false,
	});
}
xhttp.open('GET', 'very-small-data.json');
xhttp.send();

// document.getElementsByClassName('swiper')[0].style.marginTop = 'auto';
// document.getElementsByClassName('swiper')[0].style.marginLeft = 'auto';