import Storage from './storage'
import Debugger from './debugger'

const Analytics = require('analytics-node')
const uuidv4 = require('uuid/v4')

export default class Client {
  constructor (ctx, options) {
    this.ctx = ctx
    this.options = options

    this.segment = undefined
    this.invoked = false

    // Storage & Debugger
    this.$storage = new Storage(ctx, options)
    this.$debugger = new Debugger(ctx, options)
  }

  init () {
    if (this.options.serverKey) {
      this.segment = new Analytics(this.options.serverKey, {
        flushAt: this.options.debug ? 1 : this.options.flushAt,
        flushInterval: this.options.flushInterval
      })
    }

    // If the snippet was invoked already, bail.
    if (this.invoked) return

    // Invoked flag, to make sure the it
    // is never invoked twice.
    this.invoked = true
  }

  anonymousId () {
    let anonymousId = this.$storage.getUniversal('anonymous_id') || null

    if (!anonymousId) {
      anonymousId = uuidv4()

      this.$storage.setUniversal('anonymous_id', String(anonymousId))
    }

    return anonymousId
  }

  userId () {
    return this.$storage.getUniversal('user_id') || null
  }

  async identify (userId = null, traits = {}, options = {}) {
    return new Promise((resolve) => {
      const anonymousId = options.anonymousId || this.anonymousId()

      if (this.options.debug === true) {
        this.$debugger.log('Identify', {
          userId: userId,
          traits,
          timestamp: options.timestamp || 'default',
          context: options.context || 'default',
          integrations: options.integrations || 'default',
          anonymousId: anonymousId
        })
      } else {
        this.segment.identify({
          userId: userId,
          traits: traits,
          timestamp: options.timestamp,
          context: options.context,
          integrations: options.integrations,
          anonymousId: anonymousId
        })
      }

      // Still save the user id in debug mode.
      if (userId !== null) {
        this.$storage.setUniversal('user_id', String(userId))
      }

      setTimeout(resolve, 300)
    })
  }

  async track (event = null, properties = {}, options = {}) {
    return new Promise((resolve) => {
      const userId = options.userId || this.userId()
      const anonymousId = options.anonymousId || this.anonymousId()

      if (this.options.debug === true) {
        this.$debugger.log('Track', {
          event,
          properties,
          timestamp: options.timestamp || 'default',
          context: options.context || 'default',
          integrations: options.integrations || 'default',
          userId,
          anonymousId
        })
      } else {
        this.segment.track({
          event: event,
          properties: properties,
          timestamp: options.timestamp,
          context: options.context,
          integrations: options.integrations,
          userId: userId,
          anonymousId: anonymousId
        })
      }

      setTimeout(resolve, 300)
    })
  }

  async page (param1 = null, param2 = null, param3 = {}, param4 = {}) {
    return new Promise((resolve) => {
      let category = param1
      let name = param2
      let properties = param3
      let options = param4
      const userId = options.userId || this.userId()
      const anonymousId = options.anonymousId || this.anonymousId()

      if (typeof param1 === 'string') {
        if (param2 === null || typeof param2 !== 'string') {
          category = null
          name = param1
        }
      }

      if (typeof param2 === 'object') {
        properties = param2
        options = param3
      }

      if (this.options.debug === true) {
        this.$debugger.log('Page', {
          category,
          name,
          properties: {
            ...{
              url: this.ctx.req.headers.host + this.ctx.route.fullPath,
              path: this.ctx.route.fullPath,
              title: this.ctx.app.head.title
            },
            ...properties
          },
          timestamp: options.timestamp || 'default',
          context: options.context || 'default',
          integrations: options.integrations || 'default',
          userId,
          anonymousId
        })
      } else {
        this.segment.page({
          category: category,
          name: name,
          properties: {
            ...{
              url: this.ctx.req.headers.host + this.ctx.route.fullPath,
              path: this.ctx.route.fullPath,
              title: this.ctx.app.head.title
            },
            ...properties
          },
          timestamp: options.timestamp,
          context: options.context,
          integrations: options.integrations,
          userId: userId,
          anonymousId: anonymousId
        })
      }

      setTimeout(resolve, 300)
    })
  }

  async group (groupId = null, traits = {}, options = {}) {
    return new Promise((resolve) => {
      const userId = options.userId || this.userId()
      const anonymousId = options.anonymousId || this.anonymousId()

      if (this.options.debug === true) {
        this.$debugger.log('Group', {
          groupId,
          traits,
          timestamp: options.timestamp,
          context: options.context,
          integrations: options.integrations,
          userId,
          anonymousId
        })
      } else {
        this.segment.group({
          groupId: groupId,
          traits: traits,
          timestamp: options.timestamp || 'default',
          context: options.context || 'default',
          integrations: options.integrations || 'default',
          userId: userId,
          anonymousId: anonymousId
        })
      }

      setTimeout(resolve, 300)
    })
  }

  async alias (userId = null, previousId = null, options = {}) {
    return new Promise((resolve) => {
      previousId = previousId || this.anonymousId()

      if (this.options.debug === true) {
        this.$debugger.log('Alias', {
          userId,
          previousId: previousId.replace('"', ''),
          timestamp: options.timestamp || 'default',
          context: options.context || 'default',
          integrations: options.integrations || 'default'
        })
      } else {
        this.segment.alias({
          userId: userId,
          previousId: previousId,
          timestamp: options.timestamp,
          context: options.context,
          integrations: options.integrations
        })
      }

      setTimeout(resolve, 300)
    })
  }
}
