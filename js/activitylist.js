$(document).ready(function() {
	// 已经报名
	// 默认全部加载10条
	$.ajax({
			url: 'http://v.jgsports.com.cn/user/Act/getList',
			type: 'Get',
			dataType: 'json',
			data: {
				type: 0,
				page: 1,
				limit: 6,
				category:1
			},
			success: function(data) {
				// var html = $('#activitylist').html();
				var html = '';
				var actlistdata = data.data;
				for (var i = 0; i < 6; i++) {
					html += '<li><a href="activitydetail.html"><div class="al_img">';
					if (!actlistdata[i].actPhotoAlbumList.picurl) {
						html += '<img src="images/golfdetail1.jpg">';
					}
					html += '<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumNumber + '</div></div>' +
						'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
						'<div class="al_km">' + actlistdata[i].z / 1000 + 'km</div>	</div></a></li>';
				};
				// $("#activitylist").html(html);
				$('.Loading').before(html)
			}
		})
		
	var scrollpage = function(){
			// 滑屏加载数据
		var stop = true;
		page = 2;
		$(window).scroll(function() {
			var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
			if ($(document).height() <= totalheight) {
				if (stop == true) {
					stop = false;
					$.ajax({
						url: 'http://v.jgsports.com.cn/user/Act/getList',
						type: 'Get',
						dataType: 'json',
						data: {
							page: page,
							limit: 2,
							type: 0,
							category:1
							// uid: 304
						},
						success: function(data) {
							var html = '';
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
							$(".Loading").before(html);
							stop = true;
							page++;
							if (data.msg=="暂无活动信息") {
								$(".Loading0").html("全部加载完！");
							}else{
								$(".Loading0").html("Loading...");

							}
						}
					})
				}
			}
		});
	}
	scrollpage();



		// 点击加载各类 0为全部 ， 1 为本周  ，2为本月  3为球场
	$(".al_con").eq(0).show();
	$(".al_title li").click(function() {
			$(this).addClass("cur").siblings().removeClass('cur');
			index = $(this).index();
			$(".al_con").hide().eq($(this).index()).show();
			var actdata = {
				type: index,
				page: 1,
				limit: 2,
				category:1
				// uid: 304,

			}
			$.ajax({
				url: 'http://v.jgsports.com.cn/user/Act/getList',
				type: 'Get',
				dataType: 'json',
				data: actdata,
				success: function(data) {
					// $("#activitylist").html('')
					var html = '';
					var actlistdata = data.data;
					for (var i = 0; i < 2; i++) {
						html += '<li><a href="activitydetail.html"><div class="al_img">';
						if (!actlistdata[i].actPhotoAlbumList.picurl) {
							html += '<img src="images/golfdetail1.jpg">';
						}
						html += '<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumNumber + '</div></div>' +
							'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
							'<div class="al_km">' + actlistdata[i].z / 1000 + 'km</div>	</div></a></li>';
					};
					$(".Loading"+index).before(html);
				}
			});
		})



})