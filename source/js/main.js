
/**
  * 當menu過多時，自動適配，避免UI錯亂
  * @param {*} n
  * 傳入 1 sidebar打開時
  * 傳入 2 正常狀態下
  */

const blogNameWidth = $('#site-name').width()
const menusWidth = $('.menus').width()
const sidebarWidth = $('#sidebar').width() || 300

const adjustMenu = function (n) {
  const $nav = $('#nav')
  let t
  if (n === 0) t = true
  else if (n === 1) t = blogNameWidth + menusWidth > $nav.width() - sidebarWidth - 30
  else t = blogNameWidth + menusWidth > $nav.width() - 30

  if (t) {
    $nav.addClass('hide-menu')
  } else {
    $nav.removeClass('hide-menu')
  }
}

// 初始化header
const initAdjust = () => {
  if (window.innerWidth < 768) adjustMenu(0)
  else adjustMenu(2)
  $('#nav').css({ opacity: '1', animation: 'headerNoOpacity 1s' })
}

/**
 * 進入post頁sidebar處理
 */
const OpenSidebarAuto = () => {
  if (window.innerWidth > 1024 && $('#toggle-sidebar').hasClass('on')) {
    setTimeout(function () {
      openSidebar()
    }, 400)
  }
}

/**
 * 點擊左下角箭頭,顯示sidebar
 */

const closeSidebar = () => {
  $('#sidebar').removeClass('tocOpenPc').animate({
    left: '-300px'
  }, 400)
  $('.menus').animate({
    paddingRight: 0
  }, 400)
  $('#body-wrap').animate({
    paddingLeft: 0
  }, 400)
  if ($('#nav').hasClass('hide-menu')) {
    setTimeout(function () {
      adjustMenu(2)
    }, 400)
  }
}

const openSidebar = () => {
  if (!$('#nav').hasClass('hide-menu')) {
    adjustMenu(1)
  }
  $('#sidebar').addClass('tocOpenPc').animate({
    left: 0
  }, 400)
  $('.menus').animate({
    paddingRight: 300
  }, 400)
  $('#body-wrap').animate({
    paddingLeft: 300
  }, 400)
}

const toggleSidebar = function () {
  $('#toggle-sidebar').on('click', function () {
    const isOpen = $(this).hasClass('on')
    isOpen ? $(this).removeClass('on') : $(this).addClass('on')
    if (isOpen) {
      closeSidebar()
    } else {
      openSidebar()
    }
  })
}

/**
 * 手機menu和toc按鈕點擊
 * 顯示menu和toc的sidebar
 */

const sidebarFn = () => {
  const $toggleMenu = $('.toggle-menu')
  const $mobileSidebarMenus = $('#mobile-sidebar-menus')
  const $mobileTocButton = $('#mobile-toc-button')
  const $menuMask = $('#menu_mask')
  const $body = $('body')
  const $sidebar = $('#sidebar')

  function openMobileSidebar (name) {
    sidebarPaddingR()
    $body.css('overflow', 'hidden')
    $menuMask.fadeIn()

    if (name === 'menu') {
      $toggleMenu.removeClass('close').addClass('open')
      $mobileSidebarMenus.addClass('open')
    }

    if (name === 'toc') {
      $mobileTocButton.removeClass('close').addClass('open')
      $sidebar.addClass('tocOpenMobile').css({ transform: 'translate3d(-100%,0,0)', left: '' })
    }
  }

  function closeMobileSidebar (name) {
    $body.css({ overflow: '', 'padding-right': '' })
    $menuMask.fadeOut()

    if (name === 'menu') {
      $toggleMenu.removeClass('open').addClass('close')
      $mobileSidebarMenus.removeClass('open')
    }

    if (name === 'toc') {
      $mobileTocButton.removeClass('open').addClass('close')
      $sidebar.removeClass('tocOpenMobile').css({ transform: '' })
    }
  }

  $toggleMenu.on('click', function () {
    openMobileSidebar('menu')
  })

  $mobileTocButton.on('click', function () {
    openMobileSidebar('toc')
  })

  $menuMask.on('click touchstart', function (e) {
    if ($toggleMenu.hasClass('open')) {
      closeMobileSidebar('menu')
    }
    if ($mobileTocButton.hasClass('open')) {
      closeMobileSidebar('toc')
    }
  })

  $(window).on('resize', function (e) {
    if (!$toggleMenu.is(':visible')) {
      if ($toggleMenu.hasClass('open')) closeMobileSidebar('menu')
    }
  })

  const mql = window.matchMedia('(max-width: 1024px)')
  mql.addEventListener('change', function (ev) {
    if (ev.matches) {
      if ($sidebar.hasClass('tocOpenPc')) closeSidebar()
    } else {
      if ($('#toggle-sidebar').hasClass('on')) openSidebar()
      if ($mobileTocButton.hasClass('open')) closeMobileSidebar('toc')
    }
  })

  // toc元素點擊
  $sidebar.find('.toc-link').on('click', function (e) {
    e.preventDefault()
    scrollToDest(decodeURI($(this).attr('href')))
    if (window.innerWidth <= 1024) {
      closeMobileSidebar('toc')
    }
  })
}

