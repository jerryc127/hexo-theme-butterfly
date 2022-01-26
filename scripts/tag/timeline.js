/**
 * timeline
 * by Jerry
 */

'use strict'

function timeLineFn (args, content) {
  const tlBlock = /<!--\s*timeline (.*?)\s*-->\n([\w\W\s\S]*?)<!--\s*endtimeline\s*-->/g

  let result = ''
  let color = ''
  if (args.length) {
    args = args.join(' ').split(',')
    color = args[1]
    const mdContent = hexo.render.renderSync({ text: args[0], engine: 'markdown' })
    result += `<div class='timeline-item headline'><div class='timeline-item-title'><div class='item-circle'>${mdContent}</div></div></div>`
  }

  const matches = []
  let match

  while ((match = tlBlock.exec(content)) !== null) {
    matches.push(match[1])
    matches.push(match[2])
  }

  for (let i = 0; i < matches.length; i += 2) {
    const tlChildTitle = hexo.render.renderSync({ text: matches[i], engine: 'markdown' })
    const tlChildContent = hexo.render.renderSync({ text: matches[i + 1], engine: 'markdown' })

    const tlTitleHtml = `<div class='timeline-item-title'><div class='item-circle'>${tlChildTitle}</div></div>`
    const tlContentHtml = `<div class='timeline-item-content'>${tlChildContent}</div>`

    result += `<div class='timeline-item'>${tlTitleHtml + tlContentHtml}</div>`
  }

  return `<div class="timeline ${color}">${result}</div>`
}

hexo.extend.tag.register('timeline', timeLineFn, { ends: true })
