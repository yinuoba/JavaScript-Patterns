;(function() {
	// 实例化一个对象的过程
	 
	// 声明一个构造函数
	var F2E = function() {
		this.fullName = "front end engineer",
		this.work = function() {
			return "write JavaScript、HTML、CSS"
		}
	};

	// 实例化一个F2E
	var Hoogle = new F2E();

	// 通过new实例化时的实际执行过程
	var Hoogle = function() {
		// 使用对象字面量形式创建一个新的对象
		var this = {};
		this.fullName = "front end engineer",
		this.work = function() {
			return "write JavaScript、HTML、CSS"
		};
		// 返回该对象的引用
		return this
	};
}());