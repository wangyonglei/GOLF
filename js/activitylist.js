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
			}
		} else {
			alert('请在微信客户端打开！')
		}
	} else {
		activitylists();
	}
	function activitylists() {


		// // 定位
		
		// 	var map = new AMap.Map('map'),
		// 		geolocation = null,
		// 	map.plugin('AMap.Geolocation', function() {
		// 		geolocation = new AMap.Geolocation({
		// 			enableHighAccuracy: true, //是否使用高精度定位，默认:true
		// 			timeout: 10000, //超过10秒后停止定位，默认：无穷大
		// 			maximumAge: 0, //定位结果缓存0毫秒，默认：0
		// 			convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
		// 			showButton: true, //显示定位按钮，默认：true
		// 			buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
		// 			buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
		// 			showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
		// 			showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
		// 			panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
		// 			zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
		// 		});
		// 		map.addControl(geolocation);
		// 		AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
		// 	});
		// 	/*
		// 	 *获取当前位置信息
		// 	 */
		// 	function getCurrentPosition() {
		// 		geolocation.getCurrentPosition();
		// 	};
		// 	/*
		// 	 *解析定位结果
		// 	 */
		// 	function onComplete(data) {
		// 		alert(data.position.getLng())
		// 		alert(data.position.getLat())
		// 	};
		
		// 	getCurrentPosition();
		




// ' + actlistdata[i].z / 1000 + 'km
// ' + actlistdata[i].z / 1000 + 'km<
// ' + actlistdata[i].z / 1000 + 'km<
// ' + actlistdata[i].z / 1000 + 'km<
// ' + actlistdata[i].z / 1000 + 'km<
// ' + actlistdata[i].z / 1000 + 'km<




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
						html += '<li><a href="activitydetail.html?id='+actlistdata[i].id+'"><div class="al_img">';
						if (!actlistdata[i].actPhotoAlbumList.picurl) {
							html += '<img src="images/golfdetail1.jpg">';
						} else {
							html += '<img src="' + actlistdata[i].actPhotoAlbumList.picurl + '">';
						}
						html += '<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumNumber + '</div></div>' +
							'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
							'<div class="al_km"></div>	</div></a></li>';
						$("#activitylist").html(html);
						$('.Loading').html('全部加载完！')
							// scrollpage(0);
					};
				} else {
					for (var i = 0; i < 7; i++) {
						html += '<li><a href="activitydetail.html?id='+actlistdata[i].id+'"><div class="al_img">';
						if (!actlistdata[i].actPhotoAlbumList.picurl) {
							html += '<img src="images/golfdetail1.jpg">';
						} else {
							html += '<img src="' + actlistdata[i].actPhotoAlbumList.picurl + '">';
						}
						html += '<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumNumber + '</div></div>' +
							'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
							'<div class="al_km"></div>	</div></a></li>';
					};
					$("#activitylist").html(html);
					if (data.status == 0) {
						$(".Loading").html("暂无数据");
					}else if (data.status == 1) {
						$(".Loading").html("Loading...");
					}
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
								limit: 7,
								type: type,
								category: category,
								code: code
							},
							success: function(data) {
								var html = '';
								var actlistdata = data.data;
								for (var i = 0; i < 7; i++) {
									html += '<li><a href="activitydetail.html?id='+actlistdata[i].id+'"><div class="al_img">';
									if (!actlistdata[i].actPhotoAlbumList.picurl) {
										html += '<img src="images/golfdetail1.jpg">';
									}
									html += '<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumNumber + '</div></div>' +
										'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
										'<div class="al_km"></div>	</div></a></li>';
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
					// 		'<div class="al_km"></div>	</div></a></li>';
					// };

					var j = actlistdata.length;
					if (j <= 7) {
						for (var i = 0; i < j; i++) {
							html += '<li><a href="activitydetail.html?id='+actlistdata[i].id+'"><div class="al_img">';
							if (!actlistdata[i].actPhotoAlbumList.picurl) {
								html += '<img src="images/golfdetail1.jpg">';
							} else {
								html += '<img src="' + actlistdata[i].actPhotoAlbumList.picurl + '">';
							}
							html += '<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumNumber + '</div></div>' +
								'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
								'<div class="al_km"></div>	</div></a></li>';
							$("#activitylist").html(html);
							$('.Loading').html('全部加载完！')
								scrollpage(index);
						};
					} else {
						
						for (var i = 0; i < 7; i++) {
							html += '<li><a href="activitydetail.html?id='+actlistdata[i].id+'"><div class="al_img">';
							if (!actlistdata[i].actPhotoAlbumList.picurl) {
								html += '<img src="images/golfdetail1.jpg">';
							} else {
								html += '<img src="' + actlistdata[i].actPhotoAlbumList.picurl + '">';
							}
							html += '<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumNumber + '</div></div>' +
								'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
								'<div class="al_km"></div>	</div></a></li>';
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