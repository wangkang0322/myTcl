
	function A(str){
		if(str.charAt(0)=="#"){
			return document.getElementById(str.substring(1));
		}else if(str.charAt(0)=="."){
			return document.getElementsByClassName(str.substring(1));
		}else{
			return document.getElementsByTagName(str);
		}
	}
	//微信二维码
	$("#wechat_a").mouseenter(function(){
		$("#wechat")[0].style.display = "block";
	});

	$("#wechat").mouseleave(function(){
		$("#wechat")[0].style.display = "none";
	});

	//搜索框
	function clearText(){
		if(A("#btn").value=="家电清凉节"){
			A("#btn").value = "";		
		}
	}

	function resetText(){
		if(A("#btn").value == ""){
			A("#btn").value = "家电清凉节";		
		}
	}

