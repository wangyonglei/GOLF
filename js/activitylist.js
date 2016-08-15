$(document).ready(function() {
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
						activitylists()
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
		activitylists();
	}
	function activitylists() {
		$.ajax({
			url: 'http://v.jgsports.com.cn/user/Act/getList',
			type: 'Get',
			dataType: 'json',
			data: {
				type: 0,
				page: 1,
				limit: 7,
				category: category,
				code: code
			},
			success: function(data) {
				// var html = $('#activitylist').html();
				var html = '';
				var actlistdata = data.data;
				var j = actlistdata.length;
				if (j <= 7) {
					for (var i = 0; i < j; i++) {
						html += '<li><a href="activitydetail.html"><div class="al_img">';
						if (!actlistdata[i].actPhotoAlbumList.picurl) {
							html += '<img src="images/golfdetail1.jpg">';
						} else {
							html += '<img src="' + actlistdata[i].actPhotoAlbumList.picurl + '">';
						}
						html += '<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumNumber + '</div></div>' +
							'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
							'<div class="al_km">' + actlistdata[i].z / 1000 + 'km</div>	</div></a></li>';
						$("#activitylist").html(html);
						$('.Loading').html('全部加载完！')
							// scrollpage(0);
					};
				} else {
					console.log('默认'+limit)
					for (var i = 0; i < limit; i++) {
						html += '<li><a href="activitydetail.html"><div class="al_img">';
						if (!actlistdata[i].actPhotoAlbumList.picurl) {
							html += '<img src="images/golfdetail1.jpg">';
						} else {
							html += '<img src="' + actlistdata[i].actPhotoAlbumList.picurl + '">';
						}
						html += '<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumNumber + '</div></div>' +
							'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
							'<div class="al_km">' + actlistdata[i].z / 1000 + 'km</div>	</div></a></li>';
					};
					$("#activitylist").html(html);
					if (data.msg == "暂无活动信息") {
						$(".Loading").html("全部加载完！");
					} else {
						$(".Loading").html("Loading...");
					}
					// $('.Loading0').before(html)
					scrollpage(0);
				}
			}
		})
		var scrollpage = function(type) {
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
								type: type,
								category: category,
								code: code
							},
							success: function(data) {
								var html = '';
								var actlistdata = data.data;
								console.log('滑屏'+limit)
								for (var i = 0; i < limit; i++) {
									html += '<li><a href="activitydetail.html"><div class="al_img">';
									if (!actlistdata[i].actPhotoAlbumList.picurl) {
										html += '<img src="images/golfdetail1.jpg">';
									}
									html += '<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumNumber + '</div></div>' +
										'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
										'<div class="al_km">' + actlistdata[i].z / 1000 + 'km</div>	</div></a></li>';
								};
								// $(".Loading"+type).before(html);
								$('#activitylist').html(html)
								stop = true;
								page++;
								if (data.msg == "暂无活动信息") {
									$(".Loading").html("全部加载完！");
								} else {
									$(".Loading").html("Loading...");
								}
							}
						})
					}
				}
			});
		}
		// 点击加载各类 0为全部 ， 1 为本周  ，2为本月  3为球场
		$(".al_title li").click(function() {
			$(this).addClass("cur").siblings().removeClass('cur');
			index = $(this).index();
			// $(".al_con").hide().eq($(this).index()).show();
			var actdata = {
				type: index,
				page: 1,
				limit: 7,
				category: category,
				code: code
			}
			$.ajax({
				url: 'http://v.jgsports.com.cn/user/Act/getList',
				type: 'Get',
				dataType: 'json',
				data: actdata,
				success: function(data) {
					$('#activitylist').html('')
					var html = '';
					var actlistdata = data.data;
					// for (var i = 0; i < 7; i++) {
					// 	html += '<li><a href="activitydetail.html"><div class="al_img">';
					// 	if (!actlistdata[i].actPhotoAlbumList.picurl) {
					// 		html += '<img src="images/golfdetail1.jpg">';
					// 	}
					// 	html += '<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumNumber + '</div></div>' +
					// 		'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
					// 		'<div class="al_km">' + actlistdata[i].z / 1000 + 'km</div>	</div></a></li>';
					// };


					var j = actlistdata.length;
					if (j <= 7) {
						for (var i = 0; i < j; i++) {
							html += '<li><a href="activitydetail.html"><div class="al_img">';
							if (!actlistdata[i].actPhotoAlbumList.picurl) {
								html += '<img src="images/golfdetail1.jpg">';
							} else {
								html += '<img src="' + actlistdata[i].actPhotoAlbumList.picurl + '">';
							}
							html += '<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumNumber + '</div></div>' +
								'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
								'<div class="al_km">' + actlistdata[i].z / 1000 + 'km</div>	</div></a></li>';
							$("#activitylist").html(html);
							$('.Loading').html('全部加载完！')
								scrollpage(index);
						};
					} else {
						console.log('点击'+limit)
						for (var i = 0; i < limit; i++) {
							html += '<li><a href="activitydetail.html"><div class="al_img">';
							if (!actlistdata[i].actPhotoAlbumList.picurl) {
								html += '<img src="images/golfdetail1.jpg">';
							} else {
								html += '<img src="' + actlistdata[i].actPhotoAlbumList.picurl + '">';
							}
							html += '<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumNumber + '</div></div>' +
								'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
								'<div class="al_km">' + actlistdata[i].z / 1000 + 'km</div>	</div></a></li>';
						};
						$("#activitylist").html(html);
						if (data.msg == "暂无活动信息") {
							$(".Loading").html("全部加载完！");
						} else {
							$(".Loading").html("Loading...");
						}
						// $('.Loading0').before(html)
						scrollpage(index);
					}




					// $(".Loading"+index).before(html);
					// $('#activitylist').html(html)
					// scrollpage(index);
				}
			});
		})
	}
})