/* global hexo */

'use strict';

const button = (args) => {
  args = args.join(' ').split(',');
  const url = (args[0] || '').trim();
  const text = (args[1] || '').trim();
  const title = (args[2] || '').trim();

  !url && hexo.log.warn('Button url must be defined!');

  return `<a class="btn" href="${url}" ${title.length > 0 ? ` title="${title}"` : ''} target="_blank">${text}</a>`;
};

// {% btn url, text, title %}
hexo.extend.tag.register('button', button, { ends: false });
hexo.extend.tag.register('btn', button, { ends: false });
