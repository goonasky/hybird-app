var cText = 0;
var cJson = 1;
var cInt = 2;
//创建数据库
function createDB(){
        alert(1);
        uexDataBaseMgr.openDataBase(dbName,1);
        uexDataBaseMgr.cbOpenDataBase =createDBCallBack;
};
//创建数据库回调
function createDBCallBack(opid,type,data){
        switch(type){
            case cText:
                alert("uex.cText");
                break;
            case cJson:
              alert("uex.cJson");
                break;
            case cInt:
            if(opid == 1 &&type == 2&&data == 0){
                alert("数据库打开成功！");
            }else{
                 alert("数据库打开失败！");
            }
            break;
          default:
              alert("error"); 
      }
        
    };
 
//关闭数据库
  function closeDataBase(){
        uexDataBaseMgr.closeDataBase(dbName,1);
        uexDataBaseMgr.cbCloseDataBase = closeDataBaseCallBack;
    };
//关闭数据库回调
function closeDataBaseCallBack(opid,type,data){
        switch(type){
            case cText:
                alert("uex.cText");
                break;
            case cJson:
              alert("uex.cJson");
                break;
            case cInt:
            if(opid == 1 &&type == 2&&data == 0){
                alert("数据库关闭成功！");
            }else{
                 alert("数据库关闭失败！");
            }
            break;
          default:
              alert("error");
      }
};
//创建表
function createD_MaintainItemTable(){
         var dbName="localDB";
         uexDataBaseMgr.executeSql(dbName,1,"CREATE TABLE D_MaintainItem (Id  INTEGER PRIMARY KEY, ItemCode nvarchar(20) NULL,ItemName nvarchar(500) NULL,Claim nvarchar(500) NULL,PlaceId int NULL,Type int NULL,ItemType int NULL,GroupId int NULL,ElevatorType int ULL,LastTime datetime NULL,IsDelete tinyint NOT NULL)");
         uexDataBaseMgr.cbExecuteSql = createTableCallBack;
};

function createMaintainRecordTable(){
         var dbName="localDB";
         uexDataBaseMgr.executeSql(dbName,1,"CREATE TABLE MaintainRecord (Id  INTEGER , GUID varchar(50) PRIMARY KEY,ReportNO nvarchar(50),MtGroupId int ,MtUserId int,BeginTime datatime,EndTime datatime,Status int)");
         uexDataBaseMgr.cbExecuteSql = createTableCallBack;
};
function createMaintainPlanDetailsTable(){
         var dbName="localDB";
         uexDataBaseMgr.executeSql(dbName,1,"CREATE TABLE MaintainPlanDetails (GUID  varchar(50) PRIMARY KEY, MTR_GUID varchar(50),EPlanId int,PlaceID Varchar(30),PointNo Varchar(30),PickTime datetime,MtUserId int)");
         uexDataBaseMgr.cbExecuteSql = createTableCallBack;
};
function createMaintainConclusionTable(){
         var dbName="localDB";
         uexDataBaseMgr.executeSql(dbName,1,"CREATE TABLE MaintainPlanDetails (ItemId  int,PickTime datatime,Conclusion int, Reason nvarchar(400),Measure nvarchar(400);ConclusionDetails nvarchar(400))");
         uexDataBaseMgr.cbExecuteSql = createTableCallBack;
};
//创建表回调
  function createTableCallBack(opid,type,data){
        switch(type){
            case cText:
                alert("uex.cText");
                break;
            case cJson:
              alert("uex.cJson");
                break;
            case cInt:
            if(opid == 1&&type == 2 &&data == 0){
                alert("表创建成功！");
            }else{
                 alert("表创建失败！");
            }
            break;
          default:
              alert("error");   
      };
//插入数据 
/***********缓存维保模版*************************/
function getbanb (){     
        uexWindow.toast("1","5","正在获取...","0");
         var url1 = http1+"GetMaintainItem";
        appcan.request.ajax({
            type: "POST",
             url: url1, 
            data:{time:"1900-01-01 00:00:00",token:"123145161"},
             async: true,
             datatype: "json",
            timeout: 12000,
            error:  function (data) {
                 //alert(0);
             },
             success: function (data){
                // alert(1);
            var json=eval("("+data+")");
//            
           for(var i=0;i<json.userdata.record.length;i++){
             var strSql="INSERT INTO D_MaintainItem(Id,ItemCode,ItemName,Claim,PlaceId,Type,ItemType,GroupId,ElevatorType,LastTime,IsDelete) VALUES ('"+json.userdata.record[i].Id+"','"+json.userdata.record[i].ItemCode+"','"+json.userdata.record[i].ItemName+"','"+json.userdata.record[i].Claim+"','"+json.userdata.record[0].PlaceId+"','"+json.userdata.record[i].Type+"','"+json.userdata.record[i].ItemType+"','"+json.userdata.record[i].GroupId+"','"+json.userdata.record[i].ElevatorType+"','"+json.userdata.record[i].LastTime+"','"+json.userdata.record[i].IsDelete+"')";
             uexDataBaseMgr.executeSql(dbName,1,strSql);
             uexDataBaseMgr.cbExecuteSql = insertDataCallBack;
             }
            }
        }); 
    };
 //插入回调
  function insertDataCallBack(opid,type,data){
        switch(type){
            case cText:
                alert("uex.cText");
                break;
            case cJson:
              alert("uex.cJson");
                break;
            case cInt:
            if(opid == 1&&type == 2 &&data == 0){
                 alert("数据插入成功！");
            }else{
                 alert("数据插入失败！");
            }
            break;
          default:
              alert("error");  
      }
    };


 