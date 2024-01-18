"use strict";

// 一个通用的洗牌序列包装函数
const CreateShuffleClosure = (arr) => {
	if (arr.length < 2) {
		console.warn("The shuffle list must have at least two elements.");
		return () => false;
	}

	const shuffledArray = [...arr];
	const currentShuffleList = [];
	let lastChioce;

	const shuffle = () => {
		// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
		let cur = arr.length;
		while (cur !== 0) {
			const rand = Math.floor(Math.random() * cur);
			cur--;

			// Swap elements between currentIndex and randomIndex
			const tmp = shuffledArray[cur];
			shuffledArray[cur] = shuffledArray[rand];
			shuffledArray[rand] = tmp;
		}
		return [...shuffledArray]; // Return a new shuffled array
	};

	const getOneFromShuffled = () => {
		// flush shuffledList if necessary
		if (currentShuffleList.length === 0) {
			do {
				currentShuffleList.splice(0);
				currentShuffleList.push(...shuffle());
			} while (currentShuffleList[currentShuffleList.length - 1] === lastChioce);
		}

		lastChioce = currentShuffleList.pop();
		return lastChioce;
	};

	return getOneFromShuffled;
};

module.exports = {
	CreateShuffleClosure,
};
