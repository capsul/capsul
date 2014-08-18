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
        link: "images/bg_01.jpg",
        author: "@schmee",
        placename: "San Francisco",
        caption: "Things white people like. And then there's an Asian in the middle.",
        hashtags: ["#innapropriate", "#letsbereal", "#idratherhavecake"]
      },
      { type: "image",
        createdAt: "06/13/1973 at 3:20pm",
        link: "images/bg_06.jpg",
        author: "@grampie",
        placename: "Walla Walla, Washington ",
        caption: "Happy Birthday to this George Clooney Doppelganger",
        hashtags: ["#astarisborn", "#tbt", "#timeforcake"]
      },
      { type: "image",
        createdAt: "12/25/2075 at Noon",
        link: "images/bg_09.jpg",
        author: "@bertie",
        placename: "Las Vegas",
        caption: "Things asians people like. And day clubs after they were cool.",
        hashtags: ["#yourpeople", "#mypeople", "#youdoyou"]
      },
    ]
  }

  return {

    prepareSlides: function(){
      var slideBundle = this.compileSlides(backgroundSlides.data);
      this.renderHTML(slideBundle.collection);
    },

    compileSlides: function(data){
      console.log("here's your gaddammed sriides.");
      console.log(data);
      var slideBundle = new SlideBundle();
      data.forEach(function(slide){
        slideBundle.collection.push(new Slide(slide));
      })
      Slides.all.push(slideBundle);
      return slideBundle;
    },

    renderHTML: function(bundle){
      var self = this;
      bundle.forEach(function(slide) {
        slide.html = self.createHTML(slide);
        SlideView.render(slide.html, slide.link);
      })
    },

    createHTML: function(slide){
      // change #image-template to #slide-template
      var source = $('#slide-template').html();
      var template = Handlebars.compile(source);
      var info = {
        type: slide.type,
        createdAt: slide.createdAt,
        link: slide.link,
        author: slide.author,
        placename: slide.placename,
        caption: slide.caption,
        hashtags: slide.hashtags
      };
      return template(info);
    }
  }
})(SlideView);


//View Below
var SlideView = (function(){
  return {
    render: function(slideHTML, slideBgImage){
      console.log("here's what is in slideBGImage");
      console.log(slideBgImage);
      console.log("here's what the slide HTML looks like");
      console.log(slideHTML);
      console.log($(slideHTML));
      $('#slideshow').append(slideHTML);
      $('#slideshow div').last().css("background-image", "url("+slideBgImage+")");
    }
  }
})()

//Models & Model Holders Below

//holds all images from every API call ever made
var Slides = (function() {
  return {
    all: []
  }
})()

//holds all images from a single API call
function SlideBundle() {
  this.collection = [];
}

// Model for single image
function Slide(slide) {
  this.createdAt = slide.createdAt,
  this.link = slide.link,
  this.author = slide.author,
  this.placename = slide.placename,
  this.caption = slide.caption,
  this.hashtags = slide.hashtags
};

$( document ).ready(SlideshowController.prepareSlides.bind(SlideshowController));
