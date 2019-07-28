/* eslint-disable no-console */
const colors = require('ansicolor')

export default class Debugger {
  constructor (ctx, options) {
    this.ctx = ctx
    this.options = options
  }

  log (method, args) {
    if (!this.options.debug) return

    console.log('\n')
    console.group(colors.cyan('[Segment Analytics Debug]\n'))
    console.log(`${colors.magenta(method)} method called\n`)

    if (args) {
      Object.keys(args).forEach((key) => {
        let value = args[key]

        if (!value) {
          value = colors.red(String(value))
        }

        if (typeof value === 'string' && value !== 'default') {
          value = `"${value}"`
        }

        if (value === 'default') {
          value = colors.cyan(String(value))
        }

        console.log(colors.green(`${key}:`), value)
      })
    }
    console.groupEnd()
  }
}
