
		
		function readXml() {
		
		var url = "index.xml";
		if(window.ActiveXObject) {   //判断是否为IE
			var xmldoc = new ActiveXObject("Microsoft.XMLDOM");
			xmldoc.load(url);
			xmldoc.onreadystatechange = function() {
				if(xmldoc.readyState == 4) {
					display(xmldoc);
				}
			}
		
			console.log("这里是ie"+xmldoc);
		}
		else if(document.implementation&&document.implementation.createDocument) {   //判断是否为Mozilla
			var xmldoc = document.implementation.createDocument("","",null);
			xmldoc.onload = function() {
				console.log("onload是否会执行呢");
				xmldoc.onload = display(xmldoc);
				
				}
		try{
			xmldoc.load(url); //chrome浏览器在这一行会报错，document对象没有load()方法。
			}catch(e){ //捕捉异常
			//webkit BUG,chrome etc.
			var xmlAjax = new net.ajaxRequest("index.xml",display);
			}
			
			
		
			}
		}

		function display() {
			var xmldoc = this.req.responseText;
			console.log("此处是否有执行到呢？没错，我是display()");
			var displayText;
			var rootNode,firstNode;
			rootNode = xmldoc.documentElement;  //获取根节点
			firstNode = rootNode.children(0);    //访问根节点下的第一个节点
			for(var i=0;i<rootNode.children.length;i++)
			{
				displayText = displayText + firstNode.children(i).nodeValue\n;
			}
			return displayText;
		}
		
		readXml();
		

