var screenWid = document.documentElement.offsetWidth || document.body.offsetWidth;
var nowWid = (screenWid / 640) * 100;
var oHtml = document.getElementsByTagName("html")[0];
oHtml.style.fontSize = nowWid + "px";
//实例化swiper1		
var mySwiper1 = new Swiper('#swiper1', {
		//noSwiping: true,
	})
	//点击跳转到详情信息
$('#prev').tap(function() {
		//		console.log(mySwiper1) 
		mySwiper1._slideNext();
	})
	//获取商品信息
var num = 0;
$.ajax({
	type: "get",
	url: "http://datainfo.duapp.com/shopdata/getGoods.php",
	async: true,
	data: {
		goodsID: localStorage.getItem('goodsId')
	},
	dataType: 'jsonp',
	success: function(res) {
		console.log(res)
		var imgArr = eval('(' + res[0].goodsBenUrl + ')');
		for(var i = 0; i < imgArr.length; i++) {
			$('#swiper2>.swiper-wrapper').append('<div class="swiper-slide pic"><img src=' + imgArr[i] + '></div>');
		}
		//实例化swiper2
		var myswiper2 = new Swiper('#swiper2', {
				slidesPerView: 'auto',
				pagination: '.swiper-pagination',
				paginationClickable: true,
				autoplayDisableOnInteraction: false,
			})
			//实时获取商品信息
		var nowprice = parseInt(res[0].price * (10 - res[0].discount) / 10);
		$('.goodsname').html('' + res[0].goodsName + '');
		$('.nowprice').html('&yen;' + nowprice + '');
		$('.normalprice').html('' + res[0].price + '');
		$('.soldnum').html('购买人数：' + res[0].buynumber + '');
		//更新购物车信息

		$('#goshopcar').click(function() {
			num++;
			//console.log(num)
			$.ajax({
				type: "get",
				url: "http://datainfo.duapp.com/shopdata/updatecar.php",
				data: {
					userID: sessionStorage.getItem('name'),
					goodsID: res[0].goodsID,
					number: num
				},
				async: true,
				success: function(res) {}
			});
		})
	}
});
//点击返回购物车
$('.backshopcar').tap(function() {
	window.location.href = "first.html";
})