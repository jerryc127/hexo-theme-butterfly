/**
 * Butterfly
 * lazyload
 * replace src to data-lazy-src
 */

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

hexo.extend.filter.register('after_post_render', data => {
  if (!hexo.theme.config.lazyload.enable) return
  const bg = hexo.theme.config.lazyload.post ? urlFor(hexo.theme.config.lazyload.post) : 'data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs='
  return data.content.replace(/(<img.*? src=)/ig, `$1 "${bg}" data-lazy-src=`)
})
