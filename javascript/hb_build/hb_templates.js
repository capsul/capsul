(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['slideshow'] = template({"1":function(depth0,helpers,partials,data) {
    var lambda=this.lambda, escapeExpression=this.escapeExpression;
    return escapeExpression(lambda(depth0, depth0))
    + "&nbsp;&nbsp;";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class='slide'>\n	<div class='slide-text'>\n		<h1>"
    + escapeExpression(((helper = (helper = helpers.placename || (depth0 != null ? depth0.placename : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"placename","hash":{},"data":data}) : helper)))
    + "</h1>\n		<h2>"
    + escapeExpression(((helper = (helper = helpers.createdAt || (depth0 != null ? depth0.createdAt : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"createdAt","hash":{},"data":data}) : helper)))
    + "</h2>\n		<h3>"
    + escapeExpression(((helper = (helper = helpers.caption || (depth0 != null ? depth0.caption : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"caption","hash":{},"data":data}) : helper)))
    + "</h3>\n		<h3>";
    stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.hashtags : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
    if (stack1 != null) { buffer += stack1; }
    return buffer + "</h3>\n	</div>\n</div>";
  },"useData":true});
})();