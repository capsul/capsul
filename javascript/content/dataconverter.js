var DataConverter = (function(){

  return {
    convertData: function(ajaxResponse){
      var content = [];

      ajaxResponse.data.forEach(function(item){
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