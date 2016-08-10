$(document).ready(function($) {
	var ex_code = getCookie("ex_code");
	var ex_mobile = getCookie("ex_mobile");
	var ex_uid = getCookie("ex_uid");
	var ballCar = function() {
		var title = $('.ballteam_input').val()
		
		$.ajax({
				url: 'http://v.jgsports.com.cn/user/Team/getList',
				type: 'get',
				dataType: 'json',
				data: title
			})
			.done(function(data) {
				var balldata = data.data;
				var html = '';
				for (var j = 0; j<balldata.length; j++) {
					html += '<div class="wai"><div class="duan ball_card_title">'+balldata[j].title+'（' + balldata[j].membersNumber + '人）<p class="xiajiao"></p></div><ul class="ball_card_people">'
						// if (	balldata.membersList.length == 0 ) {
						// 	html +='<li>暂无</li>'
						// }else{
					for (var i = 0; i < balldata[j].membersList.length; i++) {
						html += '<li><div class="people_img"><img src="' + balldata[j].membersList[i].avatar + '"></div><p>' + balldata[j].membersList[i].rname + '</p></li>'
					}
					// }
					if (balldata[j].membersList.teamMaster == 1) {
						html += '<li><div class="people_img"><img src="images/jia.png"></div></li><li><div class="people_img"><img src="images/jian.png"></div></li>'
					} else {
						
					}
					html += '</ul></div>'
				}

				$('#ball_card').html(html)
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
						ballCar();
						$('.search_btn').click(function() {
							ballCar();
						})
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
		ballCar();
		$('.search_btn').click(function() {
			ballCar();
		})
	}
})