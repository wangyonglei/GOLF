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
					if (data.status = 1) {
						var listdata = data.data;
						var html = "";
						for (var i = 0; i < listdata.length; i++) {
							html += '<li>' + listdata[i].title + '<p class="jiao"></p></li>';
						};
						// $("#ball_list").html(html);
						$('.loading').before(html)
					}
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
			$('.yaoqing_yq').html('')
		})
		$('.yaoqing_btn').click(function(event) {

			var rname = $('.yaoqing_name').val();
			var mobile = $('.yaoqing_tel').val();
			$('.yaoqing_yq').append(rname);
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
		// 发布邀请活动
		$('#yaoqinghuodong').click(function() {
			var dataval = {
				data: $('.datadata').html(),
				uid: 304,
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
					console.log('发布邀请活动成功！O(∩_∩)O哈哈~')
					if (confirm("发布活动成功！确定-进入活动列表")) {
						window.location.href = "activitylist.html"
					}
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
									ballhtml += '<li>' + listdata[i].title + '<p class="jiao"></p></li>';
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