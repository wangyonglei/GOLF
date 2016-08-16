$(document).ready(function($) {
	for (var j = 1; j <= 18; j++) {
		var html = ''
		html += '<li><div class="list_num">' + j + '<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div><div class="list_core"><input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p></div></li>'
		$('.jifenka_li').append(html);
	}
	var uid = decodeURIComponent((new RegExp('[?|&]uid=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
	var act_id = decodeURIComponent((new RegExp('[?|&]act_id=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
	var getTotal = function() {
		var jifenkadata = {
			uid: 3,
			act_id: act_id,
			total_bar: parseInt($('.zonggan').html()),
			netBar: parseInt($('.jinggan').html()),
			handicap: parseInt($('.chadian').html()),
			one_hole: $('.jifenka_li li .jifen_input').eq(0).val(),
			two_hole: $('.jifenka_li li .jifen_input').eq(1).val(),
			three_hole: $('.jifenka_li li .jifen_input').eq(2).val(),
			four_hole: $('.jifenka_li li .jifen_input').eq(3).val(),
			five_hole: $('.jifenka_li li .jifen_input').eq(4).val(),
			six_hole: $('.jifenka_li li .jifen_input').eq(5).val(),
			seven_hole: $('.jifenka_li li .jifen_input').eq(6).val(),
			eight_hole: $('.jifenka_li li .jifen_input').eq(7).val(),
			nine_hole: $('.jifenka_li li .jifen_input').eq(8).val(),
			ten_hole: $('.jifenka_li li .jifen_input').eq(9).val(),
			eleven_hole: $('.jifenka_li li .jifen_input').eq(10).val(),
			twelve_hole: $('.jifenka_li li .jifen_input').eq(11).val(),
			thirteen_hole: $('.jifenka_li li .jifen_input').eq(12).val(),
			fourteen_hole: $('.jifenka_li li .jifen_input').eq(13).val(),
			fifteen_hole: $('.jifenka_li li .jifen_input').eq(14).val(),
			sixteen_hole: $('.jifenka_li li .jifen_input').eq(15).val(),
			seventeen_hole: $('.jifenka_li li .jifen_input').eq(16).val(),
			eighteen_hole: $('.jifenka_li li .jifen_input').eq(17).val()
		}
		$.ajax({
			url: 'http://v.jgsports.com.cn/user/Act/addUserIntegralCardInfo',
			type: 'post',
			dataType: 'json',
			data: jifenkadata,
			success: function(data) {
				console.log('ok')
			}
		})
	}
	getTotal();
	var jifenli = $('.jifenka_li li')
		//为每行元素添加事件
	for (var i = 0; i < jifenli.length; i++) {
		//将点击事件绑定到jifenli元素
		jifenli[i].onclick = function(e) {
				var e = e || window.event;
				var el = e.target || e.srcElement; //通过事件对象的target属性获取触发元素
				var cls = el.className; //触发元素的class
				var countInout = this.getElementsByTagName('input')[0]; // 数目input
				var value = parseInt(countInout.value); //数目
				//通过判断触发元素的class确定用户点击了哪个元素
				switch (cls) {
					case 'add': //点击了加号
						countInout.value = value + 1;
						getTotal();
						break;
					case 'reduce': //点击了减号
						// if (value > 1) {
						countInout.value = value - 1;
						getTotal();
						// }
						break;
				}
				// getTotal();
			}
			// // 给数目输入框绑定keyup事件
		jifenli[i].getElementsByTagName('input')[0].onkeyup = function() {
			var val = parseInt(this.value);
			if (isNaN(val)) {
				val = 0;
			}
			if (this.value != val) {
				this.value = val;
			}
			getTotal(); //更新总数
		}
	}
})