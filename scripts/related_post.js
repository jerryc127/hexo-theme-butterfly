const moment = require('moment-timezone');
const {
  isMoment
} = moment;



hexo.extend.helper.register('related_posts', function (currentPost, allPosts) {
  var relatedPosts = [];
  currentPost.tags.forEach(function (tag) {
    allPosts.forEach(function (post) {
      if (isTagRelated(tag.name, post.tags)) {
        var relatedPost = {
          title: post.title,
          path: post.path,
          cover: post.cover,
          weight: 1,
          updated: post.updated,
          created: post.created
        };
        var index = findItem(relatedPosts, 'path', post.path);
        if (index != -1) {
          relatedPosts[index].weight += 1;
        } else {
          if (currentPost.path != post.path) {
            relatedPosts.push(relatedPost);
          };
        };
      };
    });
  });
  if (relatedPosts.length == 0) {
    return ''
  };
  var result = "";
  const hexoConfig = hexo.theme.config.rootConfig;
  const config = hexo.theme.config;

  var limit_num = config.related_post.limit || 6
  var lang = hexoConfig.language;
  var date_type = config.related_post.date_type || 'created'
  var headline_lang;
  if (lang === 'zh-CN') {
    headline_lang = '相关推荐';
  } else if (lang === 'zh-TW') {
    headline_lang = '相關推薦';
  } else {
    headline_lang = 'Recommend';
  }

  relatedPosts = relatedPosts.sort(compare('weight'));
  var lazy_src = config.lazyload.enable ? lazy_src = 'data-src' : lazy_src = 'src'
  var lazy_class = config.lazyload.enable ? lazy_class = 'lazyload' : lazy_class = ''

  if (relatedPosts.length > 0) {
    result += '<div class="relatedPosts">'
    result += '<div class="relatedPosts_headline"><i class="fa fa-fw fa-thumbs-up" aria-hidden="true"></i><span>' + ' ' + headline_lang + '</span></div>'
    result += '<div class="relatedPosts_list">'

    for (var i = 0; i < Math.min(relatedPosts.length, limit_num); i++) {

      var cover = relatedPosts[i].cover

      result += '<div class="relatedPosts_item"><a href="' + hexoConfig.root + relatedPosts[i].path + '" title="' + relatedPosts[i].title + '">';
      result += '<img class="relatedPosts_cover ' + lazy_class + '"' + lazy_src + '="' + cover + '">';
      if (date_type == 'created') {
        result += '<div class="relatedPosts_main is-center"><div class="relatedPosts_date"><i class="fa fa-calendar fa-fw" aria-hidden="true"></i>' + ' ' + dateHelper(relatedPosts[i].created) + '</div>'
      } else {
        result += '<div class="relatedPosts_main"><div class="relatedPosts_date"><i class="fa fa-history fa-fw" aria-hidden="true"></i>' + ' ' + dateHelper(relatedPosts[i].updated) + '</div>'
      }
      result += '<div class="relatedPosts_title">' + relatedPosts[i].title + '</div>';
      result += '</div></a></div>'
    };

    result += '</div><div class="clear_both"></div></div>'
    return result;

  }
});
hexo.extend.helper.register('echo', function (path) {
  return path;
});

function isTagRelated(tagName, TBDtags) {
  var result = false;
  TBDtags.forEach(function (tag) {
    if (tagName == tag.name) {
      result = true;
    };
  })
  return result;
}

function findItem(arrayToSearch, attr, val) {
  for (var i = 0; i < arrayToSearch.length; i++) {
    if (arrayToSearch[i][attr] == val) {
      return i
    };
  };
  return -1;
}

function compare(attr) {
  return function (a, b) {
    var val1 = a[attr];
    var val2 = b[attr];
    return val2 - val1;
  }
}

function dateHelper(date) {
  const moment = getMoment(date, hexo.theme.config.rootConfig.language);
  return moment.format(hexo.theme.config.rootConfig.date_format);
}

function getMoment(date, lang) {
  if (date == null) date = moment();
  if (!isMoment(date)) date = moment(isDate(date) ? date : new Date(date));
  if (lang) date = date.locale(lang);
  return date;
}