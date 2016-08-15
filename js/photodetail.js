$(document).ready(function() {

	var ex_code = getCookie("ex_code");
	var ex_mobile = getCookie("ex_mobile");
	var ex_uid = getCookie("ex_uid");
	var createTeam = function() {
		
	}
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
						photodetail()
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
		photodetail()
	}


 function photodetail(){

	(function($) {
		$.getUrlParam = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		}
	})(jQuery);
	var album_id = $.getUrlParam('album_id');
	//加载信息
	$.ajax({
			url: 'http://v.jgsports.com.cn/user/Act/getActPhotoAlbumDetail',
			type: 'post',
			dataType: 'json',
			data: {
				code: code,
				album_id: album_id
			},
			success: function(data) {
				var album = data.data;
				var html = '';
				html += '<div class="photo"><img src="' + album.picurl + '"><span id="islike"></span></div><div class="wai renwu"><ul><li><div class="renwuicon"><img src="' + album.avatar + '"></div><div class="renwuname">' + album.rname + '</div><div class="renwuqianming">' + album.venueTitle + '</div><div class="huodongquan">' + album.c_time + '</div></li></ul></div>'
				$('#photo').html(html);
				pinglun();
				islike();
			}
		})
		// 刷新评论
	var pinglun = function() {
			$.ajax({
				url: 'http://v.jgsports.com.cn/user/Act/getActPhotoAlbumDetail',
				type: 'post',
				dataType: 'json',
				data: {
					code: code,
					album_id: album_id
				},
				success: function(data) {
					var html = '';
					var pinglundata = data.data;
					for (var i = 0; i < pinglundata.picCommentList.length; i++) {
						html += '<li><div class="pinglunicon"><img src="' + pinglundata.picCommentList[i].avatar + '"></div><div class="pinglunname">' + pinglundata.picCommentList[i].rname + '</div>	<div class="pingluncon">' + pinglundata.picCommentList[i].content + '</div><div class="pinglundate">' + pinglundata.picCommentList[i].c_time + '</div></li>';
					}
					$('#pinglunlist').html(html);
					$('.huifu').val('')
				}
			})
		}
		//评论
	$('.huifubtn').click(function(event) {
		var content = $('.huifu').val();
		$.ajax({
			url: 'http://v.jgsports.com.cn/user/Act/releasePicComment',
			type: 'post',
			dataType: 'json',
			data: {
				code: code,
				pic_id: album_id,
				album_id: album_id,
				content: content
			},
			success: function(data) {
				pinglun();
				islike();
			}
		})
	})
	var islike = function() {
			$.ajax({
				url: 'http://v.jgsports.com.cn/user/Act/getActPhotoAlbumDetail',
				type: 'post',
				dataType: 'json',
				data: {
					code: code,
					album_id: album_id
				},
				success: function(data) {
					var album = data.data;
					var html = '';
					html += '<div class="dianzan">' + album.picLikeNumber + '</div><div class="dianzanmask"></div><div class="pinglun">'+album.picCommentNumber+'</div><div class="pinglunmask"></div>'
					$('#islike').html(html)
				}
			})
		}
		//like
	var like = function() {
		$.ajax({
			url: 'http://v.jgsports.com.cn/user/Act/clickLike',
			type: 'post',
			dataType: 'json',
			data: {
				code: code,
				album_id: album_id,
				pic_id: album_id
			},
			success: function(data) {
				islike();
			}
		})
	}
	$('#photo').on('click', '.dianzan', function() {
		like();
	})
	}
})