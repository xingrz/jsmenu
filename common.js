var userAgent = navigator.userAgent.toLowerCase();
var is_webtv = userAgent.indexOf('webtv') != -1;
var is_kon = userAgent.indexOf('konqueror') != -1;
var is_mac = userAgent.indexOf('mac') != -1;
var is_saf = userAgent.indexOf('applewebkit') != -1 || navigator.vendor == 'Apple Computer, Inc.';
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko' && !is_saf) && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ns = userAgent.indexOf('compatible') == -1 && userAgent.indexOf('mozilla') != -1 && !is_opera && !is_webtv && !is_saf;
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera && !is_saf && !is_webtv) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);

function $(id) {
	return document.getElementById(id);
}

Array.prototype.indexOf = function(substr, start) {
	var ta = start != null ? this.slice(start) : this;
	var rt = start != null ? start : 0;
	var str = "\0"+ta.join("\0")+"\0";
	var t = str.indexOf("\0"+substr+"\0");
	if(t == -1) return -1;
	rt += str.slice(0, t).replace(/[^\0]/g, "").length;
	return rt;
}

Array.prototype.lastIndexOf = function(substr, start) {
	var ta = start != null ? this.slice(start) : this;
	var rt = start != null ? start : 0;
	ta = ta.reverse();
	var str = "\0"+ta.join("\0")+"\0";
	var t = str.indexOf("\0"+substr+"\0");
	if(t == -1) return -1;
	rt += str.slice(t).replace(/[^\0]/g, "").length - 2;
	return rt;
}

Array.prototype.remove = function(dx) {
	if(isNaN(dx) || dx > this.length) return false;
	this.splice(dx, 1);
}
