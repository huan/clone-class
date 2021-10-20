import type { Constructor } from './constructor.js'

const interfaceOfClass = <C extends Constructor> (Klass: C) => {
  /**
   * Get properties of a class
   * @see https://stackoverflow.com/a/40637896/1123955
   */
  const instance = new Klass()
  const instanceProperties = Object.getOwnPropertyNames(instance)

  return <I extends {}> () => (target: any): target is I => {
    const prototypeProperties = Object
      .getOwnPropertyNames(Klass.prototype)

    // console.info('properties', prototypeProperties)
    return [
      ...instanceProperties,
      ...prototypeProperties,
    ].every(prop => prop in target)
  }
}

export { interfaceOfClass }
