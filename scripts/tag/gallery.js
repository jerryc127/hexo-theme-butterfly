/**
 * Butterfly
 * galleryGroup and allery
 */

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

function gallery (args, content) {
  return `<div class="justified-gallery">${hexo.render.renderSync({ text: content, engine: 'markdown' }).split('\n').join('')}
          </div>`
}

function galleryGroup (args) {
  const name = args[0]
  const desrc = args[1]
  const url = urlFor(args[2])
  const img = urlFor(args[3])

  return `
  <figure class="gallery-group">
  <img class="gallery-group-img no-lightbox" src='${img}' alt="Group Image Gallery">
  <figcaption>
  <div class="gallery-group-name">${name}</div>
  <p>${desrc}</p>
  <a href='${url}'></a>
  </figcaption>
  </figure>
  `
}

hexo.extend.tag.register('gallery', gallery, { ends: true })
hexo.extend.tag.register('galleryGroup', galleryGroup)
