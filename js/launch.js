$(document).ready(function() {
	$('.qiuchang').click(function() {
		$('.qiuchang_maxk').css('display', 'block');
		$('.qiuchang_mask').css('display', 'block');
		// 加载列表
		$.ajax({
			url: 'http://v.jiaolianpai.com/user/Venue/getList',
			dataType: 'json',
			type: 'GET',
			success: function(data) {
				if (data.status = 1) {
					var listdata = data.data;
					var html = "";
					for (var i = 0; i < listdata.length; i++) {
						html += '<li>' + listdata[i].title + '</li>';
					};
					$("#ball_list").html(html);
				}
			}
		})
	})
	$('#ball_list').on('click', 'li', function() {
		$('.qiuchang_input').val('')
		var venue = $(this).html();
		$('.qiuchang_input').val(venue)
		$('.qiuchang_maxk').css('display', 'none');
		$('.qiuchang_mask').css('display', 'none');
	})
	$('.qiuchang_mask').click(function() {
		$('.qiuchang_maxk').css('display', 'none');
		$('.qiuchang_mask').css('display', 'none');
	})
	$('#yaoqinghuodong').click(function() {
		var dataval = {
			title: $('.faqi_input').val(),
			act_date: $('#pickdate').val(),
			act_time: $('#picktime').val(),
			remarks: $('.beizhu_input').val(),
			venue_id: $('.qiuchang_input').val(),
			join_member : $('.yaoqing').val()
		}
		$.ajax({
				url: 'http://v.jiaolianpai.com/user/Act/addInfo',
				type: 'post',
				dataType: 'json',
				data: dataval
			})
			.done(function(data) {
				console.log('成功')
					// uid  用户编号  
					// join_member  邀请参赛人员，用逗号链接的用户编号 
					// title标题 
					// venue_id场馆编号
					// act_date活动日期
					// act_time活动时间
					// remarks备注
			})
	})
	var search = function() {
			var title = $('#search_input').val();
			$.ajax({
				url: 'http://v.jiaolianpai.com/user/Venue/getList?title=' + title,
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
		// 搜索
	$('#search_btn').click(function() {
		search();
	})
	$('#search_input').keyup(function() {
			search();
		})
		// 清楚输入框
	$('#x').click(function() {
		$('#search_input').val('');
	})
});