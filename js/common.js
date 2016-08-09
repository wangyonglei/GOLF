
$(document).ready(function($) {
	console.log(1)
	var ex_code = getCookie("ex_code");
	var ex_mobile = getCookie("ex_mobile");
	var ex_uid = getCookie("ex_uid");
	if (!ex_code && !ex_mobile  && !ex_uid) {
		console.log(2)
		(function($) {
			$.getUrlParam = function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			}
		})(jQuery);
		var code = $.getUrlParam('code');
		var locationUrl = window.location.href;
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			console.log(3)
			if (!code) {
				console.log(4)
				location = 'http://v.jgsports.com.cn/user/Act/getCode?backUri=' + locationUrl;
			} else {
				console.log(5)
				$.ajax({
					url: 'http://v.jgsports.com.cn/user/User/login',
					type: 'get',
					dataType: 'json',
					// jsonp: 'callback',
					data: {
						code: code
					},
					success: function(data) {
						console.log(6)
						location = 'http://v.jgsports.com.cn/GOLF/card.html';
					}
				})
			}
		} else {
			console.log(7)
			alert('请在微信客户端打开！')
		}
	} else{
		console.log(8)
		location = 'http://v.jgsports.com.cn/GOLF/card.html';
	}
});