/**
 * Butterfly
 * ramdom cover
 */

"use strict";

const { CreateShuffleClosure } = require("./util");

hexo.extend.generator.register("post", function (locals) {
	const {
		cover: { default_cover: defaultCover },
	} = hexo.theme.config;

	let randomCoverFn;

	if (!defaultCover) {
		randomCoverFn = () => false;
		return;
	}
	if (!Array.isArray(defaultCover)) {
		randomCoverFn = () => defaultCover;
		return;
	}

	randomCoverFn = CreateShuffleClosure(defaultCover);

	// sort posts
	locals.posts = locals.posts.sort("-date");

	return locals.posts.map((post) => {
		const imgTestReg = /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/i;
		let { cover: coverVal, top_img: topImg } = post;

		// Add path to top_img and cover if post_asset_folder is enabled
		if (hexo.config.post_asset_folder) {
			if (topImg && topImg.indexOf("/") === -1 && imgTestReg.test(topImg))
				post.top_img = `${post.path}${topImg}`;
			if (coverVal && coverVal.indexOf("/") === -1 && imgTestReg.test(coverVal))
				post.cover = `${post.path}${coverVal}`;
		}

		if (coverVal === false) return post;

		// If cover is not set, use random cover
		if (!coverVal) {
			const randomCover = randomCoverFn();
			post.cover = randomCover;
			coverVal = randomCover; // update coverVal
		}

		if (coverVal && (coverVal.indexOf("//") !== -1 || imgTestReg.test(coverVal))) {
			post.cover_type = "img";
		}
		return post;
	});
});
