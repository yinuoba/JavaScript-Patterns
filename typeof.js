;(function() {
	var fn = function() {},
		arr = [],
		obj = {},
		num = 2,
		bool = true;

	// 输出各种类型的typeof值
	console.info(typeof fn);	// function
	console.info(typeof arr);	// object
	console.info(typeof obj);	// object
	console.info(typeof num);	// number
	console.info(typeof bool);	// boolean
	console.info(typeof null);	// object
	console.info(typeof undefined);	// undefined
	console.info(typeof new Date());	// object

})();