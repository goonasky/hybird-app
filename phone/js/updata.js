//提交
 function submit(){
     //alert("提交1")
        tempguid="";    
        var a=0;
        var x=document.getElementsByName("checkbox");
        for (var i=0;i<x.length;i++)
        {
            
            if(x[i].checked){
                 tempguid+="'"+x[i].dataset.guid+"'"+",";
                 a=a+1;
            }
   
        }
        tempguid=tempguid.substring(0,tempguid.length-1);
        if(a==0){
                alert("请选择提交项");
        }
        else{
            appcan.window.alert({
              title : "电梯维保监管评测系统",
              content : "确认提交?",
              buttons : ['确定', '取消'],
              callback : function(err, data, dataType, optId) {
                  if(data=="0"){
                      selectMData();
                  }
                  else{
                      relaod();
                  }
              }
           
            })
        }
                 
 };
 
//拼接json
function getResult(){
    //alert("提交5")
    var RecordResult=eval("(" + tempRecordResult + ")");
    var ChoseResult=eval("(" + tempChoseResult + ")");
    var tempx="";
    tempx += "{\"ElevateInfos\":[";
        for (var e = 0; e < RecordResult.length; e++) {
            tempx += "{";

            tempx += "\"ReportNo\":\"" + RecordResult[e]["ReportNO"] + "\",";
            
            tempx += "\"GUID\":\"" + RecordResult[e]["GUID"] + "\",";
            
            tempx += "\"MTReason\":\"\",";
            
            tempx += "\"Status\":"+ RecordResult[e]["MainStatus"] +",";
            
            tempx += "\"BeginTime\":\"" + RecordResult[e]["BeginTime"] + "\",";
            
            tempx += "\"EndTime\":\"" + RecordResult[e]["EndTime"] + "\",";
            
            tempx += "\"GroupId\":" + RecordResult[e]["MtGroupId"] + ",";
            
            tempx += "\"MtUserId\":" + RecordResult[e]["MtUserId"] + ",";
            
            tempx += "\"workType\":0,";
            
            tempx += "\"maintainType\":"+RecordResult[e]["maintainType"] + ",";
                     
            tempx += "\"ElevateCoordinate\":\"" +RecordResult[e]["ECoordinate"]+ "\",";
            
            tempx += "\"MtPic\":\"" +RecordResult[e]["MtPic"]+ "\",";
            
            tempx += "\"ElevateDeviceInfos\":[";
            
            tempx += "{";
            
            tempx += "\"DeveceCode\":\"\",";
            
            tempx += "\"place\":\"\",";
            
            tempx += "\"Time\":\"" + RecordResult[e]["EndTime"] + "\",";
            
            tempx += "\"PointType\":0,";
            
            tempx += "\"MaintainItemInfos\":[";
            
            for (var g = 0; g < ChoseResult.length; g++) {
                if (ChoseResult[g]["MTPD_GUID"] == RecordResult[e]["GUID"]) {  
                    tempx += "{"                             
                    tempx += "\"MaintainItemId\":" + ChoseResult[g]["ItemId"] + ",";
                    if(ChoseResult[g]["Conclusion"]==""){
                        tempx += "\"MaintainItemResult\":\"" +0+ "\",";
                    }else{
                        tempx += "\"MaintainItemResult\":\"" +ChoseResult[g]["Conclusion"] + "\",";
                    }
                    
                    tempx += "\"ConclusionDetails\":\"" + ChoseResult[g]["ConclusionDetails"] + "\"";
                    tempx += "},";     
                }

                
            }
            if(tempx.substring(tempx.length-1,tempx.length)!="["){
            tempx=tempx.substring(0,tempx.length-1); 
            }
            tempx += "]";

            tempx += "},";
            tempx=tempx.substring(0,tempx.length-1);
            tempx += "]";
            if (e == (RecordResult.length - 1)) {
                tempx += "}";

            } else {
                tempx += "},";
            }
            
        }
        tempx += "]}";
        updatax(tempx);
}

//上传维保维保记录
 function updatax(tempx){
     //document.getElementById('test1').innerHTML = tempx;
     var t=getuser("token");
     //alert(t)
     //alert(tempx)
     //alert("提交6")
     var url1 = http1+"SetMaintainRecord";
//      ===========================================================================
var db = uexDataBaseMgr.open(dbName);
//alert("提交7")
    if (!db) {} else {
        //alert("提交8")
        var sql = "Select * From MaintainRecord WHERE GUID IN ("+tempguid+")";
        uexDataBaseMgr.select(db, sql,
        function(error, data) {
            if (error) {
                alert('查询失败');
            } else {
                //alert("提交9")
                tempRecordResult=eval("(" + JSON.stringify(data) + ")");
                //alert(tempRecordResult[0]['isChoucha']);
                
                    if(tempRecordResult[0]['isChoucha']==0){
                       //alert("提交10")
                        appcan.request.ajax({
            type: "POST",
             url: url1, 
            data:{msg:tempx,token:getuser("token")},
             async: true,
             datatype: "json",
            timeout: 12000,
            error:  function (data) {
                 alert("请检查网络是否连接！");
                 uexWindow.closeToast();
             },
             success: function (data){
                alert("提交成功")
                var json=eval("("+data+")");
                if(json.code==1)
                {
                    var db = uexDataBaseMgr.open(dbName);
                    if (!db) {} else {
                        var sqls = [
                        "UPDATE MaintainRecord set Status=2 WHERE GUID IN ("+tempguid+") "];
                        uexDataBaseMgr.transactionEx(db, JSON.stringify(sqls),
                        function(error) {
                            //alert("error"+error);
                            if (error == 0) {
                                uexWindow.toast("0", "5", "上传成功1", "3000");
                            } else {
                                uexWindow.toast("0", "5", "上传成功2", "3000");
                            }
                            uexDataBaseMgr.close(db);
                            uexWindow.open('index.html', '0', "index3.html", '10', '', '', '4');
                        });
                    }
                      
                }
                else{
                    alert("上传失败");
                    uexWindow.closeToast();
                }
                
            }
        }); 
                    }
            }
        });
    }
//=====================================================================================
            
            
}

