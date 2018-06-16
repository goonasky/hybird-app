//更新类.
var upgrade=function(){
        this.flag_sdcard = 1;
        this.updateurl = '';//下载新apk文件地址
        this.filepath2 = "/sdcard/";//保存到sd卡
        this.fileName = '';//新版本文件名
        this.platform = '';//平台版本
        
}

upgrade.prototype.check=function(){
        var that=this;
        //安卓版 ，显示下载进度 （step:7）
    uexDownloaderMgr.onStatus = function(opId, fileSize, percent, status) {
                        alert("step7");
            if (status == 0) {
                    // 下载中...
                    uexWindow.toast('1', '5', '下载进度：' + percent + '%', '');
            } else if (status == 1) {// 下载完成.
                    uexWindow.closeToast();
                    uexDownloaderMgr.closeDownloader('14');//关闭下载对象
                    uexWidget.installApp(that.filepath2+that.fileName);// 安装下载apk文件
            } else {
                    uexWindow.toast('1', '5', '下载出错，请关闭软件再次运行.', '');
            }
    };
        
        //安卓版 ，创建下载对象回调函数（step:6）
    uexDownloaderMgr.cbCreateDownloader = function(opId, dataType, data) {
                        alert("step6");
            if (data == 0) {
                    //updateurl是通过调用cbCheckUpdate回调后，放入全局变量的
                    uexDownloaderMgr.download('14', that.updateurl, that.filepath2+that.fileName, '0');//开始下载apk文件
            } else if (data == 1) {
                    ;
            } else {
                    ;
            }
    };
        
        //提示更新模态框按钮事件回调函数，判断用户选择更新还是取消 （step:5）
    uexWindow.cbConfirm = function(opId, dataType, data) {
                        alert("step5");
            //调用对话框提示函数
            if (data == 0) {
                    //用户点击稍后按钮，不进行更新
            } else {
                    //用户点击确定按钮，进行更新
                    if (platform == 0) {
                            //苹果版更新，通过浏览器加载appstore路径
                            //TODO:这个还没有试过
                            uexWidget.loadApp("", "", that.updateurl);
                    } else if (platform == 1) {
                            //安卓版更新，通过创建下载对象进行下载
                            uexDownloaderMgr.createDownloader("14");
                    } else {
                            ;
                    }
            }
    };
        
        //调用检查更新回调函数，请求成功后，弹出模态框让用户选择是否现在更新（step:4）
    uexWidget.cbCheckUpdate = function(opCode, dataType, jsonData) {
                        alert("step4");
                        alert("data:"+jsonData);
            var obj = eval('(' + jsonData + ')');
                        
            if (obj.result == 0) {
                    // tips = "更新地址是：" + obj.url + "<br>文件名：" + obj.name + "<br>文件大小：" +
                    // obj.size + "<br>版本号：" + obj.version;
                    that.updateurl = obj.url;
                    that.fileName = obj.name+".apk";
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
                        alert("step3");
            if (that.flag_sdcard == 0) {
                    if (data == 0) {
                            //Log('sdcard不存在，根据具体情况处理');
                    } else {
                            //执行检查更新
                            uexWidget.checkUpdate();//根据config.xml里面配置的检查更新地址发起http请求
                    }
                    that.flag_sdcard = 1;
            }
    };
        
        //获取平台版本回调函数，确定是客户端是那个平台的客户端 （step:2）
    uexWidgetOne.cbGetPlatform = function(opId, dataType, data) {
                        alert("step2");
            //Log('uexWidgetOne.cbGetPlatform ');
            //获取系统版本信息回调函数
            platform = data;
            //Log('platform= '+platform);
            if (data == 0) {
                    // 是iphone
                    uexWidget.checkUpdate();// 直接调用检查更新，检查更新地址在config.xml里面有配置
            } else if (data == 1) {
                    // 是android
                    that.flag_sdcard = 0;
                    uexFileMgr.isFileExistByPath('/sdcard/');//先判断是否存在sd卡，再调用checkUpdate来进行更新
            } else {
                    // 是平台
            }
    };
        
        uexWidgetOne.getPlatform();//获取平台版本 （step:1）
        
        
}

