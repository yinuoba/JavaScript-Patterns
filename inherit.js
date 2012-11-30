;(function() {
	/**
	 * 类式继承模式1（默认模式）
	 * 使用Parent()构造函数实例化一个对象，并将该对象赋值给Child的prototype原型。
	 * 这种继承模式的缺点在于同时继承了两个对象的属性，即添加到this的属性及prototype原型属性；还有就是不支持参数传到子构造函数中
	 * 在绝大多数情况下，并不需要这些自身属性，因为他们很可能都是某个特定实例的特征，而不需要复用。
	 */
	(function() {
		/**
		 * 定义继承方法
		 * @param  {Function} Child  子构造函数
		 * @param  {Function} Parent 构造函数
		 * @return {[type]}   [description]
		 */
		function inherit(Child, Parent) {
			Child.prototype = new Parent()
		}

		// 定义构造函数Parent
		var Parent = function(name, major) {
				this.name = name || 'Hoogle';
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
		inherit(Child, Parent);

		console.info(Child); // this属性和原型方法均在Child的prototype属性上了
		
		// 实例化Child，看Child是否继承成功
		var child1 = new Child();
		console.info(child1.name); // 'Hoogle'
		console.info(child1.getMajor()); // 'F2E'

		// 不支持参数传递到子构造函数
		var child2 = new Child('yinuoba', 'JavaScript');
		console.info(child2.name); // 'Hoogle'
		console.info(child2.getMajor()); // 'F2E'
		console.info(child2.hasOwnProperty('name')); // false  name被作为prototype对象的属性了，而不是child2的自身属性
	})();


	/**
	 * 类式继承模式2（借用构造函数）
	 * 本模式解决了从子构造函数到父构造函数的参数传递问题。
	 * 该模式通过借用父构造函数，通过apply方法将自对象绑定到父构造函数的this，将参数传递给父构造函数。
	 * 该模式的缺点是无法从原型中继承任何东西，只是得到赋对象的真实副本(this上的属性)，得到this属性上的东西。
	 */
	;(function() {
		// 定义父构造函数
		var Parent = function(name) {
			this.name = name || 'Hoogle'
		};
		// 向父构造函数的原型添加方法
		Parent.prototype = {
			constructor: Parent,
			getName: function() {
				return this.name
			}
		};
		// 定义子构造函数
		var Child = function() {
			// 将this跟参数传入
			Parent.apply(this, arguments)
		};

		var child = new Child('yinuoba');
		console.info(child.name);	// 输出yinuoba
		console.info(typeof child.getName);	// undefined，说明这种方式不能继承prototype原型对象上的属性
	}());

})();