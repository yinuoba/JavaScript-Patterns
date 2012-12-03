;(function() {
	// 定义父构造函数
	function CarMaker() {}

	// 扩展构造函数
	CarMaker.prototype.drive = function() {
		return 'Hi, Hoogle, I have ' + this.doors + ' doors'
	}

	// 静态工厂方法
	CarMaker.factory = function(type) {
		// 如果构造函数不存在，则抛出错误
		if(typeof CarMaker[type] !== 'function') {
			throw {
				name: "Error",
				message: type + "does not exist!"
			}
		}
		// 在这里，构造函数是已知存在的，我们使得原型继承父类，但只继承一次
		if (typeof CarMaker[type].prototype.drive !== 'function') {
			CarMaker[type].prototype = new CarMaker();
		}
		//创建一个新的实例
		var newcar = new CarMaker[type]();
		return newcar
	};

	// 定义特定的汽车制造商
	CarMaker.Compat = function() {
		this.doors = 4
	}

	CarMaker.Convertible = function() {
		this.doors = 5
	}

	CarMaker.SUV = function() {
		this.doors = 28
	}

	// 创建实例
	var corolla = CarMaker.factory('Compat');
	var sostice = CarMaker.factory('Convertible');
	var cherokee = CarMaker.factory('SUV');

	console.info(corolla.drive());	// Hi, Hoogle, I have 4 doors
	console.info(sostice.drive());	// Hi, Hoogle, I have 5 doors
	console.info(cherokee.drive());	//Hi, Hoogle, I have 28 doors

})();