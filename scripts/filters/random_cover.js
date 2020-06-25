/**
 * Butterfly
 * ramdom cover
 */

'use strict'

hexo.extend.filter.register('before_post_render', function (data) {
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

  if (theme.cover.default_cover) {
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
