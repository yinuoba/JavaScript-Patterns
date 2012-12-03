;(function() {
	/**
	 * 单体模式的思想在于保证一个类只有一个实例(如果可以实例化),从而可以确信所使用的代码都是使用的同一个全局资源。
	 */
	;(function() {
		// 通过单体组织一批方法和属性
		var single0 = {
			"name": "Hoogle",
			"github": "https://github.com/yinuoba",
			method: function() {}
		}
		console.info(single0 === single0);

	})()

	// 通过单体组织一批方法和属性，起到命名空间的作用
	;(function() {
		var FS = {
			"version": "0.1",
			"environment": "development"
		};
		FS.query = function() {};
		FS.consoleInfo = function() {}
	})()


	/**
	 * 经典单例模式
	 */
	;(function() {
		/**
		 * 定义单例方法
		 * @return {Object}   返回一实例对象
		 */
		function Universe() {
			// 缓存实例
			var instance;

			// 用命名函数表达式重写构造函数
			var Universe = function Universe() {
				return instance;
			};
			// 保留原型属性
			Universe.prototype = this;
			// 实例
			instance = new Universe();
			// 重置构造函数指针
			instance.constructor = Universe;

			// 其他功能
			instance.name = 'Hoogle';
			instance.major = 'F2E';

			// 返回实例
			return instance;
		}

		// 扩展Universe对象的原型
		Universe.prototype.nothing = true;
		var uni = new Universe();
		Universe.prototype.everything = true;
		var uni2 = new Universe();

		console.info(uni === uni2);	// true
		console.info(uni.nothing && uni2.nothing && uni.everything && uni2.everything);	// true
		console.info(uni.name);	// 'Hoogle'
		console.info(uni.constructor === Universe);	// true

	})()

}());