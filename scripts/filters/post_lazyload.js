/**
 * Butterfly
 * lazyload
 * replace src to data-lazy-src
 */

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

if (!hexo.config.theme_config.lazyload.enable) return

function lazyload (htmlContent) {
  const bg = hexo.theme.config.lazyload.placeholder ? urlFor(hexo.theme.config.lazyload.placeholder) : 'data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs='
  return htmlContent.replace(/(<img.*? src=)/ig, `$1 "${bg}" data-lazy-src=`)
}

if (hexo.config.theme_config.lazyload.field === 'site') {
  hexo.extend.filter.register('after_render:html', function (data) {
    return lazyload.call(this, data)
  })
} else {
  hexo.extend.filter.register('after_post_render', data => {
    data.content = lazyload.call(this, data.content)
    return data
  })
}