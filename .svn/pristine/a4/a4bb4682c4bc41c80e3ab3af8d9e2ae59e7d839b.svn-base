

appcan.button("#addPic0", function() {
     a=0;
     var comtextareass = 0;
     var quality = 5;
     uexCamera.open(comtextareass, quality, function(picPath) {
          arrPic[a]=picPath;
          document.getElementById("addPic0").src = picPath; 
          a++;
          $("#addPic"+a+"").removeClass('none');  
     });            
})

appcan.button("#addPic1", function() {
     a=1;
     var comtextareass = 0;
     var quality = 5;
     uexCamera.open(comtextareass, quality, function(picPath) {
          arrPic[a]=picPath;
          document.getElementById("addPic1").src = picPath; 
          a++;
          $("#addPic"+a+"").removeClass('none');  
     });             
})

appcan.button("#addPic2", function() {
      a=2;
      var comtextareass = 0;
      var quality = 5;
      uexCamera.open(comtextareass, quality, function(picPath) {
          arrPic[a]=picPath;
          document.getElementById("addPic2").src = picPath; 
          a++;
          $("#addPic"+a+"").removeClass('none');  
      });               
})

appcan.button("#addPic3", function() {
      a=3;
      var comtextareass = 0;
      var quality = 5;
      uexCamera.open(comtextareass, quality, function(picPath) {
          arrPic[a]=picPath;
          document.getElementById("addPic3").src = picPath; 
          a++;
          $("#addPic"+a+"").removeClass('none');  
      });              
})

appcan.button("#addPic4", function() {
      a=4;
      var comtextareass = 0;
      var quality = 5;
      uexCamera.open(comtextareass, quality, function(picPath) {
          arrPic[a]=picPath;
          document.getElementById("addPic4").src = picPath; 
          a++;
          $("#addPic"+a+"").removeClass('none');  
      });              
})


function showPic(mtPic){
    var Pic=mtPic.split(',');
    for(var i=0;i<Pic.length;i++){
        var id="addPic"+i;
        document.getElementById(id).src = Pic[i];
        arrPic[i]=Pic[i];
        var a=i+1;
        $("#addPic"+a+"").removeClass('none'); 
    }
}

