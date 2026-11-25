import * as assert from 'node:assert/strict'
import {
  VERSION,
  cloneClass,
} from 'clone-class'

console.log(`VERSION v${VERSION}`)

class Fixture {}
const Cloned = cloneClass(Fixture)

assert.notEqual(Cloned, Fixture, 'should be cloned')

const inst = new Cloned()
assert.ok(inst instanceof Fixture)

console.log('Smoke Testing PASSED!')
