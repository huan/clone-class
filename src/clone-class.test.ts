import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import { FixtureClass } from '../tests/fixtures/fixture-class.ts'
import { cloneClass } from './clone-class.ts'

test('cloneClass smoke testing', () => {
  const EXPECTED_NUMBER1 = 1
  const EXPECTED_NUMBER2 = 2

  const NewClass1 = cloneClass(FixtureClass)
  const NewClass2 = cloneClass(FixtureClass)

  assert.ok(NewClass1.prototype instanceof FixtureClass, 'should extend right')

  assert.notEqual(NewClass1, NewClass2, 'NewClass1 should different with NewClass2')
  assert.notEqual(NewClass1, FixtureClass, 'NewClass1 should different with FixtureClass')

  NewClass1.staticMethod(EXPECTED_NUMBER1)
  assert.equal(NewClass1.staticNumber, EXPECTED_NUMBER1, 'should set static number to EXPECTED_NUMBER1')

  NewClass2.staticMethod(EXPECTED_NUMBER2)
  assert.equal(NewClass2.staticNumber, EXPECTED_NUMBER2, 'should set static number to EXPECTED_NUMBER2')

  const nc1 = new NewClass1(EXPECTED_NUMBER1, EXPECTED_NUMBER2)
  const nc2 = new NewClass2(EXPECTED_NUMBER1, EXPECTED_NUMBER2)

  assert.ok(nc1 instanceof FixtureClass, 'nc1 should instanceof FixtureClass')
  assert.ok(nc1 instanceof NewClass1, 'nc1 should instanceof NewClass1')

  assert.equal(nc1.sum(), EXPECTED_NUMBER1 + EXPECTED_NUMBER1 + EXPECTED_NUMBER2, 'should sum right for 1 + 1 + 2')
  assert.equal(nc2.sum(), EXPECTED_NUMBER2 + EXPECTED_NUMBER1 + EXPECTED_NUMBER2, 'should sum right for 2 + 1 + 2')
})

test('cloneClass return NewClass with Original Name', () => {
  const NewClass = cloneClass(FixtureClass)
  assert.equal(NewClass.name, FixtureClass.name, 'should clone the same name for Class')
})

test('cloneClass rejects static property initialized to object', () => {
  class BadClass {
    static data = { invalid: true }
  }
  assert.throws(() => cloneClass(BadClass as any), /static property initialized to an object/)
})
