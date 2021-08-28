/**
 * Huan(202011)
 *  Create a `looseInstanceOfClass` to check `FileBox` and `Puppet` instances #2090
 *    https://github.com/wechaty/wechaty/issues/2090
 *
 * `instanceof`: checking by constructor name.
 */

function looseInstanceOfClass<T extends { new (...args: any): any }> (klass: T) {
  return (o: any): o is InstanceType<T> => {
    if (o instanceof klass) {
      /**
       * Singleton Module
       */
      return true
    } else if (o && o.constructor && o.constructor.name === klass.name) {
      /**
       * Different Module Class with the same name
       *  with a direct instance class
       */
      return true
    } else if (o && o.constructor && Reflect.getPrototypeOf(o.constructor.prototype)?.constructor.name === klass.name) {
      /**
       * Different Module class with the same name
       *  but the instance is a child class
       */
      return true
    }

    return false
  }
}

export { looseInstanceOfClass }
