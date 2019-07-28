module.exports = {
  // -- Client Configuration --
  client: {
    disable: false
  },

  // -- Server Configuration --
  server: {
    flushAt: 20,
    flushInterval: 10000,
    disable: false
  },

  // --Auto Page Tracking --
  autoPageTracking: {
    enable: true
  },

  // -- Debug --
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
