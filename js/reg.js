function A(str){
		if(str.charAt(0)=="#"){
			return document.getElementById(str.substring(1));
		}else if(str.charAt(0)=="."){
			return document.getElementsByClassName(str.substring(1));
		}else{
			return document.getElementsByTagName(str);
		}
	}
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





//ajax请求发送
  A("#sub").onclick=function(){
		//1.创建对象
		let xhr=new XMLHttpRequest();
		//2.设置请求参数
		xhr.open('post','../php/user.php',true);

		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
		let sendstr=`phone=A{A("#phone").value}&pass=A{A("#pass").value}`;
		
			//3.设置回调函数
		xhr.onreadystatechange=function(){
			if(xhr.status==200 && xhr.readyState==4){
				if(xhr.responseText==0){
					A("#phone").style.borderColor = "red";
				  A('#phone_list').innerHTML = "该手机号已被注册！";
				 }else{
					A("#login_reg").style.display = "none";
					A("#J_second").style.display = "block";
				}
			}
		}
		 xhr.send(sendstr);
 }
