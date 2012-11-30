/**
 * 1、找出数字数组中最大的元素（使用Math.max函数）
2、转化一个数字数组为function数组（每个function都弹出相应的数字）
3、给object数组进行排序（排序条件是每个元素对象的属性个数）
4、利用JavaScript打印出Fibonacci数（不使用全局变量）
5、实现如下语法的功能：var a = (5).plus(3).minus(6); //2
6、实现如下语法的功能：var a = add(2)(3)(4); //9
 */
;(function() {
	/**
	 * 找出数字数组中最大的元素（使用Math.max函数）
	 */
	var arr = [3, 6, 1, 54, 2, 4],
		max = Math.max.apply(null, arr);
	console.log(max);


	/**
	 * 转化一个数字数组为function数组（每个function都弹出相应的数字）
	 */
	var arr = [3, 6, 1, 54, 2, 4],
		fun = [];
	for(var a in arr) {
		if(arr.hasOwnProperty(a)) {
			fun.push(function() {
				alert(a)
			})
		}
	}
	console.log(fun);


	/**
	 * 给object数组进行排序（排序条件是每个元素对象的属性个数）
	 */
	var arr1 = ["a", "w"],
		arr2 = ["a", "d", "w", "s"],
		arr3 = ["a"],
		arr4 = ["a", "d", "w", "e", "f", "sa"];
	var arr = [arr1, arr2, arr3, arr4];

	function sortArr(a, b) {
		return b.length - a.length
	}
	arr.sort(sortArr);


	/**
	 * 利用JavaScript打印出Fibonacci数（不使用全局变量）
	 */
	function fibonacci(n) {
		return(function(n) {
			if(n == 1 || n == 2) return 1;
			return arguments.callee(n - 1) + arguments.callee(n - 2);
		})(n);
	}
	fibonacci(10); //55


	/**
	 * 实现如下语法的功能：var a = (5).plus(3).minus(6); //2
	 */
	Number.prototype.plus = function(xld) {
		return this + xld
	};
	Number.prototype.minus = function(xld) {
		return this - xld
	};
	var a = (5).plus(3).minus(6);
	console.log(a);


	/**
	 * 实现如下语法的功能：var a = add(2)(3)(4);
	 */
	function add(x) {
		add.valueOf = add.toString = function() {
			return x;
		}

		function add(y) {
			x += y;
			return add;
		}
		return add;
	}
	add(2)(5)(8);
	
}());