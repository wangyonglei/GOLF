$(document).ready(function($) {
	var ex_code = getCookie("ex_code");
	var ex_mobile = getCookie("ex_mobile");
	var ex_uid = getCookie("ex_uid");
	var cartEdit = function() {
		$.ajax({
				url: 'http://v.jgsports.com.cn/user/User/getUserInfo',
				type: 'Get',
				dataType: 'json',
				data: {
					code: code
				}
			})
			.done(function(data) {
				var carteditdata = data.data;
				var html = '';
				// html += '<div class="card_ban"><div class="card_img"><img src="' + carddata.avatar + '"></div><div class="card_con"><div class="xian"><p></p><p>·</p><p></p></div><div class="card_name">' + carddata.rname + '</div><div class="card_des">' + carddata.signature + '</div><div class="card_qiu"><span>球龄</span>' + carddata.ball_age + '<span>差点</span>' + carddata.almost + '</div></div></div><div class="card_vip">' + carddata.membership + '</div><div class="card_tel">' + carddata.tel + '</div><div class="card_email">' + carddata.email + '</div><div class="hengxian"><p></p><p>·</p><p></p></div><div class="card_company">公司：' + carddata.company_describe + '</div><div class="card_post">职务：</div><div class="card_city">城市：' + carddata.city + '</div><div class="card_resources">资源：' + carddata.resources + '</div><div class="card_btn"><a href="cart_edit.html?uid=' + carddata.uid + '">编辑</a></div></div>'
				html += '<div class="wai"><div class="duan touxiang">头像<p><img src="'+ carteditdata.avatar+'"></p><span class="jiao"></span></div>'+
				// '<div class="duan xingbie">	<label class="label">性别<input type="" name="" class="ball_age" value="'+carteditdata.ball_age+'" ><span class="jiao"></span></label></div>'+
				'<div class="duan gexing"><label class="label">	个性签名<input type="text" class="signature" value="'+carteditdata.signature+'" placeholder="简单的介绍一下自己"><span class="jiao"></span>	</label></div></div>'+
				'<div class="wai">	<div class="duan">	<label class="label">球龄<input type="" name="" class="ball_age" value="'+carteditdata.ball_age +'" placeholder=""><span class="jiao"></span>	</label></div>'+
				'<div class="duan dianshu">	<label class="label">	点数<input type="" name="" class="almost" value="'+carteditdata.almost+'" placeholder=""><span class="jiao"></span>	</label></div></div><div class="wai">';
				// if (carteditdata.membership.length == 0) {
				// 		html =+ '<div class="duan"><label class="label">	会籍情况<input type="" class="membership" name="" value="" placeholder="无"><span class="jiao"></span>	</label></div>';

				// }else{
					for (var i = 0; i < carteditdata.membership.length; i++) {
						html =+ '<div class="duan"><label class="label">	会籍情况<input type="" class="membership" name="" value="'+carteditdata.membership[i].title+'" placeholder=""><span class="jiao"></span>	</label></div>';
					}
				// }
				html +='<div class="duan"><label class="label">联系电话<input type="" name="" class="tel" value="'+carteditdata.tel+'" placeholder=""><span class="jiao"></span></label></div>'+
				'<div class="duan email"><label class="label">	邮箱<input type="" name="" class="emaili" value="'+carteditdata.email+'" placeholder="@qq.com"><span class="jiao"></span>	</label></div></div>'+
				'<div class="wai"><div class="duan"><label class="label">	公司<input type="" class="company_describe" name="" value="'+carteditdata.company_describe+'" placeholder=""><span class="jiao"></span></label></div>'+
				'<div class="duan">	<label class="label">	职务<input type="" name="" class="position" value="'+carteditdata.position+'" placeholder="">	<span class="jiao"></span></label></div>'+
				'<div class="duan"><label class="label">城市<input type="" name="" class="city" value="'+carteditdata.city+'" placeholder=""><span class="jiao"></span></label></div>'+
				'<div class="duan ziyuan"><label class="label">	资源<input type="" name="" class="resources" value="'+carteditdata.resources+'" placeholder="填写您所拥有的资源"><span class="jiao"></span></label></div></div>'+
				'<div class="baocun">保存</div>'
				$('.cart_edit').html(html)
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
	}
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
						alert(5)
						cartEdit()
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
		cartEdit();

		
		$('body').on('click', '.baocun', function() {
			var datacart = {
				signature:$('.signature').val(),
				membership :$('.membership').val(),
				ball_age:$('.ball_age').val(),
				almost:$('.almost').val(),
				tel:$('.tel').val(),
				email:$('.emaili').val(),
				company_describe:$('.company_describe').val(),
				position:$('.position').val(),
				city:$('.city').val(),
				resources:$('.resources').val()
			}
			$.ajax({
					url: 'http://v.jgsports.com.cn/user/User/modifyUserInfo',
					type: 'post',
					dataType: 'json',
					data: datacart,
				})
				.done(function(data) {
					console.log("ok")
					alert('编辑成功')
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				});
		})














	}
});