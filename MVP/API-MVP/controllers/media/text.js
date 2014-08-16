var db = require("../../db");

module.exports = (function(){
	
	// GET /media/text
	return function* text(userID) {
		this.body = yield db().tweets;
	}
})();