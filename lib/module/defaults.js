module.exports = {
  // -- Client Configuration --
  client: {
    autoPageTracking: true,
    disable: false
  },

  // -- Server Configuration --
  server: {
    flushAt: 20,
    flushInterval: 10000,
    disable: false
  },

  // Debug
  debug: false,

  // -- Cookie Store --

  cookie: {
    prefix: 'ajs_',
    options: {
      path: '/'
    }
  },

  // -- localStorage Store --

  localStorage: {
    prefix: 'ajs_'
  }
}
