hexo.extend.filter.register('after_post_render',function(data){
	var ext = data.source.substring(data.source.lastIndexOf('.')).toLowerCase();
	if (ext !== '.md'){
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
