const assert = require('assert')

const {
  VERSION,
  cloneClass,
} =  require('clone-class')

console.log(`VERSION v${VERSION}`)

class Fixture {}

const Cloned = cloneClass(Fixture)

assert(Cloned !== Fixture, 'should be cloned')
console.log('Smoking Testing PASSED!')
