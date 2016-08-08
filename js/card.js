// window.onload = function() {
// 	(function($) {
// 		$.getUrlParam = function(name) {
// 			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
// 			var r = window.location.search.substr(1).match(reg);
// 			if (r != null) return unescape(r[2]);
// 			return null;
// 		}
// 	})(jQuery);
// 	var code = $.getUrlParam('code');
// 	var locationUrl = window.location.href;
// 	function is_weixin() {
// 		var ua = navigator.userAgent.toLowerCase();
// 		if (ua.match(/MicroMessenger/i) == "micromessenger") {
// 			if (!code) {
// 				location = 'http://v.jgsports.com.cn/user/Act/getCode?backUri=' + locationUrl;
// 			} else {
// 				$.ajax({
// 						url: 'http://v.jgsports.com.cn//user/User/getUserInfo',
// 						type: 'Get',
// 						// dataType: 'json',
// 						data: {
// 							code: code
// 						},
// 					})
// 					.done(function(data) {
// 						// alert(code);
// 						// location = 'http://m.jgsports.com.cn/card.html'
// 					})
// 			}
// 		} else {
// 			alert('请在微信客户端打开！')
// 		}
// 	}
// 	is_weixin();
// }


jQuery(document).ready(function($) {
	(function($) {
		$.getUrlParam = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		}
	})(jQuery);
	var code = $.getUrlParam('code');

	$.ajax({
			url: 'http://v.jgsports.com.cn//user/User/getUserInfo',
			type: 'Get',
			dataType: 'jsonp',
			jsonp: 'callback',
			data: {
				code: code
			},
		})
		.done(function(data) {
			var carddata = data.data;
			var html = '';
			html +='<div class="card_ban"><div class="card_img"><img src="'+carddata.avatar+'"></div><div class="card_con"><div class="xian"><p></p><p>·</p><p></p></div><div class="card_name">'+carddata.rname+'</div><div class="card_des">'+carddata.signature+'</div><div class="card_qiu"><span>球龄</span>'+carddata.ball_age+'<span>差点</span>'+carddata.almost+'</div></div></div><div class="card_vip">'+carddata.membership+'</div><div class="card_tel">'+carddata.tel+'</div><div class="card_email">'+carddata.email+'</div><div class="hengxian"><p></p><p>·</p><p></p></div><div class="card_company">公司：'carddata.company_describe'</div><div class="card_post">职务：</div><div class="card_city">城市：'+carddata.city+'</div><div class="card_resources">资源：'+carddata.resources+'</div><div class="card_btn"><button class="card_but">编辑</button></div></div>'
			$('.card').html(html)
		})




	// var locationUrl = window.location.href;
	// function is_weixin() {
	// 	var ua = navigator.userAgent.toLowerCase();
	// 	if (ua.match(/MicroMessenger/i) == "micromessenger") {
	// 		if (!code) {
	// 			location = 'http://v.jgsports.com.cn/user/Act/getCode?backUri=' + locationUrl;
	// 		} else {
	// 			$.ajax({
	// 					url: 'http://v.jgsports.com.cn//user/User/getUserInfo',
	// 					type: 'Get',
	// 					// dataType: 'json',
	// 					data: {
	// 						code: code
	// 					},
	// 				})
	// 				.done(function(data) {
						
	// 				})
	// 		}
	// 	} else {
	// 		alert('请在微信客户端打开！')
	// 	}
	// }
	// is_weixin();
});
	

































// window.onload = function() {
// 	// var ex_code = "ex_code";
// 	// var ex_mobile = "ex_mobile";
// 	// var ex_uid = "ex_uid";
// 	// var ex_codeName = document.cookie.indexOf(ex_code + "=");
// 	// var ex_mobileName = document.cookie.indexOf(ex_mobile + "=");
// 	// var ex_uidName = document.cookie.indexOf(ex_uid + "=");
// 	// if (ex_codeName != -1 && ex_mobileName != -1 && ex_uidName != -1) {
// 	// 	return true;
// 	// } else {
// 	// }
// 	var ex_code = document.cookie.indexOf("ex_code=");
// 	var ex_mobile = document.cookie.indexOf("ex_mobile=");
// 	var ex_uid = document.cookie.indexOf("ex_uid=");
// 	if (ex_code == -1 && ex_mobile == -1 && ex_uid == -1) {
// 		(function($) {
// 			$.getUrlParam = function(name) {
// 				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
// 				var r = window.location.search.substr(1).match(reg);
// 				if (r != null) return unescape(r[2]);
// 				return null;
// 			}
// 		})(jQuery);
// 		var code = $.getUrlParam('code');
// 		var locationUrl = window.location.href;
// 		function is_weixin() {
// 			var ua = navigator.userAgent.toLowerCase();
// 			if (ua.match(/MicroMessenger/i) == "micromessenger") {
// 				if (!code) {
// 					location = 'http://v.jgsports.com.cn/user/Act/getCode?backUri=' + locationUrl;
// 				} else {

// 					$.ajax({
// 							url: 'http://v.jgsports.com.cn//user/User/getUserInfo',
// 							type: 'Get',
// 							// dataType: 'json',
// 							data: {
// 								code: code
// 							},
// 						})
// 						.done(function(data) {
// 							alert(code)

// 						})



// 					// location = 'http://m.jgsports.com.cn/card.html';
// 				}
// 			} else {
// 				alert('请在微信客户端打开！')
// 			}
// 		}
// 		is_weixin();
// 	}
// }





// // window.onload = function() {
// // 	(function($) {
// // 		$.getUrlParam = function(name) {
// // 			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
// // 			var r = window.location.search.substr(1).match(reg);
// // 			if (r != null) return unescape(r[2]);
// // 			return null;
// // 		}
// // 	})(jQuery);
// // 	var code = $.getUrlParam('code');

// // 	$.ajax({
// // 			url: 'http://v.jgsports.com.cn//user/User/getUserInfo',
// // 			type: 'Get',
// // 			// dataType: 'json',
// // 			data: {
// // 				code: code
// // 			},
// // 		})
// // 		.done(function(data) {
// // 			alert(code)

// // 		})
// // }