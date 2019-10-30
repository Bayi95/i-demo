window.onload = function() {
	var screenWid = document.documentElement.offsetWidth || document.body.offsetWidth;
	var nowWid = (screenWid / 640) * 100;
	var oHtml = document.getElementsByTagName("html")[0];
	oHtml.style.fontSize = nowWid + "px";
	//---------------------------------------------------------
	//抽奖转盘
	var prize = document.getElementById("btn");
	var arrow = document.getElementsByClassName("arrow")[0];
	var info = ["一等奖", "二等奖", "三等奖", "四等奖", "五等奖", "六等奖", "七等奖", "八等奖", "九等奖", "十等奖"];
	var color = [];
	var step = 2 * Math.PI / 10;
	var outerR = 180; //轮盘的大小
	var interR = 50; //内存空白圆的大小
	var beginAngle = 50; //旋转起来时默认开始旋转的度数，度数愈大旋转的初始速度愈大
	var radio = 0.95; //旋转速度衰减系数，影响旋转时间
	var t = null;
	for(var i = 0; i < 10; i++) {
		color.push(getColor());
	}
	prize.onclick = function() {
		prize.style.display = "none";
		canvas.style.display = "block";
		doFly();
	}
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	context.translate(250, 250);
	createArrow(context);
	init(context);

	function doFly() {
		if(t) {
			return false;
		}
		var step = beginAngle + Math.random() * 10;
		var angle = 0;
		t = setInterval(function() {
			step *= radio;
			if(step <= 0.1) {
				clearInterval(t);
				t = null;
				var pos = Math.ceil(angle / 36);
				var res = info[10 - pos];
				context.save();
				context.beginPath();
				context.font = "28px 微软雅黑";
				context.fillStyle = "#f00";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillText(res, 0, 0);
				context.restore();
			} else {
				context.clearRect(-250, -250, 500, 500);
				angle += step;
				if(angle > 360) {
					angle -= 360;
				}
				context.save();
				context.beginPath();
				context.rotate(angle * Math.PI / 180);
				init(context);
				context.restore();
				createArrow(context);
			}
		}, 100);
	};

	function createArrow(context) {
		context.save();
		context.beginPath();
		context.lineWidth = 5;
		context.moveTo(190, 0);
		context.lineTo(200, 15);
		context.lineTo(200, 5);
		context.lineTo(250, 5);
		context.lineTo(250, -5);
		context.lineTo(200, -5);
		context.lineTo(200, -15);
		context.closePath();
		context.fill();
		context.restore();
	}

	function init(context) {
		for(var i = 0; i < 10; i++) {
			context.save();
			context.beginPath();
			context.moveTo(0, 0);
			context.fillStyle = color[i];
			context.arc(0, 0, outerR, i * step, (i + 1) * step);
			context.fill();
			context.restore();
		}

		context.save();
		context.beginPath();
		context.fillStyle = "#fff";
		context.arc(0, 0, interR, 0, 2 * Math.PI);
		context.fill();
		context.restore();

		for(var i = 0; i < 10; i++) {
			context.save();
			context.beginPath();
			context.fillStyle = "#000";
			context.font = "20px 微软雅黑";
			context.textAlign = "center";
			context.textBaseline = "middle"; //canvas 文本对齐方式
			context.rotate(i * step + step / 2);
			context.fillText(info[i], (outerR + interR) / 2, 0);
			context.restore();
		}
	}

	function getColor() {
		var random = function() {
			return Math.floor(Math.random() * 255);
		}
		return "rgb(" + random() + "," + random() + "," + random() + ")";
	}
	//------------------------------------------------------------------------

}
$(function() {
	var list = $("#list");
	var p = [];
	var t = [];
	var n = Math.floor(Math.random() * 100);
	$.ajax({
		url: "http://datainfo.duapp.com/lottery/getsuerfr.php",
		type: "GET",
		dataType: "jsonp",
		success: function(res) {
			for(var i = n; i < n + 30; i++) {
				if(res[i].fruit == 1) {
					p.push(res[i].userID);
					t.push(res[i].timer);
					continue;
				}else if(res[i].fruit == 2) {
					p.push(res[i].userID);
					t.push(res[i].timer);
					continue;
				}else if(res[i].fruit == 3) {
					p.push(res[i].userID);
					t.push(res[i].timer);
					continue;
				}
				//console.log(res[i]);
			}
			//console.log(p[1]);
			for(var i = 0; i < 3; i++) {
				list.find("span").eq(i).html(p[i]);
				list.find("em").eq(i).html("时间：" + t[i]);
				//list.find("span").eq(i).html(p[i]);

			}

		}
	})
})