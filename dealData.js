
		
		function readXml() {
		var xmldoc;
		var url = "index.xml";
		if(window.ActiveXObject) {   //判断是否为IE
			xmldoc = new ActiveXObject("Microsoft.XMLDOM");
			xmldoc.load(url);
			xmldoc.onreadystatechange = function() {
				if(xmldoc.readyState == 4) {
					display(xmldoc);
				}
			}
		
			console.log("这里是ie"+xmldoc);
		}
		else if(document.implementation&&document.implementation.createDocument) {   //判断是否为Mozilla
			xmldoc = document.implementation.createDocument("","",null);
			console.log("11111");
			xmldoc.onload = function() {
				console.log("onload是否会执行呢");
				xmldoc.onload = display(xmldoc);
				
				}
		try{
			xmldoc.load(url); //chrome浏览器在这一行会报错，document对象没有load()方法。
			}catch(e){ //捕捉异常
			//webkit BUG,chrome etc.
			var xmlAjax = new net.ajaxRequest("index.xml",display(xmldoc));
			}
		
			}
		}
		
		function display(xmldoc) {
			if(xmldoc.getElementsByTagName("name") == null) {
				xmldoc = this.req.responseXML;
				console.log("是否载入？");
			}
			console.log("此处是否有执行到呢？没错，我是display()");
			var displayText;
			var nameNode,numNode,telNode;
			
			nameNode = xmldoc.getElementsByTagName("name");    
			numNode = xmldoc.getElementsByTagName("num"); 
			telNode = xmldoc.getElementsByTagName("tel"); 
			displayText = "姓名：" + nameNode[1].nodeValue + 
				"\n编号：" + numNode[1].nodeValue + 
				"\n电话：" + telNode[1].nodeValue;
			
			return displayText;
		}
		
		readXml();
		

