;(function() {
	/**
	 * 命名空间函数
	 */
	var MYAPP = MYAPP || {};

	// 主要是多级属性的判断
	MYAPP.namespace = function(ns_string) {
		var attrs = ns_string.split('.'),
			parent = MYAPP;
		// 剥去最前面的冗余全局变量
		if(attrs[0] = 'MYAPP') {
			attrs = attrs.slice(1);
		}
		for(var i = 0, length = attrs.length; i < length; i++) {
			if(typeof parent[attrs[i]] === 'undefined') {
				parent[attrs[i]] = {}
			}
			parent = parent[attrs[i]]
		}
		return parent
	};

	var module2 = MYAPP.namespace('MYAPP.modules.module2');
	module2 === MYAPP.modules.module2;  // true

})();