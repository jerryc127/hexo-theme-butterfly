/**
 * Note: configs in _data/butterfly.yml will merge configs with hexo.theme.config.
 */

'use strict'

const { deepMerge } = require('hexo-util')

hexo.on('generateBefore', function () {
  const rootConfig = hexo.config
  if (hexo.locals.get) {
    const data = hexo.locals.get('data')
    if (data && data.butterfly) {
      hexo.theme.config = deepMerge(hexo.theme.config, data.butterfly)
    }
  }
  hexo.theme.config.rootConfig = rootConfig
})
