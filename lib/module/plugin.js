import Vue from 'vue'
import Client from './client'
import Server from './server'

export default function (ctx, inject) {
  // Options
  const options = <%= JSON.stringify(options) %>

  // Create a new Segment instances
  const $segmentClient = new Client(ctx, options)
  const $segmentServer = new Server(ctx, options)

  // Inject them to nuxt context as $segment
  if (process.server) {
    inject('segment', $segmentServer)
    $segmentServer.init()
  } else {
    $segmentClient.init()
    inject('segment', $segmentClient)
  }
}
