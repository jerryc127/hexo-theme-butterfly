/**
 * Capitalize the first letter of comment name
 */

hexo.extend.filter.register('before_generate', () => {
  const themeConfig = hexo.theme.config
  let { use } = themeConfig.comments
  if (!use) return

  // 確保 use 是一個陣列
  use = Array.isArray(use) ? use : use.split(',')

  // 將每個項目轉換為小寫並將首字母大寫
  themeConfig.comments.use = use.map(item =>
    item.trim().toLowerCase().replace(/\b[a-z]/g, s => s.toUpperCase())
  )
})
