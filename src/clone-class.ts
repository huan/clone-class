
/**
 * Clone Class for easy savig Information into Static Properties
 * https://github.com/Chatie/wechaty/issues/518
 */
export const VERSION = require('../package.json').version as string

// https://github.com/Microsoft/TypeScript/issues/10262
// https://github.com/Microsoft/TypeScript/pull/13743
// https://github.com/Microsoft/TypeScript/issues/5843#issuecomment-290972055
export type Constructor<T> = new(...args: any[]) => T

// tslint:disable-next-line:variable-name
export function cloneClass<T extends Constructor<{}>>(OriginalClass: T): T {

  class NewClass extends OriginalClass {
    constructor(...args: any[]) {
      super(...arguments)
    }
  }
  return NewClass
}

// // https://stackoverflow.com/a/38311757/1123955
// export type ClassConstructor<T> = {
//   // new(): T
//   [P in keyof typeof T]: (typeof T)[P]
// }

export function instanceToClass<T, C>(instance: T, baseClass: C): C {
  return instance.constructor as any as C
}

export default cloneClass
