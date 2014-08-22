//Model for single image
function Picture(object) {
  this.username = object.author,
  this.url = object.images.high_res,
  this.hashtag = "@testTag",
  this.contentType = object.type
}