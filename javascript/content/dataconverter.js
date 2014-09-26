var DataConverter = (function(){

  return {
    convertData: function(ajaxResponse){
      console.log(ajaxResponse)

      var content = []
      var locations = []

      ajaxResponse.data.forEach(function(item){
        locations.push({
          lat: parseFloat(item.location.latitude),
          lng: parseFloat(item.location.longitude)
        })
        if (item.type === "text") {
          var text = new TextArticle(item);
          content.push(text);
        }
        else if (item.type === "image") {
          var picture = new Picture(item);
          content.push(picture)
        }
      })
      capsulMap.setPins(locations)
      Viewport.set(content)
    }
  }
})()