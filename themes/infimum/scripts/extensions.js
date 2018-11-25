function getFileExtenstion(filename){
	return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
}



// CUSTOM FILTERS //
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



// CUSTOM TAGS //
hexo.extend.tag.register('asset_video', function(args, content){
	var file = args[0] || '',
		ext = getFileExtenstion(file),
		alt = args[1] || 'Čas vylézt z jeskyně a začít používat prohlížeč, kterej umí zobrazit html5 video.'

	return  '<div class="video-wrapper">' +
				'<video width="100%" controls>' +
					'<source src="./' + file + '"type="video/' + ext + '">' +
					alt +
				'</video>' +
			'</div>';
});



hexo.extend.tag.register('quote', function(args, content){
	return  '„' + content + '“';
}, {ends: true});



// CUSTOM HELPERS //
hexo.extend.helper.register('htmlUnescape',function(str){
	var entities = {
		'amp': '&',
		'apos': '\'',
		'#x27': '\'',
		'#x2F': '/',
		'#39': '\'',
		'#47': '/',
		'lt': '<',
		'gt': '>',
		'nbsp': ' ',
		'quot': '"'
	};
	return str.replace(/&([^;]+);/gm, function (match, entity) {
		return entities[entity] || match
	});
});


hexo.extend.helper.register('htmlEscape',function(str){
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
})


hexo.extend.helper.register('headerImgs', function(arg, content){
	if(!arg){
		return;
	}
	var fs = require('hexo-fs');
	if(!arg.match(/\/$/)){
		arg = arg + '/';
	}
	imgs =  fs.listDirSync('source/' + arg);

	for (var i = imgs.length - 1; i >= 0; i--) {
		imgs[i] = arg + imgs[i];
	}

	return imgs;
})


hexo.extend.helper.register('random', function(array){
	return array[Math.floor(Math.random() * array.length)];
})


hexo.extend.helper.register('entag', function(tag){
	return '‹ ' + tag + ' ›';
})