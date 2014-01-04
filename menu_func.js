var root_exp = "";
var root_tmr;
function showroot(id) {
	if($(id+"_m")) {
		if($(id+"_m").style.display != "block") {
			$(id+"_m").style.left = $(id).offsetLeft - 20;
			$(id+"_m").style.top = 140;
			$(id+"_m").style.width = 160;
			$(id+"_m").style.display = "block";
			$(id+"_m").onmouseout = function() {
				root_tmr = setTimeout("hideroot('"+id+"');", 200);
			}
			$(id+"_m").onmouseover = function() {
				clearTimeout(root_tmr);
			}
			root_exp = id;
		} else {
			hideroot(id);
		}
	}
}

function hideroot(id) {
	if($(id+"_m")) {
		hidechld(id);
		root_exp = "";
	}
}

function moveroot(id) {
	if(root_exp != "" && $(root_exp) && root_exp != id) {
		clearTimeout(root_tmr);
		hideroot(root_exp);
		$(id+"_m").style.left = $(id).offsetLeft - 20;
		$(id+"_m").style.top = 140;
		$(id+"_m").style.width = 160;
		$(id+"_m").style.display = "block";
		$(id+"_m").onmouseout = function() {
			root_tmr = setTimeout("hideroot('"+id+"');", 200);
		}
		$(id+"_m").onmouseover = function() {
			clearTimeout(root_tmr);
		}
		root_exp = id;
	}
}

function showchld(id) {
	if($(id+"_m")) {
		hidechld(getparent(id), true);
		$(id).style.background = "url('images/icon_dot_cmenu2.gif') transparent #EEEEEE no-repeat 2px 8px";
		$(id).style.color = "#000000";
		$(id+"_m").style.left = $(getparent(id)+"_m").offsetLeft + 160;
		$(id+"_m").style.top = $(getparent(id)+"_m").offsetTop + $(id).offsetTop - 1;
		$(id+"_m").style.width = 160;
		$(id+"_m").style.zIndex = 100 + $(getparent(id)+"_m").style.zIndex + 1;
		$(id+"_m").style.display = "block";
		$(id+"_m").onmouseout = function() {
			root_tmr = setTimeout("hideroot('"+getroot(id)+"');", 200);
		}
		$(id+"_m").onmouseover = function() {
			clearTimeout(root_tmr);
		}
	} else {
		hidechld(getparent(id), true);
	}
}

function hidechld(id, n) {
	if($(id+"_m")) {
		if(!n) {
			$(id+"_m").style.display = "none";
			if(id != getroot(id)) {
				$(id).style.background = "url('images/icon_dot_cmenu.gif') transparent no-repeat 2px 8px";
				$(id).style.color = "";
			}
		}
		var p = $(id+"_m").getElementsByTagName("ul")[0].getElementsByTagName("li")
		for(var y = 0; y < p.length; y++) {
			if($(p[y].getElementsByTagName("a")[0].id+"_m")) {
				$(p[y].getElementsByTagName("a")[0].id+"_m").style.display = "none";
				hidechld(p[y].getElementsByTagName("a")[0].id);
			}
		}
	}
}

function getparent(id) {
	var s = id.split("_");
	var d = "";
	for(var i = 0; i < s.length - 2; i++) {
		d += s[i] + "_";
	}
	d += s[s.length - 2];
	return d;
}

function getroot(id) {
	var s = id.split("_");
	return s[0]+"_"+s[1];
}