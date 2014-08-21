  // Controller Below
var PictureController = (function(){

  function compilePictures(pictures){
    var pictureBundle = new PictureBundle();

    pictures.forEach(function(item){
        var picture = new Picture(item.author,item.images.high_res);
        pictureBundle.collection.push(picture);
    })
    Pictures.all.push(pictureBundle);

    return pictureBundle;
  }

  return {
    preparePictures: function(pictures){
      var pictureBundle = compilePictures(pictures);
      $(ContentArea).trigger("update", [pictureBundle.collection])
      // PictureView.clearOldPictures();
      // PictureView.renderHTML(pictureBundle.collection);
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
function Picture(username,url,html,logo,hashtag) {

  this.username = username,
  this.url = url,
  this.html = html,
  this.logo = "https://www.seoclerk.com/pics/222129-1r8o5m1400449246.png",
  this.hashtag = "@testTag"
}

//Event Listner in the content area
ContentArea = (function() {
  return {}
})()
