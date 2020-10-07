/**
 * Butterfly
 * Related Posts
 * According the tag
 */

'use strict'

hexo.extend.helper.register('related_posts', function (currentPost, allPosts) {
  let relatedPosts = []
  currentPost.tags.forEach(function (tag) {
    allPosts.forEach(function (post) {
      if (isTagRelated(tag.name, post.tags)) {
        const relatedPost = {
          title: post.title,
          path: post.path,
          cover: post.cover,
          randomcover: post.randomcover,
          weight: 1,
          updated: post.updated,
          created: post.date
        }
        const index = findItem(relatedPosts, 'path', post.path)
        if (index !== -1) {
          relatedPosts[index].weight += 1
        } else {
          if (currentPost.path !== post.path) {
            relatedPosts.push(relatedPost)
          }
        }
      }
    })
  })
  if (relatedPosts.length === 0) {
    return ''
  }
  let result = ''
  const hexoConfig = hexo.theme.config.rootConfig
  const config = hexo.theme.config

  const limitNum = config.related_post.limit || 6
  const dateType = config.related_post.date_type || 'created'
  const headlineLang = this._p('post.recommend')
  const lazySrc = config.lazyload.enable ? 'data-lazy-src' : 'src'

  relatedPosts = relatedPosts.sort(compare('weight'))

  if (relatedPosts.length > 0) {
    result += '<div class="relatedPosts">'
    result +=
      '<div class="headline"><i class="fas fa-thumbs-up fa-fw"></i><span>' +
      ' ' +
      headlineLang +
      '</span></div>'
    result += '<div class="relatedPosts-list">'

    for (let i = 0; i < Math.min(relatedPosts.length, limitNum); i++) {
      const cover =
        relatedPosts[i].cover === false
          ? relatedPosts[i].randomcover
          : relatedPosts[i].cover
      result +=
        '<div><a href="' +
        hexoConfig.root +
        relatedPosts[i].path +
        '" title="' +
        relatedPosts[i].title +
        '">'
      result +=
        '<img class="cover" ' +
        lazySrc +
        '="' +
        this.url_for(cover) +
        '" alt="cover">'
      if (dateType === 'created') {
        result +=
          '<div class="content is-center"><div class="date"><i class="far fa-calendar-alt fa-fw"></i>' +
          ' ' +
          this.date(relatedPosts[i].created, hexoConfig.date_format) +
          '</div>'
      } else {
        result +=
          '<div class="content is-center"><div class="date"><i class="fas fa-history fa-fw"></i>' +
          ' ' +
          this.date(relatedPosts[i].updated, hexoConfig.date_format) +
          '</div>'
      }
      result +=
        '<div class="title">' + relatedPosts[i].title + '</div>'
      result += '</div></a></div>'
    }

    result += '</div></div>'
    return result
  }
})

function isTagRelated (tagName, TBDtags) {
  let result = false
  TBDtags.forEach(function (tag) {
    if (tagName === tag.name) {
      result = true
    }
  })
  return result
}

function findItem (arrayToSearch, attr, val) {
  for (let i = 0; i < arrayToSearch.length; i++) {
    if (arrayToSearch[i][attr] === val) {
      return i
    }
  }
  return -1
}

function compare (attr) {
  return function (a, b) {
    const val1 = a[attr]
    const val2 = b[attr]
    return val2 - val1
  }
}
