;(function() {	// instanceof操作符的实质，及instanceof欺骗
	/**
	 * 从同一个函数的new运算构造出的对象，被认为是一个类的实例，这些对象的共同点是：
	 * 1. 有同一个原型 
	 * 2. 经过同一个构造函数处理。
	 * 而instanceof正是配合这种实现类的方式检查"实例是否属于一个类"的一种运算符。
	 * 若要检查一个对象是否经过了一个构造函数处理千难万难，
	 * 但是检查它的原型是什么就容易多了，所以instanceof的实现从原型角度理解，
	 * 就是检查一个对象的[[prototype]]属性是否跟特定函数的prototype一致。注意这里[[prototype]]是私有属性，
	 * 在SpiderMonkey（就是Firefox的JS引擎）中它可以用__proto__来访问。
	 */
	
	/**
	 * instanceof实际上是可以被欺骗的，它用到的对象私有属性[[prototype]]固然不能更改，但函数的prototype是个共有属性，下面代码展示了如何欺骗instanceof
	 */
	var ClassA = function() {
		this.name = 'Hoogle'
	};
	var ClassB = function() {
		this.major = 'F2E'
	};
	var a = new ClassA();
	ClassB.prototype = ClassA.prototype;
	console.info(a instanceof ClassB); // true 欺骗成功

	// 以上摘自winter-cn的博客：http://www.cnblogs.com/winter-cn/archive/2009/12/07/1618281.html
})();