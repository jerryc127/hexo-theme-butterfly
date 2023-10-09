/**
 * Button
 * {% btn url text icon option %}
 * option: color outline center block larger
 * color : default/blue/pink/red/purple/orange/green
 */

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

const btn = args => {
  args = args.join(' ').split(',')
  const [url = '', text = '', icon = '', option = ''] = args.map(arg => arg.trim())

  return `<a class="btn-beautify ${option}" href="${urlFor(url)}" 
  title="${text}">${icon.length ? `<i class="${icon}"></i>` : ''}${text.length ? `<span>${text}</span>` : ''}</a>`
}

hexo.extend.tag.register('btn', btn, { ends: false })
