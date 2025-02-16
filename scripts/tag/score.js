/**
 * Music Score
 * {% score %}
 */

'use strict'

const score = (args, content) => {
  const escapeHtmlTags = s => {
    const lookup = {
      '&': '&amp;',
      '"': '&quot;',
      '\'': '&apos;',
      '<': '&lt;',
      '>': '&gt;'
    }
    return s.replace(/[&"'<>]/g, c => lookup[c])
  }
  return `<div class="abc-music-sheet">${escapeHtmlTags(content)}</div>`
}

hexo.extend.tag.register('score', score, { ends: true })
