//Model for single image
function TextArticle(object) {
  this.username = object.author,
  this.content = object.content,
  this.contentType = object.type,
  this.hashtag = object.hashtags[0]
}