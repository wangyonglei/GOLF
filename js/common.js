window.onload = function() {
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
	function is_weixin() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			if (!code) {
				location = 'http://v.jgsports.com.cn/user/Act/getCode?backUri=' + locationUrl;
			} else {
				location = 'http://m.jgsports.com.cn/ball_list.html'
			}
		} else {
			alert('请在微信客户端打开')
		}
		is_weixin();
	}
}