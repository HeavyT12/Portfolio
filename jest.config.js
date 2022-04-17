module.exports = {
	moduleDirectories: [
		"node_modules",
		"src",
		"src/components",
		"src/pages",
		"src/plugins",
		"src/util"
	],
	moduleFileExtensions: [
		"js",
		"json",
		"vue"
	],
	transform: {
		".*\\.vue$": "vue-jest",
		".*\\.js$": "babel-jest"
	},
	transformIgnorePatterns: [
		"/node_modules/(?!(vuetify|lodash-es)/)"
	],
	testEnvironment: "jsdom",
	setupFilesAfterEnv: [
		"<rootDir>/jest.setup.js"
	],
	moduleNameMapper: {
		"\\.(css|scss|sass)$": "<rootDir>/mock.js"
	}
}