/**
 * Butterfly
 * chartjs
 * https://www.chartjs.org/
 */

'use strict'

const { escapeHTML } = require('hexo-util')

const chartjs = (args, content) => {
    const chartBlock = /<!--\s*chart\s*-->\n([\w\W\s\S]*?)<!--\s*endchart\s*-->/g
    const descBlock = /<!--\s*desc\s*-->\n([\w\W\s\S]*?)<!--\s*enddesc\s*-->/g
    const id = args[0]
    const descMatches = []
    let chartConfig
    let descDOM = ''
    let match

    !content && hexo.log.warn('chartjs has no content!')

    if ((match = chartBlock.exec(content)) !== null) {
        chartConfig = match[1]
    }

    while ((match = descBlock.exec(content)) !== null) {
        descMatches.push(match[1])
    }

    for (let i = 0; i < descMatches.length; i++) {
        let descContent = hexo.render.renderSync({ text: descMatches[i], engine: 'markdown' }).trim()
        descDOM += (descContent ? `<div class="chatjs-desc-${i}">${descContent}</div>` : '')
    }

    return `<div class="chartjs-wrap" data-chartjs-id="${id}"><pre class="chartjs-src" hidden>${escapeHTML(chartConfig)}</pre>${descDOM}</div>`
}

hexo.extend.tag.register('chartjs', chartjs, { ends: true })
