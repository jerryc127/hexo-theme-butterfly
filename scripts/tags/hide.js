
/**
  * {% hideInline content,display,bg,color %}
  * content不能包含當引號，可用 &apos;
 */
function hideInline(args) {
  args = args.join(' ').split(',')
  let content = args[0].trim()
  let display = args[1] || 'Click'
  let bg = args[2] ==='' || typeof args[2] ==='undefined' ? '' : `background-color:${args[2]}`
  let color = args[3] || '#fff'
   return `<span class="hide-inline"><a class="hide-button button--primary button--animated" style="color:${color};${bg}">${display}
    </a><span class="hide-content">${content}</span></span>`
}

/**
  * {% hideBlock display,bg,color %}
  * content
  * {% endhideBlock %}
 */
function hideBlock(args,content) {
  args = args.join(' ').split(',')
  let display = args[0] || 'Click'
  let bg = args[1] ==='' || typeof args[2] ==='undefined' ? '' : `background-color:${args[2]}`
  let color = args[2] || '#fff'

   return `<div class="hide-block"><a class="hide-button button--primary button--animated" style="color:${color};${bg}">${display}
    </a><span class="hide-content">${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}</span></div>`

}

hexo.extend.tag.register('hideInline', hideInline);
hexo.extend.tag.register('hideBlock', hideBlock, {ends: true});