;(function() {
	/**
	 * 先声明一个函数。
	 * 注意执行的时候不能直接花括号后面加括号执行，因为解析器会把它当作一个函数声明。
	 * @param  {String} msg 
	 * @return {[type]}
	 */
	function common(msg) {
		console.info(msg + "先声明函数，再调用！")
	}

	/**
	 * 常用执行方式。先声明函数，再用一条语句，并在方法名后加()
	 */
	common("常用调用方式，");

	/**
	 * 通过call调用，普通函数跟构造函数，均可以通过call调用
	 */
	common.call(null, "常用调用方式，");

	/**
	 * 通过apply调用，普通函数跟构造函数，均可以通过apply调用
	 */
	common.apply(null, ["常用调用方式，"]);




	/**
	 * 将函数转化为表达式
	 * 将函数转化为表达式的方式有很多，括弧()和JavaScript的&&，异或，逗号，+，-，~，!，new，void等操作符可在函数表达式和函数声明之间消除歧义
	 */
	
	/**
	 * 函数外加一个括号，将其转化为函数表达式
	 * @param  {String} msg 参数
	 * @return {[type]}   [description]
	 */
	 (function(msg) {
	 	console.info(msg + "先声明函数，再调用！")
	 })("常用调用方式，");

	/**
	 * 函数后紧接着一个括号，并在外层再套一个括号，将其转化为函数表达式并执行
	 */
	(function(msg) {
		console.info(msg + "先声明函数，再调用！")
	} ("常用调用方式，"));

	/**
	 * 命名函数表达式，可直接在后面加括号并传入参数（如果有参数）
	 * @param  {[String]} msg [description]
	 * @return {[type]}     [description]
	 */
	var common1 = function common(msg) {
		console.info(msg + "先声明函数，再调用！")
	} ("常用调用方式，");

	/**
	 * 匿名函数表达式，可直接在后面加括号并传入参数（如果有参数）
	 * @param  {[String]} msg [description]
	 * @return {[type]}     [description]
	 */
	var commonn2 = function(msg) {
		console.info(msg + "先声明函数，再调用！")
	} ("常用调用方式，");

	/**
	 * 通过void操作符，将其转化为表达式，后接一括号，让其执行
	 * @param  {[String]} msg [description]
	 * @return {[type]}     [description]
	 */
	void function(msg) {
		console.info(msg + "先声明函数，再调用！")
	} ("常用调用方式，");

	/**
	 * 通过new操作符，将其转化为表达式，后接一括号，让其执行
	 * @param  {String} msg [description]
	 * @return {[type]}     [description]
	 */
	new function(msg) {
		console.info(msg + "先声明函数，再调用！")
	} ("常用调用方式，");

	/**
	 * 通过&&操作符，将其转化为表达式，后接一括号，让其执行
	 * @param  {String} msg [description]
	 * @return {[type]}     [description]
	 */
	true && function(msg) {
		console.info(msg + "先声明函数，再调用！")
	} ("常用调用方式，");

	/**
	 * 通过逗号操作符，将其转化为表达式，后接一括号，让其执行
	 * 前面加一分号是为了将其与前面语句区分开来
	 * @param  {String} msg [description]
	 * @return {[type]}     [description]
	 */
	; true, function(msg) {
		console.info(msg + "先声明函数，再调用！")
	} ("常用调用方式，");

	/**
	 * 通过加号操作符，将其转化为表达式，后接一括号，让其执行
	 * 前面加一分号是为了将其与前面语句区分开来
	 * @param  {String} msg [description]
	 * @return {[type]}     [description]
	 */
	; +function(msg) {
		console.info(msg + "先声明函数，再调用！")
	} ("常用调用方式，");

	/**
	 * 通过减号操作符，将其转化为表达式，后接一括号，让其执行
	 * 前面加一分号是为了将其与前面语句区分开来
	 * @param  {String} msg [description]
	 * @return {[type]}     [description]
	 */
	; -function(msg) {
		console.info(msg + "先声明函数，再调用！")
	} ("常用调用方式，");

	/**
	 * 通过~操作符，将其转化为表达式，后接一括号，让其执行
	 * 前面加一分号是为了将其与前面语句区分开来
	 * @param  {String} msg [description]
	 * @return {[type]}     [description]
	 */
	; ~function(msg) {
		console.info(msg + "先声明函数，再调用！")
	} ("常用调用方式，");

	/**
	 * 通过!操作符，将其转化为表达式，后接一括号，让其执行。如果返回的是布尔类型，不要用这种方式执行,
	 * 前面加一分号是为了将其与前面语句区分开来
	 * @param  {String} msg [description]
	 * @return {[type]}     [description]
	 */
	; !function(msg) {
		console.info(msg + "先声明函数，再调用！")
	} ("常用调用方式，");

}())