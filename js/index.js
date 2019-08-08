function A(str){
		if(str.charAt(0)=="#"){
			return document.getElementById(str.substring(1));
		}else if(str.charAt(0)=="."){
			return document.getElementsByClassName(str.substring(1));
		}else{
			return document.getElementsByTagName(str);
		}
	}

//轮播图
class Banner{
	//构造函数
	constructor(obj,boxDom){
		//1、属性（数据）
		this.boxDom = boxDom;
		this.imgDoms = [];//存储所有的图片标签
		this.liDoms = [];//存储所有的li标签（豆豆）
		this.arrowBoxDom = null;//存储左右箭头的容器
		let defaultObj = {
			width:1270,
			height:552,
			imgs:["img/banner1.jpg","img/banner2.jpg","img/banner3.jpg"],
			timeSpace:3000,
			douColor:"white",
			douHighColor:"#db192a",
			douSize:13,
			douPos:"下",
			douIsCircle:true,
			myTimer:null,
			ord:0,
			type:"fade"//切换效果的类型
		}

		for(let key in defaultObj){
			if(obj[key]){
				this[key] = obj[key];
			}else{
				this[key] = defaultObj[key];
			}
		}
		//2、创建外观（把数据应用在外观上）
		this.render();
		this.addEvent();
		this.autoPlay();
	}

	//外观（html和css代码）
	render(){
		this.boxDom.style.position = "relative";

		//1、创建图片
		for(let i=0;i<this.imgs.length;i++){
			let imgDom = document.createElement("img");
			imgDom.src = this.imgs[i];
			imgDom.style.cssText = `
				position: absolute;
				left:0px;
				top:0px;
				width: 100%;
				height: 100%;	
				z-index: 1;`;	

			switch(this.type){
				case "fade":imgDom.style.opacity = (i==0?1:0);break;
			}
			if(i==0){
				imgDom.style.zIndex = 2;
			}
			this.boxDom.appendChild(imgDom);
			this.imgDoms.push(imgDom);
		}
		//2、创建豆豆
		//1)、豆豆的容器ul
		let doudouBox = document.createElement("ul");
		doudouBox.style.cssText = `
				position: absolute;
				list-style: none;
				z-index: 4;`;
		if(this.douPos=="上"){
			console.log((this.width-(this.douSize*(this.imgs.length*2-1)))/2);
			doudouBox.style.left = `${this.width-(this.douSize*(this.imgs.length*2-1))}px`;
			doudouBox.style.top = "20px";			
		}else if(this.douPos=="下"){
			doudouBox.style.left = `${this.width-(this.douSize*(this.imgs.length*2-1))}px`;
			doudouBox.style.bottom = "20px";
		}	
		this.boxDom.appendChild(doudouBox);
		//2)、豆豆 li
		for(let i=0;i<this.imgs.length;i++){
			let liDom = document.createElement("li");
			liDom.setAttribute("index",i);
			liDom.style.cssText = `
				float:left;
				width:${this.douSize}px;
				height: ${this.douSize}px;
				margin-right: ${this.douSize}px;
				background-color: ${this.douColor};
			`;
			if(this.douIsCircle){
				liDom.style.borderRadius="50%";
			}
			if(i==0){
				liDom.style.backgroundColor=this.douHighColor;
			}
			doudouBox.appendChild(liDom);
			this.liDoms.push(liDom);//放在数组里，方便其它函数使用
		}

		//3、创建左右按钮
		//1)、创建左右箭头的容器
		this.arrowBoxDom = document.createElement("div");

		this.arrowBoxDom.style.cssText = `
			position: absolute;
			left: 0;
			top:0;
			width:100%;
			height:100%;
			z-index: 3;
			display: flex;
			align-items: center;
			justify-content: space-between;`;
		this.boxDom.appendChild(this.arrowBoxDom);

		//2)、创建左右箭头
		let leftDivDom = document.createElement("div");
		leftDivDom.style.cssText = `
			position:absolute;
			left:303px;
			width:40px ;
			height:40px;
			background: palevioletred;
			line-height: 40px;
			text-align: center;`;
		this.arrowBoxDom.appendChild(leftDivDom);

		let rightDivDom = document.createElement("div");
		rightDivDom.style.cssText = `
			position:absolute;
			right:143px;
			width:40px ;
			height:40px;
			background: palevioletred;
			line-height: 40px;
			text-align: center;`;
		this.arrowBoxDom.appendChild(rightDivDom);
	}

