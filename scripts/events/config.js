/**
 * Butterfly
 * 1. Merge CDN
 * 2. Capitalize the first letter of comment name
 */

'use strict'

const { version } = require('../../package.json')
const path = require('path')

hexo.extend.filter.register('before_generate', () => {
  const themeConfig = hexo.theme.config
  const { CDN, comments } = themeConfig
  const jsdelivr = 'https://cdn.jsdelivr.net/npm/'
  const unpkg = 'https://unpkg.com/'

  /**
   * Merge CDN
   */

  const internalSrcCDN = (pre) => {
    return {
      main_css: '/css/index.css',
      main: `${pre}hexo-theme-butterfly@${version}/source/js/main.js`,
      utils: `${pre}hexo-theme-butterfly@${version}/source/js/utils.js`,
      translate: `${pre}hexo-theme-butterfly@${version}/source/js/tw_cn.js`,
      local_search: `${pre}hexo-theme-butterfly@${version}/source/js/search/local-search.js`,
      algolia_js: `${pre}hexo-theme-butterfly@${version}/source/js/search/algolia.js`,
    }
  }

  const internalSrcLocal = {
    main_css: '/css/index.css',
    main: '/js/main.js',
    utils: '/js/utils.js',
    translate: '/js/tw_cn.js',
    local_search: '/js/search/local-search.js',
    algolia_js: '/js/search/algolia.js',
  }

  const thirdPartySrcCDN = (pre) => {
    return {
      algolia_search_v4: `${pre}algoliasearch@4/dist/algoliasearch-lite.umd.js`,
      instantsearch_v4: `${pre}instantsearch.js@4/dist/instantsearch.production.min.js`,
      pjax: `${pre}pjax/pjax.min.js`,
      gitalk: `${pre}gitalk@latest/dist/gitalk.min.js`,
      gitalk_css: `${pre}gitalk/dist/gitalk.css`,
      blueimp_md5: `${pre}blueimp-md5/js/md5.min.js`,
      valine: `${pre}valine/dist/Valine.min.js`,
      disqusjs: `${pre}disqusjs@3/dist/browser/disqusjs.es2015.umd.min.js`,
      disqusjs_css: `${pre}disqusjs@3/dist/browser/styles/disqusjs.css`,
      twikoo: `${pre}twikoo@1/dist/twikoo.all.min.js`,
      waline_js: `${pre}@waline/client/dist/waline.js`,
      waline_css: `${pre}@waline/client/dist/waline.css`,
      sharejs: `${pre}butterfly-extsrc@1/ShareJS/dist/js/social-share.min.js`,
      sharejs_css: `${pre}butterfly-extsrc@1/ShareJS/dist/css/share.min.css`,
      mathjax: `${pre}mathjax@3/es5/tex-mml-chtml.js`,
      katex: `${pre}katex@latest/dist/katex.min.css`,
      katex_copytex: `${pre}katex@latest/dist/contrib/copy-tex.min.js`,
      katex_copytex_css: `${pre}katex@latest/dist/contrib/copy-tex.css`,
      mermaid: `${pre}mermaid/dist/mermaid.min.js`,
      canvas_ribbon: `${pre}butterfly-extsrc@1/dist/canvas-ribbon.min.js`,
      canvas_fluttering_ribbon: `${pre}butterfly-extsrc@1/dist/canvas-fluttering-ribbon.min.js`,
      canvas_nest: `${pre}butterfly-extsrc@1/dist/canvas-nest.min.js`,
      activate_power_mode: `${pre}butterfly-extsrc@1/dist/activate-power-mode.min.js`,
      fireworks: `${pre}butterfly-extsrc@1/dist/fireworks.min.js`,
      click_heart: `${pre}butterfly-extsrc@1/dist/click-heart.min.js`,
      ClickShowText: `${pre}butterfly-extsrc@1/dist/click-show-text.min.js`,
      lazyload: `${pre}vanilla-lazyload/dist/lazyload.iife.min.js`,
      instantpage: `${pre}instant.page@5/instantpage.js`,
      typed: `${pre}typed.js/lib/typed.min.js`,
      pangu: `${pre}pangu@4/dist/browser/pangu.min.js`,
      fancybox_css_v4: `${pre}@fancyapps/ui/dist/fancybox.css`,
      fancybox_v4: `${pre}@fancyapps/ui/dist/fancybox.umd.js`,
      medium_zoom: `${pre}medium-zoom/dist/medium-zoom.min.js`,
      snackbar_css: `${pre}node-snackbar/dist/snackbar.min.css`,
      snackbar: `${pre}node-snackbar/dist/snackbar.min.js`,
      fontawesomeV6: `${pre}@fortawesome/fontawesome-free@6/css/all.min.css`,
      flickr_justified_gallery_js: `${pre}flickr-justified-gallery@2/dist/fjGallery.min.js`,
      flickr_justified_gallery_css: `${pre}flickr-justified-gallery@2/dist/fjGallery.css`,
      aplayer_css: `${pre}aplayer@1/dist/APlayer.min.css`,
      aplayer_js: `${pre}aplayer@1/dist/APlayer.min.js`,
      meting_js: `${pre}butterfly-extsrc@1/MetingJS/dist/Meting.min.js`,
      prismjs_js: `${pre}prismjs@1/prism.js`,
      prismjs_lineNumber_js: `${pre}prismjs@1/plugins/line-numbers/prism-line-numbers.min.js`,
      prismjs_autoloader: `${pre}prismjs@1/plugins/autoloader/prism-autoloader.min.js`,
    }
  }

  // delete null value
  const deleteNullValue = obj => {
    if (!obj) return
    for (const i in obj) {
      obj[i] === null && delete obj[i]
    }
    return obj
  }

  const defaultVal = (obj, choose) => {
    if (obj === 'internal') {
      if (choose === 'local') return internalSrcLocal
      else if (choose === 'unpkg') return internalSrcCDN(unpkg)
      else return internalSrcCDN(jsdelivr)
    }

    if (obj === 'external') {
      if (choose === 'local') {
        let result = {}
        try {
          const data = path.join(hexo.plugin_dir,'hexo-butterfly-extjs/plugins.yml')
          result = hexo.render.renderSync({ path: data, engine: 'yaml'})
          Object.keys(result).map(key => {
            result[key] = '/pluginsSrc/' + result[key]
          })
        } catch (e) {}
        return result
      } else if (choose === 'unpkg') return thirdPartySrcCDN(unpkg)
      else return thirdPartySrcCDN(jsdelivr)
    }
  }

  themeConfig.asset = Object.assign(defaultVal('internal', CDN.internal_provider),
    defaultVal('external', CDN.third_party_provider), deleteNullValue(CDN.option))

  /**
   * Capitalize the first letter of comment name
   */

  let { use } = comments

  if (!use) return

  if (typeof use === 'string') {
    use = use.split(',')
  }

  const newArray = use.map(item => item.toLowerCase().replace(/\b[a-z]/g, s => s.toUpperCase()))

  themeConfig.comments.use = newArray
})
