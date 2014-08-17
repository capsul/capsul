var db = require("../../db");

module.exports = (function(){
	
	// GET /media/images
	return function* images() {
		this.body = yield db().photos;
	}
})();