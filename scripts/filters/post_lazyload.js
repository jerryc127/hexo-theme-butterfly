/**
 * Butterfly
 * Lazyload filter
 * Replace src with data-lazy-src for lazy loading
 */

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

const lazyload = htmlContent => {
  if (hexo.theme.config.lazyload.native) {
    // Use more precise replacement: only replace img tags in HTML, not content inside script tags
    return htmlContent.replace(/(<img(?![^>]*?\bloading=)(?:\s[^>]*?)?>)(?![^<]*<\/script>)/gi, match => {
      return match.replace(/>$/, ' loading=\'lazy\'>')
    })
  }

  const bg = hexo.theme.config.lazyload.placeholder ? urlFor(hexo.theme.config.lazyload.placeholder) : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

  // Use more precise replacement: handle src attributes with double, single and no quotes, but avoid replacing content inside script tags
  let result = htmlContent

  // Handle src attributes
  result = result.replace(
    /(<img(?![^>]*?\bdata-lazy-src=)(?:\s[^>]*?)?\s)src=(?:"([^"]+)"|'([^']+)'|([^\s"'>]+))(?=[^>]*>)(?![^<]*<\/script>)/gi,
    (match, prefix, dq, sq, uq) => {
      const src = dq || sq || uq
      return `${prefix}src="${bg}" data-lazy-src="${src}"`
    }
  )

  return result
}

hexo.extend.filter.register('after_render:html', data => {
  const { enable, field } = hexo.theme.config.lazyload
  if (!enable || field !== 'site') return
  return lazyload(data)
})

hexo.extend.filter.register('after_post_render', data => {
  const { enable, field } = hexo.theme.config.lazyload
  if (!enable || field !== 'post') return
  data.content = lazyload(data.content)
  return data
})
