$(".foot_part").click(function(){
    $(".foot_part").removeClass("deepColor");
    $(this).addClass("deepColor");
    
    $(".page_footer span").removeClass("white_color");
    $(this).children().children("span").addClass("white_color");
    
      $("#RCGZ").children().children("img").attr("src","img/shouyeImg/dailyG.png");
            $("#WSBJ").children().children("img").attr("src","img/shouyeImg/baojianG.png");
            $("#WSSC").children().children("img").attr("src","img/shouyeImg/buyG.png");
            $("#XXJL").children().children("img").attr("src","img/shouyeImg/infoG.png"); 
    
    if($(this).attr("id")=="RCGZ")
    {
        if($("#RCGZ").children().children("img").attr("src")!="img/shouyeImg/dailyW.png")
        {
            $("#RCGZ").children().children("img").attr("src","img/shouyeImg/dailyW.png");
            $("#WSBJ").children().children("img").attr("src","img/shouyeImg/baojianG.png");
            $("#WSSC").children().children("img").attr("src","img/shouyeImg/buyG.png");
            $("#XXJL").children().children("img").attr("src","img/shouyeImg/infoG.png");   
        }
    }
    else if($(this).attr("id")=="WSSC")
    {
        if($("#WSSC").children().children("img").attr("src")!="img/shouyeImg/buyW.png")
        {
            $("#RCGZ").children().children("img").attr("src","img/shouyeImg/dailyG.png");
            $("#WSBJ").children().children("img").attr("src","img/shouyeImg/baojianG.png");
            $("#WSSC").children().children("img").attr("src","img/shouyeImg/buyW.png");
            $("#XXJL").children().children("img").attr("src","img/shouyeImg/infoG.png");   
        }
    }
    else if($(this).attr("id")=="WSBJ")
    {
        if($("#WSBJ").children().children("img").attr("src")!="img/shouyeImg/baojianW.png")
        {
            $("#RCGZ").children().children("img").attr("src","img/shouyeImg/dailyG.png");
            $("#WSBJ").children().children("img").attr("src","img/shouyeImg/baojianW.png");
            $("#WSSC").children().children("img").attr("src","img/shouyeImg/buyG.png");
            $("#XXJL").children().children("img").attr("src","img/shouyeImg/infoG.png");   
        }
    }
     else if($(this).attr("id")=="XXJL")
    {
        if($("#XXJL").children().children("img").attr("src")!="img/shouyeImg/infoW.png")
        {
            $("#RCGZ").children().children("img").attr("src","img/shouyeImg/dailyG.png");
            $("#WSBJ").children().children("img").attr("src","img/shouyeImg/baojianG.png");
            $("#WSSC").children().children("img").attr("src","img/shouyeImg/buyG.png");
            $("#XXJL").children().children("img").attr("src","img/shouyeImg/infoW.png");   
        }
    }
    
    //$("#RCGZ").children().children("img").attr("src","./img/shouyeImg/日常工作灰.png");
          
});






