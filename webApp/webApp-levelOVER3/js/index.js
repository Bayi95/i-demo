window.onload = function () {
    var screenWid = document.documentElement.offsetWidth || document.body.offsetWidth;
    var nowWid = (screenWid / 640) * 100;
    var oHtml = document.getElementsByTagName("html")[0];
    oHtml.style.fontSize = nowWid + "px";
    //----------------------------------------
    function draw(id) {
        var canvas = document.getElementById(id);
        if (canvas == null)
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
    //---------------------------------------------
    var mySwiper = new Swiper("#mySwiper", {
        touchAngle: 20,
        speed: 500,
        onSlideChangeStart: function () {
            $("#tabs .active").removeClass('active');
            $("#tabs div").eq(mySwiper.activeIndex).addClass('active');
        }
    });
    $("#tabs div").on('touchstart mousedown', function (e) {
        e.preventDefault();
        $("#tabs .active").removeClass('active');
        $(this).addClass('active');
        //		console.log($(this).index())
        //		alert(1)
        //		console.log(mySwiper);

        if ($(this).index() == 4) {
            window.location.href = "prize_draw.html";
        } else {
            mySwiper.slideTo($(this).index());
        }
    });
    $("#tabs div").click(function (e) {
        e.preventDefault()
    });

    //-----------------------------------------------
    var mySwiper1 = new Swiper("#mySwiper1", {
        slidesPerView: 10,
    });
    var ul = $("#page1 ul");
    ul.click(function () {
        window.location.href = "login_register.html";
    });

    //----------------------------------------------
    $.ajax({
            type: "get",
            url: "http://datainfo.duapp.com/shopdata/getclass.php",
            success: function (res) {
                var $data = eval("(" + res + ")");
                $.ajax({
                    type: "get",
                    url: "http://datainfo.duapp.com/shopdata/getGoods.php",
                    dataType: 'jsonp',
                    success: function (res) {

                        var nowprice1;
                        for (var i = 0; i < res.length; i++) {
                            nowprice1 = parseInt(res[i].price * (10 - res[i].discount) / 10);
                            $('.goodsbox').append('<li class="list"></li>');
                            $('.list').eq(i).append('<dl class="goods"><dt class="pic"><img src="' + res[i].goodsListImg + '" /></dt><dd class="goodsname">' + res[i].goodsName + '</dd><dd  class="price"><span class="nowprice">&yen;' + nowprice1 + '</span><span class="normalprice">&yen;' + res[i].price + '</span></dd></dl>');
                        };
                        var ulHei = $('.list').height() * Math.ceil(res.length / 2 + 1);
                        $('.goodsbox').css('height', ulHei + 'rem');
                        var myScroll = new IScroll('#wrapper', {
                            freeScroll: true,
                            fadeScrollbars: true, //滚动条自动渐隐
                        });
                        $.each($('.goodsbox').find('li'), function (index, items) {
                            $('.goodsbox').find('li').eq(index).tap(function () {
                                window.location.href = 'detail.html';
                                localStorage.setItem('goodsId', res[index].goodsID);
                                //console.log(res[index].goodsID)
                            })
                        });
                    }
                })
            }
        })
        //----------------------------------------------------------------------
    $.ajax({
        type: "get",
        url: "http://datainfo.duapp.com/shopdata/getclass.php",
        success: function (res) {
            var $data = eval("(" + res + ")");
            $.each($('.iconfont'), function (index, item) {
                $('.iconfont').eq(index).html('' + $data[index].icon + '');
                $('.iconfont').eq(index).click(function () {
                    $('.goodsbox').empty();
                    $(this).css('color', 'white').parent('div').siblings('div').find('i').css('color', 'black');
                    $.ajax({
                        type: "get",
                        url: " http://datainfo.duapp.com/shopdata/getGoods.php",
                        dataType: 'jsonp',
                        data: {
                            classID: $data[index].classID,
                        },
                        success: function (res) {
                            var nowprice;
                            for (var i = 0; i < res.length; i++) {
                                nowprice = parseInt(res[i].price * (10 - res[i].discount) / 10);
                                $('.goodsbox').append('<li class="list"></li>');
                                $('.list').eq(i).append('<dl class="goods"><dt class="pic"><img src="' + res[i].goodsListImg + '" /></dt><dd class="goodsname">' + res[i].goodsName + '</dd><dd  class="price"><span class="nowprice">&yen;' + nowprice + '</span><span class="normalprice">&yen;' + res[i].price + '</span></dd></dl>');
                            }
                            var ulHei = $('.list').height() * Math.ceil(res.length / 2) / nowWid;
                            $('.goodsbox').css('height', ulHei + 'rem');
                            var myScroll = new IScroll('#wrapper', {
                                freeScroll: true,
                                fadeScrollbars: true, //滚动条自动渐隐
                            });
                        }
                    });
                })
            });
        }
    });
    //--------------------------------------------------------------------
    var num = 0;
    var price = 0;
    $.ajax({
        type: "get",
        url: "http://datainfo.duapp.com/shopdata/getCar.php",
        async: true,
        dataType: 'jsonp',
        data: {
            userID: sessionStorage.getItem('name')
        },
        success: function (res) {
            //添加商品到购物车
            for (var i = 0; i < res.length; i++) {
                $('.goodsbox1').append('<li class="oli"></li>');
                $('.goodsbox1>li').eq(i).append('<dl><dt><img src="' + res[i].goodsListImg + '"</dt><dd class="name">' + res[i].goodsName + '</dd><dd class="singleprice">单价：&yen;' + res[i].price + '</dd><dd class="totalnum"><p>数量：</p><input type="button" class="reduce"><input type="text" class="num"><input type="button" class="ad"></dd></dl>');
                $('.goodsbox1>li').eq(i).append('<a goodsID="' + res[i].goodsID + '"></a>')
                $('.num').eq(i).val('' + res[i].number + '');
                num += parseInt(res[i].number);
                price += parseInt(res[i].number) * parseFloat(res[i].price);
            }
            //更新商品数量
            $('.i1').html('' + num + '');
            //更新价格
            $('.i2').html('' + price + '');
            //更新购物车
            //减少
            $.each($('.reduce'), function (index, items) {
                $('.reduce').eq(index).tap(function () {
                    var nownum1 = parseInt($('.num').eq(index).val());
                   // console.log(index)
                    nownum1 -= 1;
                    if (nownum1 < 1) {
                        nownum1 = 1;
                        alert('数量最少为1，如想删除此商品，请点击删除按钮！！！');
                    } else {
                        $.ajax({
                            type: "get",
                            url: "http://datainfo.duapp.com/shopdata/updatecar.php",
                            async: true,
                            data: {
                                userID: sessionStorage.getItem('name'),
                                goodsID: res[index].goodsID,
                                number: nownum1
                            },
                            success: function (res) {
                                $.ajax({
                                    type: "get",
                                    url: "http://datainfo.duapp.com/shopdata/getCar.php",
                                    async: true,
                                    dataType: 'jsonp',
                                    data: {
                                        userID: sessionStorage.getItem('name')
                                    },
                                    success: function (res) {
                                        num = 0;
                                        price = 0;
                                        for (var j = 0; j < res.length; j++) {
                                            $.each($('.num'), function (index, items) {
                                                $('.num').eq(index).val('' + res[index].number + '');
                                            });
                                            num += parseInt(res[j].number);
                                            price += parseInt(res[j].number)*parseFloat(res[j].price);
                                        }
                                        //更新商品数量
                                        $('.i1').html('' + num + '');
                                        //更新价格
                                        $('.i2').html('' + price + '');
                                    }
                                });
                            }
                        });
                    }
                })
            });
            //增加
            $.each($('.ad'), function (index, items) {
                $('.ad').eq(index).tap(function () {
                    var nownum2 = parseInt($('.num').eq(index).val());
                    nownum2 += 1;
                    $.ajax({
                        type: "get",
                        url: "http://datainfo.duapp.com/shopdata/updatecar.php",
                        async: true,
                        data: {
                            userID: sessionStorage.getItem('name'),
                            goodsID: res[index].goodsID,
                            number: nownum2
                        },
                        success: function (res) {
                            $.ajax({
                                type: "get",
                                url: "http://datainfo.duapp.com/shopdata/getCar.php",
                                async: true,
                                dataType: 'jsonp',
                                data: {
                                    userID: sessionStorage.getItem('name')
                                },
                                success: function (res) {
                                    num = 0;
                                    price = 0;
                                    for (var k = 0; k < res.length; k++) {
                                        $.each($('.num'), function (index, items) {
                                            $('.num').eq(index).val('' + res[index].number + '');
                                        });
                                        num += parseInt(res[k].number);
                                        price += parseInt(res[k].number) * parseFloat(res[k].price);
                                    }
                                    //更新商品数量
                                    $('.i1').html('' + num + '');
                                    //更新价格
                                    $('.i2').html('' + price + '');
                                }
                            });
                        }
                    });
                })
            });
            //获取ul高度
            var ulHei1 = $('.oli').height() * res.length / nowWid;
            $('.goodsbox1').css('height', ulHei1 + 'rem');
            //实例化Iscroll			
            var myScroll1 = new IScroll('#wrapper1', {
                mouseWheel: true,
                freeScroll: true,
                fadeScrollbars: true, //滚动条自动渐隐
            });
            //添加事件
            $.each($('a'), function (index, items) {
                $('a').eq(index).tap(function () {
                    $(this).parent().remove();
                    $.ajax({
                        type: "get",
                        url: "http://datainfo.duapp.com/shopdata/updatecar.php",
                        async: true,
                        data: {
                            goodsID: $(this).attr('goodsid'),
                            userID: sessionStorage.getItem('name'),
                            number: 0
                        },
                        success: function (res) {
                            $.ajax({
                                type: "get",
                                url: "http://datainfo.duapp.com/shopdata/getCar.php",
                                async: true,
                                dataType: 'jsonp',
                                data: {
                                    userID: sessionStorage.getItem('name')
                                },
                                success: function (res) {
                                    num = 0;
                                    price = 0;
                                    for (var s = 0; s < res.length; s++) {
                                        $.each($('.num'), function (index, items) {
                                            $('.num').eq(index).val('' + res[index].number + '');
                                        });
                                        num += parseInt(res[s].number);
                                        price += parseInt(res[s].number) * parseFloat(res[s].price);
                                    }
                                    //更新商品数量
                                    $('.i1').html('' + num + '');
                                    //更新价格
                                    $('.i2').html('' + price + '');
                                }
                            });
                        }
                    });
                })
            });
        }
    });
    //用户管理  
    $('.my-name').html('昵称:' + sessionStorage.getItem('name'));
}