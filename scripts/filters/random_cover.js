/**
 * Butterfly
 * ramdom cover
 */

'use strict'

hexo.extend.filter.register('before_post_render', function (data) {
  const imgTestReg = /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/
  let randomCover
  let coverVal = data.cover

  // Add path to top_img and cover if post_asset_folder is enabled
  if (hexo.config.post_asset_folder) {
    const topImg = data.top_img
    if (topImg && topImg.indexOf('/') === -1 && imgTestReg.test(topImg)) data.top_img = data.path + topImg
    if (coverVal && coverVal.indexOf('/') === -1 && imgTestReg.test(coverVal)) data.cover = data.path + coverVal
  }

  const randomCoverFn = () => {
    const theme = hexo.theme.config
    if (!(theme.cover && theme.cover.default_cover)) return false
    if (!Array.isArray(theme.cover.default_cover)) return theme.cover.default_cover
    const num = Math.floor(Math.random() * theme.cover.default_cover.length)
    return theme.cover.default_cover[num]
  }

  if (coverVal === false) return data

  // If cover is not set, use random cover
  if (!coverVal) {
    randomCover = randomCoverFn()
    data.cover = randomCover
    coverVal = randomCover // update coverVal
  }

  if (coverVal) {
    if (coverVal.indexOf('//') !== -1 || imgTestReg.test(coverVal)) {
      data.cover_type = 'img'
      return data
    }
  }

  return data
})
