$(document).ready(function() {
	// 加载列表
	$.ajax({
			url: 'http://v.jgsports.com.cn/user/Venue/getList',
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
					html += '<li><a href="golfdetail.html?id=' + listdata[i].id + '">' + listdata[i].title + '<p class="jiao"></p></a></li>';
				};
				// $("#ball_list").html(html);
				$('.loading').before(html)
			}
		})
	// 搜索
	 var search = function(){
	 	var title = $('#search_input').val();
	 	$.ajax({
	 		url: 'http://v.jgsports.com.cn/user/Venue/getList?title=' + title,
	 		type: 'GET',
	 		success: function(data) {
	 			var data = jQuery.parseJSON(data);
	 			var searchlist = data.data;
	 			var html = "";
	 			for (var i = 0; i < searchlist.length; i++) {
	 				html += '<li><a href="golfdetail.html?id=' + searchlist[i].id + '">' + searchlist[i].title + '<p class="jiao"></p></a></li>';
	 			};
	 			$("#ball_list").html(html);
	 		}
	 	});
	 }
	$('#search_btn').click(function() {
			search();
		})
	$('#search_input').keyup(function(){
		search();
	})

		// 清楚输入框
	$('#x').click(function() {
		$('#search_input').val('');
	})


//滑动加载
	var stop = true;
	page = 2;
	$(window).scroll(function() {
		var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
		if ($(document).height() <= totalheight) {
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
							ballhtml += '<li><a href="golfdetail.html?id=' + listdata[i].id + '">' + listdata[i].title + '<p class="jiao"></p></a></li>';
						};
						$(".loading").before(ballhtml);
						stop = true;
						page++;
					}
				})
			}
		}
	});
});