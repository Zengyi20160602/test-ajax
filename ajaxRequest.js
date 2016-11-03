var net = new Object();
net.ajaxRequest = function(url,onload,onerror,method,params){
	this.req = null;
	this.onload = onload;
	this.onerror = (onerror) ? onerror : this.defaltError;
	this.loadDate(url,method,params);
}
//编写用于初始化XMLHttpRequest对象并指定处理函数，最后发送HTTP请求的方法
net.ajaxRequest.prototype.loadDate = function(url,method,params){
	if (!method) {
		method = "GET";    //设置默认的请求方式为GET
	}
	if (window.XMLHttpRequest) {    //非IE浏览器
		this.req = new XMLHttpRequest();    //创建XMLHttpRequest对象（实例）
		console.log("创建XMLHttpRequest对象成功");
	}else if (window.ActiveXObject) {
		try{
			this.req = new ActivetryXObject("Microsoft.XMLHTTP");  //创建XMLHttpRequest对象
		}catch (e) {
			try {
				this.req = new ActivetryXObject("Msxml2.XMLHTTP");  //创建XMLHttpRequest对象
			}catch (e) {}
		}
	}
	if (this.req) {
		try {
			var loader = this;
			this.req.onreadystatechange = function() {

				net.ajaxRequest.onReadyState.call(loader);
			}
			this.req.open(method,url,true);  //建立对服务器的调用
			if (method=="POST") {
				//设置请求的内容类型
				this.req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				this.req.setRequestHeader("x-requested","ajax"); //设置请求的发出者

			}
			this.req.send(params);  //发送请求
		}catch (err) {
			this.onerror.call(this);  //调用错误处理函数
		}
	}
}
//重构回调函数
net.ajaxRequest.onReadyState = function() {
	var req = this.req;
	var ready = req.readyState; //获取请求状态
	
	if (ready==4){              //请求完成
		if(req.status==200){    //请求成功
			cosole.log("请求成功");
			console.log("服务器返回的字符串为："+req.responseText);
			this.onload.call(this);
		}else {
			this.onerror.call(this);    //调用错误处理函数
		}
	}
}
//重构默认的错误处理函数
net.ajaxRequest.prototype.defaltError = function() {
	alert("错误数据\n\n 回调状态:"+this.req.readyState + "\n 状态:" + this.req.status);
}
