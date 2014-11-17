//Model for single image
function TextArticle(object) {
  this.username 		= this.replaceHTMLentities(object.author)
  this.content 			= this.replaceHTMLentities(object.content)
  this.hashtag 			= this.replaceHTMLentities(this.hashtagsToString(object.hashtags))
  this.contentType 	= object.type
  this.createdAt 		= object.created_at
  this.id						= object.id
}

TextArticle.prototype.replaceHTMLentities = function(str) {
	str = str.split("&amp;").join("&")
	str = str.split("&lt;").join("<")
	str = str.split("&gt;").join(">")
	str = str.split("&quot;").join('"')
	str = str.split("&#x27;").join("'")
	str = str.split("&#x60;").join("`")
	return str
}

TextArticle.prototype.hashtagsToString = function(hashtagArray) {
	var outputString = ""
	hashtagArray.forEach(function(element){
		outputString += ("#" + element + " ")
	})
	return outputString
}