/**
 * Button
 * {% btn url text icon option %}
 * option: color outline center block larger
 * color : default/blue/pink/red/purple/orange/green
 */

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

function btn (args) {
  args = args.join(' ').split(',')
  let url = args[0] || ''
  let text = args[1] || ''
  let icon = args[2] || ''
  let option = args[3] || ''

  url = url.trim()
  text = text.trim()
  icon = icon.trim()
  option = option.trim()

  return `<a class="btn-beautify button--animated ${option}" href="${urlFor(url)}" 
  title="${text}">${icon.length > 0 ? `<i class="${icon} fa-fw"></i>` : ''}<span>${text}</span></a>`
}

hexo.extend.tag.register('btn', btn, { ends: false })
