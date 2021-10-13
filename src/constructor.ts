/**
 * Huan LI <zixia@zixia.net>
 */

/**
 * Constructor<T>
 *  https://stackoverflow.com/a/50116912/1123955
 *
 * See also:
 *  - https://github.com/Microsoft/TypeScript/issues/10262
 *  - https://github.com/Microsoft/TypeScript/issues/5843#issuecomment-290972055
 *  - https://github.com/Microsoft/TypeScript/pull/13743
 *
 *  - Types for classes as values in TypeScript
 *      https://2ality.com/2020/04/classes-as-values-typescript.html
 */
/**
 * Huan(202108) version:
 *
 * T: the `Class`
 * P: `typeof Class`
 */

export type ClassInterface<C> = {
  [key in keyof C]: C[key];
}

type InstanceInterface <I> = {
  new (...args: any[]): I
  prototype: I
}

type Constructor<I extends {} = {}> = InstanceInterface<I>

/**
 * Huan(202110): TypeError: Cannot read property 'valueDeclaration' of undefined #58
 *  https://github.com/huan/clone-class/issues/58
 *
 * - Update Oct 13: `typescript@4.5.0-beta` not fix
 */
// type Constructor<I extends {} = {}, C = any> = ClassInterface<C> & InstanceInterface<I>

// type Constructor<T extends Object> = {
//   new (...args: any[]): T
//   prototype: T
// }

/**
 * Huan(202109) versino:
 */
// type Constructor<T> = Function & { prototype: T }

/**
 * https://github.com/wechaty/wechaty/issues/2090
 *
 * Warning: the InstantiatableClass returned by `constructor()` is not really instanciatable:
 *  it's just for typing compatible for some special conditions
 */

export type {
  Constructor,
}
