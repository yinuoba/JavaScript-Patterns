;(function() {
	// 实例化一个对象的过程
	 
	// 声明一个构造函数
	var F2E = function() {
		this.fullName = "front end engineer",
		this.work = function() {
			return "write JavaScript、HTML、CSS"
		}
	};

	// 定义prototype扩展方法
	F2E.prototype = {
		constructor: F2E,
		getName: function() {
			return this.fullName
		}
	};


	// 实例化一个F2E
	var hoogle = new F2E();


	// 通过new实例化时的实际执行过程

	var hoogle = function() {
		// 使用对象字面量形式创建一个新的对象
		var hoogle = {};
		// 将原型指针指向构造函数的原型对象
		hoogle.__proto__ = F2E.prototype;

		// 将F2E上的静态属性赋给hoogle，并传入参数
		F2E.apply(hoogle, arguments);

		// 返回该对象的引用
		return hoogle
	};

}());