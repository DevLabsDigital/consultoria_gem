// config/webpack/environment.js
const { environment } = require('@rails/webpacker')

const babelLoader = environment.loaders.get('babel')
babelLoader.exclude = /node_modules\/(?!(react-table)\/).*/

module.exports = environment