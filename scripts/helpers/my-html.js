"use strict";

hexo.extend.helper.register("my_html", function(type, data) {
  var result = "";
  var tag = type === "css" ? "css" : "script";
  for (var i = 0; i < data.length; i++) {
    var src = data[i].split("||")[0].trim();
    var other = data[i].split("||")[1] ? data[i].split("||")[1].trim() : "";

    if (tag === "css") {
      result +=
        '<link rel="stylesheet" href="' +
        this.url_for(src) +
        '" ' +
        other +
        ">";
    } else {
      result +=
        '<script src="' + this.url_for(src) + '" ' + other + "></script>";
    }
  }
  return result;
});
