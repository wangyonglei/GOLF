$(document).ready(function($) {
	alert(1)
	(function($) {
		$.getUrlParam = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		}
	})(jQuery);
	var code = $.getUrlParam('code');


	
	var ex_code = getCookie("ex_code");
	var ex_mobile = getCookie("ex_mobile");
	var ex_uid = getCookie("ex_uid");
	if (!ex_code && !ex_mobile  && !ex_uid) {
		alert(2)
		
		var locationUrl = window.location.href;
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			alert(3)
			if (!code) {
				alert(4)
				location = 'http://v.jgsports.com.cn/user/Act/getCode?backUri=' + locationUrl;
			} else {
				alert(5)
				$.ajax({
					url: 'http://v.jgsports.com.cn/user/User/login',
					type: 'get',
					dataType: 'json',
					// jsonp: 'callback',
					data: {
						code: code
					},
					success: function(data) {
						alert(6)
						// location = 'http://v.jgsports.com.cn/GOLF/card.html';
					}
				})
			}
		} else {
			alert(7)
			alert('请在微信客户端打开！')
		}
	} else{
		alert(8)
		// location = 'http://v.jgsports.com.cn/GOLF/card.html';

			$.ajax({
					url: 'http://v.jgsports.com.cn/user/User/getUserInfo',
					type: 'Get',
					dataType: 'json',
					// jsonp:callback,
					data: {
						code: code
					},
				})
				.done(function(data) {
					var carddata = data.data;
					var html = '';
					html +='<div class="card_ban"><div class="card_img"><img src="'+carddata.avatar+'"></div><div class="card_con"><div class="xian"><p></p><p>·</p><p></p></div><div class="card_name">'+carddata.rname+'</div><div class="card_des">'+carddata.signature+'</div><div class="card_qiu"><span>球龄</span>'+carddata.ball_age+'<span>差点</span>'+carddata.almost+'</div></div></div><div class="card_vip">'+carddata.membership+'</div><div class="card_tel">'+carddata.tel+'</div><div class="card_email">'+carddata.email+'</div><div class="hengxian"><p></p><p>·</p><p></p></div><div class="card_company">公司：'+carddata.company_describe+'</div><div class="card_post">职务：</div><div class="card_city">城市：'+carddata.city+'</div><div class="card_resources">资源：'+carddata.resources+'</div><div class="card_btn"><button class="card_but">编辑</button></div></div>'
					$('.card').html(html)
				})




	}
});


