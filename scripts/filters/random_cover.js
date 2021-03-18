/**
 * Butterfly
 * ramdom cover
 */

'use strict'

hexo.extend.filter.register('before_post_render', function (data) {
  const { config } = this
  if (config.post_asset_folder) {
    const imgTestReg = /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/
    const topImg = data.top_img
    const cover = data.cover
    if (topImg && topImg.indexOf('/') === -1 && imgTestReg.test(topImg)) data.top_img = data.path + topImg
    if (cover && cover.indexOf('/') === -1) data.cover = data.path + cover
  }

  if (data.cover === false) {
    data.randomcover = randomCover()
    return data
  }

  data.cover = data.cover || randomCover()
  return data
})

function randomCover () {
  const theme = hexo.theme.config
  let cover
  let num

  if (theme.cover && theme.cover.default_cover) {
    if (!Array.isArray(theme.cover.default_cover)) {
      cover = theme.cover.default_cover
      return cover
    } else {
      num = Math.floor(Math.random() * theme.cover.default_cover.length)
      cover = theme.cover.default_cover[num]
      return cover
    }
  } else {
    cover = theme.default_top_img || 'https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/img/default.jpg'
    return cover
  }
}
