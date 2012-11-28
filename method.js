;(function() {
	/**
	 * 在Function对象上扩展method方法
	 * @param  {String}   name     扩展的方法名称
	 * @param  {Function} callback 方法的定义
	 * @return {Function} return this  提供链式调用
	 */
	if(typeof Function.prototype.method !== 'function'){
		Function.prototype.method = function(name, callback) {
			// 在当前function上扩展name方法
			this.prototype[name] = callback;
			// 便于method方法的链式调用
			return this
		}
	}

	// method方法的运用
	var Hoogle = function() {
			this.name = "Hoogle", 
			this.major = "F2E"
		};

	// 扩展hoogle构造函数上的原型方法
	Hoogle.method("getName", function() {
		return this.name
	}).method("setName", function(newname) {
		this.name = newname;
		return this
	}).method("getMajor", function() {
		return this.major
	}).method("setMajor", function(newmajor) {
		this.major = newmajor;
		return this
	});

	// 实例化Hoogle
	var hoogle = new Hoogle();
	// 设置静态属性并输出结果
	hoogle.setName("newHoogle").setMajor("newMajor");
	console.info(hoogle.getName(), hoogle.getMajor());

})();