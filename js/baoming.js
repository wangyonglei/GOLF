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
						bm();
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
		bm();
	}



	function bm() {
		var id = decodeURIComponent((new RegExp('[?|&]id=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;

		// 刷新报名页面
		function baoming() {
			$.ajax({
					url: 'http://v.jgsports.com.cn/user/Act/getJoinActMembers',
					type: 'get',
					dataType: 'json',
					data: {
						code: code,
						act_id: id
					}
				})
				.done(function(data) {
					var baomingdata = data.data;
					var html = '';
					for (var i = 0; i < baomingdata.joinUserList.length; i++) {
						html += '<li><div class="people_img"><img src="' + baomingdata.joinUserList[i].avatar + '"></div><p>' + baomingdata.joinUserList[i].rname + '</p></li>'
					}
					$('.yibaoming_people ul').html(html);
					var htmlwei = '';
					for (var i = 0; i < baomingdata.noJoinUserList.length; i++) {
						htmlwei += '<li><div class="people_img"><img src="' + baomingdata.noJoinUserList[i].avatar + '"></div><p>' + baomingdata.noJoinUserList[i].rname + '</p></li>'
					}
					$('.weibaoming_people ul').html(htmlwei);
				})
		}
		baoming();

















		// 新增邀请
		
			$('.jiajian').click(function() {
				$('.tongxunlu_mask').css('display', 'block');
				$('.ball_card').css('display', 'block');
				tongxunlu();
			
			});
	






















		function tongxunlu() {


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
								html += '<li data-uid="' + balldata[j].membersList[i].uid + '" data-rname="' + balldata[j].membersList[i].rname + '" class="ziliao"> '
								if (balldata[j].teamMaster == 1) {
									html += '<div class="teamjian"><img src="images/jian.png"></div>'
								}
								html += '<div class="people_img"><img src="' + balldata[j].membersList[i].avatar + '"></div><p>' + balldata[j].membersList[i].rname + '</p></li>'
							}
						}
						html += '</ul></div>'
					}
					$('#ball_card').html(html);
					tongxunlu_id();
				})
		}





		var tongxunlu_id = function(){
			var htmlrname =''
			$('.people_img').click(function() {
				var ziliaouid = $(this).parent().attr('data-uid');


				// $('.datadata').append(ziliaouid+',')
				$('.datadata').html(ziliaouid)
				$('.tongxunlu_mask').css('display', 'none');
				$('.ball_card').css('display', 'none');

			chenggongfanhui();
				
			});
		
		}


		function chenggongfanhui(){
			var uidval = parseInt($('.datadata').html());
			$.ajax({
					url: 'http://v.jgsports.com.cn/user/Act/inviteUserJoinAct',
					type: 'post',
					dataType: 'json',
					data: {
						code: code,
						act_id: id,
						joinMember: uidval
					}
				})
				.done(function(data) {
					if (data.msg=="邀请人员不能为空") {
						baoming()
						alert("邀请人员不能为空")
					}else if (data.msg=="您不是活动的发布者"){
						alert("您不是活动的发布者")
					}

					
				
					
					
				})
		}


		$('.tongxunlu_mask').click(function() {
				$('.tongxunlu_mask').css('display', 'none');
				$('.ball_card').css('display', 'none');
		})































	}
})