;(function() {
	/**
	 * 函数的curry化就是说将拥有多个参数的函数Currying化为拥有单一参数的函数形式。
	 */
	
	// 简单例子，curry化add方法
	// 接受部分参数列表
	function add(x, y){
		if(typeof y === 'undefined') { // 部分应用
			return function(y) {
				x + y
			}
		}
		// 完全应用
		return x + y
	}

	// 通用curry化函数例子
	function curry(fn) {
		var slice = Array.prototype.slice,
			stored_args = slice.call(arguments, 1);
		return function() {
			var new_args = slice.call(arguments),
			args = stored_args.concat(new_args);
			return fn.apply(null, args);
		}
	}

	// curry方法的运用
	function add(a, b, c, d, e) {
		return a + b + c + d + e
	}

	// 将一个函数curry化，得到一新函数
	var addOne = curry(add, 1);
	addOne(2, 3, 4, 5);	// 输出15
})();