function gallery(args, content) {
  return `<div class="justified-gallery">${hexo.render.renderSync({text: content, engine: 'markdown'})}
          </div>`;
}

hexo.extend.tag.register('gallery', gallery, {ends: true});