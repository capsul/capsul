module.exports = (function(){
	
	// DELETE /users/:id
	return function* deleteUser(id) {
		this.body = yield {"users": "deleteUser"};
	}
})();