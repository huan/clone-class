
/**
 * Clone Class for easy savig Information into Static Properties
 * https://github.com/Chatie/wechaty/issues/518
 */
import Constructor from './constructor'

// tslint:disable-next-line:variable-name
export function cloneClass<T extends Constructor<{}>>(OriginalClass: T): T {

  class AnotherOriginalClass extends OriginalClass {
    constructor(...args: any[]) {
      super(...args)
    }
  }
  Reflect.defineProperty(AnotherOriginalClass, 'name', {
    value: OriginalClass.name,
  })
  return AnotherOriginalClass
}

export default cloneClass
