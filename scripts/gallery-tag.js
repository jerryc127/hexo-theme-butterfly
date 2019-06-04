hexo.extend.tag.register('gallery', args => {
  const url = args[0]
  const title = args[1] || 'No title'
  return `
    <div
      class="gallery-item"
      style="background-image: url('${url}')"
      data-title="${title}"
      data-url="${url}"
    >
      <div class="gallery-item__title">
        ${title}
      </div>
    </div>
  `
})
