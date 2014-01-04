动态无限分级菜单 v2.0
by chenxingyu

文件说明
menu.js			纯JS版菜单文件
menu_js.js		纯JS版菜单加载函数

menu.xml		AJAX版菜单文件
menu_xml.js		AJAX版菜单加载函数

menu_func.js	共用函数库

使用方法
在<head>...</head>之间加入代码：
纯JS版
	<script type="text/javascript" src="menu.js"></script>
	<script type="text/javascript" src="menu_js.js"></script>
	<script type="text/javascript" src="menu_func.js"></script>
AJAX版
	<script type="text/javascript" src="ajax.js"></script>
	<script type="text/javascript" src="menu_xml.js"></script>
	<script type="text/javascript" src="menu_func.js"></script>

在<body>标签中加入代码：
onload="loadroot();"

在<body>...</body>之间适当位置加入代码：
<div id="navbar"></div>