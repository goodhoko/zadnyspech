$(document).ready(function() {
	console.log('Welcome to my blog!');

	//enable lightGallery
	$("article").lightGallery({selector: '.gallery-item'});

	//support for play and pause overlay button on html5 videos
	$('article .video-wrapper').click(function () {
	if($(this).children("video").get(0).paused){
		$(this).children("video").get(0).play();
		$(this).children(".playpause").fadeOut();
	}else{
	   $(this).children("video").get(0).pause();
		$(this).children(".playpause").fadeIn();
	}
});
});