/**
 * 首頁top_img底下的箭頭
 */
const scrollDownInIndex = () => {
  $('#scroll_down').on('click', function () {
    scrollToDest('#content-inner')
  })
}

/**
 * 代碼
 * 只適用於Hexo默認的代碼渲染
 */
const addHighlightTool = function () {
  const isHighlightCopy = GLOBAL_CONFIG.highlight.highlightCopy
  const isHighlightLang = GLOBAL_CONFIG.highlight.highlightLang
  const isHighlightShrink = GLOBAL_CONFIG_SITE.isHighlightShrink
  const isShowTool = isHighlightCopy || isHighlightLang || isHighlightShrink !== undefined
  const $figureHighlight = GLOBAL_CONFIG.highlight.plugin === 'highlighjs' ? $('figure.highlight') : $('pre[class*="language-"')

  if (isShowTool && $figureHighlight.length) {
    const isPrismjs = GLOBAL_CONFIG.highlight.plugin === 'prismjs'

    let highlightShrinkEle = ''
    let highlightCopyEle = ''
    const highlightShrinkClass = isHighlightShrink === true ? 'closed' : ''

    if (isHighlightShrink !== undefined) {
      highlightShrinkEle = `<i class="fas fa-angle-down expand ${highlightShrinkClass}"></i>`
    }

    if (isHighlightCopy) {
      highlightCopyEle = '<div class="copy-notice"></div><i class="fas fa-paste copy-button"></i>'
    }

    if (isHighlightLang) {
      if (isPrismjs) {
        $figureHighlight.each(function () {
          const $this = $(this)
          const langName = $this.attr('data-language') !== undefined ? $this.attr('data-language') : 'Code'
          const highlightLangEle = `<div class="code-lang">${langName}</div>`
          $this.wrap('<figure class="highlight"></figure>').before(`<div class="highlight-tools ${highlightShrinkClass}">${highlightShrinkEle + highlightLangEle + highlightCopyEle}</div>`)
        })
      } else {
        $figureHighlight.each(function (i, o) {
          const $this = $(this)
          let langName = $this.attr('class').split(' ')[1]
          if (langName === 'plain' || langName === undefined) langName = 'Code'
          const highlightLangEle = `<div class="code-lang">${langName}</div>`
          $this.prepend(`<div class="highlight-tools ${highlightShrinkClass}">${highlightShrinkEle + highlightLangEle + highlightCopyEle}</div>`)
        })
      }
    } else {
      const ele = `<div class="highlight-tools ${highlightShrinkClass}">${highlightShrinkEle + highlightCopyEle}</div>`
      if (isPrismjs) $figureHighlight.wrap('<figure class="highlight"></figure>').before(ele)
      else $figureHighlight.prepend(ele)
    }

    /**
     * 代碼收縮
     */

    if (isHighlightShrink !== undefined) {
      $('.highlight-tools >.expand').on('click', function () {
        const $this = $(this)
        const $table = $this.parent().nextAll()
        $this.toggleClass('closed')
        $table.is(':visible') ? $table.css('display', 'none') : $table.css('display', 'block')
      })
    }

    /**
     * 代碼copy
     */
    if (isHighlightCopy) {
      const copy = function (text, ctx) {
        if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
          document.execCommand('copy')
          if (GLOBAL_CONFIG.Snackbar !== undefined) {
            snackbarShow(GLOBAL_CONFIG.copy.success)
          } else {
            $(ctx).prev('.copy-notice')
              .text(GLOBAL_CONFIG.copy.success)
              .animate({
                opacity: 1
              }, 450, function () {
                setTimeout(function () {
                  $(ctx).prev('.copy-notice').animate({
                    opacity: 0
                  }, 650)
                }, 400)
              })
          }
        } else {
          if (GLOBAL_CONFIG.Snackbar !== undefined) {
            snackbarShow(GLOBAL_CONFIG.copy.noSupport)
          } else {
            $(ctx).prev('.copy-notice').text(GLOBAL_CONFIG.copy.noSupport)
          }
        }
      }

      // click events
      $('.highlight-tools >.copy-button').on('click', function () {
        const $buttonParent = $(this).parents('figure.highlight')
        $buttonParent.addClass('copy-true')
        const selection = window.getSelection()
        const range = document.createRange()
        if (isPrismjs) range.selectNodeContents($buttonParent.find('> pre code')[0])
        else range.selectNodeContents($buttonParent.find('table .code pre')[0])
        selection.removeAllRanges()
        selection.addRange(range)
        const text = selection.toString()
        copy(text, this)
        selection.removeAllRanges()
        $buttonParent.removeClass('copy-true')
      })
    }
  }
}

