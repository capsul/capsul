var db = require("../../db");

module.exports = (function(){
  return function* text(userID) {
    this.body = yield db().tweets;
	}
})();