/****************************************上传照片*************************************************/
var tempPiclistNum=0;
var tempPicNum=0;
var Piclist="";
var Photo="";

function  getPic(){
    //alert("提交2")
    var RecordResult=eval("(" + tempRecordResult + ")");
    //alert("length"+RecordResult.length)
    if(tempPiclistNum<RecordResult.length){
       Piclist=RecordResult[tempPiclistNum]["MtPic"];
       if(Piclist.trim()!=""){
           setPicName();
       }
       else{
           tempPiclistNum=tempPiclistNum+1;
           getPic();
       }
    }
    else{
        selectMDataPic();
    }
}


function setPicName(){
    //alert("提交2.1")
    if(tempPicNum<Piclist.split(',').length){
        Photo=Piclist.split(',')[tempPicNum];
        updatePic();
    }
    else{
        var RecordResult=eval("(" + tempRecordResult + ")");
        var src=tempPiclist.substring(0,tempPiclist.length-1);
        var db = uexDataBaseMgr.open(dbName);
        if (!db) {} else {
            var sqls = [
            "UPDATE MaintainRecord set MtPic='"+src+"' WHERE GUID ='"+RecordResult[tempPiclistNum]["GUID"]+"' "];
            uexDataBaseMgr.transactionEx(db, JSON.stringify(sqls),
            function(error) {
                if (error == 0) {
                    //alert("提交2.2")
                    tempPiclistNum=tempPiclistNum+1;
                    getPic();
                } else {
                    //alert("上传失败2.3")
                    uexWindow.toast("0", "5", "上传失败", "3000");
                }
                uexDataBaseMgr.close(db);
            });
        }
    }
    
}

var tempPiclist=""

function updatePic(){
    var pic=Photo;
    lrz(pic,{width: 1000}).then(function (rst) {
                 var url1 = http1+"MtPicUpload";
                 var rbase=rst.base64;
                 appcan.request.ajax({
                    type: "POST",
                    url: url1, 
                    data:{base64:rst.base64},
                    async: true,
                    datatype: "json",
                timeout: 12000,
                error:  function (data) { 
                   uexWindow.toast("0", "5", "上传失败", "3000");
                },
                success: function (data){
                   var json = eval("(" + data + ")");
                   tempPiclist+=json.userdata.record[0].Name+",";
                   tempPicNum=tempPicNum+1;
                   setPicName();
                }});
     })
}
//================================================================================
//获取checkbox中的电梯编号
function signGroup(){
          tempguid="";//电梯编号    
            var a=0;
            var x=document.getElementsByName("checkbox");
            for (var i=0;i<x.length;i++)
            {
                
                if(x[i].checked){
                         //alert(a);
                         tempguid+="'"+x[i].dataset.guid+"'"+",";
                                 a=a+1;
                        }
           
            }
            if(a==0){
               alert("请选择确认项");
            }
            else{
                tempguid=tempguid.substring(0,tempguid.length-1);
                //alert(Q);
                localStorage.tempguid=tempguid;
                var db = uexDataBaseMgr.open(dbName);
                if (!db) {} else {
                    var sqls = [
                    
                    "Update MaintainRecord  set Status=1 Where GUID in("+localStorage.tempguid+")"]
                    
                    
                    
                    uexDataBaseMgr.transactionEx(db, JSON.stringify(sqls),
                    function(error) { 
                      uexWindow.open('index.html', '0', "index3_content.html", '10', '', '', '4');
                      uexDataBaseMgr.close(db);
                    });
                } 
             }
}
//======================================================================================
//使用单位签名
function signGroup(){
          tempguid="";//电梯编号    
            var a=0;
            var x=document.getElementsByName("checkbox");
            for (var i=0;i<x.length;i++)
            {
                
                if(x[i].checked){
                         //alert(a);
                         tempguid+="'"+x[i].dataset.guid+"'"+",";
                                 a=a+1;
                        }
           
            }
            if(a==0){
               alert("请选择确认项");
            }
            else{
                tempguid=tempguid.substring(0,tempguid.length-1);
                //alert(Q);
                localStorage.tempguid=tempguid;
                appcan.window.open({
                    name:'Sign_top',
                    dataType:0,
                    data:'Sign_top.html'
                });
             }
}
