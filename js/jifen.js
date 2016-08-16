$(document).ready(function() {

	function loadingjifen(){
	var id = decodeURIComponent((new RegExp('[?|&]id=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
		
		$.ajax({
			url: 'http://v.jgsports.com.cn/user/Act/getUserIntegralCardInfoDetail',
			type: 'get',
			dataType: 'json',
			data: {
				userIntegralCardId:id,
			},
			
			success: function(data) {
				var jifenlength = data.data;
				// var html = ''
				// // for (var i = 0; i < jifenlength; i++) {
				// 	html += '<li><div class="chengjiicon"><img src="images/card_img.jpg"></div><div class="chengjiname">王磊</div><p>0</p><p>-</p></li>'
				// // }
				// $('.chengjicon').html(html)
			}
		})
	}

	var ex_code = getCookie("ex_code");
	var ex_mobile = getCookie("ex_mobile");
	var ex_uid = getCookie("ex_uid");
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
						},
						success: function(data) {
							loadingjifen()
						}
					})
					
					
			}
		} else {
			alert('请在微信客户端打开！')
		}
	} else {
		loadingjifen();
	}

})


