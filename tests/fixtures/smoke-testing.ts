import assert from 'assert'

import {
  VERSION,
  cloneClass
} from          'clone-class'

console.log(`VERSION v${VERSION}`)

class Fixture {}

const Cloned = cloneClass(Fixture)

assert(Cloned !== Fixture, 'should be cloned')
console.log('Smoking Testing PASSED!')
