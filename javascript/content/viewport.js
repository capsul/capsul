var Viewport = (function(){
  var content = [];
  return {
    all: function() {
      return content;
    },

    set: function(data) {
      content = data;
      $(this).trigger('update')
      // $('#granule-viewer').css("background-image", "url('./images/background/color-shift5.png')")
      capsulController.submitButtonDefault()
    }
  }
})()