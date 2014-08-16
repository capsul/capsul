module.exports = (function(){
	
	// GET /users/:id
	return function* user(id) {
		this.body = yield {"users": "user"};
	}
})();