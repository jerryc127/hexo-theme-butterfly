/**
 * Stylus renderer
 */

'use strict'

hexo.extend.filter.register('stylus:renderer', style => {
  const { enable: highlightEnable, line_number: highlightLineNumber } = hexo.config.highlight
  const { enable: prismjsEnable, line_number: prismjsLineNumber } = hexo.config.prismjs

  style.define('$highlight_enable', highlightEnable)
    .define('$highlight_line_number', highlightLineNumber)
    .define('$prismjs_enable', prismjsEnable)
    .define('$prismjs_line_number', prismjsLineNumber)
  // .import(`${this.source_dir.replace(/\\/g, '/')}_data/css/*`)
})
