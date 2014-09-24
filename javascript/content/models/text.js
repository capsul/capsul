//Model for single image
function TextArticle(object) {

	var hashtagsToString = ""

	object.hashtags.forEach(function(element) {
		hashtagsToString += ("#" + element + " ")
	})

	var replaceHTMLentities = function(str) {
		return str.split("&amp;").join("&")
		return str.split("&lt;").join("<")
		return str.split("&gt;").join(">")
		return str.split("&quot;").join('"')
		return str.split("&#x27;").join("'")
		return str.split("&#x60;").join("`")
	}

  this.username = replaceHTMLentities(object.author)
  this.content = replaceHTMLentities(object.content)
  this.hashtag = replaceHTMLentities(hashtagsToString)
  this.contentType = object.type

}