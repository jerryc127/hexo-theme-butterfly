/**
 * flink
 */

'use strict'

const { url_for, escapeHTML } = require('hexo-util')
const urlFor = url_for.bind(hexo)
const safeEscape = value => escapeHTML(value == null ? '' : String(value))

const flinkFn = (args, content) => {
  const data = hexo.render.renderSync({ text: content, engine: 'yaml' })
  let result = ''

  data.forEach(item => {
    const className = item.class_name ? `<div class="flink-name">${safeEscape(item.class_name)}</div>` : ''
    const classDesc = item.class_desc ? `<div class="flink-desc">${safeEscape(item.class_desc)}</div>` : ''

    const listResult = item.link_list.map(link => `
      <div class="flink-list-item">
        <a href="${safeEscape(link.link)}" title="${safeEscape(link.name)}" target="_blank">
          <div class="flink-item-icon">
            <img class="no-lightbox" src="${safeEscape(link.avatar)}" onerror='this.onerror=null;this.src="${urlFor(hexo.theme.config.error_img.flink)}"' alt="${safeEscape(link.name)}" />
          </div>
          <div class="flink-item-name">${safeEscape(link.name)}</div>
          <div class="flink-item-desc" title="${safeEscape(link.descr)}">${safeEscape(link.descr)}</div>
        </a>
      </div>`).join('')

    result += `${className}${classDesc}<div class="flink-list">${listResult}</div>`
  })

  return `<div class="flink">${result}</div>`
}

hexo.extend.tag.register('flink', flinkFn, { ends: true })
