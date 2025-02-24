/**
 * Music Score
 * {% score %}
 */

'use strict'

const score = (args, content) => {
  // 转义 HTML 标签和部分特殊字符，包括花括号
  const escapeHtmlTags = s => {
    const lookup = {
      '&': '&amp;',
      '"': '&quot;',
      '\'': '&apos;',
      '<': '&lt;',
      '>': '&gt;',
      '{': '&#123;',
      '}': '&#125;'
    }
    return s.replace(/[&"'<>{}]/g, c => lookup[c])
  }
  
  const trimmed = content.trim()
  // 使用六个横线作为分隔符拆分内容
  const parts = trimmed.split('------')
  
  if (parts.length < 2) {
    // 如果没有分隔符，直接将整个内容作为乐谱内容处理
    return `<div class="abc-music-sheet">${escapeHtmlTags(trimmed)}</div>`
  }
  
  // 第一部分为参数（JSON 字符串），其余部分作为乐谱内容
  const paramPart = parts[0].trim()
  const scorePart = parts.slice(1).join('------').trim()
  
  let paramsObj = {}
  try {
    paramsObj = JSON.parse(paramPart)
  } catch (e) {
    console.error('解析 score 标签中的参数 JSON 失败：', e)
  }
  
  // 使用双引号包裹 data-params 的属性值，确保 JSON 内部的双引号已被转义
  return `<div class="abc-music-sheet" data-params="${escapeHtmlTags(JSON.stringify(paramsObj))}">
    ${escapeHtmlTags(scorePart)}
  </div>`
}

hexo.extend.tag.register('score', score, { ends: true })

