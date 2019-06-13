# hexo-theme-butterfly

[预览](https://jerryc.me/)

一款基于[hexo-theme-melody](https://github.com/Molunerfinn/hexo-theme-melody)修改的主题

处于dev阶段，一些功能需要时间去适配（例如夜间模式）

## 安装
在你的博客目录里
```
git clone https://github.com/jerryc127/hexo-theme-butterfly.git themes/Butterfly
```

## 应用主题
修改hexo配置文件`_config.yml`，把主题改为`Butterfly`

```
theme: Butterfly
```

>如果你没有pug以及stylus的渲染器，请下载安装： npm install hexo-renderer-jade hexo-renderer-stylus --save or yarn add hexo-renderer-jade hexo-renderer-stylus

## 文档
可查看[这里](https://molunerfinn.com/hexo-theme-melody-doc/zh-Hans/#%E7%89%B9%E6%80%A7)

一些不同的东西后续补上教程


## Front-matter

page页
```
---
title: {{ title }}
date: {{ date }}
comments: 
reward:
description:
top_img: 
cover: (封面)
---
```

post页
```
---
title: {{ title }}
date: {{ date }}
tags:
categories:
keywords:
description:
top_img:
cover:
---
```

## 截图
![image](https://user-images.githubusercontent.com/16351105/58887365-1272f780-8718-11e9-9329-3292c6ba20d4.png)
![image](https://user-images.githubusercontent.com/16351105/58887457-3cc4b500-8718-11e9-9417-2bdea603c92e.png)
