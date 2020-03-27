'use strict';

const url_for = require('hexo-util').url_for.bind(hexo);

function lazyProcess(htmlContent)  {
  var bg = url_for(hexo.theme.config.lodding_bg.post);
  return htmlContent.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, (str, p1, p2, p3)  =>  {
    if (/data-src/gi.test(str)) {
      return str;
    }
    if (/class="(.*?)"/gi.test(str)){
      str = str.replace(/class="(.*?)"/gi, (classStr, p1) => {
        return classStr.replace(p1, `${p1} lazyload`);
      })
      str = str.replace(p2, `${bg}`)
      return str.replace('>', ` data-src="${p2}">`);
    }
    str = str.replace(p2, `${bg}`)
    return str.replace(p3, ` class="lazyload" data-src="${p2}" ${p3}`);
  });
}

var processPost = function(data) {
  if (!hexo.theme.config.lazyload.enable) return;
  data.content = lazyProcess.call(this, data.content);
  return data;
};

hexo.extend.filter.register('after_post_render', processPost);