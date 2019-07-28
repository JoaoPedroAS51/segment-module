import { parse as parseCookie, serialize as serializeCookie } from 'cookie'
import { isUnset, isSet, decodeValue, encodeValue } from './utilities'

export default class Storage {
  constructor (ctx, options) {
    this.ctx = ctx
    this.options = options
  }

  // ------------------------------------
  // Universal
  // ------------------------------------

  setUniversal (key, value) {
    // Unset null, undefined
    if (isUnset(value)) {
      return this.removeUniversal(key)
    }

    // Cookies
    this.setCookie(key, value)

    // Local Storage
    this.setLocalStorage(key, value)

    return value
  }

  getUniversal (key) {
    // Cookies
    let value = this.getCookie(key)

    // Local Storage
    if (isUnset(value)) {
      value = this.getLocalStorage(key)
    }

    return value
  }

  syncUniversal (key, defaultValue) {
    let value = this.getUniversal(key)

    if (isUnset(value) && isSet(defaultValue)) {
      value = defaultValue
    }

    if (isSet(value)) {
      this.setUniversal(key, value)
    }

    return value
  }

  removeUniversal (key) {
    this.removeLocalStorage(key)
    this.removeCookie(key)
  }

  // ------------------------------------
  // Local storage
  // ------------------------------------

  setLocalStorage (key, value) {
    // Unset null, undefined
    if (isUnset(value)) {
      return this.removeLocalStorage(key)
    }

    if (typeof localStorage === 'undefined' || !this.options.localStorage) {
      return
    }

    const _key = this.options.localStorage.prefix + key

    try {
      localStorage.setItem(_key, encodeValue(value))
    } catch (e) {
      if (!this.options.ignoreExceptions) {
        throw e
      }
    }

    return value
  }

  getLocalStorage (key) {
    if (typeof localStorage === 'undefined' || !this.options.localStorage) {
      return
    }

    const _key = this.options.localStorage.prefix + key

    const value = localStorage.getItem(_key)

    return decodeValue(value)
  }

  removeLocalStorage (key) {
    if (typeof localStorage === 'undefined' || !this.options.localStorage) {
      return
    }

    const _key = this.options.localStorage.prefix + key
    localStorage.removeItem(_key)
  }

  // ------------------------------------
  // Cookies
  // ------------------------------------
  getCookies () {
    const cookieStr = process.client
      ? document.cookie
      : this.ctx.req.headers.cookie

    return parseCookie(cookieStr || '') || {}
  }

  setCookie (key, value, options = {}) {
    if (!this.options.cookie || (process.server && !this.ctx.res)) {
      return
    }

    const _key = this.options.cookie.prefix + key
    const _options = Object.assign({}, this.options.cookie.options, options)
    const _value = encodeValue(value)

    // Unset null, undefined
    if (isUnset(value)) {
      _options.maxAge = -1
    }

    // Accept expires as a number for js-cookie compatiblity
    if (typeof _options.expires === 'number') {
      _options.expires = new Date(new Date() * 1 + _options.expires * 864e+5)
    }

    const serializedCookie = serializeCookie(_key, _value, _options)

    if (process.client) {
      // Set in browser
      document.cookie = serializedCookie
    } else if (process.server && this.ctx.res) {
      // Send Set-Cookie header from server side
      const prevCookies = this.ctx.res.getHeader('Set-Cookie')
      this.ctx.res.setHeader('Set-Cookie', [].concat(prevCookies, serializedCookie).filter(v => v))
    }

    return value
  }

  getCookie (key) {
    if (!this.options.cookie || (process.server && !this.ctx.req)) {
      return
    }

    const _key = this.options.cookie.prefix + key

    const cookies = this.getCookies()

    const value = cookies[_key] ? decodeURIComponent(cookies[_key]) : undefined

    return decodeValue(value)
  }

  removeCookie (key, options) {
    this.setCookie(key, undefined, options)
  }
}
