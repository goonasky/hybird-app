//localStorage.mainId 维保记录id
//localStorage.breakId 故障Id
 var flag=0;  //0 维保  1救援  2故障

$('#sosBtn').off('tap').on('tap',function(){
     flag=1;
     $(".addcirle").addClass("none");
    $(".list").html(""); 
    $('#sosBtn').addClass('checked');
    $('#mtBtn').removeClass('checked');
    $('#breakBtn').removeClass('checked');
    GetJiuyuanList(localStorage.ReportNo,0);
 });
 

 
 $('#mtBtn').off('tap').on('tap',function(){
     if($(".addcirle").hasClass("none")){
         $(".addcirle").removeClass("none");
     }
         flag=0;
         $(".list").html(""); 
         $('#mtBtn').addClass('checked');
         $('#sosBtn').removeClass('checked');
         $('#breakBtn').removeClass('checked');
         getmti(localStorage.ReportNo,0);
 });
 

$('#breakBtn').off('tap').on('tap',function(){
    if($(".addcirle").hasClass("none")){
         $(".addcirle").removeClass("none");
     }
          flag=2;
          $(".list").html(""); 
          $('#breakBtn').addClass('checked');
          $('#mtBtn').removeClass('checked');
          $('#sosBtn').removeClass('checked');
          gdtbki(localStorage.ReportNo,0);
});

// keng
     
     
      
    
         function gdtbki(temp,type){
            appcan.request.ajax({
                type: "POST",           
                url: http+"GetElevateBreakDownList",
                data:{type:type,code:temp,pageSize:10,pageIndex:1,userId:getuser("uid"),token:getuser("token"),groupId:getuser("groupId")},
                //data:{type:0,code:"044262",pageSize:10,pageIndex:1,userId:43,token:123456,groupId:579},
                async: true,
                datatype: "json",
                timeout: 20000,
                error:  function (data) {
                      
                },
                success: function (data){
                  var json=eval("("+data+")");
                  if(json.code=="101"){
                    localStorage.removeItem('loginjson');
                    uexWindow.evaluateScript("",0,"winclose();");
                    uexWindow.toast("0","5","登录失效，请重新登录","3000");
                    uexWindow.open('login_win', '0', "login_top.html", '10', '', '', '0');
                    return;
                  }
                  if(json.code=="0"){
                      
                  }
                  if(json.code=="1")
                  {
                       $(".list").html(""); 
                       ///代码逻辑  
                       for(var i=0;i<json.userdata.breakdown.length;i++){
                           var html=""; 
                           html+=" <table class='info')' onclick='showBkinfo("+json.userdata.breakdown[i].Id+")'><tr>";
                      
                           html+="<td class='f2 td1'>"+json.userdata.breakdown[i].BeginTime.split('-')[2].split(' ')[0]+"</td>";
                           html+="<td class='f3 td2'>"+json.userdata.breakdown[i].Name+"</td></tr>";
                           html+="<tr><td class='f1 td1'>"+getMonth(json.userdata.breakdown[i].BeginTime.split('-')[1])+"</td>";
                           html+="<td class='f1 fc2 td2'><span>起始时间：</span><span>"+json.userdata.breakdown[i].BeginTime+"</span></td></tr></table>";
                           
                           $(".list").append(html);  
                      }
                         
                    }   
                  }        
              });
        
        
    } 
     
//跳转 
function showDetail(id)
{
    localStorage.mainId=id;
    appcan.window.open({
            name:'maintainInfo',
            dataType:0,
            data:'maintainInfo.html'
    }); 
} 

function showBkinfo(id)
{
    localStorage.breakId=id;
    appcan.window.open({
            name:'breakDownInfo',
            dataType:0,
            data:'breakDownInfo.html'
    }); 
} 




$(".addcirle").off("tap").on("tap",function(e){
         if(flag==0){
              e.stopPropagation();
              appcan.window.open({
                    name:'mainCreate',
                    dataType:0,
                    data:'mainCreate.html'
              }); 
         }
         
         
         if(flag==2){
             e.stopPropagation();
             // AddBreakdown();
             var last_time=getTimeNow();
             //console.log(last_time)
             appcan.request.ajax({
             type: "POST",           
                url: http+"AddBreakdown",
                //data:{type:0,code:"002090",pageSize:10,pageIndex:1,userId:getuser("uid"),token:getuser("token"),groupId:getuser("groupId")},
                data:{ReportNo:localStorage.ReportNo,beginTime:last_time,MtUserId:getuser("mtuid")},
                async: true,
                datatype: "json",
                timeout: 20000,
                error:  function (data) {
                        
                },
                success: function (data){
                    
                    var info=JSON.parse(data);
                    //console.log(info);
                    var BreakdownId=info.BreakdownId;
                    localStorage.breakId=BreakdownId;
                    //console.log(localStorage.breakId);
                    alert("故障单创建成功！");
                    uexWindow.open('breakDownInfo', '0', "breakDownInfo.html", '10', '', '', '4');
                 }
         })
         }
         
       
        
        
})
//获取救援列表
function GetJiuyuanList (temp,type) {
    //alert(0)
       appcan.request.ajax({
        type: "POST",           
        url: http+"GetbusinessList",
        data:{code:temp,type:type,token:getuser("token")},
        async: true,
        datatype: "json",
        timeout: 20000,
        error:  function (data) {
           uexWindow.toast("0","5","请求失败，请稍后重试！","5000");
          },
        success: function (data){
            //alert(1);
            var jsonl=eval("("+data+")");
            //alert(data);
            if(jsonl.code=="101"){
                localStorage.removeItem('loginjson');
                uexWindow.evaluateScript("",0,"winclose();");
                uexWindow.toast("0","5","登录失效，请重新登录","3000");
                uexWindow.open('login_win', '0', "login_top.html", '10', '', '', '0');
                return;
            }
            if(jsonl.code=="0"){
                //alert(2);
                var html="";
                html+="<div class='ubb ub bc-border t-bla ub-ac lis' style='line-height:4;padding-left:10px;'>";
                html+="<p style='color:grey'>";
                html+="没有数据";
                html+="</p>";
                html+="</div>";
                $(".list").html(html); 
            }
            if(jsonl.code=="1")
            {
                html="";
                for(var i=0;i<1;i++){
                    localStorage.code=jsonl.userdata.business[i].ReportNO;
                    
                    html+="<div ontouchstart=zy_touch('btn-act1') onclick=jiuyuanDetial();>";
                    html+="<div class='ubb ub bc-border t-bla ub-ac lis' style='line-height:1.5;padding-left:10px;'>";
                    html+="<p class='font-o'>";
                 
                    html+=jsonl.userdata.business[i].ElevatorName; 
                 
                    html+="</p>";
                    html+="<p>";
                   
                    html+="维保单位："+jsonl.userdata.business[i].MtGroupName;        
                    html+="</p>";
                        
                    html+="</div>";
                    html+="</div>";
                              
                    
                  
                }
                $(".list").append(html);   
            }   
            }        
        });   
}
//救援详情
function jiuyuanDetial () {
 
  appcan.window.open({
            name:'ncfItem',
            dataType:0,
            data:'ncfItem.html'
  }); 
}