/**
 * Butterfly
 * inject js to head
 */

'use strict'

hexo.extend.helper.register('inject_head_js', function () {
  const { darkmode, aside } = this.theme
  const start = darkmode.start || 6
  const end = darkmode.end || 18
  const { theme_color } = hexo.theme.config
  const themeColorLight = (theme_color && theme_color.enable && theme_color.meta_theme_color_light) || '#ffffff'
  const themeColorDark = (theme_color && theme_color.enable && theme_color.meta_theme_color_dark) || '#0d0d0d'

  const createLocalStore = () => {
    return `
      win.saveToLocal = {
        set: (key, value, ttl) => {
          if (ttl === 0) return
          const now = Date.now()
          const expiry = now + ttl * 86400000
          const item = {
            value,
            expiry
          }
          localStorage.setItem(key, JSON.stringify(item))
        },
      
        get: key => {
          const itemStr = localStorage.getItem(key)
      
          if (!itemStr) {
            return undefined
          }
          const item = JSON.parse(itemStr)
          const now = Date.now()
      
          if (now > item.expiry) {
            localStorage.removeItem(key)
            return undefined
          }
          return item.value
        }
      }
    `
  }

  // https://stackoverflow.com/questions/16839698/jquery-getscript-alternative-in-native-javascript
  const createGetScript = () => {
    return `
      win.getScript = (url, attr = {}) => new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = url
        script.async = true
        script.onerror = reject
        script.onload = script.onreadystatechange = function() {
          const loadState = this.readyState
          if (loadState && loadState !== 'loaded' && loadState !== 'complete') return
          script.onload = script.onreadystatechange = null
          resolve()
        }

        Object.keys(attr).forEach(key => {
          script.setAttribute(key, attr[key])
        })

        document.head.appendChild(script)
      })
    `
  }

  const createGetCSS = () => {
    return `
      win.getCSS = (url, id = false) => new Promise((resolve, reject) => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = url
        if (id) link.id = id
        link.onerror = reject
        link.onload = link.onreadystatechange = function() {
          const loadState = this.readyState
          if (loadState && loadState !== 'loaded' && loadState !== 'complete') return
          link.onload = link.onreadystatechange = null
          resolve()
        }
        document.head.appendChild(link)
      })
    `
  }

  const createDarkmodeJs = () => {
    if (!darkmode.enable) return ''

    let darkmodeJs = `
      win.activateDarkMode = () => {
        document.documentElement.setAttribute('data-theme', 'dark')
        if (document.querySelector('meta[name="theme-color"]') !== null) {
          document.querySelector('meta[name="theme-color"]').setAttribute('content', '${themeColorDark}')
        }
      }
      win.activateLightMode = () => {
        document.documentElement.setAttribute('data-theme', 'light')
        if (document.querySelector('meta[name="theme-color"]') !== null) {
          document.querySelector('meta[name="theme-color"]').setAttribute('content', '${themeColorLight}')
        }
      }
      const t = saveToLocal.get('theme')
    `

    const autoChangeMode = darkmode.autoChangeMode

    if (autoChangeMode === 1) {
      darkmodeJs += `
          const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
          const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
          const isNotSpecified = window.matchMedia('(prefers-color-scheme: no-preference)').matches
          const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified

          if (t === undefined) {
            if (isLightMode) activateLightMode()
            else if (isDarkMode) activateDarkMode()
            else if (isNotSpecified || hasNoSupport) {
              const now = new Date()
              const hour = now.getHours()
              const isNight = hour <= ${start} || hour >= ${end}
              isNight ? activateDarkMode() : activateLightMode()
            }
            window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
              if (saveToLocal.get('theme') === undefined) {
                e.matches ? activateDarkMode() : activateLightMode()
              }
            })
          } else if (t === 'light') activateLightMode()
          else activateDarkMode()
        `
    } else if (autoChangeMode === 2) {
      darkmodeJs += `
          const now = new Date()
          const hour = now.getHours()
          const isNight = hour <= ${start} || hour >= ${end}
          if (t === undefined) isNight ? activateDarkMode() : activateLightMode()
          else if (t === 'light') activateLightMode()
          else activateDarkMode()
        `
    } else {
      darkmodeJs += `
        if (t === 'dark') activateDarkMode()
        else if (t === 'light') activateLightMode()
      `
    }

    return darkmodeJs
  }

  const createAsideStatus = () => {
    if (!aside.enable || !aside.button) return ''

    return `
      const asideStatus = saveToLocal.get('aside-status')
      if (asideStatus !== undefined) {
        if (asideStatus === 'hide') {
          document.documentElement.classList.add('hide-aside')
        } else {
          document.documentElement.classList.remove('hide-aside')
        }
      }
    `
  }

  const createDetectApple = () => {
    return `
      const detectApple = () => {
        if(/iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent)){
          document.documentElement.classList.add('apple')
        }
      }
      detectApple()
    `
  }

  return `<script>(win=>{${createLocalStore() + createGetScript() + createGetCSS() + createDarkmodeJs() + createAsideStatus() + createDetectApple()}})(window)</script>`
})
