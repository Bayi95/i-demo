window.onload = function() {
		var screenWid = document.documentElement.offsetWidth || document.body.offsetWidth;
		var nowWid = (screenWid / 640) * 100;
		var oHtml = document.getElementsByTagName("html")[0];
		oHtml.style.fontSize = nowWid + "px";
		//-------------------------------------------------------------
		var mySwiper = new Swiper(".swiper-container", {
				noSwiping: true
			})
			//	console.log(mySwiper);
		var register = document.getElementById("register");
		register.onclick = function() {
			mySwiper._slideNext();
		}
		var back = document.getElementById("back");
		back.onclick = function() {
			mySwiper._slidePrev();
		}
	}
	//-------------------------------------------------------
$(function() {
		var $username = $("#username");
		var $username_1 = $("#username_1");
		var $register = $("#button");
		var $password = $("#password");
		var $password1 = $("#password1");
		var $password_1 = $("#password_1");
		var $login = $("#login");
		var $flag1 = true;
		var $flag2 = true;
		var $check1 = $('#page1 .check1');
		var $check2 = $('#page1 .check2');
		var $show = $('#page1 .show');
		var $remember = $('#page1 .remember');
		//-----------------------------------------------
		//checkbox的选择与取消
		//		console.log($show);
		//		console.log($remember);
		//		console.log($check1);
		//		console.log($check2);
		//		console.log($password_1);
		$show.on("tap", function() {
			//console.log("hehe")
			if($flag1) {
				//				alert(1)
				$check1.prop('src', 'img/login-checkon.jpg');
				$password_1.prop('type', 'text');
				$flag1 = false;
			} else {
				//				alert(2)
				$check1.prop('src', 'img/login-checkoff.jpg');
				$password_1.prop('type', 'password');
				$flag1 = true;
			}
		});
		$remember.on("tap", function() {
			if($flag2) {
				$check2.prop('src', 'img/login-checkoff.jpg');
				$flag2 = false;
			} else {
				$check2.prop('src', 'img/login-checkon.jpg');
				$flag2 = true;
			}
		});
		//-------------------------------------------------
		//console.log()
		$username.blur(function() {
			var val = $(this).val();
			var reg_uname = /^[a-zA-z][a-zA-Z0-9_]{2,9}$/;
			if(reg_uname.test(val) == false) {
				$(".h5").html('*用户名格式错了');
				$username.val('');
			} else {
				$(".h5").html('^_^ 正确');
			}
		});
		$password.blur(function() {
			var val = $(this).val();
			var reg_pword = /^\w{6,20}$/;
			if(reg_pword.test(val) == false) {
				$(".h5").html('*密码格式输入错误');
				$password.val('');
			} else {
				$(".h5").html('^_^ 正确');
			}
		});
		$password1.blur(function() {
			var val = $(this).val();
			if(val != $password.val()) {
				$(".h5").html('*密码错误不一致');
				$password1.val('');
			} else {
				$(".h5").html('^_^ 正确');
			}
		});
		$register.click(function() {
			$.ajax({
				url: "http://datainfo.duapp.com/shopdata/userinfo.php",
				type: "GET",
				data: {
					status: "register", //---
					userID: $username.val(),
					password: $password.val(),
				},
				success: function(status) {
					switch(status) {
						case '0':
							alert('用户名已存在');
							break;
						case '1':
							alert('注册成功');
							localStorage.setItem("username", $username.val());
							localStorage.setItem("password", $password.val());
							break;
						case '2':
							alert('数据库报错');
							break;
						default:
							alert('未知错误..');
					}
				}
			})
		});
		//检查用户名 登录验证 
		$login.click(function() {
			//alert(1)
			$.ajax({
				type: "get",
				url: "http://datainfo.duapp.com/shopdata/userinfo.php",
				data: {
					status: 'login',
					userID: $username_1.val(),
					password: $password_1.val()
				},
				success: function(res) {
					switch(res) {
						case '0':
							alert('用戶名不存在！');
							break;
						case '2':
							alert('用戶名密碼不符！！！');
							break;
						default:
							alert('登录成功！！！');
							sessionStorage.setItem('name', $username_1.val());
							sessionStorage.setItem('pword', $password_1.val());
							window.location.href = 'first.html';
					}
				}
			})
		});
	})
	//-------------------------------------------------------