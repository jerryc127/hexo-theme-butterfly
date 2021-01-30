/**
 * Butterfly
 * for aside categories
 */

'use strict'

hexo.extend.helper.register('aside_categories', function (categories, options) {
  if (!options && (!categories || !Object.prototype.hasOwnProperty.call(categories, 'length'))
  ) {
    options = categories
    categories = this.site.categories
  }

  if (!categories || !categories.length) return ''
  options = options || {}
  const { config } = this
  const showCount = Object.prototype.hasOwnProperty.call(options, 'show_count')
    ? options.show_count
    : true
  const depth = options.depth ? parseInt(options.depth, 10) : 0
  const orderby = options.orderby || 'name'
  const order = options.order || 1
  const categoryDir = this.url_for(config.category_dir)
  const limit = options.limit === 0 ? categories.length : options.limit
  const isExpand = options.expand !== 'none'
  const expandClass = isExpand && options.expand === true ? 'expand' : ''
  const buttonLabel = this._p('aside.more_button')
  const prepareQuery = (parent) => {
    const query = {}
    if (parent) { query.parent = parent } else { query.parent = { $exists: false } }
    return categories.find(query).sort(orderby, order).filter((cat) => cat.length)
  }

  const hierarchicalList = (t, level, parent, topparent = true) => {
    let result = ''
    const isTopParent = topparent
    if (t > 0) {
      prepareQuery(parent).forEach((cat, i) => {
        if (t > 0) {
          t = t - 1
          let child
          if (!depth || level + 1 < depth) {
            const childList = hierarchicalList(t, level + 1, cat._id, false)
            child = childList[0]
            t = childList[1]
          }

          const parentClass = isExpand && isTopParent && child ? 'parent' : ''

          result += `<li class="card-category-list-item ${parentClass}">`

          result += `<a class="card-category-list-link" href="${this.url_for(cat.path)}">`

          result += `<span class="card-category-list-name">${cat.name}</span>`

          if (showCount) {
            result += `<span class="card-category-list-count">${cat.length}</span>`
          }

          if (isExpand && isTopParent && child) {
            result += `<i class="fas fa-caret-left ${expandClass}"></i>`
          }

          result += '</a>'

          if (child) {
            result += `<ul class="card-category-list child">${child}</ul>`
          }

          result += '</li>'
        }
      })
    }

    return [result, t]
  }

  const list = hierarchicalList(limit, 0)

  const moreButton = function () {
    if (categories.length <= limit) return ''
    const moreHtml = `<a class="card-more-btn" href="${categoryDir}/" title="${buttonLabel}">
    <i class="fas fa-angle-right"></i></a>`

    return moreHtml
  }

  return `<div class="item-headline">
            <i class="fas fa-folder-open"></i>
            <span>${this._p('aside.card_categories')}</span>
            ${moreButton()}
            </div>
            <ul class="card-category-list" id="aside-cat-list">
            ${list[0]}
            </ul>`
})
