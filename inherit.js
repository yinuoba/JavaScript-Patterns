;(function() {
	/**
	 * 类式继承模式1（默认模式）
	 * 使用Parent()构造函数实例化一个对象，并将该对象赋值给Child的prototype原型。
	 * 这种继承模式的缺点在于同时继承了两个对象的属性，即添加到this的属性及prototype原型属性.
	 * 在绝大多数情况下，并不需要这些自身属性，因为他们很可能都是某个特定实例的特征，而不需要复用。
	 * @param  {Function} Child  子构造函数
	 * @param  {Function} Parent 构造函数
	 * @return {[type]}   [description]
	 */
	function inherit1(Child, Parent) {
		Child.prototype = new Parent();
	}
	
	// 定义构造函数Parent
	var Parent = function(name, major) {
		this.name = name || 'Hoogle',
		this.major = major || 'F2E'
	};

	// 扩展构造函数Parent
	Parent.prototype = {
		getName: function() {
			return this.name
		},
		getMajor: function() {
			return this.major
		}
	};

	// 创建空白子构造函数
	var Child = function() {};

	// 让Child继承Parent
	inherit1(Child, Parent);

	console.info(Child);	// this属性和原型方法均在Child的prototype属性上了

	// 实例化Child，看Child是否继承成功
	var child = new Child();

	console.info(child.name); // 'Hoogle'
	console.info(child.getMajor()); // 'F2E'

})();