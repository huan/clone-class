import { Constructor } from './constructor'

export function instanceToClass<
  T extends Constructor<{}>,
  C,
> (
  instance: InstanceType<T>,
  baseClass: C,
): C {
  return instance.constructor as any as (typeof baseClass /* C */ )
}

export default instanceToClass
