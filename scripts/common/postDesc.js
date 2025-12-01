'use strict'

const { stripHTML, truncate } = require('hexo-util')

// Removes KaTeX elements to prevent duplication in excerpts
const removeKaTeX = (content) => {
  if (!content) return content
  // Remove KaTeX inline and block elements
  // Matches: <span class="katex">...</span>, <span class="katex-display">...</span>, etc.
  return content.replace(/<span[^>]*class="[^"]*katex[^"]*"[^>]*>.*?<\/span>/gis, '')
    .replace(/<div[^>]*class="[^"]*katex[^"]*"[^>]*>.*?<\/div>/gis, '')
    .replace(/<script[^>]*type="math\/tex[^"]*"[^>]*>.*?<\/script>/gis, '')
}

// Truncates the given content to a specified length, removing HTML tags and replacing newlines with spaces.
const truncateContent = (content, length, encrypt = false) => {
  if (!content || encrypt) return ''
  
  // Remove KaTeX elements first to prevent duplication
  let processedContent = removeKaTeX(content)
  
  // Strip HTML tags
  let strippedContent = stripHTML(processedContent).replace(/\n/g, ' ').trim()
  
  // If content is too short after stripping HTML, return empty string
  // This prevents showing meaningless short excerpts (fixes #1755)
  // Minimum meaningful length: 20 characters
  const MIN_CONTENT_LENGTH = 20
  if (strippedContent.length < MIN_CONTENT_LENGTH) {
    return ''
  }
  
  // Truncate to specified length
  return truncate(strippedContent, { length })
}

// Generates a post description based on the provided data and theme configuration.
const postDesc = (data, hexo) => {
  const { description, content, postDesc, encrypt } = data

  if (postDesc) return postDesc

  const { length, method } = hexo.theme.config.index_post_content

  if (method === false) return

  let result
  switch (method) {
    case 1:
      result = description
      break
    case 2:
      result = description || truncateContent(content, length, encrypt)
      break
    default:
      result = truncateContent(content, length, encrypt)
  }

  data.postDesc = result
  return result
}

module.exports = { truncateContent, postDesc }
