/**
 * global hexo
 * from printempw/hexo-hide-posts
 * modify by Jerry
 */

'use strict';

var public_generators = [];

hexo.extend.filter.register('before_generate', function () {
  this._bindLocals();

  const all_posts = this.locals.get('posts');
  const hidden_posts = all_posts.find({
    'hide': true
  });
  const normal_posts = all_posts.filter(post => !post['hide']);

  this.locals.set('all_posts', all_posts);
  this.locals.set('hidden_posts', hidden_posts);
  this.locals.set('posts', normal_posts);
});

hexo.extend.filter.register('after_init', function () {

  const original = {};
  for (const name in hexo.extend.generator.list()) {
    original[name] = hexo.extend.generator.get(name);
  }

  hexo.extend.generator.register('post', async function (locals) {
    const fg = original.post.bind(this);

    const generated_public = await fg(locals);
    const generated_hidden = await fg(Object.assign({}, locals, {
      posts: locals.hidden_posts
    }));

    // Remove post.prev and post.next for hidden posts
    generated_hidden.forEach(ele => {
      ele.data.prev = ele.data.next = null;
    });

    return generated_public.concat(generated_hidden);
  });

  // Then we hack into other generators if necessary
  public_generators.filter(
    name => Object.keys(original).includes(name)
  ).forEach(name => {
    // Overwrite original generator
    hexo.extend.generator.register(name, function (locals) {
      const fg = original[name].bind(this);

      return fg(Object.assign({}, locals, {
        posts: new locals.posts.constructor(
          locals.posts.data.concat(locals.hidden_posts.data)
        )
      }));
    });
  });
});