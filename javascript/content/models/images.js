//Model for single image
function Picture(object) {
  this.username = object.author,
  this.url = object.images.high_res,
  this.logo = "https://www.seoclerk.com/pics/222129-1r8o5m1400449246.png",
  this.hashtag = "@testTag",
  this.contentType = object.type
}
