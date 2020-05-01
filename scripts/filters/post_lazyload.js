/**
 * Butterfly
 * lazyload
 * replace src to data-src
 */

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

function lazyProcess (htmlContent) {
  var bg = hexo.theme.config.lodding_bg.post ? urlFor(hexo.theme.config.lodding_bg.post) : 'data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs='
  return htmlContent.replace(/(<img .*?src=)/ig, `$1 ${bg} data-src=`)
}

var processPost = function (data) {
  if (!hexo.theme.config.lazyload) return
  data.content = lazyProcess.call(this, data.content)
  return data
}

hexo.extend.filter.register('after_post_render', processPost)
