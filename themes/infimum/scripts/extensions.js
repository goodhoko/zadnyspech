function getFileExtenstion(filename){
	return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
}

hexo.extend.filter.register('after_post_render',function(data){
	if (getFileExtenstion(data.source) !== 'md'){
		return;
	}

	data.content = data.content.replace(/<img [^>]+>/g, function (img){
		var src = img.match(/src="(.*?)"/)[1],
			title = img.match(/title="(.*?)"/);
		title = title ? title[1] : '';

		return '<a href="' + src + '" title="' + title + '" data-src="' + src + '" class="gallery-item" target="_blank">' + img + '</a>';
	})

	return data;
}, 9);

hexo.extend.tag.register('asset_video', function(args, content){
	var file = args[0] || '',
		ext = getFileExtenstion(file),
		alt = args[1] || 'Čas vylézt z jeskyně a začít používat prohlížeč, kterej umí zobrazit html5 video.'

	return  '<div class="video-wrapper">' +
				'<video width="100%" controls>' +
					'<source src="./' + file + '"type="video/' + ext + '">' +
					alt +
				'</video>' +
				'<div class="playpause"></div>' +
			'</div>';
});