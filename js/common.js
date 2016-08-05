window.onload = function() {
	 var locationUrl =window.location.href;
	function is_weixin() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			location= 'http://v.jgsports.com.cn/user/Act/getCode?backUri='+locationUrl;
		} else {
			 
			return false;
		}
	}
	is_weixin();
}