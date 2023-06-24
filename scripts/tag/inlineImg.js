/**
 * inlineImg 圖片
 * @param {Array} args 圖片名稱和高度
 * @param {string} args[0] 圖片名稱
 * @param {number} args[1] 圖片高度
 * @returns {string} 圖片標籤
 */

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

const inlineImg = ([img, height = '']) => {
  const heightStyle = height ? `style="height:${height}"` : ''
  const src = urlFor(img)
  return `<img class="inline-img" src="${src}" ${heightStyle} />`
}

hexo.extend.tag.register('inlineImg', inlineImg, { ends: false })
