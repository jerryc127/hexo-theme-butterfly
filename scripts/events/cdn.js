/**
 * Butterfly
 * Merge CDN
 */

'use strict'

const { version } = require('../../package.json')
const path = require('path')

// Cache plugins.yml to avoid re-rendering on every generate
let cachedPlugins = null
const loadPlugins = hexo => {
  if (cachedPlugins) return cachedPlugins
  cachedPlugins = hexo.render.renderSync({ path: path.join(hexo.theme_dir, '/plugins.yml'), engine: 'yaml' })
  return cachedPlugins
}

hexo.extend.filter.register('before_generate', () => {
  const themeConfig = hexo.theme.config
  const { CDN } = themeConfig

  const thirdPartySrc = loadPlugins(hexo)
  const internalSrc = {
    main: {
      name: 'hexo-theme-butterfly',
      file: 'js/main.js',
      version
    },
    utils: {
      name: 'hexo-theme-butterfly',
      file: 'js/utils.js',
      version
    },
    translate: {
      name: 'hexo-theme-butterfly',
      file: 'js/tw_cn.js',
      version
    },
    local_search: {
      name: 'hexo-theme-butterfly',
      file: 'js/search/local-search.js',
      version
    },
    algolia_js: {
      name: 'hexo-theme-butterfly',
      file: 'js/search/algolia.js',
      version
    }
  }

  const minFile = file => {
    return file.replace(/(?<!\.min)\.(js|css)$/g, ext => '.min' + ext)
  }

  const createCDNLink = (data, type, cond = '') => {
    return Object.keys(data).reduce((result, key) => {
      let { name, version, file, other_name: otherName } = data[key]
      const cdnjsName = otherName || name
      const cdnjsFile = file.replace(/^(?:lib|dist)\/|^browser\//, '')
      const minCdnjsFile = minFile(cdnjsFile)
      if (cond === 'internal') file = `source/${file}`
      const minFilePath = minFile(file)
      const verType = CDN.version ? (type === 'local' ? `?v=${version}` : `@${version}`) : ''

      const value = {
        version,
        name,
        file,
        cdnjs_file: cdnjsFile,
        min_file: minFilePath,
        min_cdnjs_file: minCdnjsFile,
        cdnjs_name: cdnjsName
      }

      const cdnSource = {
        local: cond === 'internal' ? `${cdnjsFile + verType}` : `/pluginsSrc/${name}/${file + verType}`,
        jsdelivr: `https://cdn.jsdelivr.net/npm/${name}${verType}/${minFilePath}`,
        unpkg: `https://unpkg.com/${name}${verType}/${file}`,
        cdnjs: `https://cdnjs.cloudflare.com/ajax/libs/${cdnjsName}/${version}/${minCdnjsFile}`,
        custom: (CDN.custom_format || '').replace(/\$\{(.+?)\}/g, (match, $1) => value[$1])
      }

      result[key] = cdnSource[type]
      return result
    }, cond === 'internal' ? { main_css: 'css/index.css' + (CDN.version ? `?v=${version}` : '') } : {})
  }

  // delete null value
  const deleteNullValue = obj => {
    if (!obj) return {}
    for (const i in obj) {
      if (obj[i] === null) delete obj[i]
    }
    return obj
  }

  themeConfig.asset = Object.assign(
    createCDNLink(internalSrc, CDN.internal_provider, 'internal'),
    createCDNLink(thirdPartySrc, CDN.third_party_provider),
    deleteNullValue(CDN.option)
  )
})
