function loadroot() {
	$("navbar").innerHTML = "[正在加载菜单...]";
	var x = new Ajax("XML", null);
	var f = function(aj) {
		var ajitem = aj.selectNodes("item");
		var html = "";
		for(var i = 0; i < ajitem.length; i++) {
			var mitem = ajitem.item(i)
			vname = mitem.selectSingleNode('vname').firstChild.nodeValue;
			vlink = "";
			vtagt = "";
			if(mitem.selectNodes('vlink').length > 0) vlink = mitem.selectSingleNode('vlink').firstChild.nodeValue;
			if(mitem.selectNodes('vtagt').length > 0) vtagt = mitem.selectSingleNode('vtagt').firstChild.nodeValue;
			vchld = mitem.selectNodes('vchld');
			if(vchld.length == 0) {
				html += "<a id=\"menu_"+(i+1)+"\" href=\""+vlink+"\" target=\""+vtagt+"\">"+vname+"</a><img alt=\"\" src=\"images/nav_line.gif\" />";
			} else {
				html += "<a id=\"menu_"+(i+1)+"\" onclick=\"showroot(this.id)\" onmouseover=\"moveroot(this.id)\" href=\"javascript:\">"+vname+"</a><img alt=\"\" src=\"images/nav_line.gif\" />";
				loadchld("menu_"+(i+1), vchld);
			}
		}
		$("navbar").innerHTML = html;
	}
	var pm = function(n, p) {
	
	}
	x.get("menu.xml", "root", f, true);
}

function loadchld(parent, nodes) {
	if(nodes) {
		var menuhtml = "";
		menuhtml += "<ul>";
		for(var k = 0; k < nodes.length; k++) {
			vname = nodes.item(k).selectSingleNode('vname').firstChild.nodeValue;
			vlink = "";
			vtagt = "";
			if(nodes.item(k).selectNodes('vlink').length > 0) vlink = nodes.item(k).selectSingleNode('vlink').firstChild.nodeValue;
			if(nodes.item(k).selectNodes('vtagt').length > 0) vtagt = nodes.item(k).selectSingleNode('vtagt').firstChild.nodeValue;
			vchld = nodes.item(k).selectNodes('vchld');
			if(vchld.length == 0) {
				menuhtml += "<li><a id=\""+parent+"_"+(k+1)+"\" onmouseover=\"showchld(this.id)\" href=\""+vlink+"\" target=\""+vtagt+"\">"+vname+"</a></li>";
			} else {
				menuhtml += "<li><a id=\""+parent+"_"+(k+1)+"\" onmouseover=\"showchld(this.id)\" href=\"javascript:\" style=\"background:url('images/icon_dot_cmenu.gif') transparent no-repeat 2px 8px\">"+vname+"</a></li>";
				loadchld(parent+"_"+(k+1), vchld);
			}
			
		}
		menuhtml += "</ul>";
		var div = document.createElement("div");
		div.id = parent+"_m";
		div.className = "navmenu";
		div.style.display = "none";
		div.innerHTML = menuhtml;
		if(is_ie) {
			div.style.filter += "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=90)";
			div.style.filter += "progid:DXImageTransform.Microsoft.shadow(direction=135,color=#000000,strength=2)";
		} else {
			div.style.opacity = 0.9;
		}
		document.body.appendChild(div);
	}
}