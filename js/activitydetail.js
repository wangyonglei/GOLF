$(document).ready(function() {
(function($) {
        $.getUrlParam = function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    })(jQuery);
    var id = $.getUrlParam('id');


	$.ajax({
			url: 'http://v.jgsports.com.cn/user/Act/getDetails?act_id='+id,
			type: 'Get',
			dataType: 'json',
			data: {
				act_id:id
			},
			success: function(data) {
				 var act_det =data.data;
				var html='';
				html +='<div class="banner"><div class="swiper-container"><div class="swiper-wrapper">';
				for (var i = 0; i <act_det.venueImgList.length; i++ ){
					html +='<div class="swiper-slide"><img src="'+act_det.venueImgList[i]+'"></div>';
				}
				html +='</div><div class="swiper-pagination"></div></div></div><h1 class="title">'+act_det.title+'<span>进行中</span></h1>'+
'	<div class="wai"><div class="weizhi duan">'+act_det.venueTitle+'<span class="jiao"></span></div><div class="date duan">'+act_det.act_date_str+'<span class="jiao"></span></div></div>'



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
			}
		})
})