export const isUnset = o => typeof o === 'undefined' || o === null
export const isSet = o => !isUnset(o)

export function encodeValue (val) {
  if (typeof val === 'string') {
    return val
  }
  return JSON.stringify(val)
}

export function decodeValue (val) {
  // Try to parse as json
  if (typeof val === 'string') {
    try {
      return JSON.parse(val)
    } catch (_) { }
  }

  // Return as is
  return val
}
