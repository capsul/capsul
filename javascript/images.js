$(document).ready(initialize);

function initialize() {
  $("#button").click(ImagesController.renderImages);
}

// Ajax Module to make ajax calls
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

// Controller Below
var ImagesController = (function(){

  //Figure out how to make self equal ImagesController here
  //So all methods have access to self.
  //Not necessary but want to learn a technique to make things easier in the future.
  var self;

    function prepareImages(images){
      console.log(images);
      var imageBundle = compileImages(images);
      ImageView.clearOldImages();
      renderHTML(imageBundle.collection);
    }

    function compileImages(images){
      var contentBundle = new ContentBundle();
      var allContent = images.data.reduce(function(a,b){
        return a.concat(b);
      })

      allContent.forEach(function(object){
        if (object.type === "image") {
          var image = new ImageContent(object.author,object.images.high_res, object.type);
          contentBundle.collection.push(image);
        }
        else {
          var text = new TextContent(object.author,object.content,object.type);
          contentBundle.collection.push(text);
        }
      })
      Content.all.push(contentBundle);
      return contentBundle;
    }

    function renderHTML(bundle){
      bundle.forEach(function(pieceOfContent) {
          pieceOfContent.html = createHTML(pieceOfContent);
          ImageView.render(pieceOfContent.html);
      })
    }

    function createHTML(pieceOfContent){
      if (pieceOfContent.type === "image") {
        var source = $('#image-template').html();
        var template = Handlebars.compile(source);
        var info = {
          image: pieceOfContent.content,
          url: pieceOfContent.url
        };
        return template(info);
      }
      else {
        var source = $('#text-template').html();
        var template = Handlebars.compile(source);
        var info = {
          text: pieceOfContent.text,
          username: pieceOfContent.username
        };
        return template(info);
      }
    }

   function constructURL(){
      var base = 'http://api-capsul.herokuapp.com/users/1/media?'
      var latNumber = Number(MapController.getLatitude()).toPrecision(8);
      var lat = "lat=" + latNumber + "&";
      var lngNumber = Number(MapController.getLongitude()).toPrecision(8);
      var lng = "lng=" + lngNumber + "&";
      var date = document.querySelector('[type=date]').value;
      var unixTimestamp = "time=" + (new Date(date).getTime());
      var timestamp = unixTimestamp.substr(0,15);

      var url = base + lat + lng + timestamp;
      return url;
    }

  return {
    renderImages: function(){
      var dynamicURL = constructURL();
      Ajax.request(dynamicURL, prepareImages);
    }
  }
})();


//View Below
var ImageView = (function(){
  return {
    render: function(html){
      $('#content-container').append(html);
    },
    clearOldImages: function(){
      $('.image').remove();
    }
  }
})()


//Models & Model Holders Below

//holds all images from every API call ever made
var Content = (function() {
  return {
    all: []
  }
})()

//holds all images from a single API call
function ContentBundle() {
  this.collection = [];
}

//Model for single image
//This threw the worst fucking bug ever when the function was named 'Image'
//therefore, this function will be called fuckinballs from now on.
function ImageContent(contents,url,type) {
  this.contents = contents,
  this.url = url,
  this.type = type
}

function TextContent(username,text,type){
  this.username = username,
  this.text = text,
  this.type = type
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