;(function() {
	/**
	 * 沙箱模式
	 */
	// 定义Sandbox构造函数
	function Sandbox() {
		var args = Array.prototype.slice.call(arguments),
			// 最后一个是回调函数
			callback = args.pop(),
			// 模块可以作为一个数组传递，或作为单独的参数传递
			modules = (args[0] && typeof args[0] === 'string') ? args : args[0];

		// 确保该函数作为构造函数被调用
		if(!(this instanceof Sandbox)) {
			return new Sandbox(modules, callback);
		}

		// 向this添加属性
		this.a = 1;
		this.b = 2;

		// 给this添加模块
		// 如果指定模块名称或模块名称为*，则运用于所有模块
		if(typeof modules === 'undefined' || modules[0] === '*') {
			modules = [];
			for(i in Sandbox.modules) {
				if(Sandbox.modules.hasOwnProperty(i)) {
					modules.push(i)
				}
			}
		}

		// 初始化需要的模块
		for(var i = 0, length = modules.length; i < length; i++) {
			Sandbox.modules[modules[i]](this)
		}

		// 执行callback
		callback(this)
	}

	// 添加原型扩展
	Sandbox.prototype = {
		constructor: Sandbox,
		name: "Sandbox pattern",
		version: "1.0",
		getName: function() {
			return this.name
		}
	}



	// 定义模块
	Sandbox.modules = {};

	// 增加dom操作模块
	Sandbox.modules.dom = function(box) {
		box.getElement = function() {};
		box.getStyle = function() {};
		box.foo = "bar"
	};

	// 添加事件模块
	Sandbox.modules.event = function(box) {
		// 如果需要，就访问sandbox的原型
		// box.constructor.prototype.m = 'mmm';
		box.attachEvent = function() {};
		box.detachEent = function() {}
	};

	// 添加ajax模块
	Sandbox.modules.ajax = function(box) {
		box.makeRequest = function() {};
		box.getResponse = function() {}
	};


	// 运用沙箱 1
	new Sandbox(function(box) {
		console.info(box)
	});

	// 运用沙箱 2
	Sandbox(['dom', 'event', 'ajax'], function(box) {
		console.info(box)
	});

	// 运用沙箱 3
	Sandbox('dom', 'event', 'ajax', function(box) {
		console.info(box)
	});

	// 运用沙箱 4
	Sandbox('*', function(box) {
		console.info(box)
	});

	// 运用沙箱 5
	Sandbox(function(box) {
		console.info(box)
	});

	// 运用沙箱 6
	Sandbox('dom', 'event', 'ajax', function(box) {
		// 使用dom和事件来运行
		Sandbox('ajax', function(box) {
			// 这里的box与外部的box不一样
		})
	})
})();