/**
 * Capitalize the first letter of comment name
 */

hexo.extend.filter.register('before_generate', () => {
  const themeConfig = hexo.theme.config
  let { use } = themeConfig.comments
  if (!use) return

  // Make sure use is an array
  use = Array.isArray(use) ? use : use.split(',')

  // Capitalize the first letter of each comment name
  use = use.map(item =>
    item.trim().toLowerCase().replace(/\b[a-z]/g, s => s.toUpperCase())
  )

  // Disqus and Disqusjs conflict, only keep the first one
  if (use.includes('Disqus') && use.includes('Disqusjs')) {
    use = [use[0]]
  }

  themeConfig.comments.use = use
})
