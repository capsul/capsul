// Controller Below
var TextController = (function(){

  function compileText(texts){
    var textBundle = new TextBundle();

    texts.forEach(function(item){
      console.log(item);
        var text = new TextArticle(item.author,item.content);
        textBundle.collection.push(text);
    })
    AllText.all.push(textBundle);
    return textBundle;
  }

  return {
    prepareText: function(articles){
      var textBundle = compileText(articles);
      TextView.clearOldText();
      TextView.renderHTML(textBundle.collection);
    }
  }
})();

//View Below
var TextView = (function(){

  function createHTML(article){
    var source = $('#text-template').html();
    var template = Handlebars.compile(source);
    var info = {
      content: article.content,
      username: article.username
    };
    return template(info);
  }

  return {
    renderHTML: function(bundle){
      bundle.forEach(function(article) {
        article.html = createHTML(article);
        $('#content-container').append(article.html);
      })
    },
    clearOldText: function(){
      $('.text').remove();
    }
  }
})()


//Models & Model Holders Below

//holds all images from every API call ever made
var AllText = (function() {
  return {
    all: []
  }
})()

//holds all images from a single API call
function TextBundle() {
  this.collection = [];
}

//Model for single image
function TextArticle(username,content,html) {
  this.username = username,
  this.content = content,
  this.html = html
}
