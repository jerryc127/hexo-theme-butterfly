/**
 * Butterfly
 * @example
 *  page_description()
 *  injectHtml(data)
 */

'use strict'

const { stripHTML } = require('hexo-util')

hexo.extend.helper.register('page_description', function () {
  const { config, page } = this
  let description = page.description || page.excerpt || page.content || page.title || config.description

  if (description) {
    description = stripHTML(description).substring(0, 200)
      .trim()
      .replace(/\n/g, ' ')
    return description
  }
})

hexo.extend.helper.register('injectHtml', function (data) {
  let result = ''
  if (!data) return ''
  for (var i = 0; i < data.length; i++) {
    result += data[i]
  }
  return result
})
