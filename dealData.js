
		var xmldoc;   //定义变量
		function readXml() {
		var url = "index.xml";
		if(window.ActiveXObject) {   //判断是否为IE
			xmldoc = new ActiveXObject("Microsoft.XMLDOM");
			xmldoc.onreadystatechange = function() {
				if(xmldoc.readyState == 4) {
					display(xmldoc);
				}
			}
		xmldoc.load(url);
		}
		else if(document.implementation&&document.implementation.createDocument) {   //判断是否为Mozilla
			xmldoc = document.implementation.createDocument("","",null);
			xmldoc.onload = function() {
				xmldoc.onload = display(xmldoc);
				}
		xmldoc.load(url);
			}
		}

		function display() {
			var nameNode,numNode,telNode,displayText;
			var rootNode,firstNode;
			rootNode = xmldoc.documentElement;  //获取根节点
			firstNode = rootNode.firstChild;    //访问根节点下的第一个节点
			nameNode = firstNode.firstChild;    //获取name元素
			numNode = nameNode.nextSibling;     //获取name元素的兄弟元素->num元素
			telNode = numNode.nextSibling;      //获取tel元素
			//实现字符串的拼接，输出XML文档中的数据
			displayText = "姓名:" + nameNode.firstChild.nodeValue + "<br>" +
						"编号:" + numNode.firstChild.nodeValue + "<br>" +
						"电话:" + telNode.firstChild.nodeValue;
			return displayText;
		}

		readXml();

