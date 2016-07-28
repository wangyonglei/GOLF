$(document).ready(function() {
// 获取id参数
	(function($) {
	    $.getUrlParam = function(name) {
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) return unescape(r[2]);
	        return null;
	    }
	})(jQuery);
	var id = $.getUrlParam('id');
		// 获取内容参数
	$.ajax({
			url: 'http://v.jgsports.com.cn/user/Venue/getDetails?venue_id='+id,
			type: 'GET',
			dataType: 'json',
			data: {},
		})
		.done(function(data) {
			var golfdetail = data.data;
			var html = "";
			html += '<div class="banner"><div class="swiper-container"><div class="swiper-wrapper" id="banner">';
			for (var i = 0; i <golfdetail.venue_img_list.length; i++) {
				html += '<div class="swiper-slide"><img src="' + golfdetail.venue_img_list[i] + '"></div>';
			}
			html +='</div><div class="swiper-pagination"></div></div></div>';
			html +='<h1 class="title"><a href="navigation.html?id='+golfdetail.id+'&x='+golfdetail.lng_x+'&y='+golfdetail.lat_y+'&name='+golfdetail.title+'">' +
				golfdetail.title + '</h1><div class="wai"><div class="daohang duan" data-x="'+golfdetail.lng_x+'" data-y="'+golfdetail.lat_y+'">' +
				golfdetail.route + '<span class="jiao"></span></a></div><div class="weizhi duans">' +
				golfdetail.address + '</div></div><div class="tel chang"><a href="tel:' + golfdetail.tel +'">' +
				golfdetail.tel + '<span class="jiao"></span></a></div><div class="dong chang"><a href="gonglue.html?id='+golfdetail.id+'">' +
				golfdetail.hole + '洞<span class="jiao"></span></a></div><div class="wai"><div class="des changs">' +
				golfdetail.description + '</div></div><div class="foot"><div class="yuding">立即预定</div><div class="actives"><a href="launch.html?id='+golfdetail.id+'">发起活动</a></div></div>';
			$("#golfdetail").html(html);
			// 初始化banner
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

		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
});