/**
 * inlineImg 圖片
 * {% inlineImg src height %}
 */

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

function inlineImg (args) {
  const img = args[0]
  const height = args[1] ? `style="height:${args[1]}"` : ''

  return `<img class="inline-img" src="${urlFor(img)}" ${height}/>`
}

hexo.extend.tag.register('inlineImg', inlineImg, { ends: false })
