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
			url: 'http://v.jgsports.com.cn/user/Act/getDetails',
			type: 'Get',
			dataType: 'json',
			data: {
				id:id
			},
			success: function(data) {
				console.log('2')
			}
		})
})