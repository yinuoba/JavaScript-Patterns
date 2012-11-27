/**
 * 即时对象初始化模式
 * 可直接调用对象内部的方法
 */
;({
	maxWidth: 800,
	maxHeight: 600,
	gimmeMax: function() {
		return this.maxWidth + "X" + this.maxHeight
	},
	innt: function() {
		console.info(this.gimmeMax());
		// 方便链式调用
		return this
	}
}).init();