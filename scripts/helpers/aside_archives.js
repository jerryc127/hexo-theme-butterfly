'use strict'

hexo.extend.helper.register('aside_archives', function (options = {}) {
  const { config, page, site, url_for, _p } = this
  const archiveDir = config.archive_dir
  const { timezone } = config
  const lang = toMomentLocale(page.lang || page.language || config.language)
  const type = options.type || 'monthly'
  const format = options.format || (type === 'monthly' ? 'MMMM YYYY' : 'YYYY')
  const showCount = Object.prototype.hasOwnProperty.call(options, 'show_count') ? options.show_count : true
  const order = options.order || -1
  const limit = options.limit
  const compareFunc = type === 'monthly'
    ? (yearA, monthA, yearB, monthB) => yearA === yearB && monthA === monthB
    : (yearA, monthA, yearB, monthB) => yearA === yearB

  const posts = site.posts.sort('date', order)
  if (!posts.length) return ''

  const data = []
  posts.forEach(post => {
    let date = post.date.clone()
    if (timezone) date = date.tz(timezone)

    const year = date.year()
    const month = date.month() + 1

    if (!data.length || !compareFunc(data[data.length - 1].year, data[data.length - 1].month, year, month)) {
      if (lang) date = date.locale(lang)
      data.push({ name: date.format(format), year, month, count: 1 })
    } else {
      data[data.length - 1].count++
    }
  })

  const link = item => {
    let url = `${archiveDir}/${item.year}/`
    if (type === 'monthly') {
      url += item.month < 10 ? `0${item.month}/` : `${item.month}/`
    }
    return url_for(url)
  }

  const len = data.length
  const limitLength = limit === 0 ? len : Math.min(len, limit)

  let result = `
    <div class="item-headline">
      <i class="fas fa-archive"></i>
      <span>${_p('aside.card_archives')}</span>
      ${len > limitLength ? `<a class="card-more-btn" href="${url_for(archiveDir)}/" title="${_p('aside.more_button')}"><i class="fas fa-angle-right"></i></a>` : ''}
    </div>
    <ul class="card-archive-list">
  `

  for (let i = 0; i < limitLength; i++) {
    const item = data[i]
    result += `
      <li class="card-archive-list-item">
        <a class="card-archive-list-link" href="${link(item)}">
          <span class="card-archive-list-date">${options.transform ? options.transform(item.name) : item.name}</span>
          ${showCount ? `<span class="card-archive-list-count">${item.count}</span>` : ''}
        </a>
      </li>
    `
  }

  result += '</ul>'
  return result
})

const toMomentLocale = function (lang) {
  if (!lang || lang === 'en' || lang === 'default') {
    return 'en'
  }
  return lang.toLowerCase().replace('_', '-')
}
