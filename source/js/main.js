$(function () {

  /**
   * 進入post頁sidebar自動打開
   */
  if ($('#sidebar').hasClass('auto_open')) {
    if ($(".sidebar-toc__content").children().length > 0) {
      $(".layout_post").animate({}, function () {
        {
          setTimeout(function () {
            $('#page-header').addClass('open-sidebar')
            $("#toggle-sidebar").addClass('on')
            $('body').animate({
              paddingLeft: 300
            }, 200)

            $('#sidebar').animate({
              left: 0
            }, 200)

            $('#toggle-sidebar').animate({}, function () {
              $('#toggle-sidebar').css({
                'transform': 'rotateZ(180deg)',
                'color': '#99a9bf',
                'opacity': "1"
              })
            })

          }, 200);
        }
      })
    } else
      $("#toggle-sidebar").css("display", "none")
  } else {
    $('#toggle-sidebar').css('opacity', '1')
  }


  /**
   * 點擊左下角箭頭,顯示sidebar
   */
  $('#toggle-sidebar').on('click', function () {

    if (!isMobile() && $('#sidebar').is(':visible')) {
      var isOpen = $(this).hasClass('on')
      isOpen ? $(this).removeClass('on') : $(this).addClass('on')
      if (isOpen) {
        $('#page-header').removeClass('open-sidebar')
        $('body').animate({
          paddingLeft: 0
        }, 200)

        $('#sidebar').animate({
          left: -300
        }, 200)

        $('#toggle-sidebar').animate({}, function () {
          $('#toggle-sidebar').css({
            'transform': 'rotateZ(0deg)',
            'color': '#1F2D3D'
          })
        })

      } else {
        $('#page-header').addClass('open-sidebar')
        $('body').animate({
          paddingLeft: 300
        }, 200)

        $('#sidebar').animate({
          left: 0
        }, 200)

        $('#toggle-sidebar').animate({}, function () {
          $('#toggle-sidebar').css({
            'transform': 'rotateZ(180deg)',
            'color': '#99a9bf'
          })
        })
      }
    }
  })

  /**
   * 首頁fullpage添加
   * 添加class
   */
  if (/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {} else {
    $('.full_page .nav_bg').css('background-attachment', 'fixed');
  }

  /**
   * 首頁top_img底下的箭頭
   */
  $(".scroll-down").on("click", function () {
    scrollTo('#content-outer')
  });


  /**
   * BOOKMARK 書簽
   */
  $.fancyConfirm = function (opts) {
    opts = $.extend(true, {
      title: 'Are you sure?',
      message: '',
      okButton: 'OK',
      noButton: 'Cancel',
      callback: $.noop
    }, opts || {});

    $.fancybox.open({
      type: 'html',
      src: '<div class="fc-content">' +
        '<h3>' + opts.title + '</h3>' +
        '<p>' + opts.message + '</p>' +
        '<p class="is_right">' +
        '<button data-value="1" data-fancybox-close class="bookmark-ok">' + opts.okButton + '</button>' +
        '</p>' +
        '</div>',
      opts: {
        animationDuration: 350,
        animationEffect: 'material',
        modal: true,
        baseTpl: '<div class="fancybox-container fc-container" role="dialog" tabindex="-1">' +
          '<div class="fancybox-bg"></div>' +
          '<div class="fancybox-inner">' +
          '<div class="fancybox-stage"></div>' +
          '</div>' +
          '</div>',
      }
    });
  }

  $('#bookmark-it').click(
    function () {
      if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
        window.sidebar.addPanel(document.title, window.location.href, '');
      } else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite
        window.external.AddFavorite(location.href, document.title);
      } else if (window.opera && window.print) { // Opera Hotlist
        this.title = document.title;
        return true;
      } else { // webkit - safari/chrome
        // alert('按 ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D 鍵將本頁加入書籤.');
        $.fancyConfirm({
          title: GLOBAL_CONFIG.bookmark.title + '?',
          message: GLOBAL_CONFIG.bookmark.message_prev + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + '+ D ' + GLOBAL_CONFIG.bookmark.message_next + '.',
          okButton: "OK",
        });

      }
    });

  /**
   * 代碼copy
   * Add copy icon
   */
  $('figure.highlight').wrap('<div class="code-area-wrap"></div>')

  var highlight_copy = GLOBAL_CONFIG.highlight_copy
  if (highlight_copy == 'true') {
    var $copyIcon = $('<i class="fa fa-clipboard" aria-hidden="true"></i>')
    var $notice = $('<div class="copy-notice"></div>')
    $('.code-area-wrap').prepend($copyIcon)
    $('.code-area-wrap').prepend($notice)
    // copy function
    function copy(text, ctx) {
      if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        try {
          document.execCommand('copy') // Security exception may be thrown by some browsers.
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
        } catch (ex) {
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
      } else {
        $(ctx).prev('.copy-notice').text(GLOBAL_CONFIG.copy.noSupport)
      }
    }
    // click events
    $('.code-area-wrap .fa-clipboard').on('click', function () {
      var selection = window.getSelection()
      var range = document.createRange()
      range.selectNodeContents($(this).siblings('figure').find('.code pre')[0])
      selection.removeAllRanges()
      selection.addRange(range)
      var text = selection.toString()
      copy(text, this)
      selection.removeAllRanges()
    })
  }

  /**
   * 代碼框語言識別
   */
  var highlight_lang = GLOBAL_CONFIG.highlight_lang
  if (highlight_lang == 'true') {
    var $highlight_lang = $('<div class="code_lang"></div>')
    $('figure').before($highlight_lang)
    var lang_name_index
    var lang_name
    $('figure').each(function () {
      lang_name_index = lang_name = $(this).attr('class').split(' ')[1];
      if (lang_name_index == 'js')
        lang_name = 'javascript'
      if (lang_name_index == 'md')
        lang_name = 'markdown'
      if (lang_name_index == 'plain')
        lang_name = 'code'
      if (lang_name_index == 'py')
        lang_name = 'python'

      $(this).siblings(".code_lang").text(lang_name)

    })
  }
  /**
   * 代碼收縮
   */
  var highlight_shrink = GLOBAL_CONFIG.highlight_shrink
  if (highlight_shrink == 'true') {
    var $code_expand = $('<i class="fa fa-angle-down code-expand code-closed" aria-hidden="true"></i>')
  } else {
    var $code_expand = $('<i class="fa fa-angle-down code-expand" aria-hidden="true"></i>')
  }
  $('.code-area-wrap').prepend($code_expand)
  $('.code-area-wrap .code-expand').on('click', function () {
    if ($(this).hasClass('code-closed')) {
      $(this).siblings('figure').find('table').show();
      $(this).removeClass('code-closed');
    } else {
      $(this).siblings('figure').find('table').hide();
      $(this).addClass('code-closed');
    }
  })

  /**
   * fancybox
   */
  var imgList = $(".recent-post-info  img").not('.no-fancybox');
  if (imgList.length === 0) {
    imgList = $("#post-content img").not('.no-fancybox');
  }

  for (var i = 0; i < imgList.length; i++) {
    var lazyload_src = imgList[i].src ? imgList[i].src : imgList.eq(i).attr("data-src")

    var $a = $(
      '<a href="' +
      lazyload_src +
      '" data-fancybox="group" data-caption="' +
      imgList[i].alt +
      '" class="fancybox"></a>'
    )

    var alt = imgList[i].alt
    var $wrap = $(imgList[i]).wrap($a)
    if (alt) {
      $wrap.after('<div class="img-alt">' + alt + '</div>')
    }
  }
  $().fancybox({
    selector: "[data-fancybox]",
    loop: true,
    transitionEffect: "slide",
    protect: true,
    // wheel: false,
    buttons: ["slideShow", "fullScreen", "thumbs", "close"]
  });

  var galleryItem = $(".gallery-item");
  var galleryList = [];
  galleryItem.each(function (idx, elem) {
    galleryList.push({
      src: $(elem).data("url"),
      opts: {
        caption: $(elem).data("title")
      }
    });
  });
  galleryItem.on("click", function () {
    $.fancybox.open(
      galleryList, {
        loop: true,
        transitionEffect: "slide"
      },
      galleryItem.index(this)
    );
    return false;

  });

  /**
   * 手機menu和toc按鈕點擊
   * 顯示menu和toc的sidebar
   */
  function mobile_menu_close() {
    if ($(".toggle-menu").hasClass("open")) {
      $(".toggle-menu").removeClass("open").addClass("close");
      $('body').removeClass("open-mobile-menus");
      $('#menu_mask').fadeOut()
    }

  }

  function mobile_toc_close() {
    if ($("#mobile-toc-button").hasClass("open")) {
      $("#mobile-toc-button").removeClass("open").addClass("close");
      $('body').removeClass("open-mobile-toc");
      $('#menu_mask').fadeOut();
    }

  }
  $('.toggle-menu').on('click', function () {
    if ($(".toggle-menu").hasClass("close")) {
      $(".toggle-menu").removeClass("close").addClass("open");
      $('body').addClass("open-mobile-menus");
      $('#menu_mask').fadeIn();
    }

  })

  $('#mobile-toc-button').on('click', function () {
    if ($("#mobile-toc-button").hasClass("close")) {
      $("#mobile-toc-button").removeClass("close").addClass("open");
      $('body').addClass("open-mobile-toc");
      $('#menu_mask').fadeIn();
    }

  })

  $('#menu_mask').on('click touchstart', function () {
    mobile_menu_close()
    mobile_toc_close()
  })

  $(window).on('resize', function (e) {
    if (!$('.toggle-menu').is(':visible')) {
      mobile_menu_close()
    }
    if (!$('#mobile-toc-button').is(':visible')) {
      mobile_toc_close()
    }

  })

  //點擊toc，收起sidebar
  $("#mobile-sidebar-toc a").on('click', function () {
    mobile_toc_close()
  })

  /**
   *  scroll 滚动 toc
   */
  var initTop = 0
  $('.toc-child').hide()

  // main of scroll
  $(window).scroll(throttle(function (event) {
    var currentTop = $(this).scrollTop()
    if (!isMobile()) {
      // percentage inspired by hexo-theme-next
      scrollPercent(currentTop)
      // head position
      findHeadPosition(currentTop)
      auto_scroll_toc(currentTop)

    }
    var isUp = scrollDirection(currentTop)

    if (currentTop > 56) {
      if (isUp) {
        $('#page-header').hasClass('visible') ? $('#page-header').removeClass('visible') : console.log()

      } else {
        $('#page-header').hasClass('visible') ? console.log() : $('#page-header').addClass('visible')
      }
      $('#page-header').addClass('fixed')

      if ($('#rightside').css('opacity') === '0') {
        $('#rightside').animate({}, function () {
          $(this).css({
            'opacity': '1',
            'transform': 'translateX(-38px)'
          })
        })
      }
    } else {
      if (currentTop === 0) {
        $('#page-header').removeClass('fixed').removeClass('visible')
      }

      $('#rightside').animate({}, function () {
        $('#rightside').css({
          'opacity': '',
          'transform': ''
        })
      })

    }

  }, 50, 100))

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
  function scrollDirection(currentTop) {
    var result = currentTop > initTop // true is down & false is up
    initTop = currentTop
    return result
  }

  // scroll to a head(anchor)
  function scrollToHead(anchor) {
    scrollTo(anchor);
  }

  // expand toc-item
  function expandToc($item) {
    if ($item.is(':visible')) {
      return
    }
    $item.fadeIn(400)
  }

  function scrollPercent(currentTop) {
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

  function updateAnchor(anchor) {
    if (window.history.replaceState && anchor !== window.location.hash) {
      window.history.replaceState(undefined, undefined, anchor)
    }
  }

  // find head position & add active class
  // DOM Hierarchy:
  // ol.toc > (li.toc-item, ...)
  // li.toc-item > (a.toc-link, ol.toc-child > (li.toc-item, ...))
  function findHeadPosition(top) {
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

  function auto_scroll_toc(currentTop) {
    if ($('.toc-link').hasClass('active')) {
      var active_position = $(".active").offset().top;
      var sidebar_scrolltop = $("#sidebar").scrollTop();
      if (active_position > (currentTop + $(window).height() - 50)) {
        $("#sidebar").scrollTop(sidebar_scrolltop + 100);
      } else if (active_position < currentTop + 50) {
        $("#sidebar").scrollTop(sidebar_scrolltop - 100);
      }
    }
  }

  /**
   * 閲讀模式
   */
  $("#readmode").click(function () {
    if (Cookies.get("night-mode") == "night") {
      $('body').toggleClass('night-mode');
      $('body').toggleClass('read-mode');
      $('#to_comment').toggleClass('is_invisible');
    } else {
      $('body').toggleClass('read-mode');
      $('#to_comment').toggleClass('is_invisible');
    }
  });

  /**
   * 字體調整
   */
  $("#font_plus").click(function () {
    var font_size_record = parseFloat($('body').css('font-size'))
    var pre_size_record = parseFloat($('pre').css('font-size'))
    var code_size_record = parseFloat($('code').css('font-size'))
    $('body').css('font-size', font_size_record + 1)
    $('pre').css('font-size', pre_size_record + 1)
    $('code').css('font-size', code_size_record + 1)
  });

  $("#font_minus").click(function () {
    var font_size_record = parseFloat($('body').css('font-size'))
    var pre_size_record = parseFloat($('pre').css('font-size'))
    var code_size_record = parseFloat($('code').css('font-size'))
    $('body').css('font-size', font_size_record - 1)
    $('pre').css('font-size', pre_size_record - 1)
    $('code').css('font-size', code_size_record - 1)
  });

  /**
   * sub-menus 位置調整
   */

  if ($(window).width() > 768) {
    $('.menus_item_child').each(function () {
      var a_width = $(this).siblings('a').outerWidth(true);
      var child_width = $(this).outerWidth(true);
      $(this).css("margin-left", -(child_width / 2 - a_width / 2))
    })
  }

  /**
   * 手機端sub-menu 展開/收縮
   */
  $('.menus-expand').on('click', function () {
    if ($(this).hasClass('menus-closed')) {
      $(this).parents('.menus_item').find('.menus_item_child').show();
      $(this).removeClass('menus-closed');
    } else {
      $(this).parents('.menus_item').find('.menus_item_child').hide();
      $(this).addClass('menus-closed');
    }
  })

  /**
   * rightside 點擊設置 按鈕 展開
   */
  $('#rightside_config').on('click', function () {
    $('#rightside-config-hide').toggleClass("rightside-in")
  })
  
  /**
   * 調正recent_post 上下間距
   */
  function recent_post_padding() {
    $(".recent-post-info").each(function () {
      var k = $(".recent-post-item").height();
      var e = $(this).height();
      $(this).css({
        "padding-top": (k - e) / 2,
        "padding-bottom": (k - e) / 2
      })
    })
  }

  //recent-post-item垂直置中
  if ($(window).width() > 768) {
    recent_post_padding();
  }

  $(window).bind("resize", function () {
    if ($(window).width() > 768) {
      recent_post_padding();
    }
  })

  /**
   * 複製時加上版權信息
   */
  var copy_copyright_js = GLOBAL_CONFIG.copy_copyright_js
  var copyright = GLOBAL_CONFIG.copyright
  if (copyright) {
    document.body.oncopy = event => {
      event.preventDefault();
      let textFont, copyFont = window.getSelection(0).toString();
      if (copyFont.length > 45) {
        textFont = copyFont + '\n' + '\n' + '\n' +
          copyright.languages.author + '\n' +
          copyright.languages.link + '\n' +
          copyright.languages.source + '\n' +
          copyright.languages.info;
      } else {
        textFont = copyFont;
      }
      if (event.clipboardData) {
        return event.clipboardData.setData('text', textFont);
      } else {
        // 兼容IE
        return window.clipboardData.setData("text", textFont);
      }
    }
  }

});