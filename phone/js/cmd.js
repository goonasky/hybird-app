//本地服务器
//var http="http://192.168.0.75:8033/API/MobileApi.asmx/";//天津
//var http1="http://192.168.0.75:8033/API/CZMobileApi.asmx/"; //天津
//测试服务器
//var http="http://192.168.0.162:8056/API/MobileApi.asmx/";//天津
//var http1="http://192.168.0.162:8056/API/CZMobileApi.asmx/"; //天津
var http="http://dtpt.tjmqa.gov.cn/API/MobileApi.asmx/"//天津正式
var http1="http://dtpt.tjmqa.gov.cn/API/CZMobileApi.asmx/"

var imgu="";

function checkmo(m){
    if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(m))){
        return false;
    }
    else{
        return true;
    }
}

function swipeRight(){
    uexWindow.evaluateScript("",0,"winclose();");
}


function lefth(){
    //uexWindow.onSwipeRight = swipeRight;
    if (uexWidgetOne.platformName == "android") {
        uexWindow.onSwipeRight = swipeRight;
        uexWindow.setSwipeRate(600);
    }else{
        return;
    }   
}

function clearString(s){ 
     var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'。，、？]");
     var rs = ""; 
     for (var i = 0; i < s.length; i++) { 
          rs = rs + trim(s.substr(i, 1).replace(pattern, '')); 
     } 
     return rs;  
   }
   

function trim(s){ 
    return trimRight(trimLeft(s)); 
} 
//去掉左边的空白 
function trimLeft(s){ 
    if(s == null) { 
    return ""; 
    } 
    var whitespace = new String(" \t\n\r"); 
    var str = new String(s); 
    if (whitespace.indexOf(str.charAt(0)) != -1) { 
    var j=0, i = str.length; 
    while (j < i && whitespace.indexOf(str.charAt(j)) != -1){ 
    j++; 
    } 
    str = str.substring(j, i); 
    } 
    return str; 
} 
//去掉右边的空白 
function trimRight(s){ 
    if(s == null) return ""; 
    var whitespace = new String(" \t\n\r"); 
    var str = new String(s); 
    if (whitespace.indexOf(str.charAt(str.length-1)) != -1){ 
    var i = str.length - 1; 
    while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1){ 
    i--; 
    } 
    str = str.substring(0, i+1); 
    } 
    return str; 
} 

function getuser(str){
    if(typeof(localStorage.loginjson)=="undefined"||localStorage.loginjson==""){
        
        return -1;
    }
    else{       
        var json = eval("(" + localStorage.loginjson + ")");
        if(str=="uid"){return json.userdata.userId;}
        if(str=="name"){return json.userdata.nickName;}
        if(str=="userName"){return json.userdata.userName;}
        if(str=="token"){return json.userdata.token;}
        if(str=="groupId"){return json.userdata.groupId;}       
        if(str=="groupName"){return json.userdata.groupName;}
        if(str=="groupDisplayName"){return json.userdata.groupDisplayName;}
        if(str=="mtuid"){return json.userdata.mtUserId;}
    }
}

//时间转换函数
function utcToDate(date){
     var retDate = new Date(parseInt(date.replace("/Date(", "").replace(")/", "").split("+")[0]));
    return retDate;
}
//得到标准日期
function getNormalDay(utcStr){
    var retStr='';
    var date=utcToDate(utcStr);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    
    retStr=year+'-'+month+'-'+day;
   return retStr;
}
//得到全部时间
function getAllTime(utcStr){
    var retStr='';
    var date=utcToDate(utcStr);
    var year =date.getFullYear();
    var month =date.getMonth() + 1;
    var day =date.getDate();
    var hour=date.getHours();
    var min=date.getMinutes();
    var sec=date.getSeconds();
    
    retStr=year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec;
   return retStr;
}

