;(function() {
	/**
	 * bind方法的实现，ECMAScript5中已经实现改方法
	 * @return {function} 返回一个function，可通过bind传入参数，bind方法中第二个方法开始，为返回function的参数
	 */
	Function.prototype.bind = function(obj) {
		if(typeof Function.prototype.bind === 'function'){
			if (arguments.length < 2 && FS.isUndefined(arguments[0])) return this;
			var fn = this,
				slice = Array.prototype.slice,
				args = slice.call(arguments, 1);
			// 返回一function，以obj为this，bind中传入的参数加上当前function中参数为参数
			return function(){
				// 后面继续连上arguments，给返回的function传入参数
				return fn.apply(obj, args.concat(slice.call(arguments)))
			}
		}
	};
	var nameobj = {
		name: "Hoogle",
		getName: function(m) {
			return this.name + m
		}
	};

	var ageobj = {
		name: "yinuoba",
		age: 24
	};

	var getname = nameobj.getName.bind(ageobj);
	console.info(typeof getname);

	var getname = nameobj.getName.bind(ageobj, ", softcy");
	console.info(getname());

})();