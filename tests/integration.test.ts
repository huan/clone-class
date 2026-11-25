import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  cloneClass,
  instanceToClass,
  interfaceOfClass,
  looseInstanceOfClass,
  VERSION,
} from '../src/mod.ts'
import { FixtureClass } from './fixtures/fixture-class.ts'

test('integration: cloneClass, instanceToClass, interfaceOfClass, looseInstanceOfClass', () => {
  assert.ok(VERSION)
  const Cloned = cloneClass(FixtureClass)
  const inst = new Cloned(10, 20)
  assert.equal(inst.sum(), 30)

  const FoundClass = instanceToClass(inst, FixtureClass)
  assert.equal(FoundClass, Cloned)

  const isLoose = looseInstanceOfClass(FixtureClass)(inst)
  assert.ok(isLoose)

  const checkInterface = interfaceOfClass(FixtureClass)()
  assert.ok(checkInterface(inst))
})
