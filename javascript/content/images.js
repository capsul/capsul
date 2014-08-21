  // Controller Below
var PictureController = (function(){

  function compilePictures(pictures){
    var pictureBundle = new PictureBundle();

    pictures.forEach(function(item){
        var picture = new Picture(item.author,item.images.high_res,item.hashtags);
        pictureBundle.collection.push(picture);
    })
    Pictures.all.push(pictureBundle);
    return pictureBundle;
  }

  return {
    preparePictures: function(pictures){
      var pictureBundle = compilePictures(pictures);
      PictureView.clearOldPictures();
      PictureView.renderHTML(pictureBundle.collection);
    }
  }
})();

//View Below
var PictureView = (function(){

  function createHTML(picture){
    var source = $('#image-template').html();
    var template = Handlebars.compile(source);
    var info = {
      username: picture.content,
      url: picture.url
    };
    return template(info);
  }

  return {
    renderHTML: function(bundle){
      bundle.forEach(function(picture) {
        picture.html = createHTML(picture);
        $('#content-container').append(picture.html);
      })
    },
    clearOldPictures: function(){
      $('.image').remove();
    }
  }
})()


//Models & Model Holders Below

//holds all images from every API call ever made
var Pictures = (function() {
  return {
    all: []
  }
})()

//holds all images from a single API call
function PictureBundle() {
  this.collection = []
}

//Model for single image
function Picture(author,url,hashtags,html) {
  this.author = author,
  this.url = url,
  this.hashtags = hashtags,
  this.html = html
}














// Morgan's DateHandler Code
// var DateHandler = (function(){
//   return {

//    validatesTime: function(event) {
//     var date = document.querySelector('[type=date]').value
//     var twoDays = Date.now() - 172800000
//     var miliSecondDate = new Date(date).getTime()
//     var lat = map.center.k
//     var lng = map.center.B

//     if (miliSecondDate < twoDays){
//       $("#map-canvas").hide()
//       init(lat,lng,miliSecondDate)
//     }
//     else{
//       alert('We Can Only Travel Back in Time...now ;)')
//       }
//     },

//     showMap: function(){
//       $("#map-canvas").show()
//     }
//   }
// })();