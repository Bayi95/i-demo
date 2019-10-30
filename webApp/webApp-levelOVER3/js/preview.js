window.onload = function() {
		var screenWid = document.documentElement.offsetWidth || document.body.offsetWidth;
		var nowWid = (screenWid / 640) * 100;
		var oHtml = document.getElementsByTagName("html")[0];
		oHtml.style.fontSize = nowWid + "px";
		//----------------------------------------
		var page1 = document.getElementById("page1");
		setTimeout(function() {
			page1.style.display = "none";
		}, 3000);
			//-----------------------------------------
			//canvas 画钟表
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");

		function time(obj) {
			this.canvas = document.getElementById(obj.id);
			this.ctx = this.canvas.getContext("2d");
			this.du360 = 2 * Math.PI;
			this.du90 = Math.PI / 2;
			this.du30 = Math.PI / 6;
			this.duH = 2 * Math.PI / 43200;
			this.duM = 2 * Math.PI / 3600;
			this.duS = 2 * Math.PI / 60;
			this.create();
			var self = this;

			function Interval() {
				self.create();
			}
			setInterval(Interval, 30000);
		}
		time.prototype = {
			create: function() {
				this.ctx.clearRect(0,0,230,230);
				this.ctx.beginPath();
				this.ctx.arc(115, 115, 110, 0, Math.PI * 2, false);
				this.ctx.strokeStyle = "#e5376c";
				this.ctx.lineWidth = 10;
				this.ctx.stroke();
				this.ctx.closePath();

				this.ctx.beginPath();
				this.ctx.arc(115, 115, 12, 0, Math.PI * 2, false);
				this.ctx.fillStyle = "#e5376c";
				this.ctx.fill();
				this.ctx.closePath();
				var self = this;
				//绘制指针
				function pointer(x, y, l, n, color, du) {
					self.ctx.beginPath();
					self.ctx.strokeStyle = color;
					self.ctx.fillStyle = color;
					
					var sX1 = x + 25* Math.cos(du * n - self.du90);
					var sY1 = y + 25 * Math.sin(du * n - self.du90);
					var eX = x + l * Math.cos(du * n - self.du90);
					var eY = y + l * Math.sin(du * n - self.du90);
					self.ctx.moveTo(sX1, sY1);
					self.ctx.lineTo(eX, eY);
					self.ctx.lineCap="round";
					self.ctx.lineWidth = 15;
					self.ctx.stroke();
					self.ctx.closePath();

				}

				function date() {
					var date = new Date();
					var h = date.getHours();
					var m = date.getMinutes();
					var s = date.getSeconds();
					h = h * 60 * 60 + m * 60 + s;
					m = m * 60 + s;
					pointer(115, 115, 70, h, "e5376c", self.duH); //时针
					pointer(115, 115, 85, m, "e5376c", self.duM); //分针

				}
				date();
			}
		}
		var canvas = new time({
			id: "canvas"
		})

		//--------------------------------
		//swiper 滑动  小动画
		var mySwiper = new Swiper(".swiper-container", {
			pagination: ".swiper-pagination",
			paginationClickable: true,
			paginationElement: "span",
			paginationBulletRender: function(index, className) {
				return '<span class="' + className + ' page"></span>';
			},
			onInit: function(swiper) {
				swiperAnimateCache(swiper); //隐藏动画元素
				swiperAnimate(swiper); //调用动画元素
			},
			onSlideChangeEnd: function(swiper) {
				swiperAnimateCache(swiper); //隐藏动画元素
				swiperAnimate(swiper); //调用动画元素
			},
			watchSlidesProgress: true, //监视进度
		})
    	//------------------------------------
    	//跳转
    	var btn=document.getElementById("button");
    	btn.onclick=function(){
    		window.location.href="first.html";
    	}
	}
	