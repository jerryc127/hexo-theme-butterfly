$(function () {
  let loadFlag = false
  const openSearch = function () {
    $('body').css({
      width: '100%',
      overflow: 'hidden'
    })
    $('#local-search .search-dialog').css('display', 'block')
    $('#local-search-input input').focus()
    $('#search-mask').fadeIn()
    if (!loadFlag) {
      search(GLOBAL_CONFIG.localSearch.path)
      loadFlag = true
    }

    // shortcut: ESC
    document.addEventListener('keydown', function f (event) {
      if (event.code === 'Escape') {
        closeSearch()
        document.removeEventListener('keydown', f)
      }
    })
  }

  const closeSearch = function () {
    $('body').css({
      width: '',
      overflow: ''
    })
    $('#local-search .search-dialog').css({
      animation: 'search_close .5s'
    })

    setTimeout(function () {
      $('#local-search .search-dialog').css({
        animation: '',
        display: 'none'
      })
    }, 500)

    $('#search-mask').fadeOut()
  }

  const searchClickFn = () => {
    $('a.social-icon.search').on('click', openSearch)
    $('#search-mask, .search-close-button').on('click', closeSearch)
  }

  searchClickFn()

  window.addEventListener('pjax:complete', function () {
    $('#local-search .search-dialog').is(':visible') && closeSearch()
    searchClickFn()
  })

  function search (path) {
    $.ajax({
      url: GLOBAL_CONFIG.root + path,
      dataType: 'xml',
      success: function (xmlResponse) {
        // get the contents from search data
        const datas = $('entry', xmlResponse).map(function () {
          return {
            title: $('title', this).text(),
            content: $('content', this).text(),
            url: $('url', this).text()
          }
        }).get()

        const $input = $('#local-search-input input')[0]
        const $resultContent = $('#local-hits')[0]
        $input.addEventListener('input', function () {
          let str = '<div class="search-result-list">'
          const keywords = this.value.trim().toLowerCase().split(/[\s]+/)
          $resultContent.innerHTML = ''
          if (this.value.trim().length <= 0) {
            $('.local-search-stats__hr').hide()
            return
          }
          let count = 0
          // perform local searching
          datas.forEach(function (data) {
            let isMatch = true
            if (!data.title || data.title.trim() === '') {
              data.title = 'Untitled'
            }
            let dataTitle = data.title.trim().toLowerCase()
            const dataContent = data.content.trim().replace(/<[^>]+>/g, '').toLowerCase()
            const dataUrl = data.url.startsWith('/') ? data.url : GLOBAL_CONFIG.root + data.url
            let indexTitle = -1
            let indexContent = -1
            let firstOccur = -1
            // only match artiles with not empty titles and contents
            if (dataTitle !== '' || dataContent !== '') {
              keywords.forEach(function (keyword, i) {
                indexTitle = dataTitle.indexOf(keyword)
                indexContent = dataContent.indexOf(keyword)
                if (indexTitle < 0 && indexContent < 0) {
                  isMatch = false
                } else {
                  if (indexContent < 0) {
                    indexContent = 0
                  }
                  if (i === 0) {
                    firstOccur = indexContent
                  }
                }
              })
            } else {
              isMatch = false
            }

            // show search results
            if (isMatch) {
              const content = data.content.trim().replace(/<[^>]+>/g, '')
              if (firstOccur >= 0) {
                // cut out 130 characters
                let start = firstOccur - 30
                let end = firstOccur + 100

                if (start < 0) {
                  start = 0
                }

                if (start === 0) {
                  end = 100
                }

                if (end > content.length) {
                  end = content.length
                }

                let matchContent = content.substring(start, end)

                // highlight all keywords
                keywords.forEach(function (keyword) {
                  const regS = new RegExp(keyword, 'gi')
                  matchContent = matchContent.replace(regS, '<span class="search-keyword">' + keyword + '</span>')
                  dataTitle = dataTitle.replace(regS, '<span class="search-keyword">' + keyword + '</span>')
                })

                str += '<div class="local-search__hit-item"><a href="' + dataUrl + '" class="search-result-title">' + dataTitle + '</a>'
                count += 1
                $('.local-search-stats__hr').show()

                if (dataContent !== '') {
                  str += '<p class="search-result">' + matchContent + '...</p>'
                }
              }
              str += '</div>'
            }
          })
          if (count === 0) {
            str += '<div id="local-search__hits-empty">' + GLOBAL_CONFIG.localSearch.languages.hits_empty.replace(/\$\{query}/, this.value.trim()) +
              '</div>'
          }
          str += '</div>'
          $resultContent.innerHTML = str
          window.pjax && window.pjax.refresh($resultContent)
        })
      }
    })
  }
})
