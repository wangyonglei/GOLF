$(document).ready(function() {

	function loadingjifen(){
	var id = decodeURIComponent((new RegExp('[?|&]id=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;

		$.ajax({
			url: 'http://v.jgsports.com.cn/user/Act/getUserIntegralCardInfoDetail',
			type: 'get',
			dataType: 'json',
			data: {
				userIntegralCardId:id,
			},
			
			success: function(data) {
				var jifendata = data.data;
				var html = ''
				html +='<li><p>球洞</p><p>标准杆</p><p>成绩</p></li>'+
						'<li><p>1</p><p>'+jifendata.score_details.oneHole+'</p><p>0</p></li>'+
						'<li><p>2</p><p>'+jifendata.score_details.twoHole+'</p><p>0</p></li>'+
						'<li><p>3</p><p>'+jifendata.score_details.threeHole+'</p><p>0</p></li>'+
						'<li><p>4</p><p>'+jifendata.score_details.fourHole+'</p><p>0</p></li>'+
						'<li><p>5</p><p>'+jifendata.score_details.fiveHole+'</p><p>0</p></li>'+
						'<li><p>6</p><p>'+jifendata.score_details.sixHole+'</p><p>0</p></li>'+
						'<li><p>7</p><p>'+jifendata.score_details.sevenHole+'</p><p>0</p></li>'+
						'<li><p>8</p><p>'+jifendata.score_details.eightHole+'</p><p>0</p></li>'+
						'<li><p>9</p><p>'+jifendata.score_details.nineHole+'</p><p>0</p></li>'+
						'<li><p>前九</p><p>5</p><p>0</p></li>'
				$('.jifen_qian').html(html)
				var htmlh = ''
				htmlh +='<li><p>球洞</p><p>标准杆</p><p>成绩</p></li>'+
						'<li><p>10</p><p>'+jifendata.score_details.tenHole+'</p><p>0</p></li>'+
						'<li><p>11</p><p>'+jifendata.score_details.elevenHole+'</p><p>0</p></li>'+
						'<li><p>12</p><p>'+jifendata.score_details.twelveHole+'</p><p>0</p></li>'+
						'<li><p>13</p><p>'+jifendata.score_details.thirteenHole+'</p><p>0</p></li>'+
						'<li><p>14</p><p>'+jifendata.score_details.fourteenHole+'</p><p>0</p></li>'+
						'<li><p>15</p><p>'+jifendata.score_details.fifteenHole+'</p><p>0</p></li>'+
						'<li><p>16</p><p>'+jifendata.score_details.sixteenHole+'</p><p>0</p></li>'+
						'<li><p>17</p><p>'+jifendata.score_details.seventeenHole+'</p><p>0</p></li>'+
						'<li><p>18</p><p>'+jifendata.score_details.eighteenHole+'</p><p>0</p></li>'+
						'<li><p>后九</p><p>5</p><p>0</p></li>'
				$('.jifen_hou').html(htmlh)

				
			}
		})
	}

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
							loadingjifen()
						}
					})
					
					
			}
		} else {
			alert('请在微信客户端打开！')
		}
	} else {
		loadingjifen();
	}

})


