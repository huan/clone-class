import { Constructor }          from './constructor.js'
import { VERSION }              from './config.js'
import { instanceToClass }      from './instance-to-class.js'
import { looseInstanceOfClass } from './loose-instance-of-class.js'

import { cloneClass } from './clone-class.js'

export {
  cloneClass,
  Constructor,
  instanceToClass,
  looseInstanceOfClass,
  VERSION,
}
export default cloneClass
