module.exports = {
  // -- Client Configuration --
  client: {

  },

  // -- Server Configuration --
  server: {
    flushAt: 20,
    flushInterval: 10000
  },

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
