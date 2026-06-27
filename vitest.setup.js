// jsdom does not implement the browser APIs Vuetify relies on; stub them so
// components can mount in the test environment.

globalThis.ResizeObserver = class {
	observe() {}
	unobserve() {}
	disconnect() {}
};

if (!globalThis.matchMedia) {
	globalThis.matchMedia = () => ({
		matches: false,
		media: '',
		onchange: null,
		addEventListener() {},
		removeEventListener() {},
		addListener() {},
		removeListener() {},
		dispatchEvent() { return false; }
	});
}

if (!globalThis.visualViewport) {
	globalThis.visualViewport = {
		width: 1024,
		height: 768,
		addEventListener() {},
		removeEventListener() {}
	};
}
