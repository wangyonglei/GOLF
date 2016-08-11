$(document).ready(function($) {
	var ex_code = getCookie("ex_code");
	var ex_mobile = getCookie("ex_mobile");
	var ex_uid = getCookie("ex_uid");
	// var createTeam = function() {
	// 	$('.team_addbut').click(function() {
	// 		var createteam = {
	// 			title: $('.team_input').val(),
	// 			profile: $('.team_con').val()
	// 		}
	// 		$.ajax({
	// 				url: 'http://v.jgsports.com.cn/user/Team/addTeam',
	// 				type: 'post',
	// 				dataType: 'json',
	// 				data: createteam
	// 			})
	// 			.done(function(data) {
	// 				window.location.href = 'http://v.jgsports.com.cn/ball_card.html'
	// 			})
	// 	})
	// }
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
						
						$('.team_addbut').click(function() {
							alert(0)
							var createteam = {
								title: $('.team_input').val(),
								profile: $('.team_con').val()
							}
							$.ajax({
									url: 'http://v.jgsports.com.cn/user/Team/addTeam',
									type: 'post',
									dataType: 'json',
									data: createteam
								})
								.done(function(data) {
									alert(1)
									window.location.href = 'http://v.jgsports.com.cn/ball_card.html'
								})
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
		
		$('.team_addbut').click(function() {
			alert(2)
			var createteam = {
				title: $('.team_input').val(),
				profile: $('.team_con').val()
			}
			$.ajax({
					url: 'http://v.jgsports.com.cn/user/Team/addTeam',
					type: 'post',
					dataType: 'json',
					data: createteam
				})
				.done(function(data) {
					alert(3)
					window.location.href = 'http://v.jgsports.com.cn/ball_card.html'
				})
		})


	}
})