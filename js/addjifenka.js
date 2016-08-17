$(document).ready(function($) {
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
						}
					})
					.done(function(data) {
						addjiFen()
					})
					.fail(function() {
						console.log("error");
					})
					.always(function() {
						console.log("complete");
					});
			}
		} else {
			alert('请在微信客户端打开！')
		}
	} else {
		addjiFen();
	}

	function addjiFen() {
		//获取默认记分都为0
		var html = '';
		html += '<div class="jifenka_name">大鹏</div><div>净杆<p class="jinggan">0</p></div><div>差点<p class="chadian">0</p></div>	<div>总杆<p class="zonggan">0</p></div>';
		$('.top').html(html);
		var lihtml = '';
		lihtml += '<li><div class="list_num">1<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">2<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">3<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">4<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">5<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">6<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">7<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">8<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">9<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">10<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">11<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">12<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">13<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">14<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">15<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">16<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">17<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>' +
			'<li><div class="list_num">18<p class="par">par5</p></div><div class="add">+</div><div class="reduce">-</div>	<div class="list_core">	<input type="" name="" class="jifen_input" value="0"><p class="xintianweng">信天翁</p>	</div></li>'
		$('.jifenka_li').html(lihtml);
		//修改请求



		function getTotal() {
			// var zonggan = parseInt();
			// var jinggan = parseInt($('.jinggan').html());
			// var chadian = parseInt($('.chadian').html());


			var one_hole = parseInt($('.jifenka_li li .jifen_input').eq(0).val());
			var two_hole = parseInt($('.jifenka_li li .jifen_input').eq(1).val());
			var three_hole = parseInt($('.jifenka_li li .jifen_input').eq(2).val());
			var four_hole = parseInt($('.jifenka_li li .jifen_input').eq(3).val());
			var five_hole = parseInt($('.jifenka_li li .jifen_input').eq(4).val());
			var six_hole = parseInt($('.jifenka_li li .jifen_input').eq(5).val());
			var seven_hole = parseInt($('.jifenka_li li .jifen_input').eq(6).val());
			var eight_hole = parseInt($('.jifenka_li li .jifen_input').eq(7).val());
			var nine_hole = parseInt($('.jifenka_li li .jifen_input').eq(8).val());
			var ten_hole = parseInt($('.jifenka_li li .jifen_input').eq(9).val());
			var eleven_hole = parseInt($('.jifenka_li li .jifen_input').eq(10).val());
			var twelve_hole = parseInt($('.jifenka_li li .jifen_input').eq(11).val());
			var thirteen_hole = parseInt($('.jifenka_li li .jifen_input').eq(12).val());
			var fourteen_hole = parseInt($('.jifenka_li li .jifen_input').eq(13).val());
			var fifteen_hole = parseInt($('.jifenka_li li .jifen_input').eq(14).val());
			var sixteen_hole = parseInt($('.jifenka_li li .jifen_input').eq(15).val());
			var seventeen_hole = parseInt($('.jifenka_li li .jifen_input').eq(16).val());
			var eighteen_hole = parseInt($('.jifenka_li li .jifen_input').eq(17).val());

			var arr = [one_hole, two_hole, three_hole, four_hole, five_hole, six_hole, seven_hole, eight_hole, nine_hole, ten_hole, eleven_hole, twelve_hole, thirteen_hole, fourteen_hole, fifteen_hole, sixteen_hole, seventeen_hole, eighteen_hole]

			arr.sort(function() {
				return Math.random()
			})

			// int randomNumber=(int)(Math.random()*8)+1;


			console.log(arr)

			$('.zonggan').html(one_hole + two_hole + three_hole + four_hole + five_hole + six_hole + seven_hole + eight_hole + nine_hole + ten_hole + eleven_hole + twelve_hole + thirteen_hole + fourteen_hole + fifteen_hole + sixteen_hole + seventeen_hole + eighteen_hole)

		}

		//编辑操作
		function jiajianxiugai() {
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
								if (value < 50) {
									countInout.value = value + 1;
									getTotal();
								}
								break;

							case 'reduce': //点击了减号
								if (value > 1) {
									countInout.value = value - 1;
									getTotal();
								}
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
		}
		jiajianxiugai();


		$('.tijiao_tbn').click(function(event) {
			var id = decodeURIComponent((new RegExp('[?|&]id=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
			var jifenkadata = {
				act_id:id,
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



		});
	}
})