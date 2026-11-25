import type { Constructor } from './constructor.ts'

const looseInstanceOfClass = <C extends Constructor> (Klass: C) => (target: any): target is InstanceType<C> => {
  if (target instanceof Klass) {
    return true
  }

  if (!target || typeof target !== 'object') {
    return false
  }

  if (typeof target.constructor !== 'function') {
    return false
  }

  if (target.constructor.name === Klass.name) {
    return true
  }

  const parent = Reflect.getPrototypeOf(target.constructor.prototype)
  if (!parent) {
    return false
  }

  if (parent.constructor.name === Klass.name) {
    return true
  }

  return false
}

export { looseInstanceOfClass }
