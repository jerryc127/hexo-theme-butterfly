/**
 * Note: configs in _data/butterfly.yml will replace configs in hexo.theme.config.
 */

hexo.on('generateBefore', function () {
  const rootConfig = hexo.config
  if (hexo.locals.get) {
    const data = hexo.locals.get('data')
    data && data.butterfly && (hexo.theme.config = data.butterfly)
  }
  hexo.theme.config.rootConfig = rootConfig
})