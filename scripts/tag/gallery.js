/**
 * Butterfly
 * galleryGroup and gallery
 * {% galleryGroup [name] [descr] [url] [img] %}
 * {% gallery [lazyload],[rowHeight],[limit] %}
 */

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

function gallery (args, content) {
  const { data, languages } = hexo.theme.i18n
  args = args.join(' ').split(',')
  const rowHeight = args[1] || 220
  const limit = args[2] || 10
  const lazyload = args[0] === 'true'
  const regex = /!\[(.*?)\]\(([^\s]*)\s*(?:["'](.*?)["']?)?\s*\)/g
  const lazyloadClass = lazyload ? 'lazyload' : ''
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

  return `<div class="gallery">
    <div class="fj-gallery ${lazyloadClass}" data-rowHeight="${rowHeight}" data-limit="${limit}">
    <span class="gallery-data">${JSON.stringify(arr)}</span>
    </div>
    <button class="gallery-load-more"><span>${data[languages[0]].load_more}</span><i class="fa-solid fa-arrow-down"></i></button>
    </div>`
}

function galleryGroup (args) {
  const name = args[0]
  const descr = args[1]
  const url = urlFor(args[2])
  const img = urlFor(args[3])

  return `
  <figure class="gallery-group">
  <img class="gallery-group-img no-lightbox" src='${img}' alt="Group Image Gallery">
  <figcaption>
  <div class="gallery-group-name">${name}</div>
  <p>${descr}</p>
  <a href='${url}'></a>
  </figcaption>
  </figure>
  `
}

hexo.extend.tag.register('gallery', gallery, { ends: true })
hexo.extend.tag.register('galleryGroup', galleryGroup)
