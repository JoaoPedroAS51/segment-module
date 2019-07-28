import Debugger from './debugger'
import loadScript from 'load-script'

const consola = require('consola')
const logger = consola.withScope('nuxt:segment')

export default class Client {
  constructor (ctx, options) {
    this.ctx = ctx
    this.options = options

    this.segment = []
    this.invoked = false

    // Debugger
    this.$debugger = new Debugger(ctx, options)
  }

  init () {
    this.segment = window.analytics = window.analytics || []

    // If the real analytics.js is already on the page
    // or if the snippet was invoked already, bail.
    if (this.segment.initialize || this.invoked) return

    // Invoked flag, to make sure the snippet
    // is never invoked twice.
    this.invoked = this.segment.invoked = true

    // Add a version to keep track of what's in the wild.
    this.segment.SNIPPET_VERSION = '4.1.0'

    // For each of our methods, generate a queueing stub.
    for (const key of METHODS) {
      this[key] = this.segment[key] = this.factory(key)
    }

    if (this.options.debug === false) {
      loadScript(`https://cdn.segment.com/analytics.js/v1/${this.options.clientKey}/analytics.min.js`, (error, script) => {
        if (error) {
          logger.warn('Ops! Is not possible to load Segment Analytics script')
        }

        const poll = setInterval(() => {
          if (!this.segment) return

          clearInterval(poll)

          // Initialize auto page tracking
          if (this.options.client.autoPageTracking === true) {
            this._autoPageTracking()
          }
        }, 10)
      })
    } else {
      // Initialize auto page tracking
      if (this.options.client.autoPageTracking === true) {
        this._autoPageTracking()
      }
    }
  }

  // Define a factory to create stubs. These are placeholders
  // for methods in Analytics.js so that you never have to wait
  // for it to load to actually record data. The `method` is
  // stored as the first argument, so we can replay the data.
  factory (method) {
    return function () {
      const args = Array.prototype.slice.call(arguments)

      if (this.options.debug === true) {
        this.$debugger.log(method.charAt(0).toUpperCase() + method.slice(1), args)
      } else {
        args.unshift(method)
        this.segment.push(args)
        return this.segment
      }
    }
  }

  _autoPageTracking () {
    this.ctx.app.router.afterEach((to, from) => {
      // Make a page call for each navigation event
      setTimeout(() => {
        this.page(to.name || '', {
          path: to.fullPath,
          referrer: window.location.origin + from.fullPath,
          title: document.title,
          url: window.location.origin + to.fullPath
        })
      }, 1000)
    })
  }
}

// A list of the methods in Analytics.js to stub.
const METHODS = [
  'trackSubmit',
  'trackClick',
  'trackLink',
  'trackForm',
  'pageview',
  'identify',
  'reset',
  'group',
  'track',
  'ready',
  'alias',
  'debug',
  'page',
  'once',
  'off',
  'on'
]