/**
 * PhotoFigcaption
 */
function addPhotoFigcaption () {
  const images = $('#article-container img').not('.justified-gallery img')
  images.each(function (i, o) {
    const $this = $(o)
    if ($this.attr('alt')) {
      const t = $('<div class="img-alt is-center">' + $this.attr('alt') + '</div>')
      $this.after(t)
    }
  })
}

/**
 * justified-gallery 圖庫排版
 */

let detectJgJsLoad = false
const runJustifiedGallery = function () {
  const $justifiedGallery = $('.justified-gallery')
  if ($justifiedGallery.length) {
    const $imgList = $justifiedGallery.find('img')
    $imgList.unwrap()
    if ($imgList.length) {
      $imgList.each(function (i, o) {
        if ($(o).attr('data-lazy-src')) $(o).attr('src', $(o).attr('data-lazy-src'))
        $(o).wrap('<div></div>')
      })
    }

    if (detectJgJsLoad) initJustifiedGallery($justifiedGallery)
    else {
      $('head').append(`<link rel="stylesheet" type="text/css" href="${GLOBAL_CONFIG.justifiedGallery.css}">`)
      $.getScript(`${GLOBAL_CONFIG.justifiedGallery.js}`, function () {
        initJustifiedGallery($justifiedGallery)
      })
      detectJgJsLoad = true
    }
  }
}

/**
 * fancybox和 mediumZoom
 */
const addLightBox = function () {
  const isMediumZoom = GLOBAL_CONFIG.medium_zoom
  const isFancybox = GLOBAL_CONFIG.fancybox
  if (isFancybox) {
    const images = $('#article-container img:not(.gallery-group-img)').not($('a>img'))
    images.each(function (i, o) {
      const lazyloadSrc = $(o).attr('data-lazy-src') ? $(o).attr('data-lazy-src') : $(o).attr('src')
      const dataCaption = $(o).attr('alt') ? $(o).attr('alt') : ''
      $(o).wrap(`<a href="${lazyloadSrc}" data-fancybox="group" data-caption="${dataCaption}" class="fancybox"></a>`)
    })

    $().fancybox({
      selector: '[data-fancybox]',
      loop: true,
      transitionEffect: 'slide',
      protect: true,
      buttons: ['slideShow', 'fullScreen', 'thumbs', 'close'],
      hash: false
    })
  } else if (isMediumZoom) {
    const zoom = mediumZoom(document.querySelectorAll('#article-container :not(a)>img'))
    zoom.on('open', function (event) {
      const photoBg = $(document.documentElement).attr('data-theme') === 'dark' ? '#121212' : '#fff'
      zoom.update({
        background: photoBg
      })
    })
  }
}

/**
 * 滾動處理
 */
const scrollFn = function () {
  let initTop = 0
  let isChatShow = true
  const $rightside = $('#rightside')
  const $nav = $('#nav')
  const isChatBtnHide = typeof chatBtnHide === 'function'
  const isChatBtnShow = typeof chatBtnShow === 'function'
  $(window).scroll(throttle(function (event) {
    const currentTop = $(this).scrollTop()
    const isDown = scrollDirection(currentTop)
    if (currentTop > 56) {
      if (isDown) {
        if ($nav.hasClass('visible')) $nav.removeClass('visible')
        if (isChatBtnShow && isChatShow === true) {
          chatBtnHide()
          isChatShow = false
        }
      } else {
        if (!$nav.hasClass('visible')) $nav.addClass('visible')
        if (isChatBtnHide && isChatShow === false) {
          window.chatBtnShow()
          isChatShow = true
        }
      }
      $nav.addClass('fixed')
      if ($rightside.css('opacity') === '0') {
        $rightside.css({ opacity: '1', transform: 'translateX(-38px)' })
      }
    } else {
      if (currentTop === 0) {
        $nav.removeClass('fixed').removeClass('visible')
      }
      $rightside.css({ opacity: '', transform: '' })
    }
  }, 200))

  // find the scroll direction
  function scrollDirection (currentTop) {
    const result = currentTop > initTop // true is down & false is up
    initTop = currentTop
    return result
  }
}

