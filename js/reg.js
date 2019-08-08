//获取验证码
$("#img_rand").click(function(){
	var str="";
	for(var i=0;i<4;i++){
		str += parseInt(Math.random()*10);
	}
		$("#img_rand")[0].innerHTML = str;
	})

var ran = $("#ran")[0];
$("#imgCode").blur(function(){
	var rand = $("#img_rand")[0].innerHTML;
	var imgList = $("#imgCode")[0].value;
	if(imgList == rand){
		ran.innerHTML = "";
	}else{
		$("#ran").css("display","block");
	}
})


//正则验证
function check(str,type){
	switch (type){
		case "phoneNum": var r = /^1[3-9]\d{9}$/;break;
		case "passNum": var r = 
		/^(?![/d]+$)(?![a-zA-Z]+$)(?![@#$%^&*]+$)[\da-zA-Z@#$%^&*]{8,16}$/;break;
	}
		return r.test(str);
}

var arr = ["phoneNum","passNum"];

$("#phone").blur(function(){
	if(check($(this).val(),"phoneNum")){
		$(this).next().html = "";
	}else{
		$(this).next().css("display","block");
	}

});
$("#phone").focus(function(){
	$(this).next().css("display","none");
})


$("#pass").blur(function(){
	if(check($(this).val(),"passNum")){
		$(this).next().innerHTML = "";
	}else{
		$(this).next().css("display","block");
	}
});

$("#pass").focus(function(){
	$(this).next().css("display","none");
})

$("#pass_aga").blur(function(){
	var pass = $("#pass")[0].value;
	var pass_aga = $("#pass_aga")[0].value;
	if(pass == pass_aga){
		$("#pass_two").innerHTML = "";
	}else{
		$("#pass_two").css("display","block");
	}
});
$("#pass_two").focus(function(){
	$(this).next().css("display","none");
})


//手机号注册跳转
