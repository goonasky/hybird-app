document.write(" <script type='text/javascript' src='http://api.map.baidu.com/api?v=2.0&ak=vxDpx8Uc561MraDjwpkxejdr'></script>");

function showM(lat,lng,name){
    
    var map = new BMap.Map("allmap");
    map.centerAndZoom(new BMap.Point(lat,lng),13);
    map.enableScrollWheelZoom(true);
    
    map.clearOverlays(); 
    var new_point = new BMap.Point(lat,lng);
    var marker = new BMap.Marker(new_point);  // 创建标注
    map.addOverlay(marker);              // 将标注添加到地图中
    map.panTo(new_point);  
    var infoWindow1 = new BMap.InfoWindow(name);
    map.openInfoWindow(infoWindow1, new BMap.Point(lat, lng));
    
}





