
		
		function readXml() {
		var xmldoc,distext;
		var url = "index.xml";
		if(window.ActiveXObject) {   //判断是否为IE
			xmldoc = new ActiveXObject("Microsoft.XMLDOM");
			xmldoc.load(url);
			xmldoc.onreadystatechange = function() {
				if(xmldoc.readyState == 4) {
					distext = display(xmldoc);
					return distext;
				}
			}
		
			console.log("这里是ie"+xmldoc);
		}
		else if(document.implementation&&document.implementation.createDocument) {   //判断是否为Mozilla
			xmldoc = document.implementation.createDocument("","",null);
			console.log("11111");
			xmldoc.onload = function() {
				console.log("onload是否会执行呢");
				distext = display(xmldoc);
				return distext;
				
				}
		try{
			xmldoc.load(url); //chrome浏览器在这一行会报错，document对象没有load()方法。
			}catch(e){ //捕捉异常
			
			
			function get_xml() {
				return this.req.responseXML;
				
			}
			var getxml = new net.ajaxRequest("index.xml",get_xml).onReadyState();
			console.log(getxml);
			
			}
		
			}
		}
		
		function display(xml) {

			console.log("此处是否有执行到呢？没错，我是display()");
			console.log(xml);
			var displayText;
			var nameNode,numNode,telNode;
			
			nameNode = xml.getElementsByTagName("name");    
			numNode = xml.getElementsByTagName("num"); 
			telNode = xml.getElementsByTagName("tel"); 
			displayText = "姓名：" + nameNode[1].nodeValue + 
				"\n编号：" + numNode[1].nodeValue + 
				"\n电话：" + telNode[1].nodeValue;
			
			return displayText;
		}
		
		readXml();
		

