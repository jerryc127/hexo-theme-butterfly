/**
 * Capitalize the first letter of comment name
 */

hexo.extend.filter.register('before_generate', () => {
  const themeConfig = hexo.theme.config
  let { use } = themeConfig.comments
  if (!use) return
  if (typeof use === 'string') {
    use = use.split(',')
  }
  const newArray = use.map(item => item.toLowerCase().replace(/\b[a-z]/g, s => s.toUpperCase()))
  themeConfig.comments.use = newArray
})
