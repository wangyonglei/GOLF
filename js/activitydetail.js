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
					},
					success: function(data) {
						activitydetail()
					}
				})
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
				} else if (act_det.actStatus == 1) {
					html += '进行中'
				} else if (act_det.actStatus == 2) {
					html += '未开始'
				}
				html += '</span></h1>' +
					'<div class="wai"><div class="weizhi duan" data-x="' + act_det.lngX + '" data-y="' + act_det.latY + '"><a href="navigation.html?id=' + act_det.id + '&x=' + act_det.lngX + '&y=' + act_det.latY + '&name=' + act_det.venueTitle + '">' + act_det.venueTitle + '<span class="jiao"></span></a></div><div class="date duan">' + act_det.act_date_str + '<span class="jiao"></span></div></div>' +
					'<div class="wai"><div class="yaoqing duan"><a href="baoming.html?id=' + act_det.id + '">';
				for (var i = 0; i < act_det.joinActMembers.length; i++) {
					html += act_det.joinActMembers[i].rname;
				}
				html += '（' + act_det.joinActMembersNumber + '人）<span class="jiao"></span></a></div>	<ul class="renwu">';
				for (var i = 0; i < act_det.joinActMembers.length; i++) {
					html += '<li><div class="renwuicon"><img src="' + act_det.joinActMembers[i].avatar + '"></div><div class="renwuname">' + act_det.joinActMembers[i].rname + '</div><div class="renwuqianming">' + act_det.joinActMembers[i].signature + '</div></li>' //<div class="huodongquan">活动圈3月首发</div>
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
				// var btn = ''
				// btn += '<div class="jifenka">积分卡</div><div class="shifoubaoming">报名</div>'
				// $('.jifenkabtn').html(btn);
				// xianshijifen()
				var jifenhtml = ''
				for (var i = 0; i < act_det.userIntegralCardList.length; i++) {
						if (act_det.actStatus == 1) {
							if (act_det.userIntegralCardList[i].isMaster == 1) {
								jifenhtml += '<div class="chegnjitit"><p>洞数</p><p>成绩</p></div><ul class="chengjicon"><li><a href="jifenka.html?id=' + act_det.userIntegralCardList[i].id + '"><div class="chengjiicon"><img src="' + act_det.userIntegralCardList[i].avatar + '"></div><div class="chengjiname">' + act_det.userIntegralCardList[i].rname + '</div><p>' + act_det.userIntegralCardList[i].handicap + '</p><p>' + act_det.userIntegralCardList[i].holeNumber + '</p></a></li></ul>'

							}else{
								jifenhtml += '<div class="chegnjitit"><p>洞数</p><p>成绩</p></div><ul class="chengjicon"><li><a href="jifen.html?id=' + act_det.userIntegralCardList[i].id + '"><div class="chengjiicon"><img src="' + act_det.userIntegralCardList[i].avatar + '"></div><div class="chengjiname">' + act_det.userIntegralCardList[i].rname + '</div><p>' + act_det.userIntegralCardList[i].handicap + '</p><p>' + act_det.userIntegralCardList[i].holeNumber + '</p></a></li></ul>'

							}


						}
						if(act_det.actStatus == 2) {
							jifenhtml += '<div class="chegnjitit"><p>洞数</p><p>成绩</p></div><ul class="chengjicon"><li><div class="chengjiname">暂无</div></li></ul>'

						}
						if(act_det.actStatus == 0) {
							jifenhtml += '<div class="chegnjitit"><p>洞数</p><p>成绩</p></div><ul class="chengjicon"><li><a href="jifen.html?id=' + act_det.userIntegralCardList[i].id + '"><div class="chengjiicon"><img src="' + act_det.userIntegralCardList[i].avatar + '"></div><div class="chengjiname">' + act_det.userIntegralCardList[i].rname + '</div><p>' + act_det.userIntegralCardList[i].handicap + '</p><p>' + act_det.userIntegralCardList[i].holeNumber + '</p></a></li></ul>'

						}

					
				}
				$('#chengjicon').html(jifenhtml)
				if (act_det.joinStatus == 1) { //joinStatus:判断有没有报名活动
					if (act_det.actStatus == 1) {//判断状态是结束，未开始，还是进行中

						if (act_det.haveScore == 0) { //判断是否有成绩，默认为没有//是否有成绩0--是没有1--是有
							$('.jifenka').show();
							$('.shifoubaoming').hide();
							$('.jifenka').click(function() {
								location = 'addjifenka.html?id='+act_det.id
							})
						}else{
							$('.jifenka').hide();
							$('.shifoubaoming').hide();
						}

					}else{
						//活动未开始，已经结束，此时不显示
						$('.jifenka').hide();
						$('.shifoubaoming').hide();
					}
					
				} else {
					$('.shifoubaoming').show();
					$('.jifenka').hide();
					shifoubaoming();
				}
			}
		})
		// 报名
		function shifoubaoming() {
			$('.shifoubaoming').click(function() {
				$.ajax({
					url: 'http://v.jgsports.com.cn/user/Act/userJoinAct',
					type: 'post',
					dataType: 'json',
					data: {
						act_id: id,
						code: code
					},
					success: function(data) {
						$('.jifenka').show();
						$('.shifoubaoming').hide();
					}
				})
			})
		}
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
		// 上传活动图册
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
		// 初始化图册上传控件
		var upload = function() {
			$('.photos').change(function(event) {
				ajaxFileUpload();
			});
		}
		upload();
	}
});