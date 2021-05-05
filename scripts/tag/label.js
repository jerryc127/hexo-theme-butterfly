/**
 * Butterfly
 * label
 * {% label text color %}
 */

'use strict'

function addLabel (args, content) {
  const text = args[0]
  const className = args[1] || 'default'

  return `<mark class="hl-label ${className}">${text}</mark> `
}

hexo.extend.tag.register('label', addLabel, { ends: false })
