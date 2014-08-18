module.exports = (function(){
	
	// PUT /users/:id
	return function* update(id) {
		this.body = yield {"users": "update"};
	}
})();