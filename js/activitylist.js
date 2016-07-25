$(document).ready(function() {
	
	function url(type) {
		var map = {
			total: 0,
			week: 1,
			month: 2,
			place: 3,
		};
		var url = 'http://v.jgsports.com.cn/user/Act/getList';
		return url + "? type = "+map[type];
	}
	$(".al_title li").click(function() {
	      $(this).addClass("cur").siblings().removeClass('cur');
	      $.ajax({
	      		url: 'http://v.jgsports.com.cn/user/Act/getList',
	      		type: 'Get',
	      		dataType: 'json',
	      		data: {}
	      	})
	      	.done(function(data) {
	      			var activitylist = data.data;
	      			if (activitylist.type ==0) {
	      				var html = "";
	      				for (var i = 0; i < 1; i++) {
	      					html += '<li><div class="al_img"><img src="images/golfdetail1.jpg">'+
	      					'<div class="al_mask"></div><div class="al_mask_img">6</div></div>'+
	      					'<div class="alright_con"><h1>国际迎新活动</h1><p>2016-06-24 14:00</p><p>北京北京北京北京北京</p>'+
	      					'<div class="al_km">1.7km</div>	</div>	</li>';
	      				};
	      				$("#activitylist").html(html);
	      			}
	      			// debugger;
	      			
	      	})
	  })

	// 加载列表
	
		
})