/**
 * Butterfly
 * 1. Merge CDN
 * 2. Capitalize the first letter of comment name
 */

'use strict'

hexo.extend.filter.register('before_generate', () => {
  const themeConfig = hexo.theme.config

  /**
   * Merge CDN
   */

  const defaultCDN = {
    main_css: '/css/index.css',
    main: '/js/main.js',
    utils: '/js/utils.js',

    // pjax
    pjax: 'https://cdn.jsdelivr.net/npm/pjax/pjax.min.js',

    // comments
    gitalk: 'https://cdn.jsdelivr.net/npm/gitalk@latest/dist/gitalk.min.js',
    gitalk_css: 'https://cdn.jsdelivr.net/npm/gitalk/dist/gitalk.min.css',
    blueimp_md5: 'https://cdn.jsdelivr.net/npm/blueimp-md5/js/md5.min.js',
    valine: 'https://cdn.jsdelivr.net/npm/valine/dist/Valine.min.js',
    disqusjs: 'https://cdn.jsdelivr.net/npm/disqusjs@1/dist/disqus.js',
    disqusjs_css: 'https://cdn.jsdelivr.net/npm/disqusjs@1/dist/disqusjs.css',
    utterances: 'https://utteranc.es/client.js',
    twikoo: 'https://cdn.jsdelivr.net/npm/twikoo/dist/twikoo.all.min.js',
    waline: 'https://cdn.jsdelivr.net/npm/@waline/client/dist/Waline.min.js',
    giscus: 'https://giscus.app/client.js',

    // share
    addtoany: 'https://static.addtoany.com/menu/page.js',
    sharejs: 'https://cdn.jsdelivr.net/npm/social-share.js/dist/js/social-share.min.js',
    sharejs_css: 'https://cdn.jsdelivr.net/npm/social-share.js/dist/css/share.min.css',

    // search
    local_search: '/js/search/local-search.js',
    algolia_js: '/js/search/algolia.js',
    algolia_search_v4: 'https://cdn.jsdelivr.net/npm/algoliasearch@4/dist/algoliasearch-lite.umd.js',
    instantsearch_v4: 'https://cdn.jsdelivr.net/npm/instantsearch.js@4/dist/instantsearch.production.min.js',

    // math
    mathjax: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
    katex: 'https://cdn.jsdelivr.net/npm/katex@latest/dist/katex.min.css',
    katex_copytex: 'https://cdn.jsdelivr.net/npm/katex@latest/dist/contrib/copy-tex.min.js',
    katex_copytex_css: 'https://cdn.jsdelivr.net/npm/katex@latest/dist/contrib/copy-tex.css',
    mermaid: 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js',

    // count
    busuanzi: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js',

    // background effect
    canvas_ribbon: 'https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/dist/canvas-ribbon.min.js',
    canvas_fluttering_ribbon: 'https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/dist/canvas-fluttering-ribbon.min.js',
    canvas_nest: 'https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/dist/canvas-nest.min.js',

    lazyload: 'https://cdn.jsdelivr.net/npm/vanilla-lazyload/dist/lazyload.iife.min.js',
    instantpage: 'https://cdn.jsdelivr.net/npm/instant.page/instantpage.min.js',
    typed: 'https://cdn.jsdelivr.net/npm/typed.js/lib/typed.min.js',
    pangu: 'https://cdn.jsdelivr.net/npm/pangu/dist/browser/pangu.min.js',

    // photo
    fancybox_css_v4: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css',
    fancybox_v4: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js',
    medium_zoom: 'https://cdn.jsdelivr.net/npm/medium-zoom/dist/medium-zoom.min.js',

    // snackbar
    snackbar_css: 'https://cdn.jsdelivr.net/npm/node-snackbar/dist/snackbar.min.css',
    snackbar: 'https://cdn.jsdelivr.net/npm/node-snackbar/dist/snackbar.min.js',

    // effect
    activate_power_mode: 'https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/dist/activate-power-mode.min.js',
    fireworks: 'https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/dist/fireworks.min.js',
    click_heart: 'https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/dist/click-heart.min.js',
    ClickShowText: 'https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/dist/click-show-text.min.js',

    // fontawesome
    fontawesomeV6: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/css/all.min.css',

    // Conversion between Traditional and Simplified Chinese
    translate: '/js/tw_cn.js',

    // flickr-justified-gallery
    flickr_justified_gallery_js: 'https://cdn.jsdelivr.net/npm/flickr-justified-gallery@2/dist/fjGallery.min.js',
    flickr_justified_gallery_css: 'https://cdn.jsdelivr.net/npm/flickr-justified-gallery@2/dist/fjGallery.min.css',

    // aplayer
    aplayer_css: 'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css',
    aplayer_js: 'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js',
    meting_js: 'https://cdn.jsdelivr.net/gh/metowolf/MetingJS@1.2/dist/Meting.min.js',

    // Prism.js
    prismjs_js: 'https://cdn.jsdelivr.net/npm/prismjs/prism.min.js',
    prismjs_lineNumber_js: 'https://cdn.jsdelivr.net/npm/prismjs/plugins/line-numbers/prism-line-numbers.min.js',
    prismjs_autoloader: 'https://cdn.jsdelivr.net/npm/prismjs/plugins/autoloader/prism-autoloader.min.js'
  }

  // delete null value
  const deleteNullValue = obj => {
    for (const i in obj) {
      obj[i] === null && delete obj[i]
    }
    return obj
  }

  themeConfig.CDN = Object.assign(defaultCDN, deleteNullValue(themeConfig.CDN))

  /**
   * Capitalize the first letter of comment name
   */

  let { use } = themeConfig.comments

  if (!use) return

  if (typeof use === 'string') {
    use = use.split(',')
  }

  const newArray = use.map(item => item.toLowerCase().replace(/\b[a-z]/g, s => s.toUpperCase()))

  themeConfig.comments.use = newArray
})
