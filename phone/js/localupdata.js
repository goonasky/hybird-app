
  var r;
  var p;
  var c;
  var cText = 0;
  var cJson = 1;
  var cInt = 2;
  var dbName="localDB";
  var len //数据长度
function shuchuData() {
    alert(tempx);
    document.getElementById('test').innerHTML = tempx;
};
      
//打开数据库
function createDB() {
    uexDataBaseMgr.openDataBase(dbName, 1);
    uexDataBaseMgr.cbOpenDataBase = createDBCallBack;
    // uexDataBaseMgr.cbOpenDataBase = createDBCallBack;
};

function createDBCallBack(opid, type, data) {
    switch (type) {
    case cText:
        alert("uex.cText");
        break;
    case cJson:
        alert("uex.cJson");
        break;
    case cInt:
        if (opid == 1 && type == 2 && data == 0) {
            alert("数据库打开成功！");
        } else {
            alert("数据库打开失败！");
        }
        break;
    default:
        alert("error");
    }

};
  
//查询record表
function selectMData() {
    
    alert(1);
    uexDataBaseMgr.selectSql(dbName, 1, "Select * From MaintainRecord");;
    uexDataBaseMgr.cbSelectSql = selectMDataCallBack;
};
function selectMDataCallBack(opid, type, value) {
    if(type==cJson){
        if (opid == 1 && type == 1) {
            var jsonList = eval("(" + value + ")");
            r=value;
            if (jsonList.length == 0) {
                alert("无数据");
            }
            temp+="{\"ElevateInfos\":[";
            
            for (var i = 0; i <jsonList.length; i++) {
               if(jsonList[i]["Id"]!=undefined){
                    selectPData(jsonList[i]["GUID"]);
                }
            
    }
    }
}
};
    
    
//查询Plan表
function selectPData(i) {
    //alert(i);
    alert(2);
    uexDataBaseMgr.selectSql(dbName, 1, "Select * From MaintainPlanDetails");
    uexDataBaseMgr.cbSelectSql = selectPDataCallBack;
};


function selectPDataCallBack(opid, type, value) {
    if(type==cJson)
    {
         if (opid == 1 && type == 1) {
            var temp1 = eval("(" + value + ")");
            p=value;
            //alert(value);
            if (temp1.length == 0) {
                alert("无数据");
            }
            for (var j = 0; j < temp1.length; j++) {
                                selectCData(temp1[j]["GUID"]);
            }
        } 
        else {
            alert("查询失败！");
        }
    }
    };


//查询c表
function selectCData(i) {
    uexDataBaseMgr.selectSql(dbName, 1, "Select * From MaintainConclusionTable");
    uexDataBaseMgr.cbSelectSql = selectCDataCallBack;
};
// 
function selectCDataCallBack(opid, type, value) {
    
  if(type==cJson)
   {
         if (opid == 1 && type == 1) {
            var temp2 = eval("(" + value + ")");
            c=value;
            if (temp2.length == 0) {
                alert("无数据");
            }
            al();
        } else {
            alert("查询失败！");
        }
   }
     
};
function getbanb (){    
            uexWindow.toast("1","5","正在获取...","0");
            var url1 = http1+"SetMaintainRecord";
            appcan.request.ajax({
            type: "POST",
             url: url1, 
            data:{msg:tempx,token:""},
             async: true,
             datatype: "json",
            timeout: 12000,
            error:  function (data) {
                 alert(data);
             },
             success: function (data){
                // alert(1);
                alert(1);
            }
        }); 
     }

    
    var tempx = "";

    function al() {
        tempx="";
        var R = eval("(" + r + ")"); //电梯记录
        //alert(r);
        var P = eval("(" + p + ")"); //部位
        var C = eval("(" + c + ")"); //部位详细信息
        var b;
        tempx += "{\"ElevateInfos\":[";
        for (var e = 0; e < R.length; e++) {
            //alert(R[e]["ReportNO"]);
            tempx += "{";

            tempx += "\"ReportNo\":\"" + R[e]["ReportNO"] + "\",";
            //alert(2);
            tempx += "\"MTReason\":\"" + R[e]["MTReason"] + "\",";
            tempx += "\"Status\":" + R[e]["Status"] + ",";
            tempx += "\"BeginTime\":\"" + R[e]["BeginTime"] + "\",";
            tempx += "\"EndTime\":\"" + R[e]["EndTime"] + "\",";
            tempx += "\"GroupId\":" + R[e]["MtGroupId"] + ",";
            tempx += "\"MtUserId\":" + R[e]["MtUserId"] + ",";
            tempx += "\"ElevateDeviceInfos\":[";

            for (var f = 0; f < P.length; f++) {
               // alert(P[f]["ReportNO"]);
                
                if (P[f]["ReportNO"] == R[e]["ReportNO"]) {
                   // alert(P[f]["MTR_GUID"]);
                    //alert(R[e]["GUID"]);
                    if (P[f]["MTR_GUID"] == R[e]["GUID"]) {
                       // alert(0);
                        tempx += "{";
                        tempx += "\"DeveceCode\":\"" + P[f]["PointNo"] + "\",";
                        tempx += "\"place\":\"" + P[f]["PlaceID"] + "\",";
                        tempx += "\"Time\":\"" + P[f]["PickTime"] + "\",";

                        tempx += "\"MaintainItemInfos\":[";
                        for (var g = 0; g < C.length; g++) {
                           // alert(1);
                            //alert(C[g]["MTPD_GUID"]);
                            //alert(P[f]["GUID"]);
                            if (C[g]["MTPD_GUID"] == P[f]["GUID"]) {
                                
                                tempx += "{";
                                tempx += "\"MaintainItemId\":" + C[g]["ItemId"] + ",";
                                tempx += "\"MaintainItemResult\":" + C[g]["Conclusion"] + "";
                                tempx += "},";
                              
                            }

                            
                        }
                        tempx=tempx.substring(0,tempx.length-1);
                        tempx += "]";


                      tempx += "},";
                       


                    }
                }
             

            }
            tempx=tempx.substring(0,tempx.length-1);
            tempx += "]";
            if (e == (R.length - 1)) {
                tempx += "}";

            } else {
                tempx += "},";
            }
            
        }
        tempx += "]}";
        shuchuData();
        getbanb ();
    }   
