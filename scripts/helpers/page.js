/**
 * Butterfly
 * @example
 *  page_description()
 *  injectHtml(data)
 *  cloudTags(source, minfontsize, maxfontsize, limit)
 */

'use strict'

const { stripHTML, escapeHTML } = require('hexo-util')
const crypto = require('crypto')

hexo.extend.helper.register('page_description', function () {
  const { config, page } = this
  let description = page.description || page.content || page.title || config.description

  if (description) {
    description = escapeHTML(stripHTML(description).substring(0, 200)
      .trim()
    ).replace(/\n/g, ' ')
    return description
  }
})

hexo.extend.helper.register('injectHtml', function (data) {
  let result = ''
  if (!data) return ''
  for (let i = 0; i < data.length; i++) {
    result += data[i]
  }
  return result
})

hexo.extend.helper.register('cloudTags', function (options = {}) {
  const env = this
  const source = options.source
  const minfontsize = options.minfontsize
  const maxfontsize = options.maxfontsize
  const limit = options.limit
  const unit = options.unit || 'px'

  let result = ''
  const tagLimit = limit === 0 ? source.length : limit
  source.sort('name').limit(tagLimit).forEach(function (tags) {
    const fontSizeRD = Math.random() * (maxfontsize - minfontsize) + minfontsize
    const fontSize = fontSizeRD.toFixed(2) + unit
    const color = 'rgb(' + Math.floor(Math.random() * 201) + ', ' + Math.floor(Math.random() * 201) + ', ' + Math.floor(Math.random() * 201) + ')' // 0,0,0 -> 200,200,200
    result += `<a href='${env.url_for(tags.path)}' style='font-size:${fontSize}; color:${color}'>${tags.name}</a>`
  })
  return result
})

hexo.extend.helper.register('urlNoIndex', function () {
  const { permalink } = hexo.config
  let url = this.url.replace(/index\.html$/, '')
  if (!permalink.endsWith('.html')) {
    url = url.replace(/\.html$/, '')
  }
  return url
})

hexo.extend.helper.register('md5', function (path) {
  return crypto.createHash('md5').update(decodeURI(this.url_for(path))).digest('hex')
})

hexo.extend.helper.register('get_hexo_version', function () {
  return hexo.version
})
