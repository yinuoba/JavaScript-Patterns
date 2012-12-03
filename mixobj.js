;(function() {
	/**
	 * 将多个对象合并为一个对象，将多个对象的属性连接起来
	 * @return {Object} 返回混合后的对象
	 */

	function mix() {
		var arg = arguments,
			length = arg.length - 1,
			prop, mixobj = {};
		for(; length >= 0; length--) {
			var nowObj = arg[length];
			for(prop in nowObj) {
				if(nowObj.hasOwnProperty(prop)) {
					mixobj[prop] = nowObj[prop];
				}
			}
		}
		return mixobj;
	}
	var obj = mix({
		name: "Hoogle",
		age: 24
	}, {
		getName: function() {}
	}, {
		arr: [1, 3, 5, [1, 3, 5]],
	});

	console.dir(obj);
	
})();