import { constructor } from './constructor.js'

/**
 * Huan(202011)
 *  Create a `looseInstanceOfClass` to check `FileBox` and `Puppet` instances #2090
 *    https://github.com/wechaty/wechaty/issues/2090
 *
 * `instanceof`: checking by constructor name.
 */

// function looseInstanceOfClass<T extends { new (...args: any): any }> (klass: T) {
function looseInstanceOfClass<T> (klass: T) {
  /**
   * Huan(202109): using constructor() to work with the following two conditions:
   *  1. for private constructor class
   *  2. for abstract class
   *
   * Warning: the InstantiatableClass is not really instanciatable:
   *  it's just for typing compatible inside this function
   */
  const InstantiatableClass = constructor(klass)

  return (o: any): o is InstanceType<typeof InstantiatableClass> => {
    if (!(o && o.constructor)) {
      /**
       * Not a class?
       */
      return false
    }

    if (o instanceof InstantiatableClass) {
      /**
       * Singleton Module
       */
      return true
    }

    if (o.constructor.name === InstantiatableClass.name) {
      /**
       * Different Module Class with the same name
       *  with a direct instance class
       */
      return true
    }

    const parent = Reflect.getPrototypeOf(o.constructor.prototype)
    if (!parent) {
      /**
       * No parent class
       */
      return false
    }

    if (parent.constructor.name === InstantiatableClass.name) {
      /**
       * Different Module class with the same name
       *  but the instance is a child class
       */
      return true
    }

    /**
     * Not match any of the above
     */
    return false
  }
}

export { looseInstanceOfClass }
