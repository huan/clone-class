import type { Constructor } from './constructor.ts'

const interfaceOfClass = <C extends Constructor> (Klass: C) => {
  const propertySet: Set<string> = new Set()

  let currentPrototype: undefined | {} = Klass.prototype

  while (currentPrototype && currentPrototype !== Object.prototype) {
    Object
      .getOwnPropertyNames(currentPrototype)
      .filter(property => property !== 'constructor') // ignore `constructor`
      .filter(property => !property.startsWith('_'))  // ignore property names starting with `_`
      .forEach(prop => propertySet.add(prop))
    currentPrototype = Object.getPrototypeOf(currentPrototype)
  }

  if (propertySet.size === 0) {
    throw new Error(`${Klass.name} has no prototype properties`)
  }

  return <I extends {}> () =>
    (target: any): target is I => {

      if (target instanceof Object) {
        return [...propertySet]
          .every(prop => prop in target)
      }
      return false

    }
}

export { interfaceOfClass }
