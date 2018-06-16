var filepath2 = "/sdcard/";//保存到sd卡
var fileName = '';//新版本文件名
var platform = '';//平台版本
var ver = '';//软件版本
/**
* 发送日志
*/
function Log(s) {
    //uexLog.sendLog(s);
    //alert(s);
}

function xmlhttp(){
　　　　　　　　uexxmlhttpmgr.open("1", "get",url,"");
　　　　　　　　uexxmlhttpmgr.send("1");
　　　　　　}
　　　　　　function httpsuccess(opid,stauts,result){
　　　　　　　　//document.getelementbyid("my_result").innerhtml =result;

updateFileUrl = result.updateFileUrl;
            localStorage.updateUrl=updateUrl;
            localStorage.remoteVersion=result.version;
            
            if(localStorage.remoteVersion!=ver)
            {
                var value = "稍后;更新";
                var myNew = value.split(";");
                uexWindow.confirm('', '当前有新版本，是否更新?', myNew);//弹出提示框，是否确定更新                 
            }

　　　　　　　　uexxmlhttpmgr.close("1");
　　　　　　}

function ajaxGetVer () {  
     
  appcan.request.ajax({
        type: 'POST',
        url: http+"GetVS",
        data:{platform:'1'},
        dataType: 'json',
        timeout: 20000,
        error: function(){
            //uexWindow.toast('0', '5', '更新请求失败！', '2000');
        },
        success: function(data){
            updateFileUrl = data.updateFileUrl;
            localStorage.updateUrl=updateFileUrl;
            localStorage.remoteVersion=data.version;            
            updateurl = data.updateFileUrl;
            fileName = data.filename+".apk";           
            

            //alert(localStorage.remoteVersion+"---"+ver);
            if(localStorage.remoteVersion>ver)
            {                
                var value = "更新;稍后";
                var myNew = value.split(";");
                uexWindow.confirm('', '当前有新版本，是否更新?', myNew);//弹出提示框，是否确定更新                 
            }
        }
    });
}

function getverApp(){
        //安卓版 ，显示下载进度 （step:7）
        uexDownloaderMgr.onStatus = function(opId, fileSize, percent, status) {
                if (status == 0) {
                        // 下载中...
                        Log('下载进度 ' + percent + '%');
                        uexWindow.toast('1', '5', '下载进度：' + percent + '%', '');
                } else if (status == 1) {// 下载完成.
                        uexWindow.closeToast();
                        uexDownloaderMgr.closeDownloader('14');//关闭下载对象
                        uexWidget.installApp(filepath2+fileName);// 安装下载apk文件
                } else {
                        uexWindow.toast('1', '5', '下载出错，请关闭软件再次运行.', '');
                }
        };
        //安卓版 ，创建下载对象回调函数（step:6）
        uexDownloaderMgr.cbCreateDownloader = function(opId, dataType, data) {
                Log('uexDownloaderMgr.cbCreateDownloader data='+data);
                if (data == 0) {
                        //updateurl是通过调用cbCheckUpdate回调后，放入全局变量的
                        uexDownloaderMgr.download('14', updateurl, filepath2+fileName, '0');//开始下载apk文件
                } else if (data == 1) {
                        Log('data == 1');;
                } else {
                        Log('data == EE');;
                }
        };

        //提示更新模态框按钮事件回调函数，判断用户选择更新还是取消 （step:5）
        uexWindow.cbConfirm = function(opId, dataType, data) {
                Log('uexWindow.cbConfirm ');
                //调用对话框提示函数
                if (data == 0) {
                    //用户点击确定按钮，进行更新
                        if (platform == 0) {
                                //苹果版更新，通过浏览器加载appstore路径
                                //TODO:这个还没有试过
                                //uexWidget.loadApp("", "", updateurl);
                        } else if (platform == 1) {                            
                                //安卓版更新，通过创建下载对象进行下载
                                uexDownloaderMgr.createDownloader("14");
                        } else {
                            ;
                        }
                } else {                        
                        //用户点击稍后按钮，不进行更新
                }
        };

        //调用检查更新回调函数，请求成功后，弹出模态框让用户选择是否现在更新（step:4）
        uexWidget.cbCheckUpdate = function(opCode, dataType, jsonData) {
                Log('jsonData='+jsonData);
                var obj = eval('(' + jsonData + ')');
                if (obj.result == 0) {
                        // tips = "更新地址是：" + obj.url + "<br>文件名：" + obj.name + "<br>文件大小：" +
                        // obj.size + "<br>版本号：" + obj.version;
                        updateurl = obj.url;
                        fileName = obj.name+".apk";
                        var value = "稍后;更新";
                        var mycars = value.split(";");
                        uexWindow.confirm('', '当前有新版本，是否更新?', mycars);//弹出提示框，是否确定更新
                } else if (obj.result == 1) {
                        ;// tips = "当前版本是最新的";alert(tips);
                } else if (obj.result == 2) {
                        ;// tips = "未知错误";alert(tips);
                } else if (obj.result == 3) {
                        ;// tips = "参数错误";alert(tips);
                }
        };

        //检查是否已经存在sd卡的回调函数（step:3）
        uexFileMgr.cbIsFileExistByPath = function(opCode, dataType, data) {
                Log('uexFileMgr.cbIsFileExistByPath flag_sdcard='+flag_sdcard+' , data='+data);
                
                if (flag_sdcard == 0) {
                        if (data == 0) {
                                Log('sdcard不存在，根据具体情况处理');
                        } else {
                            ajaxGetVer();
                                //执行检查更新
                                //uexWidget.checkUpdate();//根据config.xml里面配置的检查更新地址发起http请求
                        }
                        flag_sdcard = 1;
                }
        };
        //获取平台版本回调函数，确定是客户端是那个平台的客户端 （step:2）
        uexWidgetOne.cbGetPlatform = function(opId, dataType, data) {
                Log('uexWidgetOne.cbGetPlatform ');
                //获取系统版本信息回调函数
                platform = data;
                Log('platform= '+platform);
                
                ajaxGetVer();
                
                if (data == 0) {
                        // 是iphone
                        uexWidget.checkUpdate();// 直接调用检查更新，检查更新地址在config.xml里面有配置
                } else if (data == 1) {
                        // 是android
                        flag_sdcard = 0;
                        uexFileMgr.isFileExistByPath('/sdcard/');//先判断是否存在sd卡，再调用checkUpdate来进行更新
                } else {
                        // 是平台
                }
        };
        uexWidgetOne.getPlatform();//获取平台版本 （step:1）
        
        uexWidgetOne.cbGetCurrentWidgetInfo=function(opId,dataType,data){
        var obj=JSON.parse(data);
        ver =obj.version;
        localStorage.version = ver;
          }
          uexWidgetOne.getCurrentWidgetInfo();//获取软件版本 （step:0）
};