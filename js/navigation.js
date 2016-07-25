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
			url: 'http://v.jgsports.com.cn/user/Venue/getDetails?venue_id=' + id,
			type: 'GET',
			dataType: 'json',
			data: {},
		})
		.done(function(data) {
			// var data = jQuery.parseJSON(data);
			var navigation = data.data;
			var golf_name = navigation.title;
			var x = navigation.lng_x;
			var y = navigation.lat_y;
			var xy = [+x, +y];
			// console.log(xy)
			var map = new AMap.Map('container', {
				resizeEnable: true,
				zoom: 10,
				center: xy
			});
			var marker = new AMap.Marker({
				position: xy
			});
			marker.setMap(map);
			marker.on('click', function(e) {
				infowindow.open(map, e.target.getPosition());
			})
			AMap.plugin('AMap.AdvancedInfoWindow', function() {
				infowindow = new AMap.AdvancedInfoWindow({
					content: '<div class="info-title">' + golf_name + '</div><div class="info-content">',
					offset: new AMap.Pixel(0, -30)
				});
				infowindow.open(map, xy);
			})
		})
});