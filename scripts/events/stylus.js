/**
 * stylus
 */

'use strict'

hexo.extend.filter.register('stylus:renderer', function (style) {
  const { highlight, prismjs } = hexo.config
  style
    .define('$highlight_enable', highlight && highlight.enable)
    .define('$highlight_line_number', highlight && highlight.line_number)
    .define('$prismjs_enable', prismjs && prismjs.enable)
    .define('$prismjs_line_number', prismjs && prismjs.line_number)
    // .import(this.source_dir.replace(/\\/g, '/') + '_data/css/*')
})
