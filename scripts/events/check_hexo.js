const logger = require('hexo-log')()

hexo.extend.filter.register('before_generate', () => {
  // Get first two digits of the Hexo version number
  var hexoVer = hexo.version.replace(/(^.*\..*)\..*/, '$1')

  if (hexoVer < 4.2) {
    logger.error('Please update Hexo to V4.2.0 or higher!')
    logger.error('請把 Hexo 升級到 V4.2.0 或更高的版本！')
    process.exit(-1)
  }
})
