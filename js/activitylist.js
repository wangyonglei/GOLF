$(document).ready(function() {
	//滚动加载
	// $(window).scroll(function() {
	// 		var docheight = $(document).height();
	// 		var s_top = $(this).scrollTop();
	// 		var nowheight = $(this).height();
	// 		var page = 1;
	// 		var limit = 1;
	// 		if (docheight - s_top - nowheight < 5) {
	// 			
	// 		}
	// 	})
	var stop = true;
	$(window).scroll(function() {
		var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
		if ($(document).height() <= totalheight) {
			if (stop == true) {
				stop = false;
				var page = 2;
				$.ajax({
					url: 'http://v.jgsports.com.cn/user/Act/getList',
					type: 'Get',
					dataType: 'json',
					data: {
						page: page,
						limit: 1,
						type: 0,
						uid: 304
					},
					success: function(data) {
						var html;
						var actlistdata = data.data;
						for (var i = 0; i < actlistdata.length; i++) {
							html += '<li><a href="activitydetail.html"><div class="al_img">';
							if (!actlistdata[i].actPhotoAlbumList.picurl) {
								html += '<img src="images/golfdetail1.jpg">';
							}
							html += '<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumNumber + '</div></div>' +
								'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
								'<div class="al_km">' + actlistdata[i].z / 1000 + 'km</div>	</div></a></li>';
						};
						$("#Loading").before(html);
						stop = true;
						// page = page+1;
					}
				})
			}
		}
	});
	// 默认全部加载
	$.ajax({
			url: 'http://v.jgsports.com.cn/user/Act/getList',
			type: 'Get',
			dataType: 'json',
			data: {
				type: 0,
				uid: 304,
				page:1,
				limit:5
			},
			success: function(data) {
				var html = $('#activitylist').html();
				var actlistdata = data.data;
				for (var i = 0; i < 5; i++) {
					html += '<li><a href="activitydetail.html"><div class="al_img">';
					if (!actlistdata[i].actPhotoAlbumList.picurl) {
						html += '<img src="images/golfdetail1.jpg">';
					}
					html += '<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumNumber + '</div></div>' +
						'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
						'<div class="al_km">' + actlistdata[i].z / 1000 + 'km</div>	</div></a></li>';
				};
				$("#activitylist").html(html);
			}
		})
		// 点击加载各类 0为全部 ， 1 为本周  ，2为本月  3为球场
	var uid = 304;
	$(".al_title li").click(function() {
		$(this).addClass("cur").siblings().removeClass('cur');
		var index = $(this).index();
		var actdata = {
			type: index,
			uid: 304,
		}
		$.ajax({
			url: 'http://v.jgsports.com.cn/user/Act/getList',
			type: 'Get',
			dataType: 'json',
			data: actdata,
			success: function(data) {}
		})
	})
})