/**
 * note.js
 * transplant from hexo-theme-next
 * Modify by Jerry
 */

'use strict'

function postNote (args, content) {
  const styleConfig = hexo.theme.config.note.style
  const lastArgs = args[args.length - 1]
  if (!(lastArgs === 'flat' || lastArgs === 'modern' || lastArgs === 'simple' || lastArgs === 'disabled')) {
    args.push(styleConfig)
  }

  let icon = ''
  const iconArray = args[args.length - 2]
  if (iconArray && iconArray.startsWith('fa')) {
    icon = `<i class="note-icon ${iconArray}"></i>`
    args[args.length - 2] = 'icon'
  }

  return `<div class="note ${args.join(' ')}">${icon + hexo.render.renderSync({ text: content, engine: 'markdown' })}</div>`
}

hexo.extend.tag.register('note', postNote, { ends: true })
hexo.extend.tag.register('subnote', postNote, { ends: true })
