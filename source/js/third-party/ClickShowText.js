function co(){
  var colorElements = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
    var colorArray = colorElements.split(",");
    var color ="#";
    for(var i =0;i<6;i++){
    color+=colorArray[Math.floor(Math.random()*16)];
    }
    return color;
};
var a_idx = 0;
jQuery(document).ready(function($) {
  $("body").click(function (e) {
  
    var config = GLOBAL_CONFIG.ClickShowText;
    
    /*这个数组中的每一个字符是你要浮动显示的词或句子，每次点击鼠标后按顺序出现*/
    var a = config.text.split(",");
    var $i = $("<span/>").text(a[a_idx]);
    a_idx = (a_idx + 1) % a.length;
    var x = e.pageX,
    y = e.pageY;
    $i.css({
  "z-index": 150,
  "top": y - 20,
  "left": x -40,
  "position": "absolute",
  "font-weight": "bold",
  "color": co(),
  "cursor": "default",
  "font-size": config.fontSize || "inherit"
    });
    $("body").append($i);
    $i.animate({
  "top": y - 180,
  "opacity": 0
    },
    1500,
    function() {
  $i.remove();
    });
});
});