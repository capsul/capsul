 // ../images/bg_01.jpg
 // ../images/bg_02.jpg
 // ../images/bg_03.jpg
 // ../images/bg_04.jpg
 // ../images/bg_05.jpg
 // ../images/bg_05.jpg
 // ../images/bg_06.jpg
 // ../images/bg_07.jpg
 // ../images/bg_08.jpg
 // ../images/bg_09.jpg
 // ../images/bg_10.jpg




//Controller Below
var SlideshowController = (function(){

  var backgroundSlides = {
    data: [
      { type: "image",
        createdAt: "04/25/2013 at 4:35pm",
        link: "../images/bg_01.jpg",
        author: "@schmee",
        placename: "San Francisco",
        caption: "Things white people like. And then there's an Asian in the middle.",
        hashtags: ["#innapropriate", "#letsbereal", "#idratherhavecake"]
      },
      { type: "image",
        createdAt: "06/13/1973 at 3:20pm",
        link: "../images/bg_06.jpg",
        author: "@grampie",
        placename: "Walla Walla, Washington ",
        caption: "Happy Birthday to this George Clooney Doppelganger",
        hashtags: ["#astarisborn", "#tbt", "#timeforcake"]
      },
      { type: "image",
        createdAt: "12/25/2075 at Noon",
        link: "../images/bg_09.jpg",
        author: "@bertie",
        placename: "Las Vegas",
        caption: "Things asians people like. And day clubs after they were cool.",
        hashtags: ["#yourpeople", "#mypeople", "#youdoyou"]
      },
    ]
  }

  return {

    prepareImages: function(){
      var imageBundle = this.compileImages(backgroundSlides);
      this.renderHTML(imageBundle.collection);
    },

    compileImages: function(images){
      console.log("here's your gaddammed imigrrrs.");
      console.log(images);
      var imageBundle = new ImageBundle();
      images.data.forEach(function(image,index){
        // be sure to change the image model, or make a "slide model" and call that instead
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

    createHTML: function(image, DOMitem){
      // change #image-template to #slide-template
      var source = $('#image-template').html();
      var template = Handlebars.compile(source);
      var info = {
        // change all these attrs to match our fake JSON response
        image: image.content,
        url: image.url
      };
      return template(info);
    }

  }
  // change all this "ImageView" stuff to be "SlideView" and such.
})(ImageView);


//View Below
var ImageView = (function(){
  return {
    render: function(item, DOMcontainer){
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



$( document ).ready(SlideshowController.prepareImages.bind(SlideshowController));
