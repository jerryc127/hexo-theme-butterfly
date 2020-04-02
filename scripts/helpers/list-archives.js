/**
 * Butterfly
 * for aside archives
 */

'use strict'

hexo.extend.helper.register('list_archives', function (options = {}) {
  const { config } = this
  const archiveDir = config.archive_dir
  const { timezone } = config
  const lang = this.page.lang || this.page.language || config.language
  let { format } = options
  const type = options.type || 'monthly'
  const { transform } = options
  const showCount = Object.prototype.hasOwnProperty.call(options, 'show_count')
    ? options.show_count
    : true
  const order = options.order || -1
  const limit = 8
  let result = ''

  var moreButton
  if (lang === 'zh-CN') {
    moreButton = '查看更多'
  } else if (lang === 'zh-TW') {
    moreButton = '查看更多'
  } else {
    moreButton = 'More'
  }

  if (!format) {
    format = type === 'monthly' ? 'MMMM YYYY' : 'YYYY'
  }

  const posts = this.site.posts.sort('date', order)
  if (!posts.length) return result

  const data = []
  let length = 0

  posts.forEach(post => {
    // Clone the date object to avoid pollution
    let date = post.date.clone()

    if (timezone) date = date.tz(timezone)
    if (lang) date = date.locale(lang)

    const year = date.year()
    const month = date.month() + 1
    const name = date.format(format)
    const lastData = data[length - 1]

    if (!lastData || lastData.name !== name) {
      length = data.push({
        name,
        year,
        month,
        count: 1
      })
    } else {
      lastData.count++
    }
  })

  const link = item => {
    let url = `${archiveDir}/${item.year}/`

    if (type === 'monthly') {
      if (item.month < 10) url += '0'
      url += `${item.month}/`
    }

    return this.url_for(url)
  }

  result += '<ul class="archive-list">'

  for (let i = 0, len = data.length; i < Math.min(len, limit); i++) {
    const item = data[i]

    result += '<li class="archive-list-item">'

    result += `<a class="archive-list-link" href="${link(item)}">`
    result += '<span class="archive-list-date">'
    result += transform ? transform(item.name) : item.name
    result += '</span>'

    if (showCount) {
      result += `<span class="archive-list-count">${item.count}</span>`
    }
    result += '</a>'
    result += '</li>'
  }

  if (data.length > limit) {
    result += '<li class="archive-list-item is-center">'
    result +=
      '<a class="archive-list-link-more" href="' + '/' + `${archiveDir}" >`
    result += moreButton
    result += '</a>'
    result += '</li>'
  }
  result += '</ul>'
  return result
})
