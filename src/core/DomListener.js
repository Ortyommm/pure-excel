import {capitalize} from './utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided got DomListener`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      // то же самое, что и addEventListener
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(
          `Method ${method} is not implemented in ${name} Component`
        )
      }
      // if (!this[method]) return
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

// input => onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
