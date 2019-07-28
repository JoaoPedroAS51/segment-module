const { resolve, join } = require('path')
const { readdirSync } = require('fs')
const consola = require('consola')
const defaults = require('./defaults')
const libRoot = resolve(__dirname, '..')
const logger = consola.withScope('nuxt:segment')

module.exports = function (moduleOptions) {
  const options = {
    ...defaults,
    ...this.options.segment,
    ...this.options['segment-analytics'],
    ...this.options.segmentAnalytics,
    ...moduleOptions
  }

  // Validate and Normalize options
  validateOptions.call(this, options)

  // Copy all core templates
  copyCore.call(this, options)

  // Copy plugin
  copyPlugin.call(this, { options })

  function validateOptions (options) {
    // Enforce client and server keys because segment depends on it
    if (!options.client.disable && !options.clientKey) {
      logger.error('Please, provide `clientKey` to enable Segment Analytics in the client side.')
    }

    if (!options.server.disable && !options.serverKey) {
      logger.error('Please, provide `serverKey` to enable Segment Analytics in the server side.')
    }
  }

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