	//添加事件
	addEvent(){
		//2、鼠标放在轮播图上会停止
		this.boxDom.onmouseover = ()=>{
			this.stopPlay();	
		}

		//3、鼠标离开轮播图会继续播放
		this.boxDom.onmouseout = ()=>{
			this.autoPlay();	
		}

		let obj = this;
		//4、点击豆豆，跳转到对应的图片
		for(var i=0;i<this.liDoms.length;i++){
			this.liDoms[i].onclick = function(){
				obj.goImg(parseInt(this.getAttribute("index")));
			};
		}

		//5、左右按钮
		
		let leftBtn = this.arrowBoxDom.firstElementChild;
		leftBtn.onclick = ()=>{
			this.preImg();
		}
		let rightBtn = this.arrowBoxDom.lastElementChild;
		rightBtn.onclick = ()=>{
			this.nextImg();
		}
	}

	//自动播放
	autoPlay(){
		if(this.myTimer!=null){//如果有定时器，就不再启动新的定时器了
			return;//
		}

		this.myTimer = setInterval(()=>{
			//一、改变数据
			//1、计算数据（改变图片的下标）
			var preOrd = this.ord;//上一张的序号 4
			this.ord++;//5

			//2、边界
			if(this.ord>this.imgs.length-1){
				this.ord = 0;
			}

			//二、改变外观
			this.reRender(preOrd,this.ord);
		},this.timeSpace)

	}
	
	//停止播放
	stopPlay(){
		window.clearInterval(this.myTimer);//根据定时器编号，找到定时器对象，进行清除
		this.myTimer = null;//把定时器编号清除掉
	}

	//跳转到对应的图片上
	//参数：图片的下标
	// goImg(3);
	goImg(transOrd){
		
		//一、改变数据
		//1、计算数据（改变图片的下标）
		var preOrd = this.ord;//上一张的序号 
		this.ord = transOrd;//5

		//2、边界
		if(this.ord>this.imgs.length-1){
			this.ord = 0;
		}else if(this.ord<0){
			this.ord = this.imgs.length-1;
		}

		//二、改变外观
		this.reRender(preOrd,this.ord);
	}

	//改变外观的函数(重新渲染)
	reRender(preOrd,ord){
		// //1)、改图片
		// this.imgDoms[preOrd].style.opacity = 1;
		this.imgDoms[ord].style.opacity = 0;		
		this.fadeInOut(this.imgDoms[ord],this.imgDoms[preOrd],this.timeSpace/2);
		
		//2)、改豆豆的颜色
		this.liDoms[preOrd].style.backgroundColor=this.douColor;
		this.liDoms[ord].style.backgroundColor= this.douHighColor;
	}

	preImg(){
		this.goImg(this.ord-1);
	}

	nextImg(){
		this.goImg(this.ord+1);
	}

	//两个dom元素的淡入和淡出
	//参数：
	//domObjIn
	//domObjOut
	//时长
	fadeInOut(domObjIn,domObjOut,timeLong){
		var currOpacity = 0;
		var step = 1/(timeLong/10);
		var myTimer = setInterval(function(){
			//一、改变数据（逻辑）
			//1、修改数据
			currOpacity+=step;//
			//2、边界处理
			if(currOpacity>=1){
				currOpacity=1;
				window.clearInterval(myTimer);
			}
			//二、改变外观（呈现）
			domObjIn.style.opacity = currOpacity;
			domObjOut.style.opacity = 1- currOpacity;
		},10);
	}
}

//锚点链接
//	function move(){
//		let offsetHeight = $("#top").offsetHeight+$("#header").offsetHeight+
//		$("#banner").offsetHeight+$("#layout").offsetHeight;
//		let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
//		
//		if(scrollTop>=offsetHeight){
//			$("#shopBox").style.display = "block"
//		}
//	}


//锚点链接导航栏
	var liDom = $(".uls").children()
	for(var i=0;i<liDom.length;i++){
		$("liDom a").mouseenter(function(){
			$(this).parents("banner").siblings().find(".banner_meau_box").css("display","block");
//			$(this).parents(".mesOne").siblings().find(".mesTwo").css("display","none");
	})
//		$(".mesTwo").mouseleave(function(){
//			$(this).css("display","none");
//	});
		
}
	
	
	A("#shopping").onmouseover = function(event){
		let evt = event||window.event;
		A("#shopBox").style.display = "block";
	}
	A("#shopping").onmouseout = function(event){
		let evt = event||window.event;
		A("#shopBox").style.display = "none";
	}
