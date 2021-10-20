import type { Constructor } from './constructor.js'

const interfaceOfClass = <C extends Constructor> (Klass: C) => {
  /**
   * Get properties of a class
   * @see https://stackoverflow.com/a/40637896/1123955
   */
  /**
   * Huan(202110): we decide not to check the instance properties
   *  because the instance properties are not always the same as the class properties
   */
  // const instance = new Klass()
  // const instanceProperties = Object.getOwnPropertyNames(instance)

  const prototypeProperties = Object
    .getOwnPropertyNames(Klass.prototype)

  return <I extends {}> () =>
    (target: any): target is I =>
      prototypeProperties
        .every(prop => prop in target)
}

export { interfaceOfClass }