/**
 *  toc
 */
const tocFn = function () {
  $('.toc-child').hide()

  // main of scroll
  $(window).scroll(throttle(function (event) {
    const currentTop = $(this).scrollTop()
    scrollPercent(currentTop)
    findHeadPosition(currentTop)
    autoScrollToc(currentTop)
  }, 100))

  // expand toc-item
  const expandToc = function ($item) {
    if ($item.is(':visible')) {
      return
    }
    $item.fadeIn(400)
  }

  const scrollPercent = function (currentTop) {
    const docHeight = $('#article-container').height()
    const winHeight = $(window).height()
    const contentMath = (docHeight > winHeight) ? (docHeight - winHeight) : ($(document).height() - winHeight)
    const scrollPercent = (currentTop) / (contentMath)
    const scrollPercentRounded = Math.round(scrollPercent * 100)
    const percentage = (scrollPercentRounded > 100) ? 100
      : (scrollPercentRounded <= 0) ? 0
        : scrollPercentRounded
    $('.progress-num').text(percentage)
    $('.sidebar-toc__progress-bar').animate({
      width: percentage + '%'
    }, 100)
  }

  // anchor
  const isAnchor = GLOBAL_CONFIG.isanchor
  const updateAnchor = function (anchor) {
    if (window.history.replaceState && anchor !== window.location.hash) {
      window.history.replaceState(undefined, undefined, anchor)
    }
  }

  // find head position & add active class
  // DOM Hierarchy:
  // ol.toc > (li.toc-item, ...)
  // li.toc-item > (a.toc-link, ol.toc-2child > (li.toc-item, ...))
  const versionBiggerFive = GLOBAL_CONFIG.hexoversion.split('.')[0] >= 5
  const findHeadPosition = function (top) {
    // assume that we are not in the post page if no TOC link be found,
    // thus no need to update the status
    if ($('.toc-link').length === 0) {
      return false
    }

    const list = $('#article-container').find('h1,h2,h3,h4,h5,h6')
    let currentId = ''
    list.each(function () {
      const head = $(this)
      if (top > head.offset().top - 70) {
        if (versionBiggerFive) currentId = '#' + encodeURI($(this).attr('id'))
        else currentId = '#' + $(this).attr('id')
      }
    })

    if (currentId === '') {
      $('.toc-link').removeClass('active')
      $('.toc-child').hide()
    }

    const currentActive = $('.toc-link.active')
    if (currentId && currentActive.attr('href') !== currentId) {
      if (isAnchor) updateAnchor(currentId)

      $('.toc-link').removeClass('active')

      const _this = $('.toc-link[href="' + currentId + '"]')
      _this.addClass('active')

      const parents = _this.parents('.toc-child')
      // Returned list is in reverse order of the DOM elements
      // Thus `parents.last()` is the outermost .toc-child container
      // i.e. list of subsections
      const topLink = (parents.length > 0) ? parents.last() : _this
      expandToc(topLink.closest('.toc-item').find('.toc-child'))
      topLink
        // Find all top-level .toc-item containers, i.e. sections
        // excluding the currently active one
        .closest('.toc-item').siblings('.toc-item')
        // Hide their respective list of subsections
        .find('.toc-child').hide()
    }
  }

  const autoScrollToc = function (currentTop) {
    if ($('.toc-link').hasClass('active')) {
      const activePosition = $('.active').offset().top
      const sidebarScrollTop = $('#sidebar .sidebar-toc__content').scrollTop()
      if (activePosition > (currentTop + $(window).height() - 100)) {
        $('#sidebar .sidebar-toc__content').scrollTop(sidebarScrollTop + 100)
      }
      if (activePosition < currentTop + 100) {
        $('#sidebar .sidebar-toc__content').scrollTop(sidebarScrollTop - 100)
      }
    }
  }
}

