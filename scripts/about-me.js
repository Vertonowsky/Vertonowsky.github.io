jQuery(document).ready(function($){
	let $technologies = $('#technologies');
	let $title_holder = $('#title_holder');
	
	if ($($technologies).offset().top > $(window).scrollTop()+$(window).height()*0.9) {
		$($technologies).addClass('is-hidden');
	}
	
	if ($($title_holder).offset().top > $(window).scrollTop()+$(window).height()*0.9) {
		$($title_holder).addClass('is-hidden');
	}
	
	
	$(window).on('scroll', function(){
		
		if($($technologies).offset().top <= $(window).scrollTop()+$(window).height()*0.9 && $($technologies).hasClass('is-hidden')) {
			$($technologies).removeClass('is-hidden').addClass('slideBlob');
		}
		
		if($($title_holder).offset().top <= $(window).scrollTop()+$(window).height()*0.9 && $($title_holder).hasClass('is-hidden')) {
			$($title_holder).removeClass('is-hidden').addClass('slideBlob');
		}
		
	});
});