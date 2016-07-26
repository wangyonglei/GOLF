$(document).ready(function() {
	// 默认全部加载
	$.ajax({
			url: 'http://v.jgsports.com.cn/user/Act/getList',
			type: 'Get',
			dataType: 'json',
			data: {
				type: 0,
				uid: 304,
			},
			success: function(data) {
				var html = "";
				var actlistdata = data.data;
				for (var i = 0; i < actlistdata.length; i++) {
					html += '<li><div class="al_img"><img src="' + actlistdata[i].actPhotoAlbumList.picurl + '">' +
						'<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumList.actPhotoAlbumNumber + '</div></div>' +
						'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
						'<div class="al_km">' + actlistdata[i].z / 1000 + 'km</div>	</div>	</li>';
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
			success: function(data) {
				var html = "";
				var actlistdata = data.data;
				for (var i = 0; i < actlistdata.length; i++) {
					html += '<li><div class="al_img"><img src="' + actlistdata[i].actPhotoAlbumList.picurl + '">' +
						'<div class="al_mask"></div><div class="al_mask_img">' + actlistdata[i].actPhotoAlbumList.actPhotoAlbumNumber + '</div></div>' +
						'<div class="alright_con"><h1>' + actlistdata[i].title + '</h1><p>' + actlistdata[i].act_date + '</p><p>' + actlistdata[i].venueTitle + '</p>' +
						'<div class="al_km">' + actlistdata[i].z / 1000 + 'km</div>	</div>	</li>';
				};
				$("#activitylist").html(html);
			}
		})
	})
})