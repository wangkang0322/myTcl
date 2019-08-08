<?php
	
	header("content-type","text/html;charset=utf-8");
	
	//一、接收前端传来的数据
	$phone = $_POST["phone"];
	$pass = $_POST["pass"];
	
	//二、保存数据
	//1、建立连接并选择数据库
	$con = mysql_connect("localhost","root","root");
	if(!$con){
		//die("连接失败".mysql_error());
		echo "0";	
	}	
	mysql_select_db("tcl",$con);
	
	//2、执行SQL语句
	$result = mysql_query("select * from user where phone = '$phone'",$con) ;
	$row = mysql_num_rows($result);
	
	if($row == 1){
		echo 0;
	}else{
		mysql_query("insert into user (phone,pass) values ('$phone','$pass')",$con) 
	
		echo 1;
	}
	//echo $sqlStr;
	//3、关闭数据库
	mysql_close($con);
	
	//三、给前端响应
//	echo "1";

?>