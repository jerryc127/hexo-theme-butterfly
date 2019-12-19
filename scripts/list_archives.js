"use strict";

hexo.extend.helper.register("list_archives", function(options = {}) {
  const { config } = this;
  const archiveDir = config.archive_dir;
  const { timezone } = config;
  const lang = this.page.lang || this.page.language || config.language;
  let { format } = options;
  const type = options.type || "monthly";
  const { style = "list", transform, separator = ", " } = options;
  const showCount = Object.prototype.hasOwnProperty.call(options, "show_count")
    ? options.show_count
    : true;
  const order = options.order || -1;
  const limit = 8;
  let result = "";

  var more_button;
  if (lang === "zh-CN") {
    more_button = "查看更多";
  } else if (lang === "zh-TW") {
    more_button = "查看更多";
  } else {
    more_button = "More";
  }

  if (!format) {
    format = type === "monthly" ? "MMMM YYYY" : "YYYY";
  }

  const posts = this.site.posts.sort("date", order);
  if (!posts.length) return result;

  const data = [];
  let length = 0;

  posts.forEach(post => {
    // Clone the date object to avoid pollution
    let date = post.date.clone();

    if (timezone) date = date.tz(timezone);
    if (lang) date = date.locale(lang);

    const year = date.year();
    const month = date.month() + 1;
    const name = date.format(format);
    const lastData = data[length - 1];

    if (!lastData || lastData.name !== name) {
      length = data.push({
        name,
        year,
        month,
        count: 1
      });
    } else {
      lastData.count++;
    }
  });

  const link = item => {
    let url = `${archiveDir}/${item.year}/`;

    if (type === "monthly") {
      if (item.month < 10) url += "0";
      url += `${item.month}/`;
    }

    return this.url_for(url);
  };

  result += `<ul class="archive-list">`;

  for (let i = 0, len = data.length; i < Math.min(len, limit); i++) {
    const item = data[i];

    result += `<li class="archive-list-item">`;

    result += `<a class="archive-list-link" href="${link(item)}">`;
    result += `<span class="archive-list-date">`;
    result += transform ? transform(item.name) : item.name;
    result += `</span>`;

    if (showCount) {
      result += `<span class="archive-list-count">${item.count}</span>`;
    }
    result += "</a>";
    result += "</li>";
  }

  if (data.length > limit) {
    result += `<li class="archive-list-item">`;
    result +=
      `<a class="archive-list-link-more" href="` +
      "/" +
      `${archiveDir}" >`;
    result += more_button;
    result += "</a>";
    result += "</li>";
  }
  result += "</ul>";
  return result;
});
