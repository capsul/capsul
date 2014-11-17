//Model for single image

function Picture(object) {
  this.username 		= this.replaceHTMLentities(object.author)
  this.url 					= object.images.high_res
  this.hashtag 			= this.replaceHTMLentities(this.hashtagsToString(object.hashtags))
  this.contentType 	= object.type
  this.createdAt 		= object.created_at
  this.id						= object.id
}

Picture.prototype.replaceHTMLentities = function(str) {
	str = str.split("&amp;").join("&")
	str = str.split("&lt;").join("<")
	str = str.split("&gt;").join(">")
	str = str.split("&quot;").join('"')
	str = str.split("&#x27;").join("'")
	str = str.split("&#x60;").join("`")
	return str
}

Picture.prototype.hashtagsToString = function(hashtagArray) {
	var outputString = ""
	hashtagArray.forEach(function(element){
		outputString += ("#" + element + " ")
	})
	return outputString
}