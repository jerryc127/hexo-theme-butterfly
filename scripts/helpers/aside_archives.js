/**
 * Butterfly
 * for aside archives
 */

'use strict'

hexo.extend.helper.register('aside_archives', function (options = {}) {
  const { config } = this
  const archiveDir = config.archive_dir
  const { timezone } = config
  const lang = toMomentLocale(this.page.lang || this.page.language || config.language)
  let { format } = options
  const type = options.type || 'monthly'
  const { transform } = options
  const showCount = Object.prototype.hasOwnProperty.call(options, 'show_count') ? options.show_count : true
  const order = options.order || -1
  const compareFunc = type === 'monthly'
    ? (yearA, monthA, yearB, monthB) => yearA === yearB && monthA === monthB
    : (yearA, monthA, yearB, monthB) => yearA === yearB
  const limit = options.limit
  const moreButton = this._p('aside.more_button')
  let result = ''

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

    const year = date.year()
    const month = date.month() + 1
    const lastData = data[length - 1]

    if (!lastData || !compareFunc(lastData.year, lastData.month, year, month)) {
      if (lang) date = date.locale(lang)
      const name = date.format(format)
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

  result += '<ul class="card-archive-list">'

  const len = data.length
  const Judge = limit === 0 ? len : Math.min(len, limit)

  for (let i = 0; i < Judge; i++) {
    const item = data[i]

    result += '<li class="card-archive-list-item">'

    result += `<a class="card-archive-list-link" href="${link(item)}">`
    result += '<span class="card-archive-list-date">'
    result += transform ? transform(item.name) : item.name
    result += '</span>'

    if (showCount) {
      result += `<span class="card-archive-list-count">${item.count}</span>`
    }
    result += '</a>'
    result += '</li>'
  }

  if (len > Judge) {
    result += '<li class="card-archive-list-item more is-center">'
    result += `<a class="card-archive-list-link-more" href="${this.url_for(archiveDir)}/">
              <span>${moreButton}</span><i class="fas fa-angle-right"  ></i></a></li>`
  }
  result += '</ul>'
  return result
})

const toMomentLocale = function (lang) {
  if (lang === undefined) {
    return undefined
  }

  // moment.locale('') equals moment.locale('en')
  // moment.locale(null) equals moment.locale('en')
  if (!lang || lang === 'en' || lang === 'default') {
    return 'en'
  }
  return lang.toLowerCase().replace('_', '-')
}
