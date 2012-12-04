;(function() {
	/**
	 * 类式继承模式（默认模式）
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

		console.dir(Child); // this属性和原型方法均在Child的prototype属性上了
		
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
	 * 类式继承模式（借用构造函数）
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


	/**
	 * 共享原型
	 * 通过将可复用成员全部移到prototype原型对象中，而不放在this属性中
	 * 一个缺点就是一旦某个实例修改了原有原型，父对象上原型也会被修改
	 */
	;(function(){
		/**
		 * 定义共享原型方法
		 * @param  {Function} Child  子构造函数
		 * @param  {Function} Parent 构造函数
		 * @return {[type]}   [description]
		 */
		function inherit(Child, Parent) {
			Child.prototype = Parent.prototype;
		}

		// 定义父构造函数并扩展原型
		var Parent = function(name) {
			this.name = name || 'Hoogle'
		};
		Parent.prototype = {
			constructor: Parent,
			getName: function() {
				return this.name
			},
			major: "F2E"
		};

		// 定义子构造函数
		var Child = function() {};

		// 实现子构造函数共享父构造函数原型
		inherit(Child, Parent);

		// 实例化子构造函数并观察其属性和原型
		var child = new Child("newName");
		console.dir(child);

		// 通过Child更改原型上major属性的值
		Child.prototype.major = "JavaScript"

		// 更改原型后，再看父子对象，发现父子对象上的major属性值同时被改为了"JavaScript"
		var parent = new Parent();
		var child = new Child();
		console.dir(parent);
		console.dir(child);

	})();


	/**
	 * 临时构造函数
	 * 让子构造函数修改原型后，父对象上的原型不会收到影响
	 * 并且将扶对象的原型存储在uber属性上，Child的constructor指向自身，维护原型链关系
	 */
	;(function() {
		/**
		 * 定义临时构造函数方法，该方法又称类式继承模式圣杯版的优化模式
		 * @param  {Function} Child  子构造函数
		 * @param  {Function} Parent 构造函数
		 * @return {[type]}   [description]
		 */
		function inherit() {
			var F = function() {};
			return function(Child, Parent) {
				F.prototype = Parent.prototype;
				Child.prototype = new F();
				// 存储超类
				Child.uber = Parent.prototype;
				// 将Child原型的constructor指向Child
				Child.prototype.constructor = Child;
			}
		}

		// 定义父构造函数并扩展原型
		var Parent = function(name) {
			this.name = name || 'Hoogle'
		};
		Parent.prototype = {
			constructor: Parent,
			getName: function() {
				return this.name
			},
			major: "F2E"
		};

		// 定义子构造函数
		var Child = function() {};

		// 实现子构造函数共享父构造函数原型
		inherit(Child, Parent);

		// 实例化子构造函数并观察其属性和原型
		var child = new Child("newName");
		console.dir(child);

		// 通过Child更改原型上major属性的值
		Child.prototype.major = "JavaScript"

		// 更改原型后，再看父子对象，发现只有child上的major属性被更改过，parent没有变
		var parent = new Parent();
		var child = new Child();
		console.dir(parent);
		console.dir(child);
	})();


	/**
	 * 原型继承
	 * object继承，在ECMAScript5中，原型继承模式已经通过Object.create()来实现
	 */
	;(function() {
		/**
		 * 原型继承方法
		 * @param  {Object} o 需要继承的对象
		 * @return {Object}   返回继承后的对象
		 */
		function object(o) {
			var F = function() {};
			F.prototype = o;
			return new F();
		}

		// 定义父构造函数
		var Parent = function(name) {
			this.name = name || "Hoogle",
			this.major = "F2E"
		};
		Parent.prototype = {
			getName: function() {
				return this.name
			},
			getMajor: function() {
				return this.major
			},
			test: "yes"
		};

		var parent = new Parent();

		// 子对象
		var child = object(parent);
		console.dir(child);

		child.test = "no";
		console.dir(parent);
		console.dir(child);


		// 该模式在ECMAScript5中的用法
		child = Object.create(parent, {
			age: {value: "24"}
		});
		console.info(child.age);	// 24

	})();


	/**
	 * 通过复制属性实现继承，即extend方法
	 */
	;(function() {
		/**
		 * extend方法，包括浅复制和深复制
		 * @param  {Object|Array} child  需被扩展对象
		 * @param  {Object|Array} parent 扩展对象
		 * @return {Object|Array} 返回扩展后的对象
		 */
		function extend(child, parent) {
			// toStr，isArray 用来判断属性类型
			var toString = Object.prototype.toString,
				prop,
				isArray = '[object Array]';
			
			// 设置child的默认值为一空对象
			child = child || {};

			// 遍历扩展对象
			for(prop in parent) {
				// 只针对自身属性，过滤prototype属性
				if(parent.hasOwnProperty(prop)){
					// 当某一属性类型是数组
					if(typeof parent[prop] === 'object') {
						child[prop] = toString.call(parent[prop]) === isArray ? [] : {},
						arguments.callee(child[prop], parent[prop]);
					} else {
						child[prop] = parent[prop]
					}
				}
			}
			// 返回扩展后的child对象
			return child;
		}

		var parent = {
			name: "Hoogle",
			age: "24",
			major: [1, 3, 5, [1, 3, 5]],
			getName: function(){
				return this.name
			},
			bool: false
		};
		var child = {
			bool: true
		};

		var obj = extend(child, parent);
		console.dir(obj);

	} )();

})();