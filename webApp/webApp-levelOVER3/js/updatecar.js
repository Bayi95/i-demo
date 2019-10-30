window.onload=function(){
	var screenWid = document.documentElement.offsetWidth || document.body.offsetWidth;
		var nowWid = (screenWid / 640) * 100;
		var oHtml = document.getElementsByTagName("html")[0];
		oHtml.style.fontSize = nowWid + "px";
}
