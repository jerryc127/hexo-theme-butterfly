/* eslint-disable no-unused-vars */

function debounce (func, wait, immediate) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
};

function throttle (func, wait, options) {
  let timeout, context, args
  let previous = 0
  if (!options) options = {}

  const later = function () {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }

  const throttled = function () {
    const now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    const remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }

  return throttled
}

function sidebarPaddingR () {
  const innerWidth = window.innerWidth
  const clientWidth = document.body.clientWidth
  const paddingRight = innerWidth - clientWidth
  if (innerWidth !== clientWidth) {
    $('body').css('padding-right', paddingRight)
  }
}

function scrollToDest (name, offset = 0) {
  const scrollOffset = $(name).offset()
  $('body,html').animate({
    scrollTop: scrollOffset.top - offset
  })
};

function snackbarShow (text, showAction, duration) {
  const sa = (typeof showAction !== 'undefined') ? showAction : false
  const dur = (typeof duration !== 'undefined') ? duration : 2000
  const position = GLOBAL_CONFIG.Snackbar.position
  const bg = document.documentElement.getAttribute('data-theme') === 'light' ? GLOBAL_CONFIG.Snackbar.bgLight : GLOBAL_CONFIG.Snackbar.bgDark
  Snackbar.show({
    text: text,
    backgroundColor: bg,
    showAction: sa,
    duration: dur,
    pos: position
  })
}

const Cookies = {
  get: function (name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
  },
  set: function (name, value, days) {
    let expires = ''
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
  }
}

const initJustifiedGallery = function (selector) {
  selector.each(function (i, o) {
    if ($(this).is(':visible')) {
      $(this).justifiedGallery({
        rowHeight: 220,
        margins: 4
      })
    }
  })
}

const diffDate = function (d) {
  const dateNow = new Date()
  const datePost = new Date(d.replace(/-/g, '/'))
  const dateDiff = dateNow.getTime() - datePost.getTime()
  const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000))
  return dayDiff
}
