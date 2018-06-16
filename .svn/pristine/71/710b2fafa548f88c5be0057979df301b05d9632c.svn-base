
 
$('.cover').off('tap').on('tap',function(e){
   e.stopPropagation();
   $(".popBox").addClass("none");
   $(".cover").addClass("none");
});


 
function makeSure(){
    var remrk=$(".txtRemark").val();
    tempRemark+=MainItemId+"-"+remrk+"|";//获取反馈的内容
    //alert(tempRemark)
    $(".txtRemark").val("");//清空文本域
    $(".popBox").addClass("none");
    $(".cover").addClass("none");
}      
 //做完维保，扫二维码，提交       
function Commit(){ 
      var choose;//项id
      var choise;//选择id
      tempChooseVal="";
      var x=document.getElementsByName("mainItem");
      if(x.length<0){
          alert("请选择维保项");
          return;
      }
      for (var i=0;i<x.length;i++)
      {        
            choose=x[i].dataset.id;
            choise=x[i].dataset.value;
            tempChooseVal+=choose+"-"+choise+"|"; 
     }
     tempChooseVal=tempChooseVal.substring(0,tempChooseVal.length-1)     
     localStorage.EndTime=getTimeNow();//获取当前时间             
     uexScanner.open('ZXing','扫一扫');
     uexScanner.cbOpen = ScannerSuccessCallBack;   
     
     
}

function ScannerSuccessCallBack(opCode, dataType, data) {   
        var obj = eval('('+data+')');
        var data=obj.code.split("=")[1];
        if(localStorage.ReportNo==data){
            selectMR(localStorage.ReportNo); 
        }
        else{
            alert("维保电梯不匹配！")
        }
           
} 
        
//$('#Commit').off('tap').on('tap',function(e){
    
      //alert(1);
      
         
//});