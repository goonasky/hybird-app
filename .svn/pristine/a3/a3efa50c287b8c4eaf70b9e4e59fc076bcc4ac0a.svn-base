var updates;
function updateapp(str){
	updates=str;
	uexWidgetOne.cbGetMainWidgetId = function(opId, dataType, data){
		if (data != "") {
			updatever(data);//得到APPID
		}
	}	
	uexWidgetOne.getMainWidgetId();
}

function updatever(appid){
	var os=2;//默认为IOS及模拟器
	if (uexWidgetOne.platformName == "android"){
		os=1;
	}
	if (uexWidgetOne.platformName == "iOS"){
		return;
	}
	//传APPID以及OS，获取最新的版本号，返回JSON。
	var url ="http://mlxl.yunpusher.com/json.php/Other/get_vs?appid="+appid+"&system="+os;
	uexXmlHttpMgr.onData = updateverSuccess;
	uexXmlHttpMgr.open(7932, "get", url,"");
	uexXmlHttpMgr.send(7932);
}

function updateverSuccess(opid,status,result){
	if(status==1){
		uexXmlHttpMgr.close(7932);
		updateok(result);
	}
}

function updateok(jsonstr){
	if(jsonstr.length<10){uexWindow.toast("0","5","已经是最新版本啦！","5000");return;}
	uexWidgetOne.cbGetCurrentWidgetInfo=function(opId,dataType,data){
		if (data != "") {
			var obj = JSON.parse(data);
			updatetips(obj.version,jsonstr);//得到版本号
			 var platFromVersion = obj.version;
		}else{
			return;
			}
	}
	uexWidgetOne.getCurrentWidgetInfo();
}

function updatetips(str,jsonstr){
	var str1=str;
	var json=eval("["+jsonstr+"]");
	var url=json[0].url;//下载网址
	var str2=json[0].version_number;//最新版本号
	var txt=json[0].content;//提示语
	str1=str1.replace(".","");
	str1=Number(str1);
	str2=str2.replace(".","");
	str2=Number(str2);
	if(str2>str1){
		uexWindow.cbConfirm=function(opId,dataType,data){
		if(data==1){instapp(url)}
	}
		var value = "取消;升级";
		var mycars = value.split(";");
		uexWindow.confirm("新版本升级提示：", txt, mycars);
	}else{
		if (updates == 's') {
			uexWindow.toast("0", "5", "已经是最新版本啦！", "5000");
		}
	}
}

// function instapp(str){
	// localStorage.openurl=str;
    // uexWindow.open('openurl_win', '0', "openurl_top.html", '10', '', '', '0');
// }
