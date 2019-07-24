hexo.extend.helper.register('tags', function (site_tags) {
  var result = "";
  site_tags.sort('path').each(function (tags) {    
  var fontSize = Math.floor(Math.random() * 15 + 15) + "px"; //15 ~ 30
  var color =
    "rgb(" +
    Math.floor(Math.random() * 201) +
    ", " +
    Math.floor(Math.random() * 201) +
    ", " +
    Math.floor(Math.random() * 201) +
    ")"; // 0,0,0 -> 200,200,200
    result += '<a href="' + hexo.theme.config.rootConfig.root + tags.path + '" style="font-size:' + fontSize + ';color:' + color + '">' + tags.name + '</a>'
  })
  return result;
})
