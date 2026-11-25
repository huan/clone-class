import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import { FixtureClass } from '../tests/fixtures/fixture-class.ts'
import type { Constructor } from './constructor.ts'

type AssertEqual<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false

test('Constructor<TYPE> smoke testing', () => {
  type TYPE = typeof FixtureClass & Constructor<FixtureClass>
  type PROTOTYPE = TYPE['prototype']

  const instance: PROTOTYPE = new FixtureClass(1, 2)
  assert.equal(instance.sum(), 3, 'should sum right for 1 + 2')
})

test('Constructor<T> with private constructor class', () => {
  class PrivateConstructorClass {
    private constructor () {}
  }

  const C = PrivateConstructorClass as any as Constructor<PrivateConstructorClass>
  const c = new C()
  assert.ok(c, 'should be able to instantiate')

  const typeTest: AssertEqual<typeof c, PrivateConstructorClass> = true
  assert.ok(typeTest, 'should be same after constructor')
})

test('class with static methods', () => {
  class StaticMethodClass {
    static staticMethod () {}
    protected constructor () {}
  }

  const C: typeof StaticMethodClass = StaticMethodClass as any as Constructor<StaticMethodClass, typeof StaticMethodClass>
  assert.equal(typeof C.staticMethod, 'function')
})
