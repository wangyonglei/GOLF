// jQuery(document).ready(function($) {
	
// 		(function($) {
// 			$.getUrlParam = function(name) {
// 				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
// 				var r = window.location.search.substr(1).match(reg);
// 				if (r != null) return unescape(r[2]);
// 				return null;
// 			}
// 		})(jQuery);
// 		var code = $.getUrlParam('code');
// 		// var code = '9960f77cb12a585372a530a2eb730878';

// 		var locationUrl = window.location.href;
// 		var ua = navigator.userAgent.toLowerCase();
// 		if (ua.match(/MicroMessenger/i) == "micromessenger") {
// 			if (!code) {
// 				location = 'http://v.jgsports.com.cn/user/Act/getCode?backUri=' + locationUrl;
// 			} else{
// 				location = 'http://m.jgsports.com.cn/card.html?code='+code;
// 			}
// 		} else {
// 			alert('请在微信客户端打开！')
// 		}
// });
jQuery(document).ready(function($) {
	var ex_code = getCookie("ex_code");
	var ex_mobile = getCookie("ex_mobile");
	var ex_uid = getCookie("ex_uid");
	if (!ex_code && !ex_mobile  && !ex_uid) {
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
			if (!code) {
				location = 'http://v.jgsports.com.cn/user/Act/getCode?backUri=' + locationUrl;
			} else {
				$.ajax({
					url: 'http://v.jgsports.com.cn/user/User/login',
					type: 'get',
					dataType: 'json',
					// jsonp: 'callback',
					data: {
						code: code
					},
					success: function(data) {
						location = 'http://v.jgsports.com.cn/GOLF/card.html';
					}
				})
			}
		} else {
			alert('请在微信客户端打开！')
		}
	} else{
		location = 'http://v.jgsports.com.cn/GOLF/card.html';
	}
});