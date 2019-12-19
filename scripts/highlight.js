'use strict';
hexo.extend.filter.register('after_post_render', data => {

  const cheerio = require('cheerio');

  const $ = cheerio.load(data.content, {
    decodeEntities: false
  });
  var theme = hexo.theme.config;

  if (theme.highlight_shrink === 'none' && !theme.highlight_lang && !theme.highlight_copy) {
    return;
  }

  $('figure.highlight').wrap('<div class="code-area-wrap"></div>')
  var $highlight_layout = $('<div class="highlight-tools"></div>')

  $('figure').before($highlight_layout)

  if (theme.highlight_shrink == true) {
    var $code_expand = $('<i class="fa fa-angle-down code-expand code-closed" aria-hidden="true"></i>')
    $('.highlight-tools').append($code_expand)
  } else if (theme.highlight_shrink === false) {
    var $code_expand = $('<i class="fa fa-angle-down code-expand" aria-hidden="true"></i>')
    $('.highlight-tools').append($code_expand)
  }

  if (theme.highlight_lang) {
    var $highlight_lang = $('<div class="code_lang"></div>')
    $('.highlight-tools').append($highlight_lang)
    var lang_name_index;
    var lang_name;
    $('figure').each(function () {
      lang_name_index = lang_name = $(this).attr('class').split(' ')[1];
      if (lang_name_index == 'js')
        lang_name = 'Javascript'
      if (lang_name_index == 'md')
        lang_name = 'Markdown'
      if (lang_name_index == 'plain')
        lang_name = 'Code'
      if (lang_name_index == 'py')
        lang_name = 'Python'

      $(this).prev().find(".code_lang").text(lang_name)

    })
  }

  if (theme.highlight_copy) {
    var $copyIcon = $('<i class="fa fa-clipboard" aria-hidden="true"></i>')
    var $notice = $('<div class="copy-notice"></div>')
    $('.highlight-tools').append($notice)
    $('.highlight-tools').append($copyIcon)
  }

  data.content = $.html();
}, 100);