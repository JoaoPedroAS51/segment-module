const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  modules: ['@@'],
  segmentAnalytics: {
    clientKey: 'FtemCAFovZ2U4NJEP0TIFAztzNoA7TTX',
    serverKey: 'TJxJenYvRgMXARtnVVsfSNkHiTjXWrkN'
  }
}
