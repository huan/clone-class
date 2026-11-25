import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import { FixtureClass } from '../tests/fixtures/fixture-class.ts'
import { cloneClass } from './clone-class.ts'
import { instanceToClass } from './instance-to-class.ts'

test('instanceToClass smoke testing', () => {
  const instance = new FixtureClass(1, 2)
  const SameFixtureClass = instanceToClass(instance, FixtureClass)
  assert.equal(SameFixtureClass, FixtureClass, 'should get back the same Class for its own instance')
})

test('instanceToClass work with extended class', () => {
  class ChildFixtureClass extends FixtureClass {}
  const anotherInstance = new ChildFixtureClass(3, 4)
  const SameChildFixtureClass = instanceToClass(anotherInstance, FixtureClass)
  assert.equal(SameChildFixtureClass, ChildFixtureClass, 'should get back ChildFixtureClass for instance from its child class')
})

test('instanceToClass work with cloneClass', () => {
  const ChildFixtureClass = cloneClass(FixtureClass)
  ;(ChildFixtureClass as any).n = 42
  const anotherInstance = new ChildFixtureClass(3, 4)
  const SameChildFixtureClass = instanceToClass(anotherInstance, FixtureClass)
  assert.equal(SameChildFixtureClass, ChildFixtureClass, 'should get back ChildFixtureClass for instance from its child class')
  assert.equal((SameChildFixtureClass as any).n, 42, 'should get exactly the class with 42')
  assert.equal((FixtureClass as any).n, undefined, 'should has not affect the original class')
})
