
const projectImages = document.getElementsByClassName("project_img");
const imagesArray = Array.from(projectImages);

const projectDetails = document.getElementsByClassName("project_details");
const detailsArray = Array.from(projectDetails);

const projectSlides = document.getElementsByClassName("slide");
const slidesArray = Array.from(projectSlides);

function specificSlide(imageIndex) {
	imageIndex--;
	const activeIndex = imagesArray.findIndex(image => image.classList.contains("active"));
	
	if (activeIndex === imageIndex)
		return;
	
	markAsActive(imagesArray[imageIndex], imageIndex);
	const futureImageIndex = getNextElementIndex(projectImages, imageIndex);
	markAsNext(projectImages[futureImageIndex])
	
	marksAsFutureWithExceptions(imageIndex, futureImageIndex);
	updateSlides(imageIndex);
}

function nextSlide() {
	showSlide(true);
}

function previousSlide() {
	showSlide(false);
}

function showSlide(next) {
	const activeIndex = imagesArray.findIndex(image => image.classList.contains("active"));
	
	const newActiveIndex = next ? getNextElementIndex(projectImages, activeIndex) : getPreviousElementIndex(projectImages, activeIndex);
	const newNextIndex = getNextElementIndex(projectImages, newActiveIndex);
	
	markAsActive(projectImages[newActiveIndex], newActiveIndex)
	markAsNext(projectImages[newNextIndex]);
	next ? markAsFuture(imagesArray[activeIndex]) : marksAsFutureWithExceptions(newActiveIndex, newNextIndex);
	
	updateSlides(newActiveIndex);
}

function getPreviousElementIndex(array, activeIndex) {
	return activeIndex > 0 ? activeIndex - 1 : array.length - 1;
}

function getNextElementIndex(array, activeIndex) {
	return activeIndex < array.length - 1 ? activeIndex + 1 : 0;
}

function markAsActive(image, detailsActiveIndex) {
	image.classList.remove("next");
	image.classList.remove("future");
	image.classList.add("active");
	
	detailsArray.forEach((element, index) => {
		if (index === detailsActiveIndex)
			return;
		
		element.classList.remove("active");
	});
	detailsArray[detailsActiveIndex].classList.add("active");
}

function markAsNext(image) {
	image.classList.remove("active");
	image.classList.remove("future");
	image.classList.add("next");
}

function markAsFuture(image) {
	image.classList.remove("active");
	image.classList.remove("next");
	image.classList.add("future");
}

function marksAsFutureWithExceptions(index1, index2) {
	imagesArray.forEach((element, index) => {
		if (index === index1 || index === index2)
			return;
		
		markAsFuture(element);
	});
}

function updateSlides(activeIndex) {
	slidesArray.forEach((element, index) => {
		if (index === activeIndex)
			return;
		
		element.classList.remove("active");
	});
	
	slidesArray[activeIndex].classList.add("active");
}



jQuery(document).ready(function($){
	let $timeline_block = $('.section_2_inner');
	let $slider = $('#slider');
	
	if ($($timeline_block).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
		$($timeline_block).addClass('is-hidden');
		$($slider).addClass('is-hidden');
	}
	
	
	$(window).on('scroll', function(){
		
		if($($timeline_block).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $($timeline_block).hasClass('is-hidden')) {
			$($timeline_block).removeClass('is-hidden').addClass('slideBlob');
			$($slider).removeClass('is-hidden').addClass('slideBlob');
		}
		
	});
});



const handleTouchStart = (evt) => {
	const firstTouch = getTouches(evt)[0];
	xDown = firstTouch.clientX;
	yDown = firstTouch.clientY;
};

const handleTouchMove = (evt) => {
	if (!xDown || !yDown) return;
	
	const xUp = evt.touches[0].clientX;
	const yUp = evt.touches[0].clientY;
	
	const xDiff = xDown - xUp;
	const yDiff = yDown - yUp;
	
	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		if (xDiff > 0) {
			console.log("Right swipe detected!");
			nextSlide();
		} else {
			previousSlide();
		}
	} else {
		if (yDiff > 0) {
			/* down swipe */
		} else {
			/* up swipe */
		}
	}
	/* reset values */
	xDown = null;
	yDown = null;
};

const getTouches = (evt) => {
	return evt.touches || evt.originalEvent.touches;
};

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);