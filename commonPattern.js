;(function() {
	/**
	 * @description 星级评分插件，该组建依赖于FSL.js基础库。设置不同的评分变化，星的状态发生变化，根据评分的高低，判断是哭脸还是笑脸，并可在设置评分后执行回调函数；也可通过参数传入评分并禁用鼠标时间，仅展示一个评分。
	 * @param {Object} options 参数对象
	 * @param {Element} options.parentObj 星的父节点
	 * @param {Number} [options.cryNum=2] 表示当小于cryNum(包括)时，显示哭脸,默认为2
	 * @param {String} [options.smile='smile'] 笑脸的class样式，默认为"smile"
	 * @param {String} [options.cry='cry'] 哭脸的class样式，默认为"cry"
	 * @param {Number} [options.nowScore] 当前评分，初始化时可根据该参数设置星的状态
	 * @param {Boolean} [options.mouseAble=true] 鼠标移入或移出星上时是否产生交互，默认为true
	 * @param {Function} [options.enterFun=function(){}] 当options.mouseAble==true的情况下，鼠标移入星时的回调函数，默认以当前星代表的分数为回调函数；默认为一空函数
	 * @param {Function} [options.leaveFun=function(){}] 当options.mouseAble==true的情况下，鼠标移出星时的回调函数，默认以当前星代表的分数为回调函数；默认为一空函数
	 * @param {Function} [options.setScoreFun=function(){}] 根据当前评分，设置星的状态并执行回调函数，默认以当前分数this.nowScore作为参数,默认为一空函数
	 * @example
	 *  var goods_rate = FS.star({
			parentObj: FS.query('#goods_rate'),
			setScoreFun: function(nowScore){
				var state = {
					"1": "很不满意",
					"2": "不满意",
					"3": "一般",
					"4": "满意",
					"5": "很满意"
				}
				var pjObj = FS.query('#goods_score');
				FS.html(pjObj, state[nowScore])
			}
		});
		var kuaidi = FS.star({
			parentObj: FS.query('#kuaidi_rate'),
			nowScore: 4,
			mouseAble: false,
			setScoreFun: function(nowScore){
				var state = {
					"1": "很不满意",
					"2": "不满意",
					"3": "一般",
					"4": "满意",
					"5": "很满意"
				}
				var pjObj = FS.query('#kuaidi_score');
				FS.html(pjObj, state[nowScore])
			}
		});
	 */
	var Star = function(options) {
			// 直接返回一个对应的实例
			return new Star.main(options)
		}
	Star.main = function(options) {
		// 将this赋给self，方便混淆
		var self = this;
		// 取出参数列表
		self.parentObj = options.parentObj;
		self.cryNum = options.cryNum || 2;
		self.smile = options.smile || 'smile';
		self.cry = options.cry || 'cry';
		self.nowScore = options.nowScore ? options.nowScore : 5;
		self.mouseAble = options.mouseAble === false ? false : true;
		// 如果允许鼠标交互，则定义如下参数
		if(self.mouseAble) {
			self.enterFun = options.enterFun ||
			function() {};
			self.leaveFun = options.leaveFun ||
			function() {}
		}
		self.setScoreFun = options.setScoreFun ||
		function() {};
		// 根据parentObj计算出星节点数组
		self.allStar = FS.makeArray(self.parentObj.children);
		// 实例创建即执行
		self.init()
	}
	Star.main.prototype = {
		constructor: Star.main,
		init: function() {
			var mine = this;
			var allStar = mine.allStar,
				length = allStar.length,
				cryNum = mine.cryNum,
				mouseAble = mine.mouseAble;

			// 当鼠标移入星不产生交互，则根据this.nowScore设置星的状态，并执行回调函数	
			mine.setMode(mine.nowScore);
			mine.setScoreFun(mine.nowScore);

			// 当允许鼠标交互，则定义交互模块，否则只设置星的状态
			if(mouseAble) {
				// 给星节点数组添加事件
				allStar.each(function(o, i) {
					// 鼠标移入和移出，星做出相应的变化
					FS.hover(o, function() {
						// 当前索引之后的节点设为正常星
						var normalObj = allStar.slice(i + 1);
						mine.setNormal(normalObj);
						// 鼠标移到星上，根据当前索引数给星加笑脸或哭脸
						mine.setMode(i + 1);

						// 鼠标移入的回调函数
						mine.enterFun(i + 1)
					}, function() {
						var nowScore = mine.nowScore;
						// mouseleave 根据nowScore设置笑脸或哭脸
						mine.setMode(nowScore);

						// 设置正常星
						if(nowScore) {
							var normalObj = allStar.slice(nowScore);
							mine.setNormal(normalObj)
						} else {
							mine.setNormal(allStar)
						}

						// 鼠标一开后的回调函数
						mine.leaveFun(mine.nowScore)
					})

					// 鼠标点击星，改变this.nowScore,并改变状态
					FS.addEvent(o, 'click', function(e) {
						mine.nowScore = i + 1;
						// 设置
						mine.setScoreFun(mine.nowScore)
					})
				})
			}
		},
		setMode: function(num) { // 跟据当前星数设置星的状态
			var mine = this,
				allStar = mine.allStar;
			// 分数为0，则全部设置为正常状态
			if(!num) {
				mine.setNormal(allStar);
				return
			}
			var cryNum = mine.cryNum;
			// 排除scoreNum=0后根据当前分数截取星
			var arr = allStar.slice(0, num);
			if(num > cryNum) {
				this.setSmile(arr)
			} else {
				this.setCry(arr)
			}
		},
		setNormal: function(arr) { // 将笑脸或哭脸设置成正常的星
			if(!arr[0]) return;
			arr.each(function(o) {
				FS.setClass(o, '')
			})
		},
		setSmile: function(arr) { // 将节点数组中的星设置为笑脸
			if(!arr[0]) return;
			var smileClass = this.smile;
			arr.each(function(o) {
				FS.setClass(o, smileClass)
			})
		},
		setCry: function(arr) { // 将节点数组中的星设置为哭脸
			if(!arr[0]) return;
			var cryClass = this.cry;
			arr.each(function(o) {
				FS.setClass(o, cryClass)
			})
		}
	}

})();