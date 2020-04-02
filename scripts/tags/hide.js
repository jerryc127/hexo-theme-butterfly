/**
 * Butterfly
 * hideInline
 * {% hideInline content,display,bg,color %}
 * content不能包含當引號，可用 &apos;
 * hideBlock
 * {% hideBlock display,bg,color %}
 * content
 * {% endhideBlock %}
 */

'use strict'

function hideInline (args) {
  args = args.join(' ').split(',')
  const content = args[0].trim()
  const display = args[1] || 'Click'
  const bg = args[2] === '' || typeof args[2] === 'undefined' ? '' : `background-color:${args[2]}`
  const color = args[3] || '#fff'
  return `<span class="hide-inline"><a class="hide-button button--primary button--animated" style="color:${color};${bg}">${display}
    </a><span class="hide-content">${content}</span></span>`
}

function hideBlock (args, content) {
  args = args.join(' ').split(',')
  const display = args[0] || 'Click'
  const bg = args[1] === '' || typeof args[2] === 'undefined' ? '' : `background-color:${args[2]}`
  const color = args[2] || '#fff'

  return `<div class="hide-block"><a class="hide-button button--primary button--animated" style="color:${color};${bg}">${display}
    </a><span class="hide-content">${hexo.render.renderSync({ text: content, engine: 'markdown' }).split('\n').join('')}</span></div>`
}

hexo.extend.tag.register('hideInline', hideInline)
hexo.extend.tag.register('hideBlock', hideBlock, { ends: true })
