$(document).ready(function() {
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
				album_id: album_id
			},
			success: function(data) {
				var album = data.data;
				var html = '';
				html += '<div class="photo"><img src="' + album.picurl + '"><div class="dianzan">1</div><div class="dianzanmask"></div><div class="pinglun"></div><div class="pinglunmask"></div></div><div class="wai renwu"><ul><li><div class="renwuicon"><img src="' + album.avatar + '"></div><div class="renwuname">' + album.rname + '</div><div class="renwuqianming">' + album.rname + '</div><div class="huodongquan">' + album.c_time + '</div></li></ul></div>'
				$('#photo').html(html);
				pinglun();
				like();
			}
		})
		// 刷新评论
	var pinglun = function() {
			$.ajax({
				url: 'http://v.jgsports.com.cn/user/Act/getActPhotoAlbumDetail',
				type: 'post',
				dataType: 'json',
				data: {
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
					uid: 304,
					pic_id: album_id,
					album_id: album_id,
					content: content
				},
				success: function(data) {
					pinglun();
				}
			})
		})
		//like
	var like = function() {
		$.ajax({
			url: 'http://v.jgsports.com.cn/user/Act/clickLike',
			type: 'post',
			dataType: 'json',
			data: {
				uid: 304,
				album_id: album_id,
				pic_id: album_id
			},
			success: function(data) {
				var html ='';
				var likedata = data.data;
				$('.dianzan').html(likedata.picLikeNumber)
			}
		})
	}
	$('body').click(function() {
		// alert(1)
			like();
	})
})