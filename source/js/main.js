$(function () {
  const isSnackbar = GLOBAL_CONFIG.Snackbar !== undefined
  const isTocContent = $('#sidebar .sidebar-toc__content').children().length > 0
  /**
   * 當menu過多時，自動適配，避免UI錯亂
   */
  const searchWidth = $('#search_button').outerWidth() !== undefined ? $('#search_button').outerWidth() : 0
  const blogNameWidth = $('#blog_name').width()

  var mw = 0
  for (var i = 0; i < $('#page-header .menus_item').length; i++) {
    mw = mw + $('#page-header .menus_item').eq(i).outerWidth()
  }

  /**
   * 傳入 1 sidebar打開時
   * 傳入 2 正常狀態下
   * 傳入 3 resize時使用
   */
  function isAdjust (n) {
    var t
    if (n === 1) {
      t = blogNameWidth + searchWidth + mw > $('#page-header').width() - 300
    } else if (n === 2) {
      t = blogNameWidth + searchWidth + mw > $('#page-header').width()
    }

    if (t) {
      headerAdjust()
    } else {
      headerAdjustBack()
    }
  }

  // 初始化header
  isAdjust(2)
  $('#page-header').css({ opacity: '1', animation: 'headerNoOpacity 1s' })

  function headerAdjust () {
    $('#page-header .toggle-menu').addClass('is_visible')
    $('#page-header .menus,.search span').addClass('is_invisible')
  }

  function headerAdjustBack () {
    $('#page-header .toggle-menu').removeClass('is_visible')
    $('#page-header .menus,.search span').removeClass('is_invisible')
  }

  $(window).bind('resize', function () {
    if (window.innerWidth > 768) {
      isAdjust(2)
    } else {
      headerAdjust()
    }
  })

  /**
   * pc時 設置主頁top_img 為 fixed
   */
  if (GLOBAL_CONFIG.isHome) {
    if (/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {} else {
      $('.full_page').css('background-attachment', 'fixed')
    }
  }

  /**
   * 進入post頁sidebar處理
   */
  if (GLOBAL_CONFIG.isPost) {
    // sidebar 自動打開
    if ($('#sidebar').hasClass('auto_open') && isTocContent) {
      $('#toggle-sidebar').addClass('on')
      setTimeout(function () {
        $('#toggle-sidebar').addClass('on')
        openSidebar()
      }, 400)
      isAdjust(1)
    }

    // pc隱藏
    if (isTocContent) {
      $('#toggle-sidebar').css('opacity', '1')
    } else {
      $('#sidebar,#toggle-sidebar').css('display', 'none')
    }
    // mobile隱藏
    if ($('#mobile-sidebar-toc .sidebar-toc__content').children().length === 0) {
      $('#mobile-sidebar-toc,#mobile-toc-button').css('display', 'none')
    }
  }

  /**
   * 點擊左下角箭頭,顯示sidebar
   */

  function closeSidebar () {
    $('#page-header').removeClass('open-sidebar')
    $('body').animate({
      paddingLeft: 0
    }, 400)
    $('#sidebar').css('transform', 'translateX(0px)')
    $('#toggle-sidebar').css({
      transform: 'rotateZ(0deg)',
      color: '#1F2D3D',
      opacity: '1'
    })
  }

  function openSidebar () {
    $('#page-header').addClass('open-sidebar')
    $('body').animate({
      paddingLeft: 300
    }, 400)
    $('#sidebar').css('transform', 'translateX(300px)')
    $('#toggle-sidebar').css({
      transform: 'rotateZ(180deg)',
      color: '#99a9bf',
      opacity: '1'
    })
  }

  $('#toggle-sidebar').on('click', function () {
    if (!isMobile() && $('#sidebar').is(':visible')) {
      var isOpen = $(this).hasClass('on')
      isOpen ? $(this).removeClass('on') : $(this).addClass('on')
      if (isOpen) {
        closeSidebar()
        setTimeout(function () {
          isAdjust(2)
        }, 500)
      } else {
        isAdjust(1)
        openSidebar()
      }
    }
  })

  /**
   * 首頁top_img底下的箭頭
   */
  $('.scroll-down').on('click', function () {
    scrollTo('#content-outer')
  })

  /**
   * BOOKMARK 書簽
   */
  $('#bookmark-it').on('click', function () {
    if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
      window.sidebar.addPanel(document.title, window.location.href, '')
    } else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite
      window.external.AddFavorite(location.href, document.title)
    } else if (window.opera && window.print) { // Opera Hotlist
      this.title = document.title
      return true
    } else { // webkit - safari/chrome
      if (isSnackbar) {
        var bookmarkText = GLOBAL_CONFIG.Snackbar.bookmark.message_prev + ' ' + (navigator.userAgent.toLowerCase().indexOf('mac') !== -1 ? 'Command/Cmd' : 'CTRL') + '+ D ' + GLOBAL_CONFIG.Snackbar.bookmark.message_next + '.'
        snackbarShow(bookmarkText)
      } else {
        alert(GLOBAL_CONFIG.bookmark.message_prev + ' ' + (navigator.userAgent.toLowerCase().indexOf('mac') !== -1 ? 'Command/Cmd' : 'CTRL') + '+ D ' + GLOBAL_CONFIG.bookmark.message_next + '.')
      }
    }
  })

  /**
   * 代碼copy
   * copy function
   */

  function copy (text, ctx) {
    if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
      try {
        document.execCommand('copy') // Security exception may be thrown by some browsers.
        if (isSnackbar) {
          snackbarShow(GLOBAL_CONFIG.copy.success)
        } else {
          $(ctx).prev('.copy-notice')
            .text(GLOBAL_CONFIG.copy.success)
            .animate({
              opacity: 1,
              right: 30
            }, 450, function () {
              setTimeout(function () {
                $(ctx).prev('.copy-notice').animate({
                  opacity: 0,
                  right: 0
                }, 650)
              }, 400)
            })
        }
      } catch (ex) {
        if (isSnackbar) {
          snackbarShow(GLOBAL_CONFIG.copy.success)
        } else {
          $(ctx).prev('.copy-notice')
            .text(GLOBAL_CONFIG.copy.error)
            .animate({
              opacity: 1,
              right: 30
            }, 650, function () {
              setTimeout(function () {
                $(ctx).prev('.copy-notice').animate({
                  opacity: 0,
                  right: 0
                }, 650)
              }, 400)
            })
          return false
        }
      }
    } else {
      if (isSnackbar) {
        snackbarShow(GLOBAL_CONFIG.copy.noSupport)
      } else {
        $(ctx).prev('.copy-notice').text(GLOBAL_CONFIG.copy.noSupport)
      }
    }
  }
  // click events
  $(document).on('click', '.code-area-wrap .fa-clipboard', function () {
    var selection = window.getSelection()
    var range = document.createRange()
    range.selectNodeContents($(this).parent().siblings('figure').find('.code pre')[0])
    selection.removeAllRanges()
    selection.addRange(range)
    var text = selection.toString()
    copy(text, this)
    selection.removeAllRanges()
  })

  /**
   * 代碼收縮
   */
  $(document).on('click', '.code-area-wrap .code-expand', function () {
    var $figure = $(this).parent().next()
    if ($(this).hasClass('code-closed')) {
      $figure.slideDown(300)
      $(this).removeClass('code-closed')
    } else {
      $figure.slideUp(300)
      $(this).addClass('code-closed')
    }
  })

  /**
   * fancybox和 mediumZoom
   */

  var isMediumZoom = GLOBAL_CONFIG.medium_zoom
  var isFancybox = GLOBAL_CONFIG.fancybox
  if (isFancybox) {
    $().fancybox({
      selector: '[data-fancybox]',
      loop: true,
      transitionEffect: 'slide',
      protect: true,
      buttons: ['slideShow', 'fullScreen', 'thumbs', 'close']
    })
  } else if (isMediumZoom) {
    const zoom = mediumZoom(document.querySelectorAll(':not(a)>img'))
    zoom.on('open', event => {
      const photoBg = $(document.documentElement).attr('data-theme') === 'dark' ? '#121212' : '#fff'
      zoom.update({
        background: photoBg
      })
    })
  }

  /**
   * 手機menu和toc按鈕點擊
   * 顯示menu和toc的sidebar
   */
  function openMobileSidebar (name) {
    $('body').css('overflow', 'hidden')
    $('#body-wrap').css('transform', 'translateX(-250px)')
    $('#page-header').css('transform', 'translateX(-250px)')
    $('#page-header.fixed.visible').css('transform', 'translate3d(-250px, 100%, 0)')
    $('#rightside').css('transform', 'translateX(-288px)')
    $('#menu_mask').fadeIn()

    if (name === 'menu') {
      $('.toggle-menu').removeClass('close').addClass('open')
      $('#mobile-sidebar-menus').css({ transform: 'translateX(-254px)' })
    }

    if (name === 'toc') {
      $('#mobile-toc-button').removeClass('close').addClass('open')
      $('#mobile-sidebar-toc').css('transform', 'translateX(-254px)')
    }
  }

  function closeMobileSidebar (name) {
    $('body').css('overflow', '')
    $('#body-wrap').css('transform', '')
    $('#page-header').css('transform', '')
    $('#page-header.fixed.visible').css('transform', '')
    $('#rightside').css('transform', 'translateX(-38px)')
    $('#menu_mask').fadeOut()

    if (name === 'menu') {
      $('.toggle-menu').removeClass('open').addClass('close')
      $('#mobile-sidebar-menus').css({ transform: 'translateX(0)' })
    }

    if (name === 'toc') {
      $('#mobile-toc-button').removeClass('open').addClass('close')
      $('#mobile-sidebar-toc').css('transform', '')
    }
  }

  $('.toggle-menu').on('click', function () {
    if ($('.toggle-menu').hasClass('close')) {
      openMobileSidebar('menu')
      if ($('#toggle-sidebar').hasClass('on')) {
        $('body').css('padding-left', '0')
        $('#sidebar').css('transform', '')
      }
    }
  })

  $('#mobile-toc-button').on('click', function () {
    if ($('#mobile-toc-button').hasClass('close')) openMobileSidebar('toc')
  })

  $('#menu_mask').on('click touchstart', function (e) {
    if ($('.toggle-menu').hasClass('open')) {
      closeMobileSidebar('menu')
      if ($('#toggle-sidebar').hasClass('on')) {
        setTimeout(function () {
          openSidebar()
        }, 600)
      }
    }
    if ($('#mobile-toc-button').hasClass('open')) {
      closeMobileSidebar('toc')
    }
  })

  $(window).on('resize', function (e) {
    if (!$('.toggle-menu').is(':visible')) {
      if ($('.toggle-menu').hasClass('open')) closeMobileSidebar('menu')
    }
    if (!$('#mobile-toc-button').is(':visible')) {
      if ($('#mobile-toc-button').hasClass('open')) closeMobileSidebar('toc')
    }
  })

  // 點擊toc，收起sidebar
  $('#mobile-sidebar-toc a').on('click', function () {
    closeMobileSidebar('toc')
  })

  /**
   *  scroll 滚动 toc
   */
  var initTop = 0
  $('.toc-child').hide()

  // main of scroll
  $(window).scroll(throttle(function (event) {
    var currentTop = $(this).scrollTop()
    if (!isMobile() && isTocContent) {
      // percentage inspired by hexo-theme-next
      scrollPercent(currentTop)
      // head position
      findHeadPosition(currentTop)
      autoScrollToc(currentTop)
    }
    var isUp = scrollDirection(currentTop)

    if (currentTop > 56) {
      if (isUp) {
        if ($('#page-header').hasClass('visible')) $('#page-header').removeClass('visible')
      } else {
        if (!$('#page-header').hasClass('visible')) $('#page-header').addClass('visible')
      }
      $('#page-header').addClass('fixed')

      if ($('#rightside').css('opacity') === '0') {
        $('#rightside').animate({}, function () {
          $(this).css({
            opacity: '1',
            transform: 'translateX(-38px)'
          })
        })
      }
    } else {
      if (currentTop === 0) {
        $('#page-header').removeClass('fixed').removeClass('visible')
      }

      $('#rightside').animate({}, function () {
        $('#rightside').css({
          opacity: '',
          transform: ''
        })
      })
    }
  }, 300))

  // go up smooth scroll
  $('#go-up').on('click', function () {
    scrollTo('body')
  })

  // head scroll
  // $('#post-content').find('h1,h2,h3,h4,h5,h6').on('click', function (e) {
  //   scrollToHead('#' + $(this).attr('id'))
  // })

  // head scroll
  $('.toc-link').on('click', function (e) {
    e.preventDefault()
    scrollToHead($(this).attr('href'))
  })

  // find the scroll direction
  function scrollDirection (currentTop) {
    var result = currentTop > initTop // true is down & false is up
    initTop = currentTop
    return result
  }

  // scroll to a head(anchor)
  function scrollToHead (anchor) {
    scrollTo(anchor)
  }

  // expand toc-item
  function expandToc ($item) {
    if ($item.is(':visible')) {
      return
    }
    $item.fadeIn(400)
  }

  function scrollPercent (currentTop) {
    var docHeight = $('#content-outer').height()
    var winHeight = $(window).height()
    var contentMath = (docHeight > winHeight) ? (docHeight - winHeight) : ($(document).height() - winHeight)
    var scrollPercent = (currentTop) / (contentMath)
    var scrollPercentRounded = Math.round(scrollPercent * 100)
    var percentage = (scrollPercentRounded > 100) ? 100 : scrollPercentRounded
    $('.progress-num').text(percentage)
    $('.sidebar-toc__progress-bar').animate({
      width: percentage + '%'
    }, 100)
  }

  function updateAnchor (anchor) {
    if (window.history.replaceState && anchor !== window.location.hash) {
      window.history.replaceState(undefined, undefined, anchor)
    }
  }

  // find head position & add active class
  // DOM Hierarchy:
  // ol.toc > (li.toc-item, ...)
  // li.toc-item > (a.toc-link, ol.toc-child > (li.toc-item, ...))
  function findHeadPosition (top) {
    // assume that we are not in the post page if no TOC link be found,
    // thus no need to update the status
    if ($('.toc-link').length === 0) {
      return false
    }

    var list = $('#post-content').find('h1,h2,h3,h4,h5,h6')
    var currentId = ''
    list.each(function () {
      var head = $(this)
      if (top > head.offset().top - 25) {
        currentId = '#' + $(this).attr('id')
      }
    })

    if (currentId === '') {
      $('.toc-link').removeClass('active')
      $('.toc-child').hide()
    }

    var currentActive = $('.toc-link.active')
    if (currentId && currentActive.attr('href') !== currentId) {
      updateAnchor(currentId)

      $('.toc-link').removeClass('active')
      var _this = $('.toc-link[href="' + currentId + '"]')
      _this.addClass('active')

      var parents = _this.parents('.toc-child')
      // Returned list is in reverse order of the DOM elements
      // Thus `parents.last()` is the outermost .toc-child container
      // i.e. list of subsections
      var topLink = (parents.length > 0) ? parents.last() : _this
      expandToc(topLink.closest('.toc-item').find('.toc-child'))
      topLink
        // Find all top-level .toc-item containers, i.e. sections
        // excluding the currently active one
        .closest('.toc-item').siblings('.toc-item')
        // Hide their respective list of subsections
        .find('.toc-child').hide()
    }
  }

  function autoScrollToc (currentTop) {
    if ($('.toc-link').hasClass('active')) {
      var activePosition = $('.active').offset().top
      var sidebarScrolltop = $('#sidebar').scrollTop()
      if (activePosition > (currentTop + $(window).height() - 50)) {
        $('#sidebar').scrollTop(sidebarScrolltop + 100)
      } else if (activePosition < currentTop + 50) {
        $('#sidebar').scrollTop(sidebarScrolltop - 100)
      }
    }
  }

  /**
   * 閲讀模式
   */
  $('#readmode').click(function () {
    var isDark = $(document.documentElement).attr('data-theme') === 'dark'
    var isNull = $(document.documentElement).attr('data-theme') === ''
    $('body').toggleClass('read-mode')
    $('#to_comment').toggleClass('is_invisible')
    if (isNull) $(document.documentElement).attr('data-theme', 'dark')
    if (isDark) $(document.documentElement).attr('data-theme', '')
  })

  /**
   * 字體調整
   */

  function fontAdjust (name) {
    var fontSizeRecord = parseFloat($('body').css('font-size'))
    var preSizeRecord = parseFloat($('pre').css('font-size'))
    var codeSizeRecord = parseFloat($('code').css('font-size'))
    if (name === 'plus') {
      $('body').css('font-size', fontSizeRecord + 1)
      $('pre').css('font-size', preSizeRecord + 1)
      $('code').css('font-size', codeSizeRecord + 1)
    } else {
      $('body').css('font-size', fontSizeRecord - 1)
      $('pre').css('font-size', preSizeRecord - 1)
      $('code').css('font-size', codeSizeRecord - 1)
    }
  }

  $('#font_plus').click(function () {
    fontAdjust('plus')
  })

  $('#font_minus').click(function () {
    fontAdjust('minus')
  })

  /**
   * 手機端sub-menu 展開/收縮
   */
  $('.menus-expand').on('click', function () {
    if ($(this).hasClass('menus-closed')) {
      $(this).parents('.menus_item').find('.menus_item_child').slideDown()
      $(this).removeClass('menus-closed')
    } else {
      $(this).parents('.menus_item').find('.menus_item_child').slideUp()
      $(this).addClass('menus-closed')
    }
  })

  /**
   * rightside 點擊設置 按鈕 展開
   */
  $('#rightside_config').on('click', function () {
    if ($('#rightside-config-hide').hasClass('rightside-in')) {
      $('#rightside-config-hide').removeClass('rightside-in').addClass('rightside-out')
    } else {
      $('#rightside-config-hide').removeClass('rightside-out').addClass('rightside-in')
    }
  })

  /**
   * 複製時加上版權信息
   */
  var copyright = GLOBAL_CONFIG.copyright
  if (copyright !== undefined) {
    document.body.oncopy = event => {
      event.preventDefault()
      let textFont; const copyFont = window.getSelection(0).toString()
      if (copyFont.length > 45) {
        textFont = copyFont + '\n' + '\n' + '\n' +
          copyright.languages.author + '\n' +
          copyright.languages.link + '\n' +
          copyright.languages.source + '\n' +
          copyright.languages.info
      } else {
        textFont = copyFont
      }
      if (event.clipboardData) {
        return event.clipboardData.setData('text', textFont)
      } else {
        // 兼容IE
        return window.clipboardData.setData('text', textFont)
      }
    }
  }

  /**
   * justified-gallery 圖庫排版
   */

  if ($('.justified-gallery').length) {
    $('.justified-gallery > p > .fancybox').unwrap()
    $('head').append('<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/justifiedGallery@3.7.0/dist/css/justifiedGallery.min.css">')
    loadScript('https://cdn.jsdelivr.net/npm/justifiedGallery@3.7.0/dist/js/jquery.justifiedGallery.min.js', function () {
      if (typeof ($.fn.justifiedGallery) === 'function') {
        $('.justified-gallery').justifiedGallery({
          rowHeight: 220,
          margins: 4
        })
      }
    })
  }

  /**
   * Darkmode
   */

  if (typeof autoChangeMode !== 'undefined') {
    if (autoChangeMode === '1' || autoChangeMode === '2') {
      if (Cookies.get('theme') === 'dark') {
        changeLightIcon()
      } else {
        changeDarkIcon()
      }
    }
  }

  function changeLightIcon () {
    $('#darkmode').removeClass('fa-moon-o').addClass('fa-sun-o')
  }

  function changeDarkIcon () {
    $('#darkmode').removeClass('fa-sun-o').addClass('fa-moon-o')
  }

  function switchReadMode () {
    var nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
      changeLightIcon()
      activateDarkMode()
      Cookies.set('theme', 'dark', {
        expires: 2
      })
      if (isSnackbar) snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    } else {
      changeDarkIcon()
      activateLightMode()
      Cookies.set('theme', 'light', {
        expires: 2
      })
      if (isSnackbar) snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    }
  }

  $('#darkmode').click(function () {
    switchReadMode()
  })

  /**
   * 網頁運行時間
   */
  if (GLOBAL_CONFIG.runtime) {
    // get user config
    var startDate = $('#webinfo-runtime-count').attr('start_date')
    var showDateTime = function () {
      var BirthDay = new Date(startDate)
      var today = new Date()
      var timeold = (today.getTime() - BirthDay.getTime())
      var msPerDay = 24 * 60 * 60 * 1000
      var eDaysold = timeold / msPerDay
      var daysold = Math.floor(eDaysold)
      $('.webinfo-runtime-count').text(daysold + ' ' + GLOBAL_CONFIG.runtime_unit)
    }

    var interval
    showDateTime()
    clearInterval(interval)
    interval = setInterval(showDateTime, 10000)
  }

  /**
   * 搜索
   */

  if (GLOBAL_CONFIG.localSearch === undefined && GLOBAL_CONFIG.algolia !== undefined) {
    $('a.social-icon.search').on('click', function () {
      openSearch()
      $('.ais-search-box--input').focus()
    })
    $('.search-mask, .search-close-button').on('click', closeSearch)

    var algolia = GLOBAL_CONFIG.algolia
    var isAlgoliaValid = algolia.appId && algolia.apiKey && algolia.indexName
    if (!isAlgoliaValid) {
      return console.error('Algolia setting is invalid!')
    }
    var search = instantsearch({
      appId: algolia.appId,
      apiKey: algolia.apiKey,
      indexName: algolia.indexName,
      searchParameters: {
        hitsPerPage: algolia.hits.per_page || 10
      },
      searchFunction: function (helper) {
        var searchInput = $('#algolia-search-input').find('input')

        if (searchInput.val()) {
          helper.search()
        }
      }
    })

    search.addWidget(
      instantsearch.widgets.searchBox({
        container: '#algolia-search-input',
        reset: false,
        magnifier: false,
        placeholder: GLOBAL_CONFIG.algolia.languages.input_placeholder
      })
    )
    search.addWidget(
      instantsearch.widgets.hits({
        container: '#algolia-hits',
        templates: {
          item: function (data) {
            var link = data.permalink ? data.permalink : (GLOBAL_CONFIG.root + data.path)
            return (
              '<a href="' + link + '" class="algolia-hit-item-link">' +
              data._highlightResult.title.value +
              '</a>'
            )
          },
          empty: function (data) {
            return (
              '<div id="algolia-hits-empty">' +
              GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/, data.query) +
              '</div>'
            )
          }
        },
        cssClasses: {
          item: 'algolia-hit-item'
        }
      })
    )

    search.addWidget(
      instantsearch.widgets.stats({
        container: '#algolia-stats',
        templates: {
          body: function (data) {
            var stats = GLOBAL_CONFIG.algolia.languages.hits_stats
              .replace(/\$\{hits}/, data.nbHits)
              .replace(/\$\{time}/, data.processingTimeMS)
            return (
              '<hr>' +
              stats +
              '<span class="algolia-logo pull_right">' +
              '  <img src="' + GLOBAL_CONFIG.root + 'img/algolia.svg" alt="Algolia" />' +
              '</span>'
            )
          }
        }
      })
    )

    search.addWidget(
      instantsearch.widgets.pagination({
        container: '#algolia-pagination',
        scrollTo: false,
        showFirstLast: false,
        labels: {
          first: '<i class="fa fa-angle-double-left"></i>',
          last: '<i class="fa fa-angle-double-right"></i>',
          previous: '<i class="fa fa-angle-left"></i>',
          next: '<i class="fa fa-angle-right"></i>'
        },
        cssClasses: {
          root: 'pagination',
          item: 'pagination-item',
          link: 'page-number',
          active: 'current',
          disabled: 'disabled-item'
        }
      })
    )
    search.start()
  }
  if (GLOBAL_CONFIG.localSearch !== undefined && GLOBAL_CONFIG.algolia === undefined) {
    $('a.social-icon.search').on('click', function () {
      var loadFlag = false
      openSearch()
      $('#local-search-input input').focus()
      if (!loadFlag) {
        localSearch(GLOBAL_CONFIG.localSearch.path)
        loadFlag = true
      }
    })

    $('.search-mask, .search-close-button').on('click', closeSearch)

    var localSearch = function (path) {
      $.ajax({
        url: GLOBAL_CONFIG.root + path,
        dataType: 'xml',
        success: function (xmlResponse) {
          // get the contents from search data
          var datas = $('entry', xmlResponse).map(function () {
            return {
              title: $('title', this).text(),
              content: $('content', this).text(),
              url: $('url', this).text()
            }
          }).get()
          var $input = $('#local-search-input input')[0]
          var $resultContent = $('#local-hits')[0]
          $input.addEventListener('input', function () {
            var str = '<div class="search-result-list">'
            var keywords = this.value.trim().toLowerCase().split(/[\s]+/)
            $resultContent.innerHTML = ''
            if (this.value.trim().length <= 0) {
              $('.local-search-stats__hr').hide()
              return
            }
            var count = 0
            // perform local searching
            datas.forEach(function (data) {
              var isMatch = true
              var dataTitle = data.title.trim().toLowerCase()
              var dataContent = data.content.trim().replace(/<[^>]+>/g, '').toLowerCase()
              var dataUrl = data.url
              var indexTitle = -1
              var indexContent = -1
              // only match artiles with not empty titles and contents
              if (dataTitle !== '' && dataContent !== '') {
                keywords.forEach(function (keyword, i) {
                  indexTitle = dataTitle.indexOf(keyword)
                  indexContent = dataContent.indexOf(keyword)
                  if (indexTitle < 0 && indexContent < 0) {
                    isMatch = false
                  } else {
                    if (indexContent < 0) {
                      indexContent = 0
                    }
                  }
                })
              }
              // show search results
              if (isMatch) {
                str += '<div class="local-search__hit-item"><a href="' + dataUrl + '" class="search-result-title">' + dataTitle + '</a>' + '</div>'
                count += 1
                $('.local-search-stats__hr').show()
              }
            })
            if (count === 0) {
              str += '<div id="local-search__hits-empty">' + GLOBAL_CONFIG.localSearch.languages.hits_empty.replace(/\$\{query}/, this.value.trim()) +
                '</div>'
            }
            $resultContent.innerHTML = str
          })
        }
      })
    }
  }

  function openSearch () {
    $('body').css('width', '100%')
    $('body').css('overflow', 'hidden')

    $('.search-dialog').css({
      display: 'block'
    })

    $('.search-mask').fadeIn()

    // shortcut: ESC
    document.addEventListener('keydown', function f (event) {
      if (event.code === 'Escape') {
        closeSearch()
        document.removeEventListener('keydown', f)
      }
    })
  }

  function closeSearch () {
    $('body').css('width', '')
    $('body').css('overflow', '')
    $('.search-dialog').css({
      animation: 'search_close .5s'
    })
    $('.search-dialog').animate({}, function () {
      setTimeout(function () {
        $('.search-dialog').css({
          animation: '',
          display: 'none'
        })
      }, 500)
    })

    $('.search-mask').fadeOut()
  }

  if (GLOBAL_CONFIG.baiduPush) {
    (function () {
      var bp = document.createElement('script')
      var curProtocol = window.location.protocol.split(':')[0]
      if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
      } else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js'
      }
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(bp, s)
    })()
  }
})
