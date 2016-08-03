$(document).ready(function() {
	$.ajax({
		url: 'http://v.jgsports.com.cn/user/Act/addUserIntegralCardInfo',
		type: 'post',
		dataType: 'json',
		data: {
			uid: 304,
			act_id: 10,
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
})