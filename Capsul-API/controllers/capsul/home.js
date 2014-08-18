module.exports = (function() {
	return function *home() {
		this.body = yield {"capsul": "Unforget the forgotten."}
	}
})();