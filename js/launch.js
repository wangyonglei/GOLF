$(document).ready(function($) {
	var ex_code = getCookie("ex_code");
	var ex_mobile = getCookie("ex_mobile");
	var ex_uid = getCookie("ex_uid");
	var launchs = function() {
		// 球场列表
		$('.qiuchang').click(function() {
			$('.qiuchang_maxk').css('display', 'block');
			$('.qiuchang_mask').css('display', 'block');
			$.ajax({
					url: 'http://v.jgsports.com.cn/user/Venue/getList?page=1&limit=15',
					type: 'Get',
					dataType: 'json',
					data: {
						id: 'title'
					},
				})
				.done(function(data) {
					var listdata = data.data;
					var html = "";
					for (var i = 0; i < listdata.length; i++) {
						html += '<li data-qid="'+ listdata[i].id +'">' + listdata[i].title + '<p class="jiao"></p></li>';
					};
					// $("#ball_list").html(html);
					$('.loading').before(html)
				})
		})
		

		$('#ball_list').on('click', 'li', function() {
			$('.qiuchang_input').val('')
			$('.qiuchang_inputid').html('')
			var venue = $(this).text();
			var venueid = $(this).attr('data-qid');
			$('.qiuchang_input').val(venue);
			$('.qiuchang_inputid').html(venueid);
			$('.qiuchang_maxk').css('display', 'none');
			$('.qiuchang_mask').css('display', 'none');
		})
		$('.qiuchang_mask').click(function() {
				$('.qiuchang_maxk').css('display', 'none');
				$('.qiuchang_mask').css('display', 'none');
			})
			// 球场列表搜索
		var search = function() {
			var title = $('#search_input').val();
			$.ajax({
				url: 'http://v.jgsports.com.cn/user/Venue/getList?title=' + title,
				type: 'GET',
				success: function(data) {
					var data = jQuery.parseJSON(data);
					var searchlist = data.data;
					var html = "";
					for (var i = 0; i < searchlist.length; i++) {
						html += '<li>' + searchlist[i].title + '</li>';
					};
					$("#ball_list").html(html);
				}
			});
		}
		$('#search_btn').click(function() {
			search();
		})
		$('#search_input').keyup(function() {
			search();
		})
		$('#x').click(function() {
				$('#search_input').val('');
			})
			// 邀请好友
		$('.yaoqing').click(function() {
			$('.yaoqing_maxk').css('display', 'block');
			// $('.yaoqing_yq').html('')
		})
		var htmlrname =''
		$('.yaoqing_btn').click(function(event) {
			var rname = $('.yaoqing_name').val();
			var mobile = $('.yaoqing_tel').val();
			htmlrname += ''+rname+',';
			$('.yaoqing_yq').val(htmlrname);
			var yaoqing_namrel = {
				rname: $('.yaoqing_name').val(),
				mobile: $('.yaoqing_tel').val()
			}
			$('.yaoqing_maxk').css('display', 'none');
			$.ajax({
					url: 'http://v.jgsports.com.cn/user/User/addUserInfo',
					type: 'post',
					dataType: 'json',
					data: yaoqing_namrel
				})
				.done(function(data) {
					var data = data.data;
					console.log('O(∩_∩)O哈哈~')
					$('.yaoqing_name').val('');
					$('.yaoqing_tel').val('');
					$('.datadata').html(data)
				})
		});

		// 通讯录icon
		var tongxunlu = function(){
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
						if (balldata[j].teamMaster == 1) {
							html += '<li><div class="people_img teamjia"><img src="images/jia.png"></div></li><li><div class="people_img jianjian"><img src="images/jian.png"></div></li>'
						} 
						html += '</ul></div>'
					}
					$('#ball_card').html(html);
					tongxunlu_id();
				})

		}

		var tongxunlu_id = function(){
			$('.people_img').click(function() {
				var ziliaouid = $(this).parent().attr('data-uid');
				var ziliaouname = $(this).parent().attr('data-rname');
				$.ajax({
						url: 'http://v.jgsports.com.cn/user/User/getTeamUserInfo',
						type: 'post',
						dataType: 'json',
						data: {
							uid:ziliaouid
						}
					})
					.done(function(data) {
						alert(ziliaouid)
						alert(ziliaouname)
						ziliaohtml += ''+ziliaouname+',';
				$('.yaoqing_yq').val(ziliaohtml);
						// var carddata = data.data;
						// var html = '';

						// html += '<div class="close_ziliao"><img src="images/c.png" alt=""></div><div class="card_ban"><div class="card_img"><img src="' + carddata.avatar + '"></div><div class="card_con"><div class="xian"><p></p><p>·</p><p></p></div><div class="card_name">' + carddata.rname + '</div><div class="card_des">' + carddata.signature + '</div><div class="card_qiu"><span>球龄</span>' + carddata.ball_age + '<span>差点</span>' + carddata.almost + '</div></div></div><div class="card_vip">';
						
						// if (carddata.membership.length == 0) {
						// 	html += '无'
						// }else{
						// 	for (var i = 0; i < carddata.membership.length; i++) {
						// 	html += '' + carddata.membership[i].title + '<br>'
						// 	}
						// }
						
						
						// html += '</div><div class="card_tel">' + carddata.tel + '</div><div class="card_email">' + carddata.email + '</div><div class="hengxian"><p></p><p>·</p><p></p></div><div class="card_company">公司：' + carddata.company_describe + '</div><div class="card_post">职务：' + carddata.position + '</div><div class="card_city">城市：' + carddata.city + '</div><div class="card_resources">资源：' + carddata.resources + '</div></div>'
						// $('.card').html(html)


					})
				
			});
		
		}



		$('.righticon').click(function(){
			$('.tongxunlu_mask').css('display', 'block');
			$('.ball_card').css('display', 'block');
			tongxunlu()



		})
		$('.tongxunlu_mask').click(function() {
				$('.tongxunlu_mask').css('display', 'none');
				$('.ball_card').css('display', 'none');
			})
		// 发布邀请活动
		$('#yaoqinghuodong').click(function() {
			var dataval = {
				data: $('.datadata').html(),
				// uid: 304,
				title: $('.faqi_input').val(),
				act_date: $('#pickdate').val(),
				act_time: $('#picktime').val(),
				remarks: $('.beizhu_input').val(),
				venue_id: $('.qiuchang_inputid').html(),
				join_member : $('.yaoqing').val()
			}
			$.ajax({
					url: 'http://v.jgsports.com.cn/user/Act/addInfo',
					type: 'post',
					dataType: 'json',
					data: dataval
				})
				.done(function(data) {
					// console.log('发布邀请活动成功！O(∩_∩)O哈哈~')
					// if (confirm("发布活动成功！确定-进入活动列表")) {
					// 	window.location.href = "activitylist.html"
					// }
				})
		})
		//滑动加载
		var stop = true;
		page = 2;
		$('.qiuchang_maxk').scroll(function() {
			var totalheight = parseFloat($('.qiuchang_maxk').height()) + parseFloat($('.qiuchang_maxk').scrollTop());
			if ($("#ball_list").height() <= totalheight) {
				if (stop == true) {
					stop = false;
					$.ajax({
						url: 'http://v.jgsports.com.cn/user/Venue/getList',
						type: 'Get',
						dataType: 'json',
						data: {
							page: page,
							limit: 10,
						},
						success: function(data) {
							var listdata = data.data;
							var ballhtml = "";
							for (var i = 0; i < listdata.length; i++) {
								ballhtml += '<li  data-qid="'+ listdata[i].id +'">' + listdata[i].title + '<p class="jiao"></p></li>';
							};
							$(".loading").before(ballhtml);
							stop = true;
							page++;
						}
					})
				}
			}
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
						launchs()
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
		launchs()
	}
});