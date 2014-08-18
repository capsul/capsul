module.exports = (function(){
	
	return function paramsForUrl(query){
		 var paramInfo = {}
		if (query.indexOf("?") !== -1) {
		  var params = query.split("?")[1].split("&");
		  params.forEach(function(param) {
		    var keyValue = param.split("=");
		    paramInfo[keyValue[0]] = keyValue[1]
		  });	
		}

	  return paramInfo;
	}
})();