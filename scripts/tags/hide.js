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
  var content = args[0]
  var display = args[1] || 'Click'
  var bg = args[2] || false
  var color = args[3] || false
  var group = 'style="'

  if (bg) group += `background-color: ${bg};`
  if (color) group += `color: ${color}`
  group += '"'

  return `<span class="hide-inline"><a class="hide-button button--primary button--animated" ${group}>${display}
  </a><span class="hide-content">${content}</span></span>`
}

function hideBlock (args, content) {
  args = args.join(' ').split(',')
  var display = args[0] || 'Click'
  var bg = args[1] || false
  var color = args[2] || false
  var group = 'style="'

  if (bg) group += `background-color: ${bg};`
  if (color) group += `color: ${color}`
  group += '"'

  return `<div class="hide-block"><a class="hide-button button--primary button--animated" ${group}>${display}
    </a><span class="hide-content">${hexo.render.renderSync({ text: content, engine: 'markdown' }).split('\n').join('')}</span></div>`
}

function hideToggle (args, content) {
  args = args.join(' ').split(',')
  var display = args[0]
  var bg = args[1] || false
  var color = args[2] || false
  var group = 'style="'
  var border = ''

  if (bg) {
    border = `style="border: 1px solid ${bg}"`
    group += `background-color: ${bg};`
  }
  if (color) group += `color: ${color}`
  group += '"'

  return `<div class="hide-toggle" ${border}><div class="hide-button toggle-title" ${group}><i class="fa fa-caret-right fa-fw"></i><span>${display}</span></div>
    <div class="hide-content">${hexo.render.renderSync({ text: content, engine: 'markdown' }).split('\n').join('')}</div></div>`
}

hexo.extend.tag.register('hideInline', hideInline)
hexo.extend.tag.register('hideBlock', hideBlock, { ends: true })
hexo.extend.tag.register('hideToggle', hideToggle, { ends: true })
