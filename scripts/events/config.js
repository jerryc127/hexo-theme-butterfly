/**
 * Butterfly
 * 1. Merge CDN
 * 2. Capitalize the first letter of comment name
 */

'use strict'

const { version } = require('../../package.json')

hexo.extend.filter.register('before_generate', () => {
  const themeConfig = hexo.theme.config
  const { CDN, comments } = themeConfig

  /**
   * Merge CDN
   */
  const internalData = {
    main_css: {
      cdn: '/css/index.css',
      local: '/css/index.css'
    },
    main: {
      cdn: `https://cdn.jsdelivr.net/npm/hexo-theme-butterfly@${version}/source/js/main.min.js`,
      local: '/js/main.js'
    },
    utils: {
      cdn: `https://cdn.jsdelivr.net/npm/hexo-theme-butterfly@${version}/source/js/utils.min.js`,
      local: '/js/utils.js'
    },
    translate: {
      cdn: `https://cdn.jsdelivr.net/npm/hexo-theme-butterfly@${version}/source/js/tw_cn.min.js`,
      local: '/js/tw_cn.js'
    },
    local_search: {
      cdn: `https://cdn.jsdelivr.net/npm/hexo-theme-butterfly@${version}/source/js/search/local-search.min.js`,
      local: '/js/search/local-search.js'
    },
    algolia_js: {
      cdn: `https://cdn.jsdelivr.net/npm/hexo-theme-butterfly@${version}/source/js/search/algolia.min.js`,
      local: '/js/search/algolia.js'
    }
  }

  const data = {
    algolia_search_v4: {
      cdn: 'https://cdn.jsdelivr.net/npm/algoliasearch@4/dist/algoliasearch-lite.umd.js',
      local: '/js/lib/algolia/algoliasearch-lite.umd.js'
    },
    instantsearch_v4: {
      cdn: 'https://cdn.jsdelivr.net/npm/instantsearch.js@4/dist/instantsearch.production.min.js',
      local: '/js/lib/algolia/instantsearch.production.min.js'
    },
    pjax: {
      cdn: 'https://cdn.jsdelivr.net/npm/pjax/pjax.min.js',
      local: '/js/lib/pjax/pjax.min.js'
    },
    gitalk: {
      cdn: 'https://cdn.jsdelivr.net/npm/gitalk@latest/dist/gitalk.min.js',
      local: '/js/lib/gitalk/gitalk.min.js'
    },
    gitalk_css: {
      cdn: 'https://cdn.jsdelivr.net/npm/gitalk/dist/gitalk.min.css',
      local: '/js/lib/gitalk/gitalk.css'
    },
    blueimp_md5: {
      cdn: 'https://cdn.jsdelivr.net/npm/blueimp-md5/js/md5.min.js',
      local: '/js/lib/blueimp-md5/md5.min.js'
    },
    valine: {
      cdn: 'https://cdn.jsdelivr.net/npm/valine/dist/Valine.min.js',
      local: '/js/lib/valine/Valine.min.js'
    },
    disqusjs: {
      cdn: 'https://cdn.jsdelivr.net/npm/disqusjs@1/dist/disqus.js',
      local: '/js/lib/disqusjs/disqus.js'
    },
    disqusjs_css: {
      cdn: 'https://cdn.jsdelivr.net/npm/disqusjs@1/dist/disqusjs.css',
      local: '/js/lib/disqusjs/disqusjs.css'
    },
    twikoo: {
      cdn: 'https://cdn.jsdelivr.net/npm/twikoo@1/dist/twikoo.all.min.js',
      local: '/js/lib/twikoo/twikoo.all.min.js'
    },
    waline: {
      cdn: 'https://cdn.jsdelivr.net/npm/@waline/client/dist/Waline.min.js',
      local: '/js/lib/waline/Waline.min.js'
    },
    sharejs: {
      cdn: 'https://cdn.jsdelivr.net/gh/overtrue/share.js@master/dist/js/social-share.min.js',
      local: '/js/lib/social-share.js/dist/social-share.min.js'
    },
    sharejs_css: {
      cdn: 'https://cdn.jsdelivr.net/npm/social-share.js/dist/css/share.min.css',
      local: '/js/lib/social-share.js/dist/share.min.css'
    },
    mathjax: {
      cdn: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
      local: '/js/lib/mathjax/tex-mml-chtml.js'
    },
    katex: {
      cdn: 'https://cdn.jsdelivr.net/npm/katex@latest/dist/katex.min.css',
      local: '/js/lib/katex/katex.min.css'
    },
    katex_copytex: {
      cdn: 'https://cdn.jsdelivr.net/npm/katex@latest/dist/contrib/copy-tex.min.js',
      local: '/js/lib/katex/copy-tex.min.js'
    },
    katex_copytex_css: {
      cdn: 'https://cdn.jsdelivr.net/npm/katex@latest/dist/contrib/copy-tex.css',
      local: '/js/lib/katex/copy-tex.css'
    },
    mermaid: {
      cdn: 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js',
      local: '/js/lib/mermaid/mermaid.min.js'
    },
    canvas_ribbon: {
      cdn: 'https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/dist/canvas-ribbon.min.js',
      local: '/js/lib/effect/canvas-ribbon.min.js'
    },
    canvas_fluttering_ribbon: {
      cdn: 'https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/dist/canvas-fluttering-ribbon.min.js',
      local: '/js/lib/effect/canvas-fluttering-ribbon.min.js'
    },
    canvas_nest: {
      cdn: 'https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/dist/canvas-nest.min.js',
      local: '/js/lib/effect/canvas-nest.min.js'
    },
    activate_power_mode: {
      cdn: 'https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/dist/activate-power-mode.min.js',
      local: '/js/lib/effect/activate-power-mode.min.js'
    },
    fireworks: {
      cdn: 'https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/dist/fireworks.min.js',
      local: '/js/lib/effect/fireworks.min.js'
    },
    click_heart: {
      cdn: 'https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/dist/click-heart.min.js',
      local: '/js/lib/effect/click-heart.min.js'
    },
    ClickShowText: {
      cdn: 'https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/dist/click-show-text.min.js',
      local: '/js/lib/effect/click-show-text.min.js'
    },
    lazyload: {
      cdn: 'https://cdn.jsdelivr.net/npm/vanilla-lazyload/dist/lazyload.iife.min.js',
      local: '/js/lib/vanilla-lazyload/lazyload.iife.min.js'
    },
    instantpage: {
      cdn: 'https://cdn.jsdelivr.net/npm/instant.page@5/instantpage.min.js',
      local: '/js/lib/instant.page/instantpage.min.js'
    },
    typed: {
      cdn: 'https://cdn.jsdelivr.net/npm/typed.js/lib/typed.min.js',
      local: '/js/lib/typed.js/typed.min.js'
    },
    pangu: {
      cdn: 'https://cdn.jsdelivr.net/npm/pangu@4/dist/browser/pangu.min.js',
      local: '/js/lib/pangu/pangu.min.js'
    },
    fancybox_css_v4: {
      cdn: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css',
      local: '/js/lib/fancyapps/fancybox.css'
    },
    fancybox_v4: {
      cdn: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js',
      local: '/js/lib/fancyapps/fancybox.umd.js'
    },
    medium_zoom: {
      cdn: 'https://cdn.jsdelivr.net/npm/medium-zoom/dist/medium-zoom.min.js',
      local: '/js/lib/medium-zoom/medium-zoom.min.js'
    },
    snackbar_css: {
      cdn: 'https://cdn.jsdelivr.net/npm/node-snackbar/dist/snackbar.min.css',
      local: '/js/lib/node-snackbar/snackbar.min.css'
    },
    snackbar: {
      cdn: 'https://cdn.jsdelivr.net/npm/node-snackbar/dist/snackbar.min.js',
      local: '/js/lib/node-snackbar/snackbar.min.js'
    },
    fontawesomeV6: {
      cdn: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/css/all.min.css',
      local: '/js/lib/fontawesome-free/dist/all.min.css'
    },
    flickr_justified_gallery_js: {
      cdn: 'https://cdn.jsdelivr.net/npm/flickr-justified-gallery@2/dist/fjGallery.min.js',
      local: '/js/lib/flickr-justified-gallery/fjGallery.min.js'
    },
    flickr_justified_gallery_css: {
      cdn: 'https://cdn.jsdelivr.net/npm/flickr-justified-gallery@2/dist/fjGallery.min.css',
      local: '/js/lib/flickr-justified-gallery/fjGallery.min.css'
    },
    aplayer_css: {
      cdn: 'https://cdn.jsdelivr.net/npm/aplayer@1/dist/APlayer.min.css',
      local: '/js/lib/aplayer/APlayer.min.css'
    },
    aplayer_js: {
      cdn: 'https://cdn.jsdelivr.net/npm/aplayer@1/dist/APlayer.min.js',
      local: '/js/lib/aplayer/APlayer.min.js'
    },
    meting_js: {
      cdn: 'https://cdn.jsdelivr.net/gh/metowolf/MetingJS@1.2/dist/Meting.min.js',
      local: '/js/lib/aplayer/Meting.min.js'
    },
    prismjs_js: {
      cdn: 'https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js',
      local: '/js/lib/prismjs/prism.min.js'
    },
    prismjs_lineNumber_js: {
      cdn: 'https://cdn.jsdelivr.net/npm/prismjs@1/plugins/line-numbers/prism-line-numbers.min.js',
      local: '/js/lib/prismjs/prism-line-numbers.min.js'
    },
    prismjs_autoloader: {
      cdn: 'https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js',
      local: '/js/lib/prismjs/prism-autoloader.min.js'
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
    const str = choose === 'local' ? 'local' : 'cdn'

    for (const i in obj) {
      obj[i] = obj[i][str]
    }
    return obj
  }

  themeConfig.asset = Object.assign(defaultVal(internalData, CDN.internal_provider),
    defaultVal(data, CDN.third_party_provider), deleteNullValue(CDN.option))

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
