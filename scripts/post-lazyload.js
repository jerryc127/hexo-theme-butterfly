'use strict';
const url_for = require('hexo-util').url_for.bind(hexo);

hexo.extend.filter.register('after_post_render', data => {
  var theme = hexo.theme.config;
  var bg = theme.lodding_bg.post;
  if (!theme.lazyload.enable) return;

  const cheerio = require('cheerio');

  const $ = cheerio.load(data.content, {decodeEntities: false});
  const images = $('img').not($('.justified-gallery img'));
  if (!images.length) return;

  images.each((i, o) => {
    let src = $(o).attr('src');
    $(o).attr('data-src', src).removeAttr('src');
    if (bg){
    $(o).attr('src',url_for(bg))
    }
    $(o).addClass('lazyload');
  });

  data.content = $.html();
}, 100);