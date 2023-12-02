$(document).ready(function () {
  console.log("Welcome to my blog!");

  //enable lightGallery
  $("article").lightGallery({
    selector: ".gallery-item",
    hideBarsDelay: 1000,
  });

  //choosing hrandom header image
  if (
    location.pathname == "/" ||
    location.pathname.split("/")[1] == "tags" ||
    location.pathname.split("/")[1] == "minulost"
  ) {
    var headers = $(".image-header").data("imgs");
    var img = headers[Math.floor(Math.random() * headers.length)];
    $("div.image-header").css(
      "background-image",
      "url(/" + encodeURI(img) + ")",
    );
  }
});
