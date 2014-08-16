module.exports = (function() {
	return function *home() {
		this.body = yield {"capsul": "Kevin Baconing the world."}
	}
})();