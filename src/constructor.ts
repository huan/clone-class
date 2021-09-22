/**
 * Huan LI <zixia@zixia.net>
 */

/**
 * Constructor<T>
 *  https://stackoverflow.com/a/50116912/1123955
 *
 * See also:
 *  https://github.com/Microsoft/TypeScript/issues/10262
 *  https://github.com/Microsoft/TypeScript/issues/5843#issuecomment-290972055
 *  https://github.com/Microsoft/TypeScript/pull/13743
 */
interface Constructor<T> {
  new(...args: any[]): T,
  prototype: T,
}

/**
 * https://github.com/wechaty/wechaty/issues/2090
 */
function constructor<T> (privateConstructor: T): Constructor<T> {
  return privateConstructor as any as Constructor<T>
}

export type {
  Constructor,
}
export {
  constructor,
}
