$(document).ready(initialize);

var url = 'http://api-capsul.herokuapp.com/users/1/media?lat=36.121507&lng=-115.169570&time=1388563200';

function initialize() {
  Ajax.request(url, ImagesController.prepareImages.bind(ImagesController));
  $('#map-canvas').hide();
  $("#button").click(updateImages);
}

function updateImages(){
  var dynamicURL = constructURL(event);
  console.log(dynamicURL);
  Ajax.request(dynamicURL, ImagesController.prepareImages.bind(ImagesController));
}

function constructURL(event){
  console.log(event);
  var base = 'http://api-capsul.herokuapp.com/users/1/media?'
  // var lat = "lat=" + MapController.getLatitude() + "&";
  var lat = "lat=" + 37.778599 + "&";
  // var lng = "lng=" + MapController.getLongitude() + "&";
  var lng = "lng=" + -122.389076 + "&";
  var date = document.querySelector('[type=date]').value;
  var unixTimestamp = "time=" + (new Date(date).getTime());
  var timestamp = unixTimestamp.substr(0,15);
  var url = base + lat + lng + timestamp;
  return url;
}

//Ajax Module to make ajax calls
var Ajax = (function(){
  return {
    request: function(url, callback){
      var request = $.ajax({
        url:url
      })
    request.done(callback);
    }
  }
})();


//Controller Below
var ImagesController = (function(){

  return {

    prepareImages: function(images){
      var imageBundle = this.compileImages(images);
      this.renderHTML(imageBundle.collection);
    },

    compileImages: function(images){
      var imageBundle = new ImageBundle();
      images.data.forEach(function(image,index){
        imageBundle.collection.push(new Image("username",image.images.standard_resolution.url));
      })
      Images.all.push(imageBundle);
      return imageBundle;
    },

    renderHTML: function(bundle){
      var self = this;
      bundle.forEach(function(image) {
        image.html = self.createHTML(image);
        ImageView.render(image.html);
      })
    },

    createHTML: function(image){
      var source = $('#image-template').html();
      var template = Handlebars.compile(source);
      var info = {
        image: image.content,
        url: image.url
      };
      return template(info);
    }

  }
})(ImageView);


//View Below
var ImageView = (function(){
  return {
    render: function(item){
      $('#content-container').append(item);
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
function Image(content,url,html) {
  this.content = content,
  this.url = url,
  this.html = html
}



// Morgan's DateHandler Code
var DateHandler = (function(){
  return {

   validatesTime: function(event) {
    var date = document.querySelector('[type=date]').value
    var twoDays = Date.now() - 172800000
    var miliSecondDate = new Date(date).getTime()
    var lat = map.center.k
    var lng = map.center.B

    if (miliSecondDate < twoDays){
      $("#map-canvas").hide()
      init(lat,lng,miliSecondDate)
    }
    else{
      alert('We Can Only Travel Back in Time...now ;)')
      }
    },

    showMap: function(){
      $("#map-canvas").show()
    }
  }
})();

var LocationHandler = (function(){
  return {
    getLatitude: function(){
      console.log(map.center.k);
    },
    getLongitude: function(){
      console.log(map.center.B);
    }
  }
})()
//END OF PRODUCTION CODE
//-----------------------------------------------------------------------


//get all content from APIs
//randomize content
//render content on page
//after that is done, resolve and make new batch of API calls
//add an eventlistener for scrolling
//once a user scrolls, resolves the promise and render the next set of content


// $(document).on("scroll", createPromiseChain)
//   $(window).scroll(function() {
//    if($(window).scrollTop() + $(window).height() == $(document).height()) {
//        console.log("bottom heeeere");
//    }
// });
// }

//Promise class
// function Promise() {
//   this.holder = Q.defer();
// }

// function createPromiseChain(){
//   var promise = new Promise()
//   console.log(promise.holder.promise)
// }