/**
 * Rightside
 */

const $rightsideEle = $('#rightside')

// read-mode
$rightsideEle.on('click', '#readmode', function () {
  $('body').toggleClass('read-mode')
})

// Switch Between Light And Dark Mode
if ($('#darkmode').length) {
  const switchReadMode = function () {
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
      activateDarkMode()
      saveToLocal.set('theme', 'dark', 2)
      GLOBAL_CONFIG.Snackbar !== undefined && snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    } else {
      activateLightMode()
      saveToLocal.set('theme', 'light', 2)
      GLOBAL_CONFIG.Snackbar !== undefined && snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    }
  }

  $rightsideEle.on('click', '#darkmode', () => {
    switchReadMode()
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && $('#disqus_thread').children().length && setTimeout(() => window.disqusReset(), 200)
  })
}

// rightside 點擊設置 按鈕 展開
$rightsideEle.on('click', '#rightside_config', () => $('#rightside-config-hide').toggleClass('show'))

// Back to top
$rightsideEle.on('click', '#go-up', () => scrollToDest('body'))

/**
 * menu
 * 側邊欄sub-menu 展開/收縮
 * 解決menus在觸摸屏下，滑動屏幕menus_item_child不消失的問題（手機hover的bug)
 */
const clickFnOfSubMenu = function () {
  $('#mobile-sidebar-menus .expand').on('click', function () {
    $(this).parents('.menus_item').find('> .menus_item_child').slideToggle()
    $(this).toggleClass('hide')
  })

  $(window).on('touchmove', function (e) {
    const $menusChild = $('#nav .menus_item_child')
    if ($menusChild.is(':visible')) {
      $menusChild.css('display', 'none')
    }
  })
}

/**
 * 複製時加上版權信息
 */
const addCopyright = () => {
  const copyright = GLOBAL_CONFIG.copyright
  document.body.oncopy = (e) => {
    e.preventDefault()
    let textFont; const copyFont = window.getSelection(0).toString()
    if (copyFont.length > copyright.limitCount) {
      textFont = copyFont + '\n' + '\n' + '\n' +
        copyright.languages.author + '\n' +
        copyright.languages.link + window.location.href + '\n' +
        copyright.languages.source + '\n' +
        copyright.languages.info
    } else {
      textFont = copyFont
    }
    if (e.clipboardData) {
      return e.clipboardData.setData('text', textFont)
    } else {
      return window.clipboardData.setData('text', textFont)
    }
  }
}

/**
 * 網頁運行時間
 */
const addRuntime = () => {
  const $runtimeCount = $('#webinfo-runtime-count')
  if ($runtimeCount.length) {
    const publishDate = $runtimeCount.attr('publish_date')
    $runtimeCount.text(diffDate(publishDate) + ' ' + GLOBAL_CONFIG.runtime)
  }
}

/**
 * 最後一次更新時間
 */
const addLastPushDate = () => {
  const $lastPushDateItem = $('.webinfo-last-push-date')
  if ($lastPushDateItem.length) {
    const lastPushDate = $lastPushDateItem.attr('last-push-date')
    const diffDay = diffDate(lastPushDate)
    if (diffDay > 365) {
      $lastPushDateItem.text(lastPushDate)
    } else {
      $lastPushDateItem.text(diffDay + ' ' + GLOBAL_CONFIG.last_push_date)
    }
  }
}

/**
 * table overflow
 */
const addTableWrap = function () {
  const $table = $('#article-container table').not($('figure.highlight > table'))
  $table.each(function () {
    $(this).wrap('<div class="table-wrap"></div>')
  })
}

/**
 * 百度推送
 */
const pushToBaidu = () => {
  const bp = document.createElement('script')
  const curProtocol = window.location.protocol.split(':')[0]
  if (curProtocol === 'https') {
    bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
  } else {
    bp.src = 'http://push.zhanzhang.baidu.com/push.js'
  }
  bp.dataset.pjax = ''
  const s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(bp, s)
}

/**
 * tag-hide
 */
const clickFnOfTagHide = function () {
  const $hideInline = $('.hide-button')
  if ($hideInline.length) {
    $hideInline.on('click', function (e) {
      const $this = $(this)
      const $hideContent = $(this).next('.hide-content')
      $this.toggleClass('open')
      $hideContent.toggle()
      if ($this.hasClass('open')) {
        if ($hideContent.find('.justified-gallery').length > 0) {
          initJustifiedGallery($hideContent.find('.justified-gallery'))
        }
      }
    })
  }
}

