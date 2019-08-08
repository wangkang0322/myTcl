
/*
//封装ajax
//参数：
// 请求地址：url
// 请求方式:method
// 请求参数：params
//          key1=value1&key2=value2
//  
    {
		key1:value1,
		key2:value12
	}
//  回调函数：	
//是否异步

//返回值：无
*/

// ajax(
// 	"getMusic.php",
// 	"get",
// 	{
// 		musicname:"你"
// 	}
// 	);


function ajax1905(url,method,params,func,isAsync){
	//1、创建对象
	let xhr = new XMLHttpRequest();

	//产生请求参数的字符串：循环把json对象转换为形如这样的格式：key1=value1&key2=value2
	let sendstr = '';
	for(let key in params){
		sendstr += `${key}=${params[key]}&`;
		// sendstr += key+"="+params[key]+"&"
	}
	if(sendstr.length>0){
		sendstr = sendstr.substring(0,sendstr.length-1); //musicname=你
	}
	
	let urlAndParam = url;//getMusic.php
	//如果是get方式，并且有请求参数，那么就把url和请求参数用问号隔开
	if(method.toLowerCase()=="get" && sendstr!=""){
		urlAndParam+= "?"+sendstr;//getMusic.php?musicname=你
	}

	//2、设置请求参数
	xhr.open(method,urlAndParam,isAsync);

	//3、设置回调函数
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			//调用回调函数（如下的 && 表示，逻辑短路，如果func是真，才调用func函数）
			// func&&func(xhr.responseText);
			if(func){
				func(xhr.responseText);
			}
		}
	}
	if(method.toLowerCase()=="post"){
		xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xhr.send(sendstr);
	}else{
		//4、发送请求
		xhr.send();	
	}
	
}

// ajax1905({
// 	"url":"getMusic.php",
// 	"method":"get",
// 	"params":{
// 		musicname:"你是"
// 	},
// 	"func":function(){

// 	},
// 	"isAsync":true
// });

// ajax1905({
// 	"url":"getMusic.php",
// 	"params":{
// 		musicname:"你是"
// 	},
// 	"func":function(){

// 	}
// });

function ajax190502(obj){

	let defaultObj = {
		"url":"#",
		"method":"get",
		"params":{},
		"func":null,
		"isAsync":true
	};

	ajaxObj = {};
	for(let key in defaultObj){//key = url
		ajaxObj[key] = obj[key] || defaultObj[key];
	}

	ajax1905(ajaxObj.url,ajaxObj.method,ajaxObj.params,ajaxObj.func,ajaxObj.isAsync);	
}

ajax190502({
		"url":"getGoodsList.php",
		"method":"get",
		"func":getGoods,
		"isAsync":true
})

function getGoods(str){
	let arrList = JSON.parse(str);
	
	let str1 = "";
	for(var i=0;i<6;i++){
		str1+= `
		<li class="air_img">
			<a href="#">
				<img src=${arrList[i].goodsImg}>
				<p class="title">${arrList[i].goodsName}</p>
				<p class="dice">${arrList[i].goodsDesc}</p>
				<p class="price">${arrList[i].goodsPrice}.00元</p>
			</a>
		</li>`
	}
	$(".ulImg")[0].innerHTML = str1;

var str2 = "";
for(var i=6;i<12;i++){
		str2+= `
		<li class="air_img">
			<a href="#">
				<img src=${arrList[i].goodsImg}>
				<p class="title">${arrList[i].goodsName}</p>
				<p class="dice">${arrList[i].goodsDesc}</p>
				<p class="price">${arrList[i].goodsPrice}.00元</p>
			</a>
		</li>`
	}
	$(".ulImg")[1].innerHTML = str2;
	
	var str3 = "";
	for(var i=12;i<18;i++){
			str3+= `
			<li class="air_img">
				<a href="#">
					<img src=${arrList[i].goodsImg}>
					<p class="title">${arrList[i].goodsName}</p>
					<p class="dice">${arrList[i].goodsDesc}</p>
					<p class="price">${arrList[i].goodsPrice}.00元</p>
				</a>
			</li>`
		}
		$(".ulImg")[2].innerHTML = str3;
		
		
		var str4 = "";
	for(var i=18;i<24;i++){
			str4+= `
			<li class="air_img">
				<a href="#">
					<img src=${arrList[i].goodsImg}>
					<p class="title">${arrList[i].goodsName}</p>
					<p class="dice">${arrList[i].goodsDesc}</p>
					<p class="price">${arrList[i].goodsPrice}.00元</p>
				</a>
			</li>`
		}
		$(".ulImg")[3].innerHTML = str4;
		
		
	var str5 = "";
	for(var i=24;i<30;i++){
			str5+= `
			<li class="air_img">
				<a href="#">
					<img src=${arrList[i].goodsImg}>
					<p class="title">${arrList[i].goodsName}</p>
					<p class="dice">${arrList[i].goodsDesc}</p>
					<p class="price">${arrList[i].goodsPrice}.00元</p>
				</a>
			</li>`
		}
		$(".ulImg")[4].innerHTML = str5;
		
	var str6 = "";
	for(var i=30;i<36;i++){
			str6+= `
			<li class="air_img">
				<a href="#">
					<img src=${arrList[i].goodsImg}>
					<p class="title">${arrList[i].goodsName}</p>
					<p class="dice">${arrList[i].goodsDesc}</p>
					<p class="price">${arrList[i].goodsPrice}.00元</p>
				</a>
			</li>`
		}
		$(".ulImg")[5].innerHTML = str6;
}