// Injector

'use strict'

hexo.extend.injector.register('head_end', function () {
  const data = hexo.config.theme_config && hexo.config.theme_config.inject.head
  return genResult(data)
})

hexo.extend.injector.register('body_end', () => {
  const data = hexo.config.theme_config && hexo.config.theme_config.inject.bottom
  return genResult(data)
})

function genResult (data) {
  let result = ''
  if (!data) return ''
  for (let i = 0; i < data.length; i++) {
    result += data[i]
  }
  return result
}
