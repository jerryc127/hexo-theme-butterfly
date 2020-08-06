!(function(e, t, a) {
  function r(e) {
    var a = t.createElement("div");
    (a.className = "heart"),
      n.push({
        el: a,
        x: e.clientX - 5,
        y: e.clientY - 5,
        scale: 1,
        alpha: 1,
        color:
          "rgb(" +
          ~~(255 * Math.random()) +
          "," +
          ~~(255 * Math.random()) +
          "," +
          ~~(255 * Math.random()) +
          ")"
      }),
      t.body.appendChild(a);
  }
  var n = [];
  (e.requestAnimationFrame =
    e.requestAnimationFrame ||
    e.webkitRequestAnimationFrame ||
    e.mozRequestAnimationFrame ||
    e.oRequestAnimationFrame ||
    e.msRequestAnimationFrame ||
    function(e) {
      setTimeout(e, 1e3 / 60);
    }),
    (function(e) {
      var a = t.createElement("style");
      a.type = "text/css";
      try {
        a.appendChild(t.createTextNode(e));
      } catch (t) {
        a.styleSheet.cssText = e;
      }
      t.getElementsByTagName("head")[0].appendChild(a);
    })(
      ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
    ),
    (function() {
      var t = "function" == typeof e.onclick && e.onclick;
      e.onclick = function(e) {
        t && t(), r(e);
      };
    })(),
    (function e() {
      for (var a = 0; a < n.length; a++)
        n[a].alpha <= 0
          ? (t.body.removeChild(n[a].el), n.splice(a, 1))
          : (n[a].y--,
            (n[a].scale += 0.004),
            (n[a].alpha -= 0.013),
            (n[a].el.style.cssText =
              "left:" +
              n[a].x +
              "px;top:" +
              n[a].y +
              "px;opacity:" +
              n[a].alpha +
              ";transform:scale(" +
              n[a].scale +
              "," +
              n[a].scale +
              ") rotate(45deg);background:" +
              n[a].color +
              ";z-index:99999"));
      requestAnimationFrame(e);
    })();
})(window, document);