const tabsFn = {
  clickFnOfTabs: function () {
    const $tab = $('#article-container .tabs')
    $tab.find('.tab > button:not(.tab-to-top)').on('click', function (e) {
      const $this = $(this)
      const $tabItem = $this.parent()

      if (!$tabItem.hasClass('active')) {
        const $tabContent = $this.parents('.nav-tabs').next()
        $tabItem.siblings('.active').removeClass('active')
        $tabItem.addClass('active')
        const tabId = $this.attr('data-href')
        $tabContent.find('> .tab-item-content').removeClass('active')
        $tabContent.find(`> ${tabId}`).addClass('active')
        const $isTabJustifiedGallery = $tabContent.find(tabId).find('.justified-gallery')
        if ($isTabJustifiedGallery.length > 0) {
          initJustifiedGallery($isTabJustifiedGallery)
        }
      }
    })
  },
  backToTop: () => {
    const backToTopBtn = $('#article-container .tabs .tab-to-top')
    backToTopBtn.on('click', function () {
      scrollToDest($(this).parents('.tabs'))
    })
  }
}

const toggleCardCategory = function () {
  const $cardCategory = $('.card-category-list-item.parent i')
  $cardCategory.on('click', function (e) {
    e.preventDefault()
    const $this = $(this)
    $this.toggleClass('expand')
    $this.parents('.parent').next().toggle()
  })
}

const switchComments = function () {
  let switchDone = false
  $('#switch-comments-btn').on('click', function () {
    $('#post-comment > .comment-wrap > div').each(function () {
      if ($(this).is(':visible')) {
        $(this).hide()
      } else {
        $(this).css({
          display: 'block',
          animation: 'tabshow .5s'
        })
      }
    })
    if (!switchDone && typeof loadOtherComment === 'function') {
      switchDone = true
      loadOtherComment()
    }
  })
}

const addPostOutdateNotice = function () {
  const data = GLOBAL_CONFIG.noticeOutdate
  var diffDay = diffDate(GLOBAL_CONFIG_SITE.postUpdate)
  if (diffDay >= data.limitDay) {
    const code = `<div class="post-outdate-notice">${data.messagePrev + ' ' + diffDay + ' ' + data.messageNext}</div>`
    if (data.position === 'top') {
      $('#article-container').prepend(code)
    } else {
      $('#article-container').append(code)
    }
  }
}

/**
 * lazyload
 */

if (GLOBAL_CONFIG.islazyload) {
  window.lazyLoadOptions = {
    elements_selector: 'img',
    threshold: 0,
    data_src: 'lazy-src'
  }
  window.addEventListener(
    'LazyLoad::Initialized',
    function (event) {
      window.lazyLoadInstance = event.detail.instance
    },
    false
  )
}

const unRefreshFn = function () {
  $(window).on('resize', function () {
    if (window.innerWidth < 768) adjustMenu(0)
    else if ($('#sidebar').hasClass('tocOpenPc') && $('#nav').hasClass('fixed')) adjustMenu(1)
    else adjustMenu(2)
  })

  clickFnOfSubMenu()
  GLOBAL_CONFIG.copyright !== undefined && addCopyright()
  GLOBAL_CONFIG.baiduPush && pushToBaidu()
}

const refreshFn = function () {
  initAdjust()

  if (GLOBAL_CONFIG_SITE.isPost) {
    OpenSidebarAuto()
    toggleSidebar()
    GLOBAL_CONFIG_SITE.isSidebar && tocFn()
    GLOBAL_CONFIG.noticeOutdate !== undefined && addPostOutdateNotice()
  }

  sidebarFn()
  GLOBAL_CONFIG_SITE.isHome && scrollDownInIndex()
  GLOBAL_CONFIG.highlight && addHighlightTool()
  GLOBAL_CONFIG.isPhotoFigcaption && addPhotoFigcaption()
  runJustifiedGallery()
  addLightBox()
  scrollFn()
  GLOBAL_CONFIG.runtime && addRuntime()
  GLOBAL_CONFIG.last_push_date && addLastPushDate()
  addTableWrap()
  clickFnOfTagHide()
  tabsFn.clickFnOfTabs()
  tabsFn.backToTop()
  toggleCardCategory()
  switchComments()
}

$(function () {
  refreshFn()
  unRefreshFn()
})
