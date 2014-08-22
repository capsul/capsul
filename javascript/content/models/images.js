//Model for single image
function Picture(object) {
  this.username = object.author,
  this.url = object.images.high_res,
  this.hashtag = object.hashtags[0]
  this.contentType = object.type
}