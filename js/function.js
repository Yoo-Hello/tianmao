//功能：兼容IE8不识别getElementsByClassName类名
//参数说明：
//兼容函数
    function getClass(divclass){
        if(document.getElementsByClassName){
            return document.getElementsByClassName(divclass);
        }else{
            var all=document.getElementsByTagName("*");
            var arr=[];
            for(i=0;i<all.length;i++){
                if(checkrel(all[i].className,divclass)){
                    arr.push(all[i]);
                }
            }
            return arr;
        }

        //参数说明：形参a=多个类名集合以后的字符串
        //新参b=
        function checkrel(a,b){
            var newarr=a.split(" ");//
            for(var i=0;i<newarr.length;i++){
                if(newarr[i]==b){
                    return true;
                }
            }
            return false;
        }
    }
    var aa=getClass("divclass");
   // alert(aa.length);


   /*设置兼容IE、FF浏览器的获取纯文本的兼容函数
   obj:哪一个对象使用这个方法
   val:接收第二个实参，表示设置一个文本。
   */

   function gets(obj,val){
        if(val==undefined){
          var obj=obj||document;
            if(obj.innerText){//判断IE8
                return obj.innerText;
            }else{
                return obj.textContent;
            }
        }else{
            if(obj.innerText||obj.innerText==""){
                obj.innerText=val;
            }else{
                obj.textContent=val;
            }
        }
   }


   //兼容问题：实现识别IE\FF浏览器的显示
   //obj:要判断哪个对象。attr:要判断哪个属性。


   function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }
   }

   //$(".box")获取类名；("#Id")ID名；("div")标签名；
   
   function $(select,obj){
       var obj=obj||document;
        if(typeof select=="string"){
           select=select.replace(/^\s*|\s*$/g,"");//去掉字符串的前后空格。
          if(select.charAt(0)=="."){
                return getClass(select.slice(1));
          }else if(select.charAt(0)=="#"){
                return document.getElementById(select.slice(1));
           }else if(/^[a-z|1-6]{1,10}$/g.test(select)){
                 return obj.getElementsByTagName(select);
            }
        }else if(typeof select=="function"){
            window.onload=function(){
              select();
            }
        }
   }
   

   //获取元素子节点的兼容函数
   //原理：先获取所有的子元素，然后根据节点的类型判断，如果为1，表示是元素节点，保存到数组里。
   function getChilds(parent,type){
      var type=type||"a";
      var childs=parent.childNodes;
      var arr=[];
      for(var i=0;i<childs.length;i++){
          if(type=="a"){
              if(childs[i].nodeType==1){
                arr.push(childs[i])
              }
          }else if(type=="b"){
            alert(1);
            if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,""))){
              arr.push(childs[i]);
            }
          }
      }

      return arr;
   }


   //获得第一个子节点
   function getFirst(parent){
    return getChilds(parent)[0];
   }

   //获取最后一个子节点
   function getLast(parent){
    return getChilds(parent)[getChilds(parent).length-1];
   }

   //获得一个指定子节点
   function getNum(parent,num){
      return getChilds(parent)[num];
   }

   //获得下一个兄弟节点
   function getNext(obj){
      var next=obj.nextSibling;
      while(next.nodeType==3||next.nodeType==8){
        next=next.nextSibling;
        if(next==null){
          return false;
        }
      }
      return next;
   }
   //获得上一个兄弟节点
     function getPrevious(obj){
      var up=obj.previousSibling;
      if(up==null){
        return false;
      }
      while(up.nodeType==3||up.nodeType==8){
        up=up.previousSibling;
        if(up==null){
          return false;
        }
      }
      return up;
   }


   //插入到下一个对象之前
   //重点 给对象的原型添加此放发
   //原理：找到第二个参数的下一个兄弟节点，将第一个参数插入到此兄弟节点之前
   //参数：obj1:要插入的对象；obj2:哪个对象的后面
   Object.prototype.insertAfter=function(obj1,obj2){
     var next=getNext(obj2);
     if(next){
      this.insertBefore(obj1,next);
     }else{
      this.appendChild(obj1);
     }
   }
  //获取滚动条的高度的兼容问题  FF/GG
   var obj=document.documentElement.scrollTop?document.documentElement:document.body;

   //方法2
   function getScrollT(scrollT){
       var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
       //document.title=scrollT;
       return scrollT;
   }
   

   //获取浏览器宽度
   function getCW(){
    return document.documentElement.clientWidth;
   }
   function getCH(){
    return document.documentElement.clientHeight;
   }

   //拖拽
   function drag(obj){
    var box=obj;
   var llqw=getCW();
   var llqh=getCH();
   var objw=box.offsetWidth;
   var objh=box.offsetHeight;
   /*box.onclick=function(e){
    var ev=e||window.event;
   }*/
   box.onmousedown=function(e){
    var ev=e||window.event;
    var ox=ev.offsetX;
    var oy=ev.offsetY;
    //阻止浏览器的默认行为
    if(ev.preventDefault){
      ev.preventDefault();
    }else{
      ev.returnValue=false;
    }
    //事件委托思想
      document.onmousemove=function(e){
          var ev=e||window.event;
          var cx=ev.clientX;
          var cy=ev.clientY;
          var newx=cx-ox;
          var newy=cy-oy;
          if(newx<=0){
            newx=0;
          }
          if(newx>=(llqw-objw)){
            newx=llqw-objw;
          }
          if(newy<=0){
            newy=0;
          }
          if(newy>=(llqh-objh)){
            newy=llqh-objh;
          }
          box.style.left=newx+"px";
          box.style.top=newy+"px";
      }
   }
   box.onmouseup=function(){
    document.onmousemove=null;
   }
   }


      //鼠标滚轮事件
      //obj“哪个对象添加滚轮事件”
      //upfun：处理滚轮向上的函数
      //downfun:处理滚轮向下的函数
      function mouseWheel(obj,upfun,downfun){
          if(obj.attachEvent){
              obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
          }else if(obj.addEventListener){
              obj.addEventListener("mousewheel",scrollFn,false);
              //chrome,safari -webkit-
              obj.addEventListener("DOMMouseScroll",scrollFn,false);
              //firefox -moz-
          }
          function scrollFn(e){
            var ev=e||window.event;
              if(ev.preventDefault){
                ev.preventDefault()
              }else{
                ev.preventValue=false;
              }
            var num=ev.detail||ev.wheelDelta;
            if(num==-3||num==120){
              if(upfun){upfun();}
            }
              if(num==3||num==-120){
                if(downfun){
                  downfun();
                }
              }
          }
      }

//hover事件15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/