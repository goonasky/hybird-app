function show(){

            var name = uexWidgetOne.platformName;   
            //alert(name); 
            if (name == "android") {
                 mType=1;
                 $(".ha8_image").removeClass("op");
                 $(".apipicwh").removeClass("op");
                 $(".none1").removeClass("none1");
                 $(".ha8_text").removeClass("gray");
                 $("#kao").removeClass("gray");
                 $("#kao").addClass("white");
                
            }
            else{
                 
                 mType=0;
                 //alert(1);
                  
            }
            localStorage.phoneType=mType;
}

function voice(){
           var name = uexWidgetOne.platformName;  
           if (name == "android") {
               //alert(0);
               speechUtility.createUtility("engine_mode=msc,appid=56a06918");
            // 初始化合成对象
               speechSynthesizer.createSynthesizer();
               //alert(1);
            }
            else{
  
            }          
}
