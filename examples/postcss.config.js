module.exports = {
	plugins: [
		require('postcss-smart-import')({}),
		require('precss')({}),
		require('autoprefixer')({ browsers: ['last 2 version'] })
	]
}
