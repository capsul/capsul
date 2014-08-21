  // Controller Below
var PictureController = (function(){

  return {
    preparePictures: function(pictures){
      var bundle = []
      pictures.forEach(function(item){
        var picture = new Picture(item.author,item.images.high_res);
        bundle.push(picture);
      })
      Pictures.set(bundle);
    }
  }
})();

var Pictures = (function() {
  var all = []
  return {
    all: function() { return all } ,
    set: function(data) {
      all = data
      $(this).trigger('update')
    }

  }
})()

//Model for single image
function Picture(username,url,html,logo,hashtag) {

  this.username = username,
  this.url = url,
  this.html = html,
  this.logo = "https://www.seoclerk.com/pics/222129-1r8o5m1400449246.png",
  this.hashtag = "@testTag"
}
