const path = require("path");

// CUSTOM FILTERS //
hexo.extend.filter.register(
  "after_post_render",
  (data) => {
    if (path.extname(data.source).toLowerCase() !== ".md") {
      return;
    }

    data.content = data.content.replace(/<img [^>]+>/g, (img) => {
      const src = img.match(/src="(.*?)"/)[1];
      let thumbnail;
      // Should be kept in sync with `responsive_images.pattern` in config.yml.
      if (src.match(/.*\.(png|jpg|jpeg)$/i)) {
        thumbnail = path.join(
          path.dirname(src),
          `thumbnail_${path.basename(src)}`,
        );
      } else {
        thumbnail = src;
      }
      let title = img.match(/title="(.*?)"/);
      title = title ? title[1] : "";

      return `<a href="${src}" title="${title}" data-src="${src}" class="asset gallery-item" target="_blank"><img src="${thumbnail}" alt="${title}" title="${title}"></a>`;
    });

    return data;
  },
  9,
);

// CUSTOM TAGS //
hexo.extend.tag.register("asset_video", function (args, content) {
  const file = args[0] || "";
  const ext = path.extname(file).substring(1);
  const alt =
    args[1] ||
    "Čas vylézt z jeskyně a začít používat prohlížeč, kterej umí zobrazit html5 video.";

  return `
    <div class="asset">
      <video width="100%" controls>
        <source src="./${file}" type="video/${ext}">
        ${alt}
      </video>
    </div>
    `;
});

hexo.extend.tag.register("asset_vimeo", function (args) {
  return `<div class="asset">
		<div style="padding:56.25% 0 0 0;position:relative;">
			<iframe
				src="https://player.vimeo.com/video/${args[0]}?color=ffffff&title=0&byline=0&portrait=0"
				style="position:absolute;top:0;left:0;width:100%;height:100%;"
				frameborder="0"
				allow="autoplay; fullscreen"
				allowfullscreen
			></iframe>
		</div>
	</div>
	<script src="https://player.vimeo.com/api/player.js"></script>`;
});

// CUSTOM HELPERS //
hexo.extend.helper.register("htmlUnescape", function (str) {
  var entities = {
    amp: "&",
    apos: "'",
    "#x27": "'",
    "#x2F": "/",
    "#39": "'",
    "#47": "/",
    lt: "<",
    gt: ">",
    nbsp: " ",
    quot: '"',
  };
  return str.replace(/&([^;]+);/gm, function (match, entity) {
    return entities[entity] || match;
  });
});

hexo.extend.helper.register("htmlEscape", function (str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
});

hexo.extend.helper.register("headerImgs", function (arg, content) {
  if (!arg) {
    return;
  }
  var fs = require("hexo-fs");
  if (!arg.match(/\/$/)) {
    arg = arg + "/";
  }
  imgs = fs.listDirSync("source/" + arg);

  for (var i = imgs.length - 1; i >= 0; i--) {
    imgs[i] = arg + imgs[i];
  }

  return imgs;
});

hexo.extend.helper.register("random", function (array) {
  return array[Math.floor(Math.random() * array.length)];
});

hexo.extend.helper.register("entag", function (tag) {
  return "‹ " + tag + " ›";
});
