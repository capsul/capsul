//Model for single image
function Picture(object) {

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

	replaceHTMLentities(object.author)
	replaceHTMLentities(hashtagsToString)


  this.username = object.author,
  this.url = object.images.high_res,
  this.hashtag = hashtagsToString
  this.contentType = object.type
}