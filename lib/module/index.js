const { resolve, join } = require('path')
const { readdirSync } = require('fs')
const defaults = require('./defaults')
const libRoot = resolve(__dirname, '..')

module.exports = function (moduleOptions) {
  const options = {
    ...defaults,
    ...this.options.segment,
    ...this.options['segment-analytics'],
    ...this.options.segmentAnalytics,
    ...moduleOptions
  }

  // Copy all core templates
  copyCore.call(this, options)

  // Copy plugin
  copyPlugin.call(this, { options })

  function copyCore (options) {
    const coreRoot = resolve(libRoot, 'core')

    for (const file of readdirSync(coreRoot)) {
      this.addTemplate({
        src: resolve(coreRoot, file),
        fileName: join('segment-analytics', file)
      })
    }
  }

  function copyPlugin ({ options }) {
    this.addPlugin({
      src: resolve(libRoot, 'module', 'plugin.js'),
      fileName: join('segment-analytics', 'plugin.js'),
      options
    })
  }
}

module.exports.meta = require('../../package.json')
