   //查日期
    function selectLData(){
        uexDataBaseMgr.selectSql(dbName,1,"Select max(LastTime) From D_MaintainItem");
        uexDataBaseMgr.cbSelectSql = selectLDataCallBack;
    };
    var lasttime;
    function selectLDataCallBack(opid,type,value){
        
        switch(type){
            case cText:
                alert("uex.cText");
                break;
            case cJson:
            if(opid == 1 && type == 1){
               var jsonList=eval("("+value+")");
              if(jsonList[0]["max(LastTime)"] == null||jsonList[0]["max(LastTime)"]==""||jsonList[0]["max(LastTime)"]==undefined){
                  
                  lasttime="";
              }
              else{
                  lasttime=jsonList[0]["max(LastTime)"];
              }
            }else{
                lasttime="";
            }
            getbanb();
            break;
            case cInt:
            alert("uex.cInt"); 
            break;            
            default:
            alert("error");  

      }
      
    };
    
    
     function getbanb (){
        uexWindow.toast("1","5","正在获取...","0");
        var url1 = http1+"GetMaintainItem";
        appcan.request.ajax({
            type: "POST",
             url: url1, 
             data:{time:lasttime,token:localStorage.imei},
             async: true,
             datatype: "json",
            timeout: 12000,
            error:  function (data) {
                uexWindow.closeToast();
             },
             success: function (data){ 
             var json=eval("("+data+")");  
             for(var i=0;i<json.userdata.record.length;i++){
                 var strSql="INSERT INTO D_MaintainItem(Id,ItemCode,ItemName,Claim,PlaceId,Type,ItemType,GroupId,ElevatorType,LastTime,IsDelete) VALUES ('"+json.userdata.record[i].Id+"','"+json.userdata.record[i].ItemCode+"','"+json.userdata.record[i].ItemName+"','"+json.userdata.record[i].Claim+"','"+json.userdata.record[i].PlaceId+"','"+json.userdata.record[i].Type+"','"+json.userdata.record[i].ItemType+"','"+json.userdata.record[i].GroupId+"','"+json.userdata.record[i].ElevatorType+"','"+json.userdata.record[i].LastTime+"','"+json.userdata.record[i].IsDelete+"')";
                 uexDataBaseMgr.executeSql(dbName,1,strSql);
                 if(i==json.userdata.record.length-1)
                 {
                     appcan.window.openToast('数据获取成功！', '2000');
                     uexWindow.closeToast();
                 }
             }
            
            }
        }); 
        
        
    };