function loadroot() {
	$("navbar").innerHTML = "[正在加载菜单...]";
	if(typeof x_menu == "object") {
		var html = "";
		for(var i = 0; i < x_menu.length; i++) {
			if(typeof x_menu[i][1] == "string") {
				html += "<a id=\"menu_"+(i+1)+"\" href=\""+x_menu[i][1]+"\" target=\""+((x_menu[i].length >= 3 && typeof x_menu[i][2] == "string") ? x_menu[i][2] : "")+"\">"+x_menu[i][0]+"</a><img alt=\"\" src=\"images/nav_line.gif\" />";
			} else if(typeof x_menu[i][1] == "object") {
				html += "<a id=\"menu_"+(i+1)+"\" onclick=\"showroot(this.id)\" onmouseover=\"moveroot(this.id)\" href=\"javascript:\">"+x_menu[i][0]+"</a><img alt=\"\" src=\"images/nav_line.gif\" />";
				loadchld("menu_"+(i+1), x_menu[i]);
			}
		}
		$("navbar").innerHTML = html;
	}
}

function loadchld(parent, nodes) {
	if(typeof nodes == "object") {
		var html = "";
		html += "<ul>";
		for(var i = 1; i < nodes.length; i++) {
			if(typeof nodes[i][1] == "string") {
				html += "<li><a id=\""+parent+"_"+(i+1)+"\" onmouseover=\"showchld(this.id)\" href=\""+nodes[i][1]+"\" target=\""+((nodes[i].length >= 3 && typeof nodes[i][2] == "string") ? nodes[i][2] : "")+"\">"+nodes[i][0]+"</a></li>";
			} else if(typeof nodes[i][1] == "object") {
				html += "<li><a id=\""+parent+"_"+(i+1)+"\" onmouseover=\"showchld(this.id)\" href=\"javascript:\" style=\"background:url('images/icon_dot_cmenu.gif') transparent no-repeat 2px 8px\">"+nodes[i][0]+"</a></li>";
				loadchld(parent+"_"+(i+1), nodes[i]);
			}
		}
		html += "</ul>";
		var div = document.createElement("div");
		div.id = parent+"_m";
		div.className = "navmenu";
		div.style.display = "none";
		div.innerHTML = html;
		if(is_ie) {
			div.style.filter += "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=90)";
			div.style.filter += "progid:DXImageTransform.Microsoft.shadow(direction=135,color=#000000,strength=2)";
		} else {
			div.style.opacity = 0.9;
		}
		document.body.appendChild(div);
	}
}