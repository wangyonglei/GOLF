$(document).ready(function() {
		// 球场列表
	$('.qiuchang').click(function() {
		$('.qiuchang_maxk').css('display', 'block');
		$('.qiuchang_mask').css('display', 'block');
		$.ajax({
			url: 'http://v.jgsports.com.cn/user/Venue/getList',
			dataType: 'json',
			type: 'GET',
			success: function(data) {
				if (data.status = 1) {
					var listdata = data.data;
					var html = "";
					for (var i = 0; i < listdata.length; i++) {
						html += '<li data-qid="' + listdata[i].id + '">' + listdata[i].title + '</li>';
					};
					$("#ball_list").html(html);
				}
			}
		})
	})
	$('#ball_list').on('click', 'li', function() {
		$('.qiuchang_input').val('')
		$('.qiuchang_inputid').html('')
		var venue = $(this).html();
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
});