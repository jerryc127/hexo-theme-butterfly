/**
 * Butterfly
 * mermaid
 * https://github.com/mermaid-js/mermaid
 */

'use strict'

const { escapeHTML } = require('hexo-util')

function mermaid (args, content) {
  return `<div class="mermaid">${escapeHTML(content)}</div>`
}

hexo.extend.tag.register('mermaid', mermaid, { ends: true })
