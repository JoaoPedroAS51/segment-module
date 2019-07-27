const { resolve } = require('path')

module.exports = async function (moduleOptions) {
  const options = {
    ...this.options.segment,
    ...this.options['segment-analytics'],
    ...this.options.segmentAnalytics,
    ...moduleOptions
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'segment-analytics.js',
    options
  })
}

module.exports.meta = require('../package.json')
