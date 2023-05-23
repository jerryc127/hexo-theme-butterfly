# Update from upstream
```shell
git remote add [upstream] => anyname https://github.com/jerryc127/hexo-theme-butterfly.git
git remote -v # see remotes 
```

# use
```shell
git clone -b dev https://github.com/Kshao123/hexo-theme-butterfly.git themes/Butterfly
```

# CHANGELOG
## 0.1
- 使用 config 内的 realTitle 来渲染站点的 title 解决备案域名的站点标题与当前不一致

## 0.2
- update, merged files: layout/includes/header/nav.pug

```
nav#nav
  span#blog-info
    a(href=url_for('/') title=config.realTitle)
      if theme.nav.logo
        img.site-icon(src=url_for(theme.nav.logo))
      if theme.nav.display_title
        span.site-name=config.realTitle
```
