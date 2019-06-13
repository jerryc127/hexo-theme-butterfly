$(function () {
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
            $('#sidebar').animate({}, function () {
              $('#sidebar').css({
                'transform': 'translateX(300px)'
              }, 200)
            })
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


  //-------------------------------------------------------------------------------------------------------
  //sidebar
  $('#toggle-sidebar').on('click', function () {

    if (!isMobile() && $('#sidebar').is(':visible')) {
      var isOpen = $(this).hasClass('on')
      isOpen ? $(this).removeClass('on') : $(this).addClass('on')
      if (isOpen) {
        $('#page-header').removeClass('open-sidebar')
        $('body').animate({
          paddingLeft: 0
        }, 200)

        $('#sidebar').animate({}, function () {
          $('#sidebar').css({
            'transform': 'translateX(0px)'
          })
        })

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
        $('#sidebar').animate({}, function () {
          $('#sidebar').css({
            'transform': 'translateX(300px)'
          })
        })
        $('#toggle-sidebar').animate({}, function () {
          $('#toggle-sidebar').css({
            'transform': 'rotateZ(180deg)',
            'color': '#99a9bf'
          })
        })
      }
    }
  })

  //-----------------------------------------------------------------------------------------------------
  // 首页fullpage添加
  // 添加class 
  if (/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {} else {
    $('.full_page').css('background-attachment', 'fixed')
  }

  //---------------------------------------------------------------------------------------------------------
  
  $(".scroll-down").on("click", function () {

    scrollTo('#content-outer')

  });


  //--------------------------------------------------------------------------------------------------------
  // tags 隨機大小 顔色
  var list = document.querySelectorAll(".tag-cloud .tag-cloud-tags a");

  if ($(window).width() > 768) {
    Array.prototype.forEach.call(list, (item, index) => {
      item.style.fontSize = Math.floor(Math.random() * 20 + 15) + "px"; //15 ~ 35
      item.style.color =
        "rgb(" +
        Math.floor(Math.random() * 201) +
        ", " +
        Math.floor(Math.random() * 201) +
        ", " +
        Math.floor(Math.random() * 201) +
        ")"; // 0,0,0 -> 200,200,200
    });
  } else {
    Array.prototype.forEach.call(list, (item, index) => {
      item.style.fontSize = Math.floor(Math.random() * 13 + 15) + "px"; //15 ~ 28
      item.style.color =
        "rgb(" +
        Math.floor(Math.random() * 201) +
        ", " +
        Math.floor(Math.random() * 201) +
        ", " +
        Math.floor(Math.random() * 201) +
        ")"; // 0,0,0 -> 200,200,200
    });
  }


  //--------------------------------------------------------------------------------------------------------
  // bookmark
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
        '<p class="tright">' +
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

  //-------------------------------------------------------------------------------------------------------
  //代码copy
  // Add copy icon

  var highlight_copy = GLOBAL_CONFIG.highlight_copy
  if (highlight_copy == 'true') {
    $('figure.highlight').wrap('<div class="code-area-wrap"></div>')
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
  //---------------------------------------------------------------------------------------------------
  //fancybox
  var imgList = $(".recent-post-info  img");
  if (imgList.length === 0) {
    imgList = $("#post-content img");
  }
  for (var i = 0; i < imgList.length; i++) {
    var $a = $(
      '<a href="' +
      imgList[i].src +
      '" data-fancybox="group" data-caption="' +
      imgList[i].alt +
      '" class="fancybox"></a>'
    );
    var alt = imgList[i].alt;
    var $wrap = $(imgList[i]).wrap($a);
    if (alt) {
      $wrap.after('<div class="img-alt">' + alt + "</div>");
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

  //--------------------------------------------------------------------------------------------------------
  //lazy懶加載
  //把img的src删除，添加data-src,用于lozad.js
  var $img = $("#post img");
  $img.addClass("lozad");
  $img.each(function () {
    var src_link = $(this).attr("src");
    $(this).attr("data-src", src_link);
    $(this).removeAttr("src");
  })

  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();

  //---------------------------------------------------------------------------------------------------------
  /** head点击*/
  $('.toggle-menu').on('click', function () {
    if (!$('.menus').is(':visible')) {
      $(".toggle-menu").removeClass("open").addClass("close");
      $('.menus').slideDown(300)
    } else {
      $(".toggle-menu").removeClass("close").addClass("open");
      $('.menus').slideUp(200)
    }
  })

  $(document).on('click touchstart', function (e) {
    var flag = $('.menus')[0].contains(e.target) || $('.toggle-menu')[0].contains(e.target)
    if (!flag && $('.toggle-menu').is(':visible')) {
      $(".toggle-menu").removeClass("close").addClass("open");
      $('.menus').slideUp(200)
    }
  })


  $(window).on('resize', function (e) {
    if (!$('.toggle-menu').is(':visible')) {
      if (!$('.menus').is(':visible')) {
        $(".toggle-menu").removeClass("open").addClass("close");
        $('.menus').slideDown(300)
      }
    }
  })

  //---------------------------------------------------------------------------------------------------------
  /** scroll 滚动 toc*/
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
    }
    var isUp = scrollDirection(currentTop)
    if (currentTop > 56) {
      if (isUp) {
        $('#page-header').hasClass('visible') ? $('#page-header').removeClass('visible') : console.log()
      } else {
        $('#page-header').hasClass('visible') ? console.log() : $('#page-header').addClass('visible')
      }
      $('#page-header').addClass('fixed')
      if ($('#go-up').css('opacity') === '0') {

        $('#go-up').animate({}, function () {
          $('#go-up').css({
            'opacity': '1',
            'transform': 'translateX(-30px) rotateZ(360deg)'
          })
        })
      }
      if ($('#rightside').css('opacity') === '0') {

        $('#rightside').animate({}, function () {
          $('#rightside').css({
            'opacity': '1',
            'transform': 'translateX(-38px)'
          })
        })
      }


    } else {
      if (currentTop === 0) {
        $('#page-header').removeClass('fixed').removeClass('visible')
      }

      $('#go-up').animate({}, function () {
        $('#go-up').css({
          'opacity': '0',
          'transform': 'translateX(0) rotateZ(180deg) '
        })
      })

      $('#rightside').animate({}, function () {
        $('#rightside').css({
          'opacity': '0',
          'transform': 'translateX(0)'
        })
      })

    }
  }, 50, 100))

  // go up smooth scroll
  $('#go-up').on('click', function () {
    scrollTo('body')
  })

  // head scroll
  $('#post-content').find('h1,h2,h3,h4,h5,h6').on('click', function (e) {
    scrollToHead('#' + $(this).attr('id'))
  })

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

  //代碼框雙擊全屏
  $('figure').on('dblclick', function (e) {
    if (e.target !== this)
      return;
    $(this).toggleClass('code_full_page');
    $('body').toggleClass('code_body');
  });


  //閲讀模式
  $("#readmode").click(function () {

    if (Cookies.get("night-mode") == "night") {
      $('body').toggleClass('night-mode');
      $('body').toggleClass('read-mode');
      $('#font_plus,#font_minus').toggleClass('is_visible');

    } else {
      $('body').toggleClass('read-mode');
      $('#font_plus,#font_minus').toggleClass('is_visible');
    }

  });


  //閲讀模式下字體調整
  $("#font_plus").click(function () {
    var font_size_record = parseFloat($('body').css('font-size'))
    $('body').css('font-size', font_size_record + 1)
  });

  $("#font_minus").click(function () {
    var font_size_record = parseFloat($('body').css('font-size'))
    $('body').css('font-size', font_size_record - 1)
  });
});