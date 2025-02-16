hexo.extend.filter.register('before_generate', () => {
  // Get first two digits of the Hexo version number
  const { version, log, locals } = hexo
  const hexoVer = version.replace(/(^.*\..*)\..*/, '$1')

  if (hexoVer < 5.3) {
    log.error('Please update Hexo to V5.3.0 or higher!')
    log.error('請把 Hexo 升級到 V5.3.0 或更高的版本！')
    process.exit(-1)
  }

  if (locals.get) {
    const data = locals.get('data')
    if (data && data.butterfly) {
      log.error("'butterfly.yml' is deprecated. Please use '_config.butterfly.yml'")
      log.error("'butterfly.yml' 已經棄用，請使用 '_config.butterfly.yml'")
      process.exit(-1)
    }
  }
})
