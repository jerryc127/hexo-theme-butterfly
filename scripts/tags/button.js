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
  var url = args[0] || ''
  var text = args[1] || ''
  var icon = args[2] || ''
  var option = args[3] || ''

  url = url.trim()
  text = text.trim()
  icon = icon.trim()
  option = option.trim()

  return `<a class="btn-beautify button--animated ${option}" href="${urlFor(url)}" title="${text}">${icon.length > 0 ? `<i class="${icon} fa-fw"></i>` : ''} ${text} </a>`
}

hexo.extend.tag.register('btn', btn, { ends: false })
