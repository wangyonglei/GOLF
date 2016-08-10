$(document).ready(function($) {
	var ex_code = getCookie("ex_code");
	var ex_mobile = getCookie("ex_mobile");
	var ex_uid = getCookie("ex_uid");
	var loadCard = function() {
		$.ajax({
				url: 'http://v.jgsports.com.cn/user/User/getUserInfo',
				type: 'Get',
				dataType: 'json',
				data: {
					code: code
				}
			})
			.done(function(data) {
				var carddata = data.data;
				var html = '';

				html += '<div class="card_ban"><div class="card_img"><img src="' + carddata.avatar + '"></div><div class="card_con"><div class="xian"><p></p><p>·</p><p></p></div><div class="card_name">' + carddata.rname + '</div><div class="card_des">' + carddata.signature + '</div><div class="card_qiu"><span>球龄</span>' + carddata.ball_age + '<span>差点</span>' + carddata.almost + '</div></div></div>'+
					for (var i = 0; i < carddata.membership.length; i++) {
				html += '<div class="card_vip">' + carddata.membership[i].title + '</div>'
					}
				html += '<div class="card_tel">' + carddata.tel + '</div><div class="card_email">' + carddata.email + '</div><div class="hengxian"><p></p><p>·</p><p></p></div><div class="card_company">公司：' + carddata.company_describe + '</div><div class="card_post">职务：</div><div class="card_city">城市：' + carddata.city + '</div><div class="card_resources">资源：' + carddata.resources + '</div><div class="card_btn"><a href="cart_edit.html?uid=' + carddata.uid + '">编辑</a></div></div>'
				$('.card').html(html)
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
	}
	if (!ex_code && !ex_mobile && !ex_uid) {
		var code = decodeURIComponent((new RegExp('[?|&]code=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
		var locationUrl = window.location.href;
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			if (!code) {
				location = 'http://v.jgsports.com.cn/user/Act/getCode?backUri=' + locationUrl;
			} else {
				$.ajax({
						url: 'http://v.jgsports.com.cn/user/User/login',
						type: 'get',
						dataType: 'json',
						data: {
							code: code
						}
					})
					.done(function(data) {
						loadCard()
					})
					.fail(function() {
						console.log("error");
					})
					.always(function() {
						console.log("complete");
					});
			}
		} else {
			alert('请在微信客户端打开！')
		}
	} else {
		loadCard()
	}
});