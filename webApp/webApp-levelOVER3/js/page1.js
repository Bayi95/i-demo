window.onload = function() {
	var screenWid = document.documentElement.offsetWidth || document.body.offsetWidth;
	var nowWid = (screenWid / 640) * 100;
	var oHtml = document.getElementsByTagName("html")[0];
	oHtml.style.fontSize = nowWid + "px";
	//------------------------------------
	function draw(id) {
		var canvas = document.getElementById(id);
		if(canvas == null)
			return false;
		var ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.moveTo(75, 40);
		ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
		ctx.bezierCurveTo(20, 25, 22, 62.5, 22, 55);
		ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
		ctx.bezierCurveTo(110, 102, 130, 80, 128, 55);
		ctx.bezierCurveTo(128, 55, 130, 25, 100, 25);
		ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
		var gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 150);
		gradient.addColorStop(0, "rgba(244,28,285,0.5)");
		gradient.addColorStop(1, "rgba(255,255,255,1)");
		ctx.fillStyle = gradient;
		ctx.fill();
	}
	draw("myCanvas");
}