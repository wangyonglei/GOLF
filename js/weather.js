$(document).ready(function($) {
	var ex_code = getCookie("ex_code");
	var ex_mobile = getCookie("ex_mobile");
	var ex_uid = getCookie("ex_uid");
	var weather = function (){
		
	  var title = decodeURIComponent((new RegExp('[?|&]title=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;

		$.ajax({
			url: 'http://v.jgsports.com.cn/user/Venue/getWeather?title='+title,
			type: 'GET',
			dataType: 'json',
		})
		.done(function(data) {
			
			var weatherdata = data.data;
			var html = '';
			html +='<div class="wea_top"><div class="wea_weizhi">'+weatherdata.city+'</div><div class="wea_img"><img src="'+weatherdata.pic+'"></div>	<div class="wea_du">'+weatherdata.temperature+'°C</div>	<div class="wea_baodao">'+weatherdata.weather+'</div>	<div class="wea_time">'+weatherdata.reporttime+' </div></div><div class="hengxian">	<p></p>	<p>·</p><p></p>	</div>	<div class="wea_style">	<div class="qiwen">气温<span>'+weatherdata.temperature+'°C</span></div>	<div class="fengli">风力<span>'+weatherdata.windpower+'级</span></div>	</div>';
			$('.weather').html(html)
		})
		
		
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
						weather()
					})
				
			}
		} else {
			alert('请在微信客户端打开！')
		}
	} else {
		weather()
	}

});