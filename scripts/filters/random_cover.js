/**
 * Random cover for posts
 */

'use strict'

hexo.extend.generator.register('post', locals => {
  const imgTestReg = /\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i
  const videoTestReg = /\.(mp4|webm)(\?.*)?$/i
  const { post_asset_folder: postAssetFolder } = hexo.config
  const { cover: { default_cover: defaultCover } } = hexo.theme.config

  function * createCoverGenerator () {
    if (!defaultCover) {
      while (true) yield false
    }
    if (!Array.isArray(defaultCover)) {
      while (true) yield defaultCover
    }

    const coverCount = defaultCover.length
    if (coverCount === 1) {
      while (true) yield defaultCover[0]
    }

    const maxHistory = Math.min(3, coverCount - 1)
    const history = []

    while (true) {
      let index
      do {
        index = Math.floor(Math.random() * coverCount)
      } while (history.includes(index))

      history.push(index)
      if (history.length > maxHistory) history.shift()

      yield defaultCover[index]
    }
  }

  const coverGenerator = createCoverGenerator()

  const normalizeVideoParams = (data, paramsKey) => {
    let params = data[paramsKey]
    if (!params || typeof params !== 'object') params = {}
  
    let poster = params.poster
    if (typeof poster === 'string') poster = poster.trim()
    if (poster === '') poster = undefined
  
    if (params.autoplay !== undefined && params.autoplay !== null) params.autoplay = params.autoplay === true
    if (params.loop !== undefined && params.loop !== null) params.loop = params.loop === true
  
    if (postAssetFolder && poster && poster.indexOf('/') === -1 && imgTestReg.test(poster)) {
      poster = `${data.path}${poster}`
    }
  
    params.poster = poster
    data[paramsKey] = params
  }

  const handleVideo = data => {
    normalizeVideoParams(data, 'cover_video_parameters')
    normalizeVideoParams(data, 'pagination_video_parameters')
    normalizeVideoParams(data, 'article_sort_video_parameters')
    normalizeVideoParams(data, 'recent_post_video_parameters')
    normalizeVideoParams(data, 'related_post_video_parameters')
    return data
  }

  const handleImg = data => {
    data = handleVideo(data)
    let { cover: coverVal, top_img: topImg, pagination_cover: paginationCover, recent_post_cover: recentPostCover, article_sort_cover: articleSortCover, related_post_cover: relatedPostCover } = data

    if (postAssetFolder) {
      if (topImg && topImg.indexOf('/') === -1 && imgTestReg.test(topImg)) {
        data.top_img = `${data.path}${topImg}`
      }
      if (coverVal && coverVal.indexOf('/') === -1 && (imgTestReg.test(coverVal) || videoTestReg.test(coverVal))) {
        data.cover = `${data.path}${coverVal}`
      }
      if (paginationCover && paginationCover.indexOf('/') === -1 && (imgTestReg.test(paginationCover) || videoTestReg.test(paginationCover))) {
        data.pagination_cover = `${data.path}${paginationCover}`
      }
      if (recentPostCover && recentPostCover.indexOf('/') === -1 && (imgTestReg.test(recentPostCover) || videoTestReg.test(recentPostCover))) {
        data.recent_post_cover = `${data.path}${recentPostCover}`
      }
      if (articleSortCover && articleSortCover.indexOf('/') === -1 && (imgTestReg.test(articleSortCover) || videoTestReg.test(articleSortCover))) {
        data.article_sort_cover = `${data.path}${articleSortCover}`
      }
      if (relatedPostCover && relatedPostCover.indexOf('/') === -1 && (imgTestReg.test(relatedPostCover) || videoTestReg.test(relatedPostCover))) {
        data.related_post_cover = `${data.path}${relatedPostCover}`
      }
    }

    if (paginationCover && videoTestReg.test(paginationCover)) {
      data.pagination_cover_type = 'video'
      data.pagination_cover_mime = /\.webm(\?.*)?$/i.test(paginationCover) ? 'video/webm' : 'video/mp4'
    } else if (paginationCover && (paginationCover.indexOf('//') !== -1 || imgTestReg.test(paginationCover))) {
      data.pagination_cover_type = 'img'
    }

    if (articleSortCover !== undefined && articleSortCover !== null && articleSortCover !== false) {
      if (articleSortCover && videoTestReg.test(articleSortCover)) {
        data.article_sort_cover_type = 'video'
        data.article_sort_cover_mime = /\.webm(\?.*)?$/i.test(articleSortCover) ? 'video/webm' : 'video/mp4'
      } else if (articleSortCover && (articleSortCover.indexOf('//') !== -1 || imgTestReg.test(articleSortCover))) {
        data.article_sort_cover_type = 'img'
      }
    }

    if (recentPostCover !== undefined && recentPostCover !== null && recentPostCover !== false) {
      if (recentPostCover && videoTestReg.test(recentPostCover)) {
        data.recent_post_cover_type = 'video'
        data.recent_post_cover_mime = /\.webm(\?.*)?$/i.test(recentPostCover) ? 'video/webm' : 'video/mp4'
      } else if (recentPostCover && (recentPostCover.indexOf('//') !== -1 || imgTestReg.test(recentPostCover))) {
        data.recent_post_cover_type = 'img'
      }
    }

    if (relatedPostCover && videoTestReg.test(relatedPostCover)) {
      data.related_post_cover_type = 'video'
      data.related_post_cover_mime = /\.webm(\?.*)?$/i.test(relatedPostCover) ? 'video/webm' : 'video/mp4'
    } else if (relatedPostCover && (relatedPostCover.indexOf('//') !== -1 || imgTestReg.test(relatedPostCover))) {
      data.related_post_cover_type = 'img'
    }

    if (coverVal === false) return data

    if (!coverVal) {
      const randomCover = coverGenerator.next().value
      data.cover = randomCover
      coverVal = randomCover
    }

    if (coverVal && videoTestReg.test(coverVal)) {
      data.cover_type = 'video'
      data.cover_mime = /\.webm(\?.*)?$/i.test(coverVal) ? 'video/webm' : 'video/mp4'
    } else if (coverVal && (coverVal.indexOf('//') !== -1 || imgTestReg.test(coverVal))) {
      data.cover_type = 'img'
    }

    return data
  }

  const posts = locals.posts.sort('date').toArray()
  const { length } = posts

  return posts.map((post, i) => {
    if (i) post.prev = posts[i - 1]
    if (i < length - 1) post.next = posts[i + 1]

    post.__post = true

    return {
      data: handleImg(post),
      layout: 'post',
      path: post.path
    }
  })
})
