/**
 * Butterfly
 * mermaid
 * https://github.com/mermaid-js/mermaid
 */

'use strict'

function mermaid (args, content) {
  return `<div class="mermaid">${content}</div>`
}

hexo.extend.tag.register('mermaid', mermaid, { ends: true })
