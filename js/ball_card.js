$(document).ready(function($) {
	var ex_code = getCookie("ex_code");
	var ex_mobile = getCookie("ex_mobile");
	var ex_uid = getCookie("ex_uid");

	var btn_jia = function(){
		$('.ball_card_people').on('click', '.teamjia', function() {
			var teamid = $(this).parent().parent().attr('data-teamId');
			$('.jiajian').show();
			
			// 确认添加
			$('.yaoqing_btn').click(function(event) {
				var jiajiandata = {
					rname: $('.jiajian_name').val(),
					mobile: $('.jiajian_tel').val(),
					teamId: teamid
				}
				$.ajax({
						url: 'http://v.jgsports.com.cn/user/Team/addTeamMembers',
						type: 'post',
						dataType: 'json',
						data: jiajiandata,
					})
					.done(function() {
							$('.jiajian_name').val(''),
							$('.jiajian_tel').val(''),
							$('.jiajian').hide();
							ballCar();
						
					})
					.fail(function() {
						console.log("error");
					})
					.always(function() {
						console.log("complete");
					});
			});
		})
	}


	var btn_jian = function(){
		$('.ball_card_people').on('click', '.teamjian', function() {
			// var teamid = $(this).parent().parent().attr('data-teamId');
			// var uid = $(this).parent().parent().attr('data-uid');
				alert($(this).parent().parent().parent().attr('data-teamId'))
				alert($(this).parent().parent().attr('data-uid'))
			
				var jiandata = {
					teamid: $(this).parent().parent().parent().attr('data-teamId'),
					uid: $(this).parent().parent().attr('data-uid')
				}
				$.ajax({
						url: 'http://v.jgsports.com.cn/user/Team/signOutTeam',
						type: 'post',
						dataType: 'json',
						data: jiandata,
					})
					.done(function() {
							alert('删除成功')
							ballCar();
						
					})
					.fail(function() {
						console.log("error");
					})
					.always(function() {
						console.log("complete");
					});
		})
	}





	var ballCar = function() {
		var title = encodeURIComponent($('.ballteam_input').val())
		$.ajax({
				url: 'http://v.jgsports.com.cn/user/Team/getList?title=' + title,
				type: 'get',
				dataType: 'json',
				data: title
			})
			.done(function(data) {
				var balldata = data.data;
				var html = '';
				for (var j = 0; j < balldata.length; j++) {
					html += '<div class="wai"><div class="duan ball_card_title">' + balldata[j].title + '（' + balldata[j].membersNumber + '人）<p class="xiajiao"></p></div><ul class="ball_card_people"   data-teamId="' + balldata[j].id + '">'
					if (balldata[j].membersList.length == 0) {
						html += '<li>暂无</li>'
					} else {
						for (var i = 0; i < balldata[j].membersList.length; i++) {
								html += '<li data-uid="' + balldata[j].membersList[i].uid + '"><div class="people_img"><img src="' + balldata[j].membersList[i].avatar + '">'
							if (balldata[j].teamMaster == 1) {
								html +='<div class="teamjian"><img src="images/jian.png"></div>'
							} 
								html +='</div><p>' + balldata[j].membersList[i].rname + '</p></li>'
						}
					}
					if (balldata[j].teamMaster == 1) {
						html += '<li><div class="people_img teamjia"><img src="images/jia.png"></div></li>'
					} else {
					}
					html += '</ul></div>'
				}
				$('#ball_card').html(html);
				btn_jia();
				btn_jian();
				


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