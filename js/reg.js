function check(str,type){
	switch (type){
		case "phoneNum": var r = /^1[3-9]\d{9}$/;break;
		case "passNum": var r = 
		/^(?![/d]+$)(?![a-zA-Z]+$)(?![@#$%^&*]+$)[\da-zA-Z@#$%^&*]{8,16}$/;break;
	}
}
