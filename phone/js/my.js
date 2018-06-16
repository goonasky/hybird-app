 /*
  *author:余在江
    功能：实现方便的操作css样式
  */
 
 if (typeof ClassHandler != 'object')
    {
      ClassHandler = new Object();
    }

ClassHandler.CheckForClass = function(element, nameOfClass)
{
    var returnValue = false;

    if (typeof element == 'string')
    {
        element = document.getElementById(element);
    }

    if (element.className != '')
    {
        returnValue = new RegExp('\\b' + nameOfClass + '\\b').test(element.className);
    }

    return returnValue;
}


ClassHandler.RemoveClass = function(element, nameOfClass)
{
    var returnValue = false;

  
    if (typeof element == 'string')
    {
        element = document.getElementById(element);
    }

    if (ClassHandler.CheckForClass(element, nameOfClass))
    {
       
        element.className = element.className.replace((element.className.indexOf(' ' + nameOfClass) >= 0 ? ' ' + nameOfClass : nameOfClass),'');
        returnValue = true;
    } 

    return returnValue;
}


ClassHandler.AddClass = function(element, nameOfClass)
{
    var returnValue = false;
    
    if (typeof element == 'string')
    {
        element = document.getElementById(element);
    }
    
    if (!ClassHandler.CheckForClass(element, nameOfClass))
    {
        element.className += (element.className ?  '  '  :  '') + nameOfClass;
        returnValue = true;
    } 

    return returnValue;
}


ClassHandler.ReplaceClass = function(element, classToRemove, classToAdd)
{
    var returnValue = false;

    
    if (typeof element == 'string')
    {
        element = document.getElementById(element);
    }


    if(ClassHandler.CheckForClass(element, classToRemove))
    {
        ClassHandler.RemoveClass(element, classToRemove);
        ClassHandler.AddClass(element, classToAdd);
        returnValue = true;
    }

    return returnValue;
}


function setInnerText(id,str){
	if(id==''){return;}
	//if(str==""){return;}
	$$(id).innerHTML=str;
}

//设置图片路径
function setImage(id,str){
	if(id==''||id==null){return;}
	if(str==""||str==null){
		$$(id).parentNode.style.display="none";
	}else{
		$$(id).parentNode.style.display="block";
		$$(id).src=str;
	}
}

function getLoginId(){
	var loginId=localStorage.loginId;
	
	if(loginId==''||loginId==null||loginId=='undefined'){
		return '-1';
	}else{
		return loginId
	}
}

function checkLogin(){
	var loginId=localStorage.loginId;

	if(loginId==''||loginId==null||loginId=='undefined'){
		 uexWindow.open('login', '0', "login_top.html", '10', '', '', '0');
	}else{
		uexWindow.open('myCenter', '0', "myCenter_top.html", '0', '', '', '0');
	}
}

//set点击事件
function setClick(id,str){
	if(id==''||id=='undefined'){return;}
	$$(id).onclick=str;
}

function setDivHide(id){
	if(id==''||id==null){return;}
	$$(id).style.display="none";
}


function setDivShow(id){
	if(id==''||id==null){return;}
	$$(id).style.display="block";
}

Element.prototype.remove = function(){
    this.parentNode.removeChild(this);
	//this.parentElement.removeChild(this);
}
//得到select的选择文字
function getSelectedText(elementId) {
    var elt=$$(elementId);
    if (elt.selectedIndex==-1){
		 return null;
	  }else{
	  	return elt.options[elt.selectedIndex].text;
	  }
}

function getSelectedValue(elementId){
    var elt=$$(elementId);
    if (elt.selectedIndex==-1){
		 return null;
	  }else{
	  	return elt.options[elt.selectedIndex].value;
	  }
}

function get_nextsibling(id){
	var n=$$(id);
	var x=n.nextSibling;
	if(x==null){return null;}
	while (x.nodeType!=1){
	  x=x.nextSibling;
	}
	return x;
}

function get_previoussibling(id){   
	var n=$$(id);
	var x=n.previousSibling;
	if(x==null){return null;}
	while(x.nodeType!=1){
	  x=x.previousSibling;
	}
	return x;
}
Object.prototype.insertAfter = function (newNode) { this.parentNode.insertBefore(newNode, this.nextSibling);}