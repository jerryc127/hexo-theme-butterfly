'use strict';


hexo.extend.tag.register('u', function(args) {
  return `<u>${args.join(' ')}</u>`;
});
hexo.extend.tag.register('emp', function(args) {
  return `<emp>${args.join(' ')}</emp>`;
});
hexo.extend.tag.register('wavy', function(args) {
  return `<wavy>${args.join(' ')}</wavy>`;
});
hexo.extend.tag.register('del', function(args) {
  return `<del>${args.join(' ')}</del>`;
});
hexo.extend.tag.register('kbd', function(args) {
  return `<kbd>${args.join(' ')}</kbd>`;
});
hexo.extend.tag.register('psw', function(args) {
  return `<psw>${args.join(' ')}</psw>`;
});
