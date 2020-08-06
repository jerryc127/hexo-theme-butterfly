/**
 * Butterfly
 * 404 error page
 */

'use strict'

hexo.extend.generator.register('404', function (locals) {
  if (!hexo.theme.config.error_404.enable) return
  return {
    path: '404.html',
    data: locals.posts,
    layout: ['404']
  }
})
