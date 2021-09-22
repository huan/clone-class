import {
  Constructor,
  constructor,
}                               from './constructor.js'
import { VERSION }              from './config.js'
import { instanceToClass }      from './instance-to-class.js'
import { looseInstanceOfClass } from './loose-instance-of-class.js'

import { cloneClass } from './clone-class.js'

export type {
  Constructor,
}
export {
  cloneClass,
  constructor,
  instanceToClass,
  looseInstanceOfClass,
  VERSION,
}
