/**
 * Butterfly
 * @example
 * hideInline
 * {% hideInline content,display,bg,color %}
 * content不能包含當引號，可用 &apos;
 * hideBlock
 * {% hideBlock display,bg,color %}
 * content
 * {% endhideBlock %}
 * hideToggle
 * {% hideToggle display,bg,color %}
 * content
 * {% endhideToggle %}
 */

'use strict'

const parseArgs = args => {
  return args.join(' ').split(',')
}

const generateStyle = (bg, color) => {
  let style = 'style="'
  if (bg) {
    style += `background-color: ${bg};`
  }
  if (color) {
    style += `color: ${color}`
  }
  style += '"'
  return style
}

const hideInline = args => {
  const [content, display = 'Click', bg = false, color = false] = parseArgs(args)
  const group = generateStyle(bg, color)

  return `<span class="hide-inline"><button type="button" class="hide-button" ${group}>${display}
  </button><span class="hide-content">${content}</span></span>`
}

const hideBlock = (args, content) => {
  const [display = 'Click', bg = false, color = false] = parseArgs(args)
  const group = generateStyle(bg, color)

  return `<div class="hide-block"><button type="button" class="hide-button" ${group}>${display}
    </button><div class="hide-content">${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div></div>`
}

const hideToggle = (args, content) => {
  const [display, bg = false, color = false] = parseArgs(args)
  const group = generateStyle(bg, color)
  let border = ''

  if (bg) {
    border = `style="border: 1px solid ${bg}"`
  }

  return `<details class="toggle" ${border}><summary class="toggle-button" ${group}>${display}</summary><div class="toggle-content">${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div></details>`
}

hexo.extend.tag.register('hideInline', hideInline)
hexo.extend.tag.register('hideBlock', hideBlock, { ends: true })
hexo.extend.tag.register('hideToggle', hideToggle, { ends: true })
