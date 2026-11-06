<div align="right">
  <a title="繁體中文" href="./README_CN.md">繁體中文</a>
</div>

<div align="center">

<img src="./source/img/butterfly-icon.png" width="150" height="150" alt="Butterfly Logo" />

# hexo-theme-butterfly

A modern, elegant, and feature-rich theme for Hexo

![master version](https://img.shields.io/github/package-json/v/jerryc127/hexo-theme-butterfly/master?color=%231ab1ad&label=master)
![dev version](https://img.shields.io/github/package-json/v/jerryc127/hexo-theme-butterfly/dev?label=dev)
![npm version](https://img.shields.io/npm/v/hexo-theme-butterfly?color=%23bf00ff)
![hexo version](https://img.shields.io/badge/hexo-5.3.0+-0e83cd)
![license](https://img.shields.io/github/license/jerryc127/hexo-theme-butterfly?color=FF5531)
![GitHub stars](https://img.shields.io/github/stars/jerryc127/hexo-theme-butterfly?style=social)

📢 **Demo**: [Official Site](https://butterfly.js.org/) | [CrazyWong's Blog](https://blog.crazywong.com/)

📖 **Documentation**: [English](https://butterfly.js.org/en/posts/butterfly-docs-en-get-started/) | [中文文檔](https://butterfly.js.org/posts/21cfbf15/)

![Butterfly Theme Preview](https://cdn.jsdelivr.net/gh/jerryc127/CDN@m2/img/theme-butterfly-readme.png)

</div>

---

## 📑 Table of Contents

- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Upgrade](#upgrade)
- [Theme Features](#theme-features)
- [Screenshots](#screenshots)
- [Get Help & Support](#get-help)
- [License](#license)

<a id="requirements"></a>

## 📋 Requirements

- **Hexo**: 5.3.0 or later
- **Node.js**: 18 or later (`hexo-util` 4.x requires it)
- **Git**: only needed for Git installs

<a id="quick-start"></a>

## 🚀 Quick Start

### 💾 Installation

#### Option 1: Git (Recommended)

> 💡 **Tip**: If GitHub access is slow from mainland China, use the [Gitee mirror](https://gitee.com/immyw/hexo-theme-butterfly.git).

Run the following in your Hexo blog root:

```bash
# Stable release (recommended)
git clone -b master --depth 1 https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```

```bash
# Development branch (early access to new features)
git clone -b dev --depth 1 https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```

> 📁 If `themes/butterfly` already exists, remove or rename it first; `git clone` will fail if the target folder isn't empty.

#### Option 2: npm

```bash
npm install hexo-theme-butterfly
```

> ⚠️ **Note**: npm doesn't create a folder under `themes/`; the theme goes into `node_modules/` instead.

### ⚙️ Enable & Configure

1. **Enable the theme**: set it in the `_config.yml` at your Hexo root:

   ```yaml
   theme: butterfly
   ```

2. **Copy the theme config** (recommended, so upgrades don't overwrite your settings):

   ```bash
   # Git install
   cp themes/butterfly/_config.yml _config.butterfly.yml

   # npm install
   cp node_modules/hexo-theme-butterfly/_config.yml _config.butterfly.yml
   ```

   > 💡 Hexo 5+ automatically loads `_config.butterfly.yml` from the blog root. On Windows, use `copy themes\butterfly\_config.yml _config.butterfly.yml` for Git installs, or `copy node_modules\hexo-theme-butterfly\_config.yml _config.butterfly.yml` for npm installs.
   >
   > ⚠️ After this, edit only `_config.butterfly.yml`. Don't delete the theme's own `_config.yml`, and keep custom files and images out of the theme's `source/` folder — upgrades may overwrite them.

3. **Install the renderers and preview locally**:

   ```bash
   npm install hexo-renderer-pug hexo-renderer-stylus --save
   hexo clean && hexo s
   ```

<a id="upgrade"></a>

## 🔄 Upgrade

**Git install**

```bash
cd themes/butterfly
git pull
```

**npm install**

```bash
npm update hexo-theme-butterfly
```

Before upgrading, back up your config. After upgrading, check [Releases](https://github.com/jerryc127/hexo-theme-butterfly/releases) for `_config` changes and merge them into `_config.butterfly.yml`.

<a id="theme-features"></a>

## ✨ Theme Features

> 💡 All features can be configured in `_config.butterfly.yml`. See the [theme configuration docs](https://butterfly.js.org/en/posts/butterfly-docs-en-theme-config/) for details.

### 🎨 Design
- ✅ **Card-based design** — Modern card layout
- ✅ **Rounded or square corners** — Configurable corner radius
- ✅ **Responsive layout** — Looks great on any screen size
- ✅ **Two-column layout** — Optimized for reading
- ✅ **Dark mode** — Easy on the eyes at night

### 📝 Content
- ✅ **Multi-level menu** — Nested navigation menus
- ✅ **Reading mode** — Distraction-free reading
- ✅ **Table of contents** — Available on desktop and mobile
- ✅ **Word count** — Shows the word count and estimated reading time
- ✅ **Related posts** — Smart recommendations at the end of a post
- ✅ **Outdated post warning** — Alerts readers when a post may be out of date
- ✅ **Traditional/Simplified Chinese** — Convert between Traditional and Simplified Chinese
- ✅ **Tag plugins** — Extra tags for richer content

### 🔍 Search & Navigation
- ✅ **Multiple search options** — Algolia, local search, or DocSearch
- ✅ **Built-in 404 page** — A polished error page
- ✅ **PJAX** — Smooth page transitions

### 🎨 Code Display
- ✅ **Syntax highlighting** — Several built-in themes (darker, pale night, light, ocean)
- ✅ **Code block tools** — Language labels, folding, copy button, word wrap
- ✅ **Math formulas** — MathJax and KaTeX support

### 💬 Social Interaction
- ✅ **Multiple comment systems** — Disqus, Gitalk, Valine, Waline, Twikoo, Giscus, Artalk, and more
- ✅ **Two comment systems at once** — Use two systems side by side
- ✅ **Sharing** — Share.js and AddToAny
- ✅ **Live chat** — Chatra, Tidio, or Crisp

### 📊 Analytics & Statistics
- ✅ **Visit counter** — Busuanzi
- ✅ **Site analytics** — Google Analytics, Baidu Analytics, Cloudflare Analytics, Microsoft Clarity, or Umami
- ✅ **Search engine verification** — Google and Baidu
- ✅ **Ads** — Google AdSense and custom ad slots

### 🎪 Visual Effects
- ✅ **Typing effects** — activate_power_mode animations
- ✅ **Background effects** — Static, dynamic, or fluttering ribbons, plus Canvas Nest
- ✅ **Mouse effects** — Fireworks, hearts, and text on click
- ✅ **Loading animations** — Preloader or a pace.js progress bar
- ✅ **Image lightbox** — medium-zoom or Fancybox
- ✅ **Lazy loading** — Images load as they enter the viewport

### 🛠️ Advanced Features
- ✅ **PWA** — Progressive Web App support
- ✅ **Copy protection** — Disable copying or append a copyright notice
- ✅ **Theme customization** — Custom color schemes
- ✅ **Charts** — Mermaid flowcharts and Chart.js charts
- ✅ **Music notation** — ABCJS support
- ✅ **Post series** — Group posts into series
- ✅ **instant.page** — Preload pages for faster navigation
- ✅ **Snackbar** — Elegant toast notifications

## 🤝 Contributors

Thanks to everyone who has contributed to Butterfly!

[![Contributors](https://contrib.rocks/image?repo=jerryc127/hexo-theme-butterfly)](https://github.com/jerryc127/hexo-theme-butterfly/graphs/contributors)

<a id="screenshots"></a>

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td><a href="https://cdn.jsdelivr.net/gh/jerryc127/CDN@m2/img/butterfly-readme-screenshots-1.jpg"><img src="https://cdn.jsdelivr.net/gh/jerryc127/CDN@m2/img/butterfly-readme-screenshots-1.jpg" alt="Light homepage on desktop, tablet and phone" width="440" loading="lazy" /></a></td>
      <td><a href="https://cdn.jsdelivr.net/gh/jerryc127/CDN@m2/img/butterfly-readme-screenshots-2.jpg"><img src="https://cdn.jsdelivr.net/gh/jerryc127/CDN@m2/img/butterfly-readme-screenshots-2.jpg" alt="Light article page with a full-screen cover" width="440" loading="lazy" /></a></td>
    </tr>
    <tr>
      <td><a href="https://cdn.jsdelivr.net/gh/jerryc127/CDN@m2/img/butterfly-readme-screenshots-3.jpg"><img src="https://cdn.jsdelivr.net/gh/jerryc127/CDN@m2/img/butterfly-readme-screenshots-3.jpg" alt="Dark mode homepage on desktop, tablet and phone" width="440" loading="lazy" /></a></td>
      <td><a href="https://cdn.jsdelivr.net/gh/jerryc127/CDN@m2/img/butterfly-readme-screenshots-4.jpg"><img src="https://cdn.jsdelivr.net/gh/jerryc127/CDN@m2/img/butterfly-readme-screenshots-4.jpg" alt="Dark mode article page with a full-screen cover" width="440" loading="lazy" /></a></td>
    </tr>
  </table>
</div>

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=jerryc127/hexo-theme-butterfly&type=Date)](https://star-history.com/#jerryc127/hexo-theme-butterfly&Date)

<a id="get-help"></a>

## 🤝 Building a Better Theme Together

We believe open source thrives on participation. Whether you're a developer, a designer, or a user, you can help make Butterfly better.

### 💬 Get Help & Support

- 🐛 **Found a bug?** → [Open an issue](https://github.com/jerryc127/hexo-theme-butterfly/issues) and let's fix it together.
- 💡 **Have an idea?** → [Start a discussion](https://github.com/jerryc127/hexo-theme-butterfly/discussions) to share it.
- 📚 **New to Butterfly?** → Read the [documentation](https://butterfly.js.org/).
- ❓ **Stuck?** → Check the [FAQ](https://butterfly.js.org/en/posts/butterfly-docs-en-theme-question/) for common problems and fixes.
- 📦 **What's new?** → See [Releases](https://github.com/jerryc127/hexo-theme-butterfly/releases) for version notes and `_config` changes.
- 💬 **Want to chat?** → Join the [Telegram group](https://t.me/bu2fly).

### 🎯 Contributing

Want to help? Contributions of every kind are welcome:

- **Code** — Fix bugs, add features, improve performance
- **Documentation** — Improve docs, translate pages, write tutorials
- **Design** — UI/UX improvements, color schemes, icons
- **Testing** — Try new features, report issues, share feedback
- **Funding** — [Sponsor the project](https://buy.stripe.com/3cs6rP6YA91sbbG5kk) to support ongoing development

<a id="license"></a>

## 📄 License

This project is licensed under the [Apache 2.0 License](LICENSE).

## 🙏 Acknowledgments

This theme is based on [hexo-theme-melody](https://github.com/Molunerfinn/hexo-theme-melody). Thanks to its author for the inspiration and solid foundation.

Thanks to everyone who has contributed to Butterfly — your support keeps the theme moving forward.

---

<div align="center">

**✨ If you find this theme useful, please give it a ⭐ star! ✨**
</div>
