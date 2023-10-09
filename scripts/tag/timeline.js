/**
 * timeline
 * by Jerry
 */

'use strict'

const timeLineFn = (args, content) => {
  const tlBlock = /<!--\s*timeline (.*?)\s*-->\n([\w\W\s\S]*?)<!--\s*endtimeline\s*-->/g

  let result = ''
  let color = ''
  let text = ''
  if (args.length) {
    [text, color] = args.join(' ').split(',')
    const mdContent = hexo.render.renderSync({ text, engine: 'markdown' })
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
