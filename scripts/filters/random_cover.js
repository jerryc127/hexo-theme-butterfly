/**
 * Random cover for posts
 */

'use strict'

hexo.extend.generator.register('post', locals => {
  const recentCovers = []
  const randomCoverFn = () => {
    const { cover: { default_cover: defaultCover } } = hexo.theme.config
    if (!defaultCover) return false
    if (!Array.isArray(defaultCover)) return defaultCover
    const defaultCoverLen = defaultCover.length
    const limit = 3

    let num
    do {
      num = Math.floor(Math.random() * defaultCoverLen)
    } while (recentCovers.includes(num))

    recentCovers.push(num)
    if (recentCovers.length > limit) recentCovers.shift()

    return defaultCover[num]
  }

  const handleImg = data => {
    const imgTestReg = /\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i
    let { cover: coverVal, top_img: topImg } = data

    // Add path to top_img and cover if post_asset_folder is enabled
    if (hexo.config.post_asset_folder) {
      if (topImg && topImg.indexOf('/') === -1 && imgTestReg.test(topImg)) data.top_img = `${data.path}${topImg}`
      if (coverVal && coverVal.indexOf('/') === -1 && imgTestReg.test(coverVal)) data.cover = `${data.path}${coverVal}`
    }

    if (coverVal === false) return data

    // If cover is not set, use random cover
    if (!coverVal) {
      const randomCover = randomCoverFn()
      data.cover = randomCover
      coverVal = randomCover // update coverVal
    }

    if (coverVal && (coverVal.indexOf('//') !== -1 || imgTestReg.test(coverVal))) {
      data.cover_type = 'img'
    }

    return data
  }

  return locals.posts.sort('date').map(post => {
    return {
      data: handleImg(post),
      layout: 'post',
      path: post.path
    }
  })
})
