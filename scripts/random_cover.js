hexo.extend.filter.register('before_post_render', function(data){
  data.cover = data.cover || random_cover()
  return data;
});

var random_cover = function () {
  var cover;
  var num;
  if (!Array.isArray(hexo.theme.config.default_cover)) {
    cover = hexo.theme.config.default_cover
    return cover
  } else {
    num = Math.floor(Math.random() * (hexo.theme.config.default_cover.length));
    cover = hexo.theme.config.default_cover[num];
    return cover
  }

}