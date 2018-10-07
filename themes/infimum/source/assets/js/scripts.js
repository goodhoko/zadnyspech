$(document).ready(function() {
	console.log('Welcome to my blog!');



	//enable lightGallery
	$('article').lightGallery({
		selector: '.gallery-item',
		hideBarsDelay: 1000});



	//support for play and pause overlay button on html5 videos
	$('article .video-wrapper').click(function () {
		if($(this).children('video').get(0).paused){
			$(this).children('video').get(0).play();
			$(this).children('.playpause').fadeOut();
		}else{
		   $(this).children('video').get(0).pause();
			$(this).children('.playpause').fadeIn();
		}
	});
	$('article .video-wrapper video').on('play', function () {
		$(this).siblings('.playpause').fadeOut();
	})
	$('article .video-wrapper video').on('pause', function () {
		$(this).siblings('.playpause').fadeIn();
	})



	//choosing hrandom header image
	if(location.pathname == '/' || location.pathname.split('/')[1] == 'tags'){
		var headers = $('.image-header').data('imgs')
		var img = headers[Math.floor(Math.random() * headers.length)];
		$('div.image-header').css('background-image', 'url(/' + encodeURI(img) + ')')
	}
});
