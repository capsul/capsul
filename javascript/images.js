// Controller Below
var ImagesController = (function(){

  function compileImages(images){
    var imageBundle = new ImageBundle();

    images.forEach(function(item){
        var image = new Picture(item.author,item.images.high_res);
        imageBundle.collection.push(image);
    })
    Images.all.push(imageBundle);
    return imageBundle;
  }

  return {
    prepareImages: function(images){
      var imageBundle = compileImages(images);
      ImageView.clearOldImages();
      ImageView.renderHTML(imageBundle.collection);
    }
  }
})();

//View Below
var ImageView = (function(){

  function createHTML(image){
    var source = $('#image-template').html();
    var template = Handlebars.compile(source);
    var info = {
      username: image.content,
      url: image.url
    };
    return template(info);
  }

  return {
    renderHTML: function(bundle){
      bundle.forEach(function(image) {
        image.html = createHTML(image);
        $('#content-container').append(image.html);
      })
    },
    clearOldImages: function(){
      $('.image').remove();
    }
  }
})()


//Models & Model Holders Below

//holds all images from every API call ever made
var Images = (function() {
  return {
    all: []
  }
})()

//holds all images from a single API call
function ImageBundle() {
  this.collection = [];
}

//Model for single image
function Picture(username,url,html) {
  this.username = username,
  this.url = url,
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