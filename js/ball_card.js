$(document).ready(function($) {
	var ex_code = getCookie("ex_code");
	var ex_mobile = getCookie("ex_mobile");
	var ex_uid = getCookie("ex_uid");
	var btn_jia = function() {
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
			});
		})
	}
	var jianjian = function() {

		$('.ball_card_people').on('click', '.jianjian', function() {
			$(this).parent().parent().addClass('chuxian')
		})
	}
	var ziliao = function(){
		$('.ziliao').click(function() {
			var ziliaouid = $(this).attr('data-uid')
			console.log(ziliaouid)
			$.ajax({
					url: 'http://v.jgsports.com.cn/user/User/getTeamUserInfo',
					type: 'post',
					dataType: 'json',
					data: {
						uid:ziliaouid
					}
				})
				.done(function(data) {
					
					var carddata = data.data;
					var html = '';

					html += '<div class="close_ziliao"><img src="images/c.png" alt=""></div><div class="card_ban"><div class="card_img"><img src="' + carddata.avatar + '"></div><div class="card_con"><div class="xian"><p></p><p>·</p><p></p></div><div class="card_name">' + carddata.rname + '</div><div class="card_des">' + carddata.signature + '</div><div class="card_qiu"><span>球龄</span>' + carddata.ball_age + '<span>差点</span>' + carddata.almost + '</div></div></div><div class="card_vip">';
					
					if (carddata.membership.length == 0) {
						html += '无'
					}else{
						for (var i = 0; i < carddata.membership.length; i++) {
						html += '' + carddata.membership[i].title + '<br>'
						}
					}
					
					
					html += '</div><div class="card_tel">' + carddata.tel + '</div><div class="card_email">' + carddata.email + '</div><div class="hengxian"><p></p><p>·</p><p></p></div><div class="card_company">公司：' + carddata.company_describe + '</div><div class="card_post">职务：' + carddata.position + '</div><div class="card_city">城市：' + carddata.city + '</div><div class="card_resources">资源：' + carddata.resources + '</div></div>'
					$('.card').html(html)
					$('.gerenziliao').css('height','100%')


				})
			
		});
		$('.gerenziliao').on('click', '.close_ziliao', function() {
			$('.gerenziliao').css('height','0%');
			setTimeout(function(){ $('.card').html('')},400);


		});
	}
	var btn_jian = function() {
		$('.ball_card_people').on('click', '.teamjian', function() {
			console.log($(this).parent().parent().attr('data-teamId'))
			console.log($(this).parent().attr('data-uid'))
			var jiandata = {
				teamid: $(this).parent().parent().attr('data-teamId'),
				uid: $(this).parent().attr('data-uid')
			}
			$.ajax({
					url: 'http://v.jgsports.com.cn/user/Team/signOutTeam',
					type: 'post',
					dataType: 'json',
					data: jiandata,
				})
				.done(function() {
					$('.ball_card_people').removeClass('chuxian')
					ballCar();
				})
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
							html += '<li data-uid="' + balldata[j].membersList[i].uid + '" class="ziliao"> '
							if (balldata[j].teamMaster == 1) {
								html += '<div class="teamjian"><img src="images/jian.png"></div>'
							}

							
							
							html += '<div class="people_img"><img src="' + balldata[j].membersList[i].avatar + '"></div><p>' + balldata[j].membersList[i].rname + '</p></li>'
						}
					}
					if (balldata[j].teamMaster == 1) {
						html += '<li><div class="people_img teamjia"><img src="images/jia.png"></div></li><li><div class="people_img jianjian"><img src="images/jian.png"></div></li>'
					} 
					html += '</ul></div>'
				}
				$('#ball_card').html(html);
				btn_jia();
				btn_jian();
				jianjian();
				ziliao();
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