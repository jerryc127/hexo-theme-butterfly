/**
 * flink
 */

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

const flinkFn = (args, content) => {
  content = hexo.render.renderSync({ text: content, engine: 'yaml' })

  let result = ''

  content.forEach(i => {
    const className = i.class_name ? `<div class="flink-name">${i.class_name}</div>` : ''
    const classDesc = i.class_desc ? `<div class="flink-desc">${i.class_desc}</div>` : ''

    let listResult = ''

    i.link_list.forEach(j => {
      listResult += `
          <div class="flink-list-item">
            <a href="${j.link}" title="${j.name}" target="_blank">
              <div class="flink-item-icon">
                <img class="no-lightbox" src="${j.avatar}" onerror='this.onerror=null;this.src="${urlFor(hexo.theme.config.error_img.flink)}"' alt="${j.name}" />
              </div>
              <div class="flink-item-name">${j.name}</div> 
              <div class="flink-item-desc" title="${j.descr}">${j.descr}</div>
            </a>
          </div>`
    })

    result += `${className}${classDesc} <div class="flink-list">${listResult}</div>`
  })

  return `<div class="flink">${result}</div>`
}

hexo.extend.tag.register('flink', flinkFn, { ends: true })
