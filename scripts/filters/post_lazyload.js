/**
 * Butterfly
 * lazyload
 * replace src to data-src
 */
// <figure .+class="[^"]* highlight [^"]*".+>

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

function lazyProcess (htmlContent) {
  const bg = hexo.theme.config.lazyload.post ? urlFor(hexo.theme.config.lazyload.post) : 'data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs='
  return htmlContent.replace(/(<img .*?src=)/ig, `$1 "${bg}" data-src=`)
}

const processPost = function (data) {
  if (!hexo.theme.config.lazyload.enable) return
  data.content = lazyProcess.call(this, data.content)
  return data
}

hexo.extend.filter.register('after_post_render', processPost)
