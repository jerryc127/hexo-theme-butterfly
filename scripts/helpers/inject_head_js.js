'use strict'

hexo.extend.helper.register('inject_head_js', function () {
  const { darkmode, aside, pjax } = this.theme
  const start = darkmode.start || 6
  const end = darkmode.end || 18
  const { theme_color: themeColor } = hexo.theme.config
  const themeColorLight = themeColor && themeColor.enable ? themeColor.meta_theme_color_light : '#ffffff'
  const themeColorDark = themeColor && themeColor.enable ? themeColor.meta_theme_color_dark : '#0d0d0d'

  const createCustomJs = () => `
    const saveToLocal = {
      set: (key, value, ttl) => {
        try {
          const data = { value }

          if (ttl != null) {
            data.expiry = Date.now() + ttl * 86400000
          }

          localStorage.setItem(key, JSON.stringify(data))
        } catch (e) {
          console.error(e)
        }
      },
      get: key => {
        const itemStr = localStorage.getItem(key)
        if (!itemStr) return

        try {
          const data = JSON.parse(itemStr)

          if (data.expiry && Date.now() > data.expiry) {
            localStorage.removeItem(key)
            return
          }

          return data.value
        } catch {
          localStorage.removeItem(key)
        }
      }
    }

    const scriptCache = new Map()
    const cssCache = new Map()
    window.btf = {
      saveToLocal,
      getScript: (url, attr = {}) => {
        if (scriptCache.has(url)) {
          return scriptCache.get(url)
        }

        const promise = new Promise((resolve, reject) => {
          const script = document.createElement('script')

          script.src = url
          script.async = true

          for (const key in attr) {
            script.setAttribute(key, attr[key])
          }

          script.onload = resolve
          script.onerror = reject

          document.head.appendChild(script)
        })

        scriptCache.set(url, promise)

        return promise
      },
      getCSS: (url, id) => {
        if (cssCache.has(url)) {
          return cssCache.get(url)
        }

        const promise = new Promise((resolve, reject) => {
          const link = document.createElement('link')

          link.rel = 'stylesheet'
          link.href = url

          if (id) {
            link.id = id
          }

          link.onload = resolve
          link.onerror = reject

          document.head.appendChild(link)
        })

        cssCache.set(url, promise)

        return promise
      },
      addGlobalFn: (key, fn, name = false, parent = window) => {
        if (!${pjax.enable} && key.startsWith('pjax')) return
        const globalFn = parent.globalFn || {}
        globalFn[key] = globalFn[key] || {}
        globalFn[key][name || Object.keys(globalFn[key]).length] = fn
        parent.globalFn = globalFn
      }
    }
  `

  const createDarkmodeJs = () => {
    if (!darkmode.enable) return ''

    let darkmodeJs = `
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      const activateDarkMode = () => {
        document.documentElement.dataset.theme = 'dark'
        if (metaThemeColor !== null) {
          metaThemeColor.setAttribute('content', '${themeColorDark}')
        }
      }
      const activateLightMode = () => {
        document.documentElement.dataset.theme = 'light'
        if (metaThemeColor !== null) {
          metaThemeColor.setAttribute('content', '${themeColorLight}')
        }
      }

      btf.activateDarkMode = activateDarkMode
      btf.activateLightMode = activateLightMode

      const theme = saveToLocal.get('theme')
    `

    switch (darkmode.autoChangeMode) {
      case 1:
        darkmodeJs += `
          const mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)')
          const mediaQueryLight = window.matchMedia('(prefers-color-scheme: light)')

          if (theme === undefined) {
            if (mediaQueryLight.matches) activateLightMode()
            else if (mediaQueryDark.matches) activateDarkMode()
            else {
              const hour = new Date().getHours()
              const start = ${start}
              const end = ${end}
              const isNight =
                start < end
                    ? hour < start || hour >= end
                    : hour >= start || hour < end
              isNight ? activateDarkMode() : activateLightMode()
            }
            mediaQueryDark.addEventListener('change', e => {
              if (saveToLocal.get('theme') === undefined) {
                e.matches ? activateDarkMode() : activateLightMode()
              }
            })
          } else {
            theme === 'light' ? activateLightMode() : activateDarkMode()
          }
        `
        break
      case 2:
        darkmodeJs += `
          const hour = new Date().getHours()
          const start = ${start}
          const end = ${end}
          const isNight =
            start < end
                ? hour < start || hour >= end
                : hour >= start || hour < end
          if (theme === undefined) isNight ? activateDarkMode() : activateLightMode()
          else theme === 'light' ? activateLightMode() : activateDarkMode()
        `
        break
      default:
        darkmodeJs += `
          theme === 'dark' ? activateDarkMode() : theme === 'light' ? activateLightMode() : null
        `
    }

    return darkmodeJs
  }

  const createAsideStatusJs = () => {
    if (!aside.enable || !aside.button) return ''
    return `
      const asideStatus = saveToLocal.get('aside-status')
      if (asideStatus !== undefined) {
        document.documentElement.classList.toggle('hide-aside', asideStatus === 'hide')
      }
    `
  }

  const createDetectAppleJs = () => `
    const detectApple = () => {
      if (/iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent)) {
        document.documentElement.classList.add('apple')
      }
    }
    detectApple()
  `

  return `<script>
    (() => {
      ${createCustomJs()}
      ${createDarkmodeJs()}
      ${createAsideStatusJs()}
      ${createDetectAppleJs()}
    })()
  </script>`
})
