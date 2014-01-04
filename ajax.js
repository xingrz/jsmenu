/*
AJAX Class
Hacked by chenxingyu
2008/05/27
*/
var Ajaxs = new Array();
function Ajax(recvType) {
	var aj = new Object();
	aj.targetUrl = "";
	aj.sendString = "";
	aj.recvType = recvType ? recvType : "XML";
	aj.resultHandle = null;

	aj.createXMLHttpRequest = function() {
		var request = false;
		if(window.XMLHttpRequest) {
			request = new XMLHttpRequest();
			if(request.overrideMimeType) request.overrideMimeType("text/xml");
		} else if(window.ActiveXObject) {
			var versions = ["Microsoft.XMLHTTP", "Msxml2.XMLHTTP.7.0", "Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP.2.6", "Msxml2.XMLHTTP"];
			for(var i = 0; i < versions.length; i++) {
				try {
					request = new ActiveXObject(versions[i]);
					if(request) {
						return request;
					}
				} catch(e) {}
			}
		}
		return request;
	}

	aj.XMLHttpRequest = aj.createXMLHttpRequest();

	aj.processHandle = function() {
		if(aj.XMLHttpRequest.readyState == 4) {
			if(aj.XMLHttpRequest.status == 200) {
				for(k in Ajaxs) {
					if(Ajaxs[k] == aj.targetUrl) Ajaxs[k] = null;
				}
				if(aj.recvType == "HTML") {
					aj.resultHandle(aj.XMLHttpRequest.responseText, aj);
				} else if(aj.recvType == "XML") {
					aj.resultHandle(aj.XMLHttpRequest.responseXML.selectSingleNode("root"), aj);
				}
			}
		}
	}

	aj.get = function(targetUrl, resultHandle) {
		if(Ajaxs.indexOf(targetUrl) != -1) {
			return false;
		} else {
			Ajaxs.push(targetUrl);
		}
		aj.targetUrl = targetUrl;
		aj.XMLHttpRequest.onreadystatechange = aj.processHandle;
		aj.resultHandle = resultHandle;
		if(window.XMLHttpRequest) {
			aj.XMLHttpRequest.open("GET", aj.targetUrl);
			aj.XMLHttpRequest.send(null);
		} else {
			aj.XMLHttpRequest.open("GET", targetUrl, true);
			aj.XMLHttpRequest.send();
		}
	}

	aj.post = function(targetUrl, sendString, resultHandle) {
		if(Ajaxs.indexOf(targetUrl) != -1) {
			return false;
		} else {
			Ajaxs.push(targetUrl);
		}
		aj.targetUrl = targetUrl;
		aj.sendString = sendString;
		aj.XMLHttpRequest.onreadystatechange = aj.processHandle;
		aj.resultHandle = resultHandle;
		aj.XMLHttpRequest.open("POST", targetUrl);
		aj.XMLHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		aj.XMLHttpRequest.send(aj.sendString);
	}
	return aj;
}