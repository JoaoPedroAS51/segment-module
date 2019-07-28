const pkg = require('../package')
const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  head: {
    title: 'Segment Analytics',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: ['@@'],
  segmentAnalytics: {
    clientKey: 'FtemCAFovZ2U4NJEP0TIFAztzNoA7TTX',
    serverKey: 'TJxJenYvRgMXARtnVVsfSNkHiTjXWrkN',
    autoPageTracking: true,
    debug: true
  }
}
