/**
 * Butterfly
 * galleryGroup and gallery
 * {% galleryGroup [name] [descr] [url] [img] %}
 *
 * {% gallery [button],%}
 * {% gallery url,[url],[button]%}
 */

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

const gallery = (args, content) => {
  args = args.join(' ').split(',')
  let button = false
  let type = 'data'
  let dataStr = ''

  if (args[0] === 'url') {
    [type, dataStr, button] = args // url,[link],[lazyload]
    dataStr = urlFor(dataStr)
  } else {
    [button] = args // [lazyload]
    const regex = /!\[(.*?)\]\(([^\s]*)\s*(?:["'](.*?)["']?)?\s*\)/g
    let m
    const arr = []
    while ((m = regex.exec(content)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++
      }
      arr.push({
        url: m[2],
        alt: m[1],
        title: m[3]
      })
    }

    dataStr = JSON.stringify(arr)
  }

  return `<div class="gallery-container" data-type="${type}" data-button="${button}">
      <div class="gallery-items">${dataStr}</div>
    </div>`
}

const galleryGroup = args => {
  const [name, descr, url, img] = args
  const imgUrl = urlFor(img)
  const urlLink = urlFor(url)

  return `<figure class="gallery-group">
  <img class="gallery-group-img no-lightbox" src='${imgUrl}' alt="Group Image Gallery">
  <figcaption>
  <div class="gallery-group-name">${name}</div>
  <p>${descr}</p>
  <a href='${urlLink}'></a>
  </figcaption>
  </figure>
  `
}

hexo.extend.tag.register('gallery', gallery, { ends: true })
hexo.extend.tag.register('galleryGroup', galleryGroup)
