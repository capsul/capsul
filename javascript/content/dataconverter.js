var DataConverter = (function(){

  return {
    convertData: function(ajaxResponse){
      console.log(ajaxResponse)

      var content = [];

      ajaxResponse.data.forEach(function(item){
        var lat = parseFloat(item.location.latitude)
        var lng = parseFloat(item.location.longitude)
        capsulMap.setPin(lat, lng)
        if (item.type === "text") {
          var text = new TextArticle(item);
          content.push(text);
        }
        else if (item.type === "image") {
          var picture = new Picture(item);
          content.push(picture)
        }
      })
      Viewport.set(content);
    }
  }
})()