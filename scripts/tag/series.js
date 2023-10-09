/**
 * series plugin
 * Syntax:
 *  {% series [series name] %}
 * Usage:
 * {% series %}
 * {% series series1 %}
 */

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)
const groups = {}

hexo.extend.filter.register('before_post_render', data => {
  if (!hexo.theme.config.series.enable) return data
  const { layout, series } = data
  if (layout === 'post' && series) {
    groups[series] = groups[series] || []
    groups[series].push({
      title: data.title,
      path: data.path,
      date: data.date.unix()
    })
  }
  return data
})

function series (args) {
  const { series } = hexo.theme.config
  if (!series.enable) {
    hexo.log.warn('Series plugin is disabled in the theme config')
    return ''
  }

  const seriesArr = args.length ? groups[args[0]] : groups[this.series]

  if (!seriesArr) {
    hexo.log.warn(`There is no series named "${args[0]}"`)
    return ''
  }

  const isAsc = (series.order || 1) === 1 // 1: asc, -1: desc
  const isSortByTitle = series.orderBy === 'title'

  const compareFn = (a, b) => {
    const itemA = isSortByTitle ? a.title.toUpperCase() : a.date
    const itemB = isSortByTitle ? b.title.toUpperCase() : b.date

    if (itemA < itemB) {
      return isAsc ? -1 : 1
    }
    if (itemA > itemB) {
      return isAsc ? 1 : -1
    }
    return 0
  }

  seriesArr.sort(compareFn)

  let result = ''
  seriesArr.forEach(ele => {
    result += `<li><a href="${urlFor(ele.path)}" title="${ele.title}">${ele.title}</a></li>`
  })

  return series.number ? `<ol>${result}</ol>` : `<ul>${result}</ul>`
}

hexo.extend.tag.register('series', series, { ends: false })
