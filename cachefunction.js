;(function() {
	// 备忘模式 让复杂的操作缓存在函数的属性中，从而只需要执行一遍。
	var hoogle = function(param) {
		var self = arguments.callee,
			result;
		if(!self.cache[param]) {
			result = {};
			// 一系列操作
			return result
		}
		return self.cache[param]
	};
	hoogle.cache = {}
} ());	