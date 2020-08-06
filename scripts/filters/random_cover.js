/**
 * Butterfly
 * ramdom cover
 */

'use strict'

hexo.extend.filter.register('before_post_render', function (data) {
  if (data.top_img && data.top_img.indexOf('/') === -1) data.top_img = data.path + data.top_img
  if (data.cover && data.cover.indexOf('/') === -1) data.cover = data.path + data.cover

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
    return theme.default_top_img
  }
}
