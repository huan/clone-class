export function instanceToClass<T, C>(instance: T, baseClass: C): C {
  return instance.constructor as any as (typeof baseClass /* C */ )
}

export default instanceToClass
