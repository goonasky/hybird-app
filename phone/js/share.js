
var v_id="";
var v_name="";
function sharef(id,e){
	v_id=id;
	e.stopPropagation();
	e.preventDefault();	
	uexWindow.cbActionSheet=function (opId, dataType, data)
	{
	if(data == 0){
		postwx(0);
	}
	else if (data == 1) {
		postwx(1);
	}else if (data == 2) {
		shareWebImgTextToQQ();
	}else if (data == 3) {
		shareImgTextToQZone();
	}
	}
	var value = "微信好友;微信朋友圈;QQ好友;QQ空间";
	var mycars=value.split(";");
	uexWindow.actionSheet("请选择","取消",mycars);
	if(id==1){
		v_name="测测你内心深处的样子？";
	}
	if (id==2) {
		v_name = "测测你被林黛玉附身了吗？";
	}
	if(id==3){
		v_name="测测你跟你自己过不去吗？";
	}
	if(id==4){
		v_name="测测你的心理边界强度？";
	}
	if(id==5){
		v_name="测别人眼里你的逼格有多高？";
	}
	if(id==6){
		v_name="测测你能把几个妹？";
	}
	if(id==7){
		v_name="测你的自杀危险性有多大？";
	}
	if(id==8){
		v_name="测测你的大脑是几核CPU？";
	}
	if(id==9){
		v_name="测测你的最佳职业方向？ ";
	}
}

var sid="";
function iswx(){
		uexWeiXin.cbIsWXAppInstalled = function(opCode, dataType, data){
				if (data == 0) {//未安装时，提示用户是否安装微信		
					shareText();
				}
				else {
					confirmStall();
				}
		}
		 uexWeiXin.cbGetWXAppInstallUrl=function(opCode,dataType,data){
			uexWidget.loadApp(data,null,null);
		}
}

function postwx(id){
	sid=id;
	uexWeiXin.registerApp('wxab13a5af04805e97');
	uexWeiXin.isWXAppInstalled();
}

function confirmStall(){
	uexWindow.cbConfirm = function(opId, dataType, data){
	   	if (data == 0) {
			if(window.navigator.userAgent.indexOf("Android") >= 0){
			return;
			}else{
				installUrl();
			}
   		}
   	}
	var str = "";
	if(window.navigator.userAgent.indexOf("Android") >= 0){
		str = "您还未安装微信客户端，请先安装微信客户端！";
	}else{
		str = "您还未安装微信客户端，是否安装微信客户端！";
	}
	uexWindow.confirm("提示",str, '确定;取消'.split(';'));
}

function shareWebImgTextToQQ(){
	var v_url="http://mlxl.yunpusher.com/json.php/Share/ceping/id/"+v_id;
          var json = '{"title":"悠悠心理-陪伴每一天 美丽你人生","summary":"'+v_name+'","targetUrl":"'+v_url+'","imageUrl":"res://icon.png","appName":"悠悠心理", "cflag":"2"}';
          uexQQ.shareWebImgTextToQQ("1104218645", json);
}
	  
function shareImgTextToQZone(){
	var v_url="http://mlxl.yunpusher.com/json.php/Share/ceping/id/"+v_id;
	var json = '{"title":"悠悠心理-陪伴每一天 美丽你人生","summary":"'+v_name+'","targetUrl":"'+v_url+'","imageUrl":["res://icon.png", "res://icon.png", "res://icon.png"]}';
		uexQQ.shareImgTextToQZone("1104218645", json);
}

function shareText(){
	var v_url="http://mlxl.yunpusher.com/json.php/Share/ceping/id/"+v_id;
	if (uexWidgetOne.platformName == "android") {
		if(sid==1){
			uexWeiXin.sendImageContent(sid, "res://icon.png", 'res://icon.png', v_url,v_name,"悠悠心理-陪伴每一天 美丽你人生 ");		
		}else{
			uexWeiXin.sendImageContent(sid, "res://icon.png", 'res://icon.png', v_url, "悠悠心理-陪伴每一天 美丽你人生 ", v_name);
		}
		return;
	}
	if(sid==1){
		uexWeiXin.sendImageContent(sid,"res://icon.png",'',v_url,v_name,"悠悠心理-陪伴每一天 美丽你人生 ");
	}else{
		uexWeiXin.sendImageContent(sid, "res://icon.png", '', v_url, "悠悠心理-陪伴每一天 美丽你人生 ", v_name);
	}
	
}

function installUrl(){
	uexWeiXin.getWXAppInstallUrl();
}