function timeToNow(postdate){  
    var myDate=postdate;
    var second=1000;
    var minutes=second*60;
    var hours=minutes*60;
    var days=hours*24;
    var months=days * 30;  
    var nowtime = new Date();
    var longtime = nowtime.getTime()-myDate.getTime();
    var showtime = 0;
    if (longtime>days){
        var year=myDate.getFullYear();
        var month=myDate.getMonth()+1;
        var day=myDate.getDate();
        var hours=myDate.getHours();
        var mins=myDate.getMinutes();
        var t_month="";
        var t_hours="";
        var t_mins="";
        var t_day="";
        if(month<10){
            t_month='0'+month;
        }else{
            t_month=month;
        }
        if(day<10){
            t_day='0'+day;
        }else{
            t_day=day;
        }
        if(hours<10){
            t_hours='0'+hours;
        }else{
            t_hours=hours;
        }
        if(mins<10){
            t_mins='0'+mins;
        }else{
            t_mins=mins;
        }
    
        var  retStr=year+'-'+t_month+'-'+t_day+' '+t_hours+':'+t_mins;
        return retStr;
    }else if (longtime>hours){
        return (Math.floor(longtime/hours)+"小时前");
    }else if (longtime>minutes){
        return (Math.floor(longtime/minutes)+"分钟前");
    }else if (longtime>second){
        return "刚刚";
    }else{
         return "刚刚";
    }
}

//得到数据类型
function getType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
//去除html tag函数
function removeHTMLTags(strInputCode){
        strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1){
            return (p1 == "lt")? "<" : ">";
        });
        var newOutput = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
       return newOutput;
}
//模拟器打印json函数
function Log(tip,json){
    var date=new Date();
    var pre=date.getHours()+':'+date.getMinutes()+'-'+date.getSeconds()+'##';
    console.log(pre+tip+'：'+JSON.stringify(json));
}

function telcall(str){
    str=str+"";
    if(str=="null"){uexWindow.toast("0", "5", "电话未设置", "2000");return;}
    str=str.replace(" ","");
    str=str.replace("-","");
    str=str.replace("  ","");
    str=str.replace("—","");    
    if(str.length<3){uexWindow.toast("0", "5", "未设置或电话位数不够！", "2000");return;}
    uexCall.dial(str);
}

function replace_other(str){
    var newString =str.replace(/\n/g, '_@').replace(/\r/g, '_#');
    newString = newString.replace(/_@/g, '<br/>'); //换行处理
    newString = newString.replace(/\s/g, '&nbsp;');//空格处理
    return newString;
}

function locallogin(){
    localStorage.removeItem('loginjson');
    uexWindow.open('login_win', '0', "login_top.html", '10', '', '', '1024');
    uexWindow.evaluateScript("root", 0, "remy();");
    return;
}

function reThis () {
    if(typeof(localStorage.loginjson)=="undefined"||localStorage.loginjson==""){        
        uexWindow.open('login_win', '0', "login_top.html", '10', '', '', '0');
    }
    else
    {
        window.location.reload();
    }  
}
function start(){
           if(localStorage.va==1){  
            text=$("#rName").text();
            //设置在线
            speechSynthesizer.setParameter("engine_type","cloud");
            //设置发音人
            speechSynthesizer.setParameter("voice_name","xiaoyan");
            //设置语速
            speechSynthesizer.setParameter("speed","50");
            //设置音调
            speechSynthesizer.setParameter("pitch","50");
            //设置音量
            speechSynthesizer.setParameter("volume","50");
            //设置播放器音频流类型
            speechSynthesizer.setParameter("stream_type","3");
            speechSynthesizer.startSpeaking(text);
         }
    }
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}





//获取地理位置
function getCord(){
     uexLocation.openLocation();//打开定位
     uexLocation.onChange = function(lat, log){  
     var Coordinate= log+ "," + lat;  
     if(Coordinate==null||Coordinate==undefined){
       Coordinate="117.204924,39.096356";
     }
     localStorage.Coordinate=Coordinate;
     return Coordinate;
     } 
}

//获取当前时间
function getTimeNow(){
    var dt = new Date();
    var d=(dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+' '+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds()).replace(/([\-\: ])(\d{1})(?!\d)/g,'$10$2');
    return d;
}

//获取月份
function getMonth(time){
    var month="";
    switch(time)
    {
        case '01':
             month="JAN";
             return month;
             break;
        case '02':
             month="FEB";
             return month;
             break;
        case '03':
             month="MAR";
             return month;
             break;
        case '04':
             month="APR";
             return month;
             break;
        case '05':
             month="MAY";
             return month;
             break;
        case '06':
             month="JUN";
             return month;
             break;
        case '07':
             month="JUL";
             return month;
             break;
        case '08':
             month="AUG";
             return month;
             break;
        case '09':
             month="SEP";
             return month;
             break;
        case '10':
             month="OCT";
             return month;
             break;
        case '11':
             month="NOV";
             return month;
             break;
        case '12':
             month="DEC";
             return month;
             break;              
    }
}




