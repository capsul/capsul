var Viewport = (function(){
  var content = [];
  return {
    all: function() {
      return content;
    },

    set: function(data) {
      content = data;
      $(this).trigger('update')
    }
  }
})()