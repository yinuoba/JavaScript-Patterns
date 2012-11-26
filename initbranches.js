;(function(){
	/**
	 * 初始化分支是一种优化模式，当知道某个条件在整个生命周期内都不会发生变化时，仅对该条件测试一次。
	 */
	
	// 一般写法
	var util = {
		addEvent: function(el, type, fn) {
			if(window.addEventListener{
				el.addEventListener(type, fn, false)
			}else if(document.attachEvent) {
				el.attachEvent('on' + type, fn);
			}else{
				el['on' + type] = fn;
			}
		},
		removeEvent: function() {
			// 类似addEvent
		}
	}

	// 优化写法。先定义接口，再实现借口，达到了只需验证一次的目的
	var util = {
		addEvent: null,
		removeEvent: null
	};
	if(window.addEventListener {
		util.addEvent = function(el, type, fn) {
			el.addEventListener(type, fn, false)
		};
		util.removeEvent = function(el, type, fn) {
			el.removeEventListener(type, fn, false)
		}
	} else if(document.attachEvent) {
		util.addEvent = function(el, type, fn) {
			el.attachEvent('on' + type, fn)
		};
		util.removeEvent = function(el, type, fn) {
			el.detachEvent('on' + type, fn)
		}
	} else {
		util.addEvent = function(el, type, fn) {
			el['on' + type] = fn;
		};
		util.removeEvent = function(el, type, fn) {
			el['on' + type] = null;
		}
	}
}());