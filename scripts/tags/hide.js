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

function hideInline (args) {
  args = args.join(' ').split(',')
  const content = args[0]
  const display = args[1] || 'Click'
  const bg = args[2] || false
  const color = args[3] || false
  let group = 'style="'

  if (bg) group += `background-color: ${bg};`
  if (color) group += `color: ${color}`
  group += '"'

  return `<span class="hide-inline"><button type="button" class="hide-button button--animated" ${group}>${display}
  </button><span class="hide-content">${content}</span></span>`
}

function hideBlock (args, content) {
  args = args.join(' ').split(',')
  const display = args[0] || 'Click'
  const bg = args[1] || false
  const color = args[2] || false
  let group = 'style="'

  if (bg) group += `background-color: ${bg};`
  if (color) group += `color: ${color}`
  group += '"'

  return `<div class="hide-block"><button type="button" class="hide-button button--animated" ${group}>${display}
    </button><span class="hide-content">${hexo.render.renderSync({ text: content, engine: 'markdown' })}</span></div>`
}

function hideToggle (args, content) {
  args = args.join(' ').split(',')
  const display = args[0]
  const bg = args[1] || false
  const color = args[2] || false
  let group = 'style="'
  let border = ''

  if (bg) {
    border = `style="border: 1px solid ${bg}"`
    group += `background-color: ${bg};`
  }
  if (color) group += `color: ${color}`
  group += '"'

  return `<div class="hide-toggle" ${border}><div class="hide-button toggle-title" ${group}><i class="fas fa-caret-right fa-fw"></i><span>${display}</span></div>
    <div class="hide-content">${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div></div>`
}

hexo.extend.tag.register('hideInline', hideInline)
hexo.extend.tag.register('hideBlock', hideBlock, { ends: true })
hexo.extend.tag.register('hideToggle', hideToggle, { ends: true })
