module.exports = (function(){

	// POST /users
	return function* create() {
		this.body = yield {"users": "create"};
	}
})();