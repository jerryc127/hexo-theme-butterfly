/**
 * Butterfly
 * mermaid
 * https://github.com/mermaid-js/mermaid
 */

'use strict'

const { escapeHTML } = require('hexo-util')

const mermaid = (args, content) => {
  const config = args[0] || '{}'
  return `<div class="mermaid-wrap"><pre class="mermaid-src" data-config="${escapeHTML(config)}" hidden>
    ${escapeHTML(content)}
  </pre></div>`
}

hexo.extend.tag.register('mermaid', mermaid, { ends: true })
