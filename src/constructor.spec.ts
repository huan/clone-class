#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import {
  test,
  AssertEqual,
}               from 'tstest'

import { FixtureClass } from '../tests/fixtures/fixture-class.js'

import {
  Constructor,
  constructor,
}                   from './constructor.js'

test('Constructor<TYPE> smoke testing', async t => {
  type TYPE = typeof FixtureClass & Constructor<FixtureClass>
  type PROTOTYPE = TYPE['prototype']

  /**
   * Make sure that `PROTOTYPE` is equal to `typeof FixtureClass`
   * See also: https://stackoverflow.com/a/50116912/1123955
   */
  const instance: PROTOTYPE = new FixtureClass(1, 2)

  t.equal(instance.sum(), 3, 'should sum right for 1 + 2')
})

test('constructor()', async t => {
  /**
   * Issue #55
   *  https://github.com/huan/clone-class/issues/55
   */
  class PrivateConstructorClass {

    private constructor () {}

  }

  const C = constructor(PrivateConstructorClass)

  const typeTest: AssertEqual<typeof C, PrivateConstructorClass> = true
  t.ok(typeTest, 'should be same after constructor')
})
