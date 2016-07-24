$(document).ready(function() {
	// 加载列表
	$.ajax({
			url: 'http://v.jiaolianpai.com/user/Venue/getList',
			type: 'Get',
			dataType: 'json',
			data: {
				id: 'title'
			},
		})
		.done(function(data) {
			// console.log("success");
			if (data.status = 1) {
				var listdata = data.data;
				var html = "";
				for (var i = 0; i < listdata.length; i++) {
					html += '<li><a href="golfdetail.html?id=' + listdata[i].id + '">' + listdata[i].title + '<p class="jiao"></p></a></li>';
				};
				$("#ball_list").html(html);
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	// 搜索
	 var search = function(){
	 	var title = $('#search_input').val();
	 	$.ajax({
	 		url: 'http://v.jiaolianpai.com/user/Venue/getList?title=' + title,
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
	// 搜索
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
});