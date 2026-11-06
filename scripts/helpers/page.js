'use strict'

const { truncateContent, postDesc } = require('../common/postDesc')
const { prettyUrls, stripHTML } = require('hexo-util')
const crypto = require('crypto')
const moment = require('moment-timezone')

const absoluteUrlPattern = /^(?:[a-z][a-z\d+.-]*:)?\/\//i
const relativeUrlPattern = /^(\.\/|\.\.\/|\/|[^/]+\/).*$/
const colorPattern = /^(#|rgb|rgba|hsl|hsla)/i
const simpleFilePattern = /\.(png|jpg|jpeg|gif|bmp|webp|svg|tiff)$/i
const escapeRegex = value => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const { version: themeVersion } = require('../../package.json')

hexo.extend.helper.register('truncate', truncateContent)

hexo.extend.helper.register('postDesc', data => {
  return postDesc(data, hexo)
})

hexo.extend.helper.register('cloudTags', function (options = {}) {
  const env = this
  let { source, minfontsize, maxfontsize, limit, unit = 'px', orderby, order, page = 'tags', custom_colors } = options

  if (limit > 0) {
    source = source.limit(limit)
  }

  const shuffle = list => {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = list[i]
      list[i] = list[j]
      list[j] = temp
    }
    return list
  }

  const sizes = [...new Set(source.map(tag => tag.length).sort((a, b) => a - b))]
  const sizeMap = new Map(sizes.map((size, index) => [size, index]))
  const length = sizes.length - 1

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 201)
    const g = Math.floor(Math.random() * 201)
    const b = Math.floor(Math.random() * 201)
    return `rgb(${Math.max(r, 50)}, ${Math.max(g, 50)}, ${Math.max(b, 50)})`
  }

  const normalizeColors = input => {
    if (!input) return null
    if (typeof input === 'string') {
      const color = input.trim()
      return color ? [color] : null
    }
    if (Array.isArray(input)) {
      const result = []
      for (let i = 0; i < input.length; i++) {
        const value = input[i]
        if (value === null || value === undefined) continue
        const color = String(value).trim()
        if (!color) continue
        result.push(color)
      }
      return result.length ? result : null
    }
    return null
  }

  const userColors = normalizeColors(custom_colors)

  const generateStyle = (size, unit, page, color) => {
    const colorStyle = page === 'tags' ? `background-color: ${color};` : `color: ${color};`
    return `font-size: ${parseFloat(size.toFixed(2))}${unit}; ${colorStyle}`
  }

  const sortedSource = orderby === 'random'
    ? shuffle(typeof source.toArray === 'function' ? source.toArray() : Array.from(source))
    : source.sort(orderby, order)

  return sortedSource.map((tag, idx) => {
    const ratio = length ? sizeMap.get(tag.length) / length : 0
    const size = minfontsize + ((maxfontsize - minfontsize) * ratio)

    if (userColors && userColors.length) {
      const color = userColors[idx % userColors.length]
      const style = generateStyle(size, unit, page, color)
      return `<a href="${env.url_for(tag.path)}" class="tag-cloud-item" style="${style}">${tag.name}</a>`
    }

    const color = getRandomColor()
    const style = generateStyle(size, unit, page, color)
    return `<a href="${env.url_for(tag.path)}" style="${style}">${tag.name}</a>`
  }).join('')
})

hexo.extend.helper.register('urlNoIndex', function (url = null, trailingIndex = false, trailingHtml = false) {
  return prettyUrls(url || this.url, { trailing_index: trailingIndex, trailing_html: trailingHtml })
})

hexo.extend.helper.register('md5', function (path) {
  return crypto.createHash('md5').update(decodeURI(this.url_for(path, { relative: false }))).digest('hex')
})

hexo.extend.helper.register('injectHtml', data => {
  return data ? data.join('') : ''
})

hexo.extend.helper.register('findArchivesTitle', function (page, menu, date) {
  if (page.year) {
    const dateStr = page.month ? `${page.year}-${page.month}` : `${page.year}`
    const dateFormat = page.month ? hexo.theme.config.aside.card_archives.format : 'YYYY'
    return date(dateStr, dateFormat)
  }

  const defaultTitle = this._p('page.archives')
  if (!menu) return defaultTitle
  const archiveDir = String(hexo.config.archive_dir || 'archives').replace(/^\/+|\/+$/g, '')
  const archivePath = this.url_for(archiveDir)
  const normalizedArchivePath = archivePath.endsWith('/') ? archivePath : `${archivePath}/`
  const archivePathRegex = new RegExp(`${escapeRegex(normalizedArchivePath)}(?:$|[?#])`)
  const archiveDirRegex = new RegExp(`/${escapeRegex(archiveDir)}/(?:$|[?#])`)

  const loop = m => {
    for (const [key, value] of Object.entries(m)) {
      if (value && typeof value === 'object') {
        const result = loop(value)
        if (result) return result
      }

      if (typeof value === 'string' && (archivePathRegex.test(value) || archiveDirRegex.test(value))) {
        return key
      }
    }
  }

  return loop(menu) || defaultTitle
})

hexo.extend.helper.register('getBgPath', function (path) {
  if (!path) return ''

  if (colorPattern.test(path)) {
    return `background-color: ${path};`
  } else if (absoluteUrlPattern.test(path) || relativeUrlPattern.test(path) || simpleFilePattern.test(path)) {
    return `background-image: url(${this.url_for(path)});`
  } else {
    return `background: ${path};`
  }
})

hexo.extend.helper.register('shuoshuoFN', (data, page) => {
  const { limit } = page

  // Shallow copy to avoid mutating original data
  let processedData = data.map(item => ({ ...item }))

  // Check if limit.value is a valid date
  const isValidDate = date => !isNaN(Date.parse(date))

  // order by date
  processedData.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

  // Apply number limit or time limit conditionally
  if (limit && limit.type === 'num' && limit.value > 0) {
    processedData = processedData.slice(0, limit.value)
  } else if (limit && limit.type === 'date' && isValidDate(limit.value)) {
    const limitDate = Date.parse(limit.value)
    processedData = processedData.filter(item => Date.parse(item.date) >= limitDate)
  }

  // This is a hack method, because hexo treats time as UTC time
  // so you need to manually convert the time zone
  const timezone = hexo.config.timezone
  processedData.forEach(item => {
    const parsed = moment.utc(item.date)
    item.date = timezone
      ? moment.tz(parsed.format('YYYY-MM-DD HH:mm:ss'), timezone).format('YYYY-MM-DD HH:mm:ss')
      : parsed.format('YYYY-MM-DD HH:mm:ss')

    // Render the content using Hexo's rendering engine to process any tags or markdown
    const mockPost = {
      content: item.content,
      source: item.source || page.source || '',
      full_source: page.full_source || '',
      path: page.path || '',
      layout: item.layout || page.layout || 'post',
      raw: item.raw || item.content,
      draft: false,
      published: true
    }
    try {
      hexo.execFilterSync('before_post_render', mockPost, { context: hexo })
    } catch (e) {
      // ignore third-party plugin errors, fallback to markdown-only rendering
    }
    item.content = mockPost.content

    const codeBlocks = []
    item.content = item.content.replace(/<hexoPostRenderCodeBlock>([\s\S]*?)<\/hexoPostRenderCodeBlock>/g, (_, c) => {
      codeBlocks.push(c)
      return `<!--CODEBLOCK_${codeBlocks.length - 1}-->`
    })

    try {
      item.content = hexo.extend.tag.env.renderString(item.content, {})
    } catch (e) {
      // ignore tag plugin errors, fallback to markdown-only rendering
    }

    item.content = hexo.render.renderSync({ text: item.content, engine: 'markdown' })

    item.content = item.content.replace(/<!--CODEBLOCK_(\d+)-->/g, (_, i) => codeBlocks[+i])
  })

  return processedData
})

hexo.extend.helper.register('getPageType', (page, isHome) => {
  const { layout, tag, category, type, archive } = page
  if (layout) return layout
  if (tag) return 'tag'
  if (category) return 'category'
  if (archive) return 'archive'
  if (type) {
    if (type === 'tags' || type === 'categories' || type === '404') return type
    else return 'page'
  }
  if (isHome) return 'home'
  return 'post'
})

hexo.extend.helper.register('getVersion', () => {
  return { hexo: hexo.version, theme: themeVersion }
})

hexo.extend.helper.register('safeJSON', data => {
  // Safely serialize JSON for embedding in <script> tags
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
})

const charBasedRange = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af\u1100-\u11ff]/g

const countWords = text => {
  if (!text) return 0
  const charCount = (text.match(charBasedRange) || []).length
  const remaining = text.replace(charBasedRange, ' ').trim()
  const wordCount = remaining ? remaining.split(/\s+/).length : 0
  return charCount + wordCount
}

const formatCount = num => {
  if (num >= 100000) {
    return Math.round(num / 1000) + 'k'
  }
  return num
}

hexo.extend.helper.register('wordcount', page => {
  return formatCount(countWords(stripHTML(page.encrypt ? page.origin : page.content || '')))
})

hexo.extend.helper.register('min2read', (page, options = {}) => {
  const { cn = 300, en = 160 } = options
  const text = stripHTML(page.encrypt ? page.origin : page.content || '')
  const charCount = (text.match(charBasedRange) || []).length
  const remaining = text.replace(charBasedRange, ' ').trim()
  const wordCount = remaining ? remaining.split(/\s+/).length : 0
  const minutes = Math.ceil(charCount / cn + wordCount / en)
  return minutes < 1 ? 1 : minutes
})

hexo.extend.helper.register('totalcount', site => {
  if (!site || !site.posts) return 0
  let total = 0
  site.posts.forEach(post => {
    total += countWords(stripHTML(post.encrypt ? post.origin : post.content || ''))
  })
  return formatCount(total)
})
