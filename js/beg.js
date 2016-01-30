window.onload=function(){
  

  //头部下拉
  var topssk=$("#topsousuo");
  var flag=true;
  var flag1=true;
  var loucen=$("#loucen");
  var loucendiv=$(".f1-box");
  var lcanniu=$("li",loucen);
   //按钮控制滚动条

    for(var i=0;i<lcanniu.length;i++){
      lcanniu[i].index=i;
      lcanniu[i].onclick=function(){
                //alert(floors[this.index].t)
                var obj=document.documentElement.scrollTop?document.documentElement:document.body;
                
                //获取滚动条的对象
                //var scrollT=getScrollT();
                //obj.scrollTop=loucendiv[this.index].t;
                animate(obj,{scrollTop:loucendiv[this.index].offsetTop})//当前按钮的对应楼层的top赋值给滚动条
          }
    }
  window.onscroll=function(){
    var scrollT=getScrollT();
    if(scrollT>=620){
        if(flag){
          animate(topssk,{top:0},500);
          flag=false;
          flag1=true;
        }
    }else{
        if(flag1){
          animate(topssk,{top:-50},500);
          flag1=false;
          flag=true;
        }
    }
    //滚动条隐藏
    
    if(scrollT>=1000){
        loucen.style.display="block";
    }else{
        loucen.style.display="none";
    }
    //滚动条控制按钮变色


    for(i=0;i<loucendiv.length;i++){
      loucendiv[i].t=loucendiv[i].offsetTop;
      if(loucendiv[i].t-120<scrollT){
         for(j=0;j<lcanniu.length;j++){
           lcanniu[j].style.background="#333333";
         }
         lcanniu[i].style.background="#c40000";
      }
    }
  }

	
  //左固定栏
  var rgdl=$("#rgudinlan");
  var rgdlh=document.documentElement. clientHeight;
  window.onresize=function(){
    rgdlh=document.documentElement. clientHeight;
      rgdl.style.height=rgdlh+"px";
  }
  
  var rgdltc=$(".rgdltcbox");
  var rgdlli=$(".rgdlan");
  for(i=0;i<rgdlli.length;i++){
    rgdlli[i].index=i;
    hover(rgdlli[i],function(){
      rgdltc[this.index].style.display="block";
      animate(rgdltc[this.index],{right:35,opacity:1},200);
    },function(){
      animate(rgdltc[this.index],{right:70,opacity:0,display:"none"},200);
      
    });
    /*rgdlli[i].onmouseover=function(){
      
    }
    rgdlli[i].onmouseout=function(){
      
    }*/
  }




  //热门换标签
	var lianjieli=getClass("lianjieli");
	var guanggaoone=getClass("shangpin-guanggao-center");
	for(var i=0;i<lianjieli.length;i++){
		lianjieli[i].index=i;
		lianjieli[i].onclick=function(){
           for(var j=0;j<guanggaoone.length;j++){
           	guanggaoone[j].style.display="none";
           }
           for(var k=0;k<lianjieli.length;k++){
           	 	lianjieli[k].style.textDecoration="none";
           	lianjieli[k].style.fontWeight="normal";
           }
           guanggaoone[this.index].style.display="block";
		this.style.textDecoration="underline";
		this.style.fontWeight="bold";
		}
		
	}

	var taoxinbox=getClass("guanggao-center-one-li");
	var taoxin=getClass("taoxin");
	for(var i=0;i<taoxinbox.length;i++){
		taoxinbox[i].index=i;
		taoxinbox[i].onmouseover=function(){
			taoxin[this.index].style.display="block";
		}
		taoxinbox[i].onmouseout=function(){
			taoxin[this.index].style.display="none";
		}
	}

   //搜索框
   var textsousuo=$("#textsousuo");

   textsousuo.onfocus=function(){
	   	if(textsousuo.value=="猫猫狗狗购物狂欢，给它最好的"){
	   		textsousuo.value="";
	   	}
   }
   textsousuo.onblur=function(){
   	    if(textsousuo.value==""){
   	    	textsousuo.value="猫猫狗狗购物狂欢，给它最好的";
   	    }
   }

   var textsousuos=$("#textsousuos");

   textsousuos.onfocus=function(){
      if(textsousuos.value=="猫猫狗狗购物狂欢，给它最好的"){
        textsousuos.value="";
      }
   }
   textsousuos.onblur=function(){
        if(textsousuos.value==""){
          textsousuos.value="猫猫狗狗购物狂欢，给它最好的";
        }
   }


   //banner轮播
   //自动轮播
   var bannerimg=$(".banner-neirong-img");
   var banneranniu=$(".banneranniu");
   var num=1;
   var bannerback=$(".banner-bottom-box")[0];
   var backcol=["#e6255e","#bd13fc","#e6e6e6","#fff701","#ebebeb","#63cbaa"];
   function lunbo(){
   	   if(num==6){
   	   	num=0
   	   }
   	   for(i=0;i<bannerimg.length;i++){
   	   	 bannerimg[i].style.zIndex=5;
   	   	 banneranniu[i].style.background="#333";
   	   }
   	   bannerimg[num].style.zIndex=6;
   	   banneranniu[num].style.background="#c40000";
       bannerback.style.background=backcol[num];
   	   num++;
   }
   var lunbot=setInterval(lunbo,3000);
   //点击按钮切换广告
   for(i=0;i<banneranniu.length;i++){
	   	banneranniu[i].index=i;
	   	banneranniu[i].onmouseover=function(){
	   		clearInterval(lunbot);
	   		for(var j=0;j<banneranniu.length;j++){
                bannerimg[j].style.zIndex=5;
                banneranniu[j].style.background="#333";
	   		}
	   		bannerimg[this.index].style.zIndex=6;
        bannerback.style.background=backcol[this.index];
	   		banneranniu[this.index].style.background="#c40000";
	   	}
	   	banneranniu[i].onmouseout=function(){
	   		lunbot=setInterval(lunbo,3000);
	   		num=this.index+1;
	   	}
    }




    //小广告轮播
    function xiaolb(aa){
    var imgbox=$(".f1-left-center-imgbox")[aa];
    var anniuL=$(".f1-left-center-anniuL")[aa];
    var anniuR=$(".f1-left-center-anniuR")[aa];
    function times(){
      animate(imgbox,{left:-191},600,Tween.Linear,function(){
        var imgfirst=getFirst(imgbox);
        var imglast=getLast(imgbox);
        imgbox.appendChild(imgfirst);
        imgbox.style.left=0;
      })
    }
    var time=setInterval(times,2000);
    anniuL.onmouseover=function(){
      clearInterval(time);
    }
    anniuL.onmouseout=function(){
      time=setInterval(times,2000);
    }
    anniuR.onmouseover=function(){
      clearInterval(time);
    }
    anniuR.onmouseout=function(){
      time=setInterval(times,2000);
    }
    anniuR.onclick=function(){
      var imgfirst=getFirst(imgbox);
      var imglast=getLast(imgbox);
        imgbox.insertBefore(imglast,imgfirst);
        imgbox.style.left=-191+"px";
        animate(imgbox,{left:0},600,Tween.Linear)
    }
    anniuL.onclick=function(){
      animate(imgbox,{left:-191},600,Tween.Linear,function(){
          var imgfirst=getFirst(imgbox);
          var imglast=getLast(imgbox);
          imgbox.appendChild(imgfirst);
          imgbox.style.left=0;
        });
    }
    }
    for(var i=0;i<12;i++){
       xiaolb(i);
    }
     

    //图片左移
    function imgleft(aa){
      var LimgBox=$(".f1-right-box")[aa];
      LimgBox.onmouseover=function(e){
          var ev=e||window.event;
          var obj=ev.srcElement||ev.target;
          obj.style.left="-5px";
      }
      LimgBox.onmouseout=function(e){
          var ev=e||window.event;
          var obj=ev.srcElement||ev.target;
          obj.style.left="0";
      }
    }
    for(var i=0;i<12;i++){
      imgleft(i);
    }


  //banner左侧标签
  var biaoqian=$(".biaoqian");
  var tck=$(".banner-libiao-tck");
  for(var i=0;i<biaoqian.length;i++){
    biaoqian[i].index=i;
    hover(biaoqian[i],function(){
      tck[this.index].style.display="block";
      tck[this.index].style.left=185+"px";
      animate(tck[this.index],{left:190},300)
    },function(){
      tck[this.index].style.display="none";
      tck[this.index].style.left=185+"px";
    }) 
  }
  
  //下拉菜单
  var mytbbox=$(".mytbbox")[0];
  var mytmxl=$(".mytmxl")[0];
  hover(mytbbox,function(){
    mytmxl.style.display="block";
  },function(){
    mytmxl.style.display="none";
  });
  var scbox=$(".scbox")[0];
  var scxl=$(".scxl")[0];
  hover(scbox,function(){
      scxl.style.display="block";
  },function(){
      scxl.style.display="none";
  })
  var sjbox=$(".sjbox")[0];
  var sjewm=$(".sjewm")[0];
  hover(sjbox,function(){
      sjewm.style.display="block";
  },function(){
      sjewm.style.display="none";
  })
  var sjzcbox=$(".sjzcbox")[0];
  var sjxl=$(".sjxl")[0];
  hover(sjzcbox,function(){
    sjxl.style.display="block"
  },function(){
    sjxl.style.display="none";
  })
}
