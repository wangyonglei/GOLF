$(document).ready(function($) {

	var ex_code = getCookie("ex_code");
	var ex_mobile = getCookie("ex_mobile");
	var ex_uid = getCookie("ex_uid");
	var ballCar = function() {
		$('.search_btn').click(function(){
			var ballteam = {
				title: $('.ballteam_input').val()
			}
			$.ajax({
					url: 'http://v.jgsports.com.cn/user/Team/getList',
					type: 'get',
					dataType: 'json',
					data: ballteam
				})
				.done(function(data) {
					var balldata =data.data;
					var html = '';
// html += '<div class="wai"><div class="duan ball_card_title">大鹏队（2人）<p class="xiajiao"></p></div>'+
// '<ul class="ball_card_people"><li><div class="people_img"><img src="images/card_img.jpg"></div><p>大鹏</p></li></ul></div>'

html +='<div class="wai"><div class="duan ball_card_title">大鹏队（'+balldata.membersNumber+'人）<p class="xiajiao"></p></div><ul class="ball_card_people">'
// if (	balldata.membersList.length == 0 ) {
// 	html +='<li>暂无</li>'
// }else{
	for (var i = 0; i <balldata.membersList.length; i++) {
		html +='<li><div class="people_img"><img src="'+balldata.membersList[i].avatar+'"></div><p>'+balldata.membersList[i].rname+'</p></li>'
	}
// }
if (balldata.membersList.teamMaster == 1) {
html +='<li><div class="people_img"><img src="images/jia.png"></div></li><li><div class="people_img"><img src="images/jian.png"></div></li>'

}else{

}
html +='</ul></div>'
					$('#ball_card').html(html)
				})
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
						ballCar()
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
		ballCar()
	}










	
})