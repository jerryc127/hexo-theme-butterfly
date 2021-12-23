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
    pjax: 'https://unpkg.zhimg.com/pjax/pjax.min.js',

    // comments
    gitalk: 'https://unpkg.zhimg.com/gitalk@latest/dist/gitalk.min.js',
    gitalk_css: 'https://unpkg.zhimg.com/gitalk/dist/gitalk.min.css',
    valine: 'https://unpkg.zhimg.com/valine/dist/Valine.min.js',
    disqusjs: 'https://unpkg.zhimg.com/disqusjs@1/dist/disqus.js',
    disqusjs_css: 'https://unpkg.zhimg.com/disqusjs@1/dist/disqusjs.css',
    utterances: 'https://utteranc.es/client.js',
    twikoo: 'https://unpkg.zhimg.com/twikoo/dist/twikoo.all.min.js',
    waline: 'https://unpkg.zhimg.com/@waline/client/dist/Waline.min.js',
    giscus: 'https://giscus.app/client.js',

    // share
    addtoany: 'https://static.addtoany.com/menu/page.js',
    sharejs: 'https://unpkg.zhimg.com/social-share.js/dist/js/social-share.min.js',
    sharejs_css: 'https://unpkg.zhimg.com/social-share.js/dist/css/share.min.css',

    // search
    local_search: '/js/search/local-search.js',
    algolia_js: '/js/search/algolia.js',
    algolia_search_v4: 'https://unpkg.zhimg.com/algoliasearch@4/dist/algoliasearch-lite.umd.js',
    instantsearch_v4: 'https://unpkg.zhimg.com/instantsearch.js@4/dist/instantsearch.production.min.js',

    // math
    mathjax: 'https://unpkg.zhimg.com/mathjax@3/es5/tex-mml-chtml.js',
    katex: 'https://unpkg.zhimg.com/katex@latest/dist/katex.min.css',
    katex_copytex: 'https://unpkg.zhimg.com/katex@latest/dist/contrib/copy-tex.min.js',
    katex_copytex_css: 'https://unpkg.zhimg.com/katex@latest/dist/contrib/copy-tex.css',
    mermaid: 'https://unpkg.zhimg.com/mermaid/dist/mermaid.min.js',

    // count
    busuanzi: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js',

    // background effect
    canvas_ribbon: 'https://unpkg.zhimg.com/butterfly-extsrc@1/dist/canvas-ribbon.min.js',
    canvas_fluttering_ribbon: 'https://unpkg.zhimg.com/butterfly-extsrc@1/dist/canvas-fluttering-ribbon.min.js',
    canvas_nest: 'https://unpkg.zhimg.com/butterfly-extsrc@1/dist/canvas-nest.min.js',

    lazyload: 'https://unpkg.zhimg.com/vanilla-lazyload/dist/lazyload.iife.min.js',
    instantpage: 'https://unpkg.zhimg.com/instant.page/instantpage.min.js',
    typed: 'https://unpkg.zhimg.com/typed.js/lib/typed.min.js',
    pangu: 'https://unpkg.zhimg.com/pangu/dist/browser/pangu.min.js',

    // photo
    fancybox_css_v4: 'https://unpkg.zhimg.com/@fancyapps/ui/dist/fancybox.css',
    fancybox_v4: 'https://unpkg.zhimg.com/@fancyapps/ui/dist/fancybox.umd.js',
    medium_zoom: 'https://unpkg.zhimg.com/medium-zoom/dist/medium-zoom.min.js',

    // snackbar
    snackbar_css: 'https://unpkg.zhimg.com/node-snackbar/dist/snackbar.min.css',
    snackbar: 'https://unpkg.zhimg.com/node-snackbar/dist/snackbar.min.js',

    // effect
    activate_power_mode: 'https://unpkg.zhimg.com/butterfly-extsrc@1/dist/activate-power-mode.min.js',
    fireworks: 'https://unpkg.zhimg.com/butterfly-extsrc@1/dist/fireworks.min.js',
    click_heart: 'https://unpkg.zhimg.com/butterfly-extsrc@1/dist/click-heart.min.js',
    ClickShowText: 'https://unpkg.zhimg.com/butterfly-extsrc@1/dist/click-show-text.min.js',

    // fontawesome
    fontawesome: 'https://unpkg.zhimg.com/@fortawesome/fontawesome-free/css/all.min.css',

    // Conversion between Traditional and Simplified Chinese
    translate: '/js/tw_cn.js',

    // flickr-justified-gallery
    flickr_justified_gallery_js: 'https://unpkg.zhimg.com/flickr-justified-gallery@2/dist/fjGallery.min.js',
    flickr_justified_gallery_css: 'https://unpkg.zhimg.com/flickr-justified-gallery@2/dist/fjGallery.min.css',

    // aplayer
    aplayer_css: 'https://unpkg.zhimg.com/aplayer/dist/APlayer.min.css',
    aplayer_js: 'https://unpkg.zhimg.com/aplayer/dist/APlayer.min.js',
    meting_js: 'https://cdn.jsdelivr.net/gh/metowolf/MetingJS@1.2/dist/Meting.min.js',

    // Prism.js
    prismjs_js: 'https://unpkg.zhimg.com/prismjs/prism.min.js',
    prismjs_lineNumber_js: 'https://unpkg.zhimg.com/prismjs/plugins/line-numbers/prism-line-numbers.min.js',
    prismjs_autoloader: 'https://unpkg.zhimg.com/prismjs/plugins/autoloader/prism-autoloader.min.js'
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

  const newArray = use.map(item => item.toLowerCase().replace(/^\S/, s => s.toUpperCase()))

  themeConfig.comments.use = newArray
})
