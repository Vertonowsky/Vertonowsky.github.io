
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
	
	markImageAsActive(imagesArray[imageIndex], imageIndex);
	const futureImageIndex = getNextElementIndex(projectImages, imageIndex);
	markImageAsNext(projectImages[futureImageIndex])
	
	imagesArray.forEach((element, index) => {
		if (index === imageIndex || index === futureImageIndex)
			return;
		
		markImageAsFuture(element);
	});
	
	updateSlides(imageIndex);
}

function nextSlide() {
	const activeIndex = imagesArray.findIndex(image => image.classList.contains("active"));
	
	const newActiveIndex = getNextElementIndex(projectImages, activeIndex);
	markImageAsActive(projectImages[newActiveIndex], newActiveIndex)
	markImageAsNext(getFutureElement(projectImages, activeIndex));
	markImageAsFuture(imagesArray[activeIndex])
	
	updateSlides(newActiveIndex);
}

function getNextElementIndex(array, activeIndex) {
	return activeIndex < array.length - 1 ? activeIndex + 1 : 0;
}

function getFutureElement(array, activeIndex) {
	const nextIndex = (activeIndex + 2) % array.length;
	return array[nextIndex];
}

function markImageAsActive(image, detailsActiveIndex) {
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

function markImageAsNext(image) {
	image.classList.remove("active");
	image.classList.remove("future");
	image.classList.add("next");
}

function markImageAsFuture(image) {
	image.classList.remove("active");
	image.classList.remove("next");
	image.classList.add("future");
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
	
	if ($($timeline_block).offset().top > $(window).scrollTop()+$(window).height()*0.75)
		$($timeline_block).addClass('is-hidden');
	
	
	$(window).on('scroll', function(){
		
		if($($timeline_block).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $($timeline_block).hasClass('is-hidden') )
			$($timeline_block).removeClass('is-hidden').addClass('slideBlob');
		
	});
});