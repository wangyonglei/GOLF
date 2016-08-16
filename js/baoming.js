$(document).ready(function($) {
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
						}
					})
					.done(function(data) {
						baoming()
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
		baoming()
	}


	function baoming(){
		var id = decodeURIComponent((new RegExp('[?|&]id=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;

		$.ajax({
				url: 'http://v.jgsports.com.cn/user/Act/getJoinActMembers',
				type: 'get',
				dataType: 'json',
				data: {
					code: code,
					act_id:id
				}
			})
			.done(function(data) {
				 var baomingdata = data.data;
				  var html = '';
				  for (var i = 0; i <baomingdata.joinUserList.length; i++) {
				  	html +='<li><div class="people_img"><img src="'+baomingdata.joinUserList[i].avatar+'"></div><p>'+baomingdata.joinUserList[i].rname+'</p></li>'
				  }
				  $('.yibaoming_people ul').html(html);

				  var htmlwei = '';
				  for (var i = 0; i <baomingdata.noJoinUserList.length; i++) {
				  	htmlwei +='<li><div class="people_img"><img src="'+baomingdata.noJoinUserList[i].avatar+'"></div><p>'+baomingdata.noJoinUserList[i].rname+'</p></li>'
				  }
				  htmlwei +='<div class="jiajian">	<div class="people_img"><img src="images/jia.png"></div></div>'
				  $('.weibaoming_people ul').html(htmlwei);






			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
	}
	




})