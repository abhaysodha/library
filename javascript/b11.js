export function debounce(fn, delay) {
	let timer;

	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, args);
		}, delay);
	};
}

export function throttle(fn, limit) {
	let lastCall = -Infinity;

	return function (...args) {
		const now = Date.now();
		if (now - lastCall >= limit) {
			lastCall = now;
			fn.apply(this, args);
		}
	};
}

// search box: debounce because here if user types quickly, we want to wait until they stop typing before making the api call so that will work
// window scroll: throttle runs at most once per interval while scrolling
