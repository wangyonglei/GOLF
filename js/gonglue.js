$(document).ready(function($) {
	var ex_code = getCookie("ex_code");
	var ex_mobile = getCookie("ex_mobile");
	var ex_uid = getCookie("ex_uid");
	var gonglue = function() {
		
		// 获取id参数
		// (function($) {
		//     $.getUrlParam = function(name) {
		//         var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//         var r = window.location.search.substr(1).match(reg);
		//         if (r != null) return unescape(r[2]);
		//         return null;
		//     }
		// })(jQuery);
		// var id = $.getUrlParam('id');
		var id = decodeURIComponent((new RegExp('[?|&]id=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
		// 获取内容参数
		$.ajax({
				url: 'http://v.jgsports.com.cn/user/Venue/getDetails?venue_id=' + id,
				type: 'GET',
				dataType: 'json',
				data: {},
			})
			.done(function(data) {
				var gonglue = data.data;
				// debugger;
				var html = "";
				html += '<div class="title">球场总长度：' + gonglue.length + '码</div><div class="gonglue_img">';
				if (true) {
					for (var i = 0; i < gonglue.venue_strategy_list.length; i++) {
						html += '<img src="' + gonglue.venue_strategy_list[i] + '" />'
					}
				} else {
					html += '暂无数据'
				}
				html += '</div>';
				$("#gonglue").html(html);
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
						gonglue()
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
		gonglue()
	}

});


