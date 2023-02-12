window.addEventListener('load', () => {
  let loadFlag = false
  let dataObj = []
  const $searchMask = document.getElementById('search-mask')

  const openSearch = () => {
    const bodyStyle = document.body.style
    bodyStyle.width = '100%'
    bodyStyle.overflow = 'hidden'
    btf.animateIn($searchMask, 'to_show 0.5s')
    btf.animateIn(document.querySelector('#local-search .search-dialog'), 'titleScale 0.5s')
    setTimeout(() => { document.querySelector('#local-search-input input').focus() }, 100)
    if (!loadFlag) {
      search()
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

  const closeSearch = () => {
    const bodyStyle = document.body.style
    bodyStyle.width = ''
    bodyStyle.overflow = ''
    btf.animateOut(document.querySelector('#local-search .search-dialog'), 'search_close .5s')
    btf.animateOut($searchMask, 'to_hide 0.5s')
  }

  const searchClickFn = () => {
    document.querySelector('#search-button > .search').addEventListener('click', openSearch)
  }

  const searchClickFnOnce = () => {
    document.querySelector('#local-search .search-close-button').addEventListener('click', closeSearch)
    $searchMask.addEventListener('click', closeSearch)
    if (GLOBAL_CONFIG.localSearch.preload) dataObj = fetchData(GLOBAL_CONFIG.localSearch.path)
  }

  // check url is json or not
  const isJson = url => {
    const reg = /\.json$/
    return reg.test(url)
  }

  const fetchData = async (path) => {
    let data = []
    const response = await fetch(path)
    if (isJson(path)) {
      data = await response.json()
    } else {
      const res = await response.text()
      const t = await new window.DOMParser().parseFromString(res, 'text/xml')
      const a = await t
      data = [...a.querySelectorAll('entry')].map(item => {
        return {
          title: item.querySelector('title').textContent,
          content: item.querySelector('content') && item.querySelector('content').textContent,
          url: item.querySelector('url').textContent,
          tags: item.querySelector('tags') && item.querySelector('tags').textContent
        }
      })
    }
    if (response.ok) {
      const $loadDataItem = document.getElementById('loading-database')
      $loadDataItem.nextElementSibling.style.display = 'block'
      $loadDataItem.remove()
    }
    return data
  }

  const search = () => {
    if (!GLOBAL_CONFIG.localSearch.preload) {
      dataObj = fetchData(GLOBAL_CONFIG.localSearch.path)
    }

    const $input = document.querySelector('#local-search-input input')
    const $resultContent = document.getElementById('local-search-results')
    const $loadingStatus = document.getElementById('loading-status')

    $input.addEventListener('input', function () {
      const keywords = this.value.trim().toLowerCase().split(/[\s]+/)
      if (keywords[0] !== '') $loadingStatus.innerHTML = '<i class="fas fa-spinner fa-pulse"></i>'
      else {
        $resultContent.innerHTML = ''
        return
      }

      let str = '<div class="search-result-list">'
      if (keywords.length <= 0) return
      let count = 0
      // perform local searching
      dataObj.then(data => {
        data.forEach(data => {
          let isMatch = true
          let dataTitle = data.title ? data.title.trim().toLowerCase() : ''  //获取标题
          const dataContent = data.content ? data.content.trim().replace(/<[^>]+>/g, '').toLowerCase() : '' //获取正文,其中【.replace(/<[^>]+>/g, '')】去掉了网页标签
          const dataUrl = data.url.startsWith('/') ? data.url : GLOBAL_CONFIG.root + data.url //获取链接
          const dataTags = data.tags ? data.tags : ''  //获取标签
          let indexTitle = -1
          let indexContent = -1
          let firstOccur = -1
          let indexTag = -1	//- +++添加标签定位变量
          let l_keywords = keywords.toString().split('').length //- +++获取搜索关键词的长度
          // only match articles with not empty titles and contents
          if (dataTitle !== '' || dataContent !== '') {
            keywords.forEach((keyword, i) => {
              // keywords是一个Object，keywords[0]包含了关键词的所有内容，因此要用keywords[0][0]
              if (keywords[0][0] === '#' && l_keywords > 1 && keywords[0][1] !== '#'){ //- 最后一个判断条件修复了正文中'##'无法搜索的问题
                //如果关键词第一个字符是#且长度大于1，那么进行tag搜索
                keyword = keyword.substring(1) // 将关键词第一个#去掉后再匹配
                //- 定义dataTags0的意义：去掉tags里面的网页标签代码，否则会把网页标签里面的代码（非正文内容）也匹配
                let dataTags0 = dataTags.replace(/<[^>]+>/g, '')
                indexTag = dataTags0.indexOf(keyword)
                if ( indexTag < 0 ){
                  isMatch = false
                }else{
                  firstOccur = 0
                }
              }else{
                //如果第一个字母不是#,那么不匹配标签
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
              }
            })
          } else {
            isMatch = false
          }

          // show search results
          if (isMatch) {
            if (firstOccur >= 0) {
              // cut out 130 characters
              // let start = firstOccur - 30 < 0 ? 0 : firstOccur - 30
              // let end = firstOccur + 50 > dataContent.length ? dataContent.length : firstOccur + 50
              let start = firstOccur - 30
              let end = firstOccur + 100
              let pre = ''
              let post = ''

              if (start < 0) {
                start = 0
              }

              if (start === 0) {
                end = 100
              } else {
                pre = '...'
              }

              if (end > dataContent.length) {
                end = dataContent.length
              } else {
                post = '...'
              }

              let matchContent = dataContent.substring(start, end)

              // highlight all keywords
              keywords.forEach(keyword => {
                let regexStr = keyword
                const specialRegex = /[^\w\s]+/ // match special characters
                if (keyword.length === 1 && specialRegex.test(keyword)) {
                  regexStr = `\\${keyword}`
                }
                const regS = new RegExp(regexStr, 'gi')
                matchContent = matchContent.replace(regS, '<span class="search-keyword">' + keyword + '</span>')
                dataTitle = dataTitle.replace(regS, '<span class="search-keyword">' + keyword + '</span>')
              })

              str += '<div class="local-search__hit-item"><a href="' + dataUrl + '" class="search-result-title" target="_blank">' + dataTitle + '</a>'
              count += 1
              
              if (dataContent !== '') {
                //- 自定义开始：生成的搜索结果框里，加入显示tags
                let splitT = '' 
                //- 第一步：下面是去掉dataTags里非汉字和字母（数字）的部分，然后用两个汉字分号'；；'把各个tags分隔开（保存在spliT变量里）
                let space=0
                for (let i=0;i<dataTags.length;i++){
                  if (/\S/.test(dataTags[i])){ 
                    // \S 匹配Unicode非空白
                    space = 0
                    splitT = splitT.concat(dataTags[i])
                  }else{
                    if(space===0){
                      splitT = splitT + '；；' 
                      space = 1
                    } 
                  }          
                }
                //去掉splitT开头和结尾的；；
                for(let i=0;i<splitT.length;i++){
                  if(splitT[0]=='；' && splitT.length>1){
                    splitT = splitT.substring(1)
                  }
                }
                for(let i=0;i<splitT.length;i++){
                  let l = splitT.length
                  if(splitT[l-1]=='；' && l>1){
                    splitT = splitT.substring(0,l-2)
                  }
                }
                
                //- 第二步： highlight all keywords
                keywords.forEach(keyword => {
                  if(keyword[0] === '#' & keyword.length>1){
                    keyword = keyword.substring(1) // 如果第一个字符为#且长度大于1，将关键词第一个#去掉后再匹配
                  }
                  const regS = new RegExp(keyword, 'gi')
                  splitT = splitT.replace(regS, '<span class="search-keyword">' + keyword + '</span>')
                }) 

                //- 第三步：由于第一步生产的为纯文本且包括双分号，此步骤去掉分号且加上fas fa-tag、控制字体（保存在splitTags里）
                let splitTags = '<br/><i class="fas fa-tag"><span style="font-family:times">'
                space = 0
                for(let i=0;i<splitT.length;i++){
                  if(splitT[i] !== '；'){
                    space = 0
                    splitTags = splitTags.concat(splitT[i])
                  }else{
                    if(space===0){
                      splitTags = splitTags + '</span></i>&nbsp &nbsp<i class="fas fa-tag"><span style="font-family:times">'
                      space = 1
                    }
                  }         
                }
                splitTags = splitTags + '</span></i>'
                
                post = dataTags!== '' ? post  + splitTags : post
                //- 自定义结束
              
                str += '<p class="search-result">' + pre + matchContent + post + '</p>'
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
        if (keywords[0] !== '') $loadingStatus.innerHTML = ''
        window.pjax && window.pjax.refresh($resultContent)
      })
    })
  }

  searchClickFn()
  searchClickFnOnce()

  // pjax
  window.addEventListener('pjax:complete', () => {
    !btf.isHidden($searchMask) && closeSearch()
    searchClickFn()
  })
})
