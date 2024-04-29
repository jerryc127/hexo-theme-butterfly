hexo.extend.filter.register('before_generate', () => {
  const defaultConfig = {
    nav: {
      logo: null,
      display_title: true,
      fixed: false
    },
    menu: null,
    highlight_theme: 'light',
    highlight_theme_macStyle: false,
    highlight_copy: true,
    highlight_lang: true,
    highlight_shrink: false,
    highlight_fullpage: true,
    highlight_height_limit: false,
    code_word_wrap: false,
    social: null,
    favicon: '/img/favicon.png',
    avatar: {
      img: 'https://i.loli.net/2021/02/24/5O1day2nriDzjSu.png',
      effect: false
    },
    disable_top_img: false,
    index_img: null,
    default_top_img: null,
    archive_img: null,
    tag_img: null,
    tag_per_img: null,
    category_img: null,
    category_per_img: null,
    cover: {
      index_enable: true,
      aside_enable: true,
      archives_enable: true,
      position: 'both',
      default_cover: null
    },
    error_img: {
      flink: '/img/friend_404.gif',
      post_page: '/img/404.jpg'
    },
    error_404: {
      enable: false,
      subtitle: 'Page Not Found',
      background: 'https://i.loli.net/2020/05/19/aKOcLiyPl2JQdFD.png'
    },
    post_meta: {
      page: {
        date_type: 'created',
        date_format: 'date',
        categories: true,
        tags: false,
        label: true
      },
      post: {
        position: 'left',
        date_type: 'both',
        date_format: 'date',
        categories: true,
        tags: true,
        label: true
      }
    },
    index_post_content: {
      method: 3,
      length: 500
    },
    anchor: {
      auto_update: false,
      click_to_scroll: false
    },
    photofigcaption: false,
    copy: {
      enable: true,
      copyright: {
        enable: false,
        limit_count: 50
      }
    },
    toc: {
      post: true,
      page: false,
      number: true,
      expand: false,
      style_simple: false,
      scroll_percent: true
    },
    post_copyright: {
      enable: true,
      decode: false,
      author_href: null,
      license: 'CC BY-NC-SA 4.0',
      license_url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
    },
    reward: {
      enable: false,
      text: null,
      QR_code: null
    },
    post_edit: {
      enable: false,
      url: null
    },
    related_post: {
      enable: true,
      limit: 6,
      date_type: 'created'
    },
    post_pagination: 1,
    noticeOutdate: {
      enable: false,
      style: 'flat',
      limit_day: 500,
      position: 'top',
      message_prev: 'It has been',
      message_next: 'days since the last update, the content of the article may be outdated.'
    },
    footer: {
      owner: {
        enable: true,
        since: 2020
      },
      custom_text: null,
      copyright: true
    },
    aside: {
      enable: true,
      hide: false,
      button: true,
      mobile: true,
      position: 'right',
      display: {
        archive: true,
        tag: true,
        category: true
      },
      card_author: {
        enable: true,
        description: null,
        button: {
          enable: true,
          icon: 'fab fa-github',
          text: 'Follow Me',
          link: 'https://github.com/xxxxxx'
        }
      },
      card_announcement: {
        enable: true,
        content: 'This is my Blog'
      },
      card_recent_post: {
        enable: true,
        limit: 5,
        sort: 'date',
        sort_order: null
      },
      card_categories: {
        enable: true,
        limit: 8,
        expand: 'none',
        sort_order: null
      },
      card_tags: {
        enable: true,
        limit: 40,
        color: false,
        orderby: 'random',
        order: 1,
        sort_order: null
      },
      card_archives: {
        enable: true,
        type: 'monthly',
        format: 'MMMM YYYY',
        order: -1,
        limit: 8,
        sort_order: null
      },
      card_webinfo: {
        enable: true,
        post_count: true,
        last_push_date: true,
        sort_order: null
      },
      card_post_series: {
        enable: true,
        series_title: false,
        orderBy: 'date',
        order: -1
      }
    },
    busuanzi: {
      site_uv: true,
      site_pv: true,
      page_pv: true
    },
    runtimeshow: {
      enable: false,
      publish_date: null
    },
    newest_comments: {
      enable: false,
      sort_order: null,
      limit: 6,
      storage: 10,
      avatar: true
    },
    translate: {
      enable: false,
      default: '繁',
      defaultEncoding: 2,
      translateDelay: 0,
      msgToTraditionalChinese: '繁',
      msgToSimplifiedChinese: '簡'
    },
    readmode: true,
    darkmode: {
      enable: true,
      button: true,
      autoChangeMode: false,
      start: null,
      end: null
    },
    rightside_scroll_percent: false,
    rightside_item_order: {
      enable: false,
      hide: null,
      show: null
    },
    mathjax: {
      enable: false,
      per_page: false
    },
    katex: {
      enable: false,
      per_page: false,
      hide_scrollbar: true
    },
    algolia_search: {
      enable: false,
      hits: {
        per_page: 6
      }
    },
    local_search: {
      enable: false,
      preload: false,
      top_n_per_article: 1,
      unescape: false,
      CDN: null
    },
    docsearch: {
      enable: false,
      appId: null,
      apiKey: null,
      indexName: null,
      option: null
    },
    sharejs: {
      enable: true,
      sites: 'facebook,twitter,wechat,weibo,qq'
    },
    addtoany: {
      enable: false,
      item: 'facebook,twitter,wechat,sina_weibo,facebook_messenger,email,copy_link'
    },
    comments: {
      use: null,
      text: true,
      lazyload: false,
      count: false,
      card_post_count: false
    },
    disqus: {
      shortname: null,
      apikey: null
    },
    disqusjs: {
      shortname: null,
      apikey: null,
      option: null
    },
    livere: {
      uid: null
    },
    gitalk: {
      client_id: null,
      client_secret: null,
      repo: null,
      owner: null,
      admin: null,
      option: null
    },
    valine: {
      appId: null,
      appKey: null,
      avatar: 'monsterid',
      serverURLs: null,
      bg: null,
      visitor: false,
      option: null
    },
    waline: {
      serverURL: null,
      bg: null,
      pageview: false,
      option: null
    },
    utterances: {
      repo: null,
      issue_term: 'pathname',
      light_theme: 'github-light',
      dark_theme: 'photon-dark'
    },
    facebook_comments: {
      app_id: null,
      user_id: null,
      pageSize: 10,
      order_by: 'social',
      lang: 'zh_TW'
    },
    twikoo: {
      envId: null,
      region: null,
      visitor: false,
      option: null
    },
    giscus: {
      repo: null,
      repo_id: null,
      category_id: null,
      theme: {
        light: 'light',
        dark: 'dark'
      },
      option: null
    },
    remark42: {
      host: null,
      siteId: null,
      option: null
    },
    artalk: {
      server: null,
      site: null,
      visitor: false,
      option: null
    },
    chat_btn: false,
    chat_hide_show: false,
    chatra: {
      enable: false,
      id: null
    },
    tidio: {
      enable: false,
      public_key: null
    },
    daovoice: {
      enable: false,
      app_id: null
    },
    crisp: {
      enable: false,
      website_id: null
    },
    messenger: {
      enable: false,
      pageID: null,
      lang: 'zh_TW'
    },
    baidu_analytics: null,
    google_analytics: null,
    cloudflare_analytics: null,
    microsoft_clarity: null,
    google_adsense: {
      enable: false,
      auto_ads: true,
      js: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      client: null,
      enable_page_level_ads: true
    },
    site_verification: null,
    index_site_info_top: null,
    index_top_img_height: null,
    category_ui: null,
    tag_ui: null,
    text_align_justify: false,
    background: null,
    footer_bg: false,
    mask: {
      header: true,
      footer: true
    },
    rightside_bottom: null,
    enter_transitions: true,
    activate_power_mode: {
      enable: false,
      colorful: true,
      shake: true,
      mobile: false
    },
    canvas_ribbon: {
      enable: false,
      size: 150,
      alpha: 0.6,
      zIndex: -1,
      click_to_change: false,
      mobile: false
    },
    canvas_fluttering_ribbon: {
      enable: false,
      mobile: false
    },
    canvas_nest: {
      enable: false,
      color: '0,0,255',
      opacity: 0.7,
      zIndex: -1,
      count: 99,
      mobile: false
    },
    fireworks: {
      enable: false,
      zIndex: 9999,
      mobile: false
    },
    click_heart: {
      enable: false,
      mobile: false
    },
    clickShowText: {
      enable: false,
      text: null,
      fontSize: '15px',
      random: false,
      mobile: false
    },
    display_mode: 'light',
    beautify: {
      enable: false,
      field: 'post',
      'title-prefix-icon': null,
      'title-prefix-icon-color': null
    },
    font: {
      'global-font-size': null,
      'code-font-size': null,
      'font-family': null,
      'code-font-family': null
    },
    blog_title_font: {
      font_link: null,
      'font-family': null
    },
    hr_icon: {
      enable: true,
      icon: null,
      'icon-top': null
    },
    subtitle: {
      enable: false,
      effect: true,
      typed_option: null,
      source: false,
      sub: null
    },
    preloader: {
      enable: false,
      source: 1,
      pace_css_url: null
    },
    wordcount: {
      enable: false,
      post_wordcount: true,
      min2read: true,
      total_wordcount: true
    },
    medium_zoom: false,
    fancybox: true,
    series: {
      enable: true,
      orderBy: 'title',
      order: 1,
      number: true
    },
    abcjs: {
      enable: false,
      per_page: true
    },
    mermaid: {
      enable: false,
      code_write: false,
      theme: {
        light: 'default',
        dark: 'dark'
      }
    },
    note: {
      style: 'flat',
      icons: true,
      border_radius: 3,
      light_bg_offset: 0
    },
    pjax: {
      enable: false,
      exclude: null
    },
    aplayerInject: {
      enable: false,
      per_page: true
    },
    snackbar: {
      enable: false,
      position: 'bottom-left',
      bg_light: '#49b1f5',
      bg_dark: '#1f1f1f'
    },
    instantpage: false,
    pangu: {
      enable: false,
      field: 'site'
    },
    lazyload: {
      enable: false,
      field: 'site',
      placeholder: null,
      blur: false
    },
    Open_Graph_meta: {
      enable: true,
      option: null
    },
    css_prefix: true,
    inject: {
      head: null,
      bottom: null
    },
    CDN: {
      internal_provider: 'local',
      third_party_provider: 'jsdelivr',
      version: true,
      custom_format: null,
      option: null
    }
  }

  hexo.theme.config = Object.assign(defaultConfig, hexo.theme.config)
}, 1)
