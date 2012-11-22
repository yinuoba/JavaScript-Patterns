;(function(){
	/**
	 * 单体模式的思想在于保证一个类只有一个实例(严格相同)
	 */
	// 通过对象字面量创建的简单对象也是单体的一种
	var single0 = {
		"name": "Hoogle",
		"github": "https://github.com/yinuoba"
	}
	console.info(single0 === single0);

	//
}());