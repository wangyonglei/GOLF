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
						activitydetail()
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
		activitydetail();
	}
	function activitydetail() {
		// 获取act_id
		(function($) {
			$.getUrlParam = function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			}
		})(jQuery);
		var id = $.getUrlParam('id');
		//加载信息
		$.ajax({
				url: 'http://v.jgsports.com.cn/user/Act/getDetails?act_id=' + id,
				type: 'Get',
				dataType: 'json',
				data: {
					act_id: id
				},
				success: function(data) {
					var act_det = data.data;
					var html = '';
					html += '<div class="banner"><div class="swiper-container"><div class="swiper-wrapper">';
					for (var i = 0; i < act_det.venueImgList.length; i++) {
						html += '<div class="swiper-slide"><img src="' + act_det.venueImgList[i] + '"></div>';
					}
					html += '</div><div class="swiper-pagination"></div></div></div><h1 class="title">' + act_det.title + '<span>'
					if (act_det.actStatus == 0) {
						html += '活动结束'
					} else {
						html += '进行中'
					}
					html += '</span></h1>' +
						'<div class="wai"><div class="weizhi duan" data-x="' + act_det.lngX + '" data-y="' + act_det.latY + '"><a href="navigation.html?id=' + act_det.id + '&x=' + act_det.lngX + '&y=' + act_det.latY + '&name=' + act_det.venueTitle + '">' + act_det.venueTitle + '<span class="jiao"></span></a></div><div class="date duan">' + act_det.act_date_str + '<span class="jiao"></span></div></div>' +
						'<div class="wai"><div class="yaoqing duan">';
					for (var i = 0; i < act_det.joinActMembers.length; i++) {
						html += act_det.joinActMembers[i].rname;
					}
					html += '（' + act_det.joinActMembersNumber + '人）<span class="jiao"></span></div>	<ul class="renwu">';
					for (var i = 0; i < act_det.joinActMembers.length; i++) {
						html += '<li><div class="renwuicon">';
						if (!act_det.joinActMembers.avatar) {
							html += '<img src="images/card_img.jpg">';
						} else {
							html += '<img src="' + act_det.joinActMembers[i].avatar + '">';
						}
						html += '</div><div class="renwuname">' + act_det.joinActMembers[i].rname + '</div><div class="renwuqianming">' + act_det.joinActMembers[i].signature + '</div><div class="huodongquan">活动圈3月首发</div></li>'
					}
					html += '</ul></div>'
					$('#activitydetail').html(html);
					var swiper = new Swiper('.swiper-container', {
						pagination: '.swiper-pagination',
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev',
						paginationClickable: true,
						spaceBetween: 10,
						centeredSlides: true,
						autoplay: 2500,
						autoplayDisableOnInteraction: false
					});
					pinglun();
					photos();
					// var photoshtml = ''
					// for (var i = 0; i < act_det.actPhotoAlbumList.length; i++) {
					// 	photoshtml += '<li><a href="photodetail.html?"><img src="' + act_det.actPhotoAlbumList[i].picurl + '"></a></li>';
					// }
					// $('.zhaopianimg ul').html(photoshtml);
					if (act_det.joinStatus ==1) {
						$('.jifenka').html('积分卡')
					}else{
						$('.jifenka').html('报名')
					}
				}
			})
			// 刷新评论
		var pinglun = function() {
				$.ajax({
					url: 'http://v.jgsports.com.cn/user/Act/getDetails?act_id=' + id,
					type: 'Get',
					dataType: 'json',
					data: {
						act_id: id,
						code: code
					},
					success: function(data) {
						var html = '';
						var pinglundata = data.data;
						for (var i = 0; i < pinglundata.actCommentList.length; i++) {
							html += '<li><div class="pinglunicon"><img src="' + pinglundata.actCommentList[i].avatar + '"></div><div class="pinglunname">' + pinglundata.actCommentList[i].rname + '</div>	<div class="pingluncon">' + pinglundata.actCommentList[i].content + '</div><div class="pinglundate">' + pinglundata.actCommentList[i].c_time + '</div></li>';
						}
						$('.pinglunlist').html(html);
						$('.huifu').val('')
					}
				})
			}
			//评论
		$('.huifubtn').click(function(event) {
				var content = $('.huifu').val();
				$.ajax({
					url: 'http://v.jgsports.com.cn/user/Act/releaseActComment',
					type: 'post',
					dataType: 'json',
					data: {
						act_id: id,
						content: content,
						code: code
					},
					success: function(data) {
						pinglun();
					}
				})
			})
			// 加载活动图册
		var photos = function() {
			$.ajax({
				url: 'http://v.jgsports.com.cn/user/Act/getDetails?act_id=' + id,
				type: 'Get',
				dataType: 'json',
				success: function(data) {
					var html = '';
					var tucedata = data.data;
					for (var i = 0; i < tucedata.actPhotoAlbumList.length; i++) {
						html += '<li><a href="photodetail.html?album_id=' + tucedata.actPhotoAlbumList[i].id + '"><img src="' + tucedata.actPhotoAlbumList[i].picurl + '"></a></li>';
					}
					$('.zhaopianimg ul').html(html);
					$('.photos').val('')
				}
			})
		}
		function ajaxFileUpload() {
			$.ajaxFileUpload({
				url: 'http://v.jgsports.com.cn/user/Act/addPhotoAlbum',
				secureuri: false,
				fileElementId: 'file1',
				// dataType: 'json',
				data: {
					// uid: 304
					code: code,
					act_id: id,
					photos: photos
				},
				success: function(data, status) {
					photos();
					upload();
				},
				error: function(data, status, e) {
					console.log('error')
				}
			})
			return false;
		}
		var upload = function() {
			$('.photos').change(function(event) {
				ajaxFileUpload();
			});
		}
		upload();


		if (true) {}
	}
});