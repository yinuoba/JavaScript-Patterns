;(function() {
	/**
	 * 单体模式的思想在于保证一个类只有一个实例(如果可以实例化),从而可以确信所使用的代码都是使用的同一个全局资源。
	 */
	// 通过单体组织一批方法和属性
	var single0 = {
		"name": "Hoogle",
		"github": "https://github.com/yinuoba",
		method: function() {}
	}
	console.info(single0 === single0);

	// 通过单体组织一批方法和属性，起到命名空间的作用
	var FS = {
		"version": "0.1",
		"environment": "development"
	};
	FS.query = function() {

	}
	FS.consoleInfo = function() {

	}
}());