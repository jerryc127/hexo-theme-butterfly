'use strict'

hexo.extend.helper.register('groupPosts', function () {
  const getGroupArray = array => {
    const groups = {}
    array.forEach(item => {
      const Key = item.series
      if (!Key) return
      groups[Key] = groups[Key] || []
      groups[Key].push(item)
    })
    return groups
  }

  const sortPosts = posts => {
    const { orderBy = 'date', order = 1 } = this.theme.aside.card_post_series
    if (orderBy === 'title') return posts.sort('title', order)
    return posts.sort('date', order)
  }

  return getGroupArray(sortPosts(this.site.posts))
})
