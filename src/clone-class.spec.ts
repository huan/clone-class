#!/usr/bin/env ts-node
/**
 *   Wechaty - https://github.com/chatie/wechaty
 *
 *   @copyright 2016-2018 Huan LI <zixia@zixia.net>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
// tslint:disable:variable-name

import * as test  from 'blue-tape'
// import * as sinon from 'sinon'

import cloneClass       from './clone-class'

import FixtureClass from '../tests/fixtures/fixture-class'

test('cloneClass smoke testing', async t => {
  const EXPECTED_NUMBER1 = 1
  const EXPECTED_NUMBER2 = 2

  const NewClass1 = cloneClass(FixtureClass)
  const NewClass2 = cloneClass(FixtureClass)

  t.ok(NewClass1.prototype instanceof FixtureClass, 'should extend right')

  t.notEqual(NewClass1, NewClass2,    'NewClass1 should different with NewClass2')
  t.notEqual(NewClass1, FixtureClass, 'NewClass1 should different with FixtureClass')

  NewClass1.staticMethod(EXPECTED_NUMBER1)
  t.equal(NewClass1.staticNumber, EXPECTED_NUMBER1, 'should set static number to EXPECTED_NUMBER1')

  NewClass2.staticMethod(EXPECTED_NUMBER2)
  t.equal(NewClass2.staticNumber, EXPECTED_NUMBER2, 'should set static number to EXPECTED_NUMBER2')

  const nc1 = new NewClass1(EXPECTED_NUMBER1, EXPECTED_NUMBER2)
  const nc2 = new NewClass2(EXPECTED_NUMBER1, EXPECTED_NUMBER2)

  t.ok(nc1 instanceof FixtureClass, 'nc1 should instanceof FixtureClass')
  t.ok(nc1 instanceof NewClass1,    'nc1 should  instanceof NewClass1')

  t.equal(nc1.sum(), EXPECTED_NUMBER1 + EXPECTED_NUMBER1 + EXPECTED_NUMBER2, 'should sum right for 1 + 1 + 2')
  t.equal(nc2.sum(), EXPECTED_NUMBER2 + EXPECTED_NUMBER1 + EXPECTED_NUMBER2, 'should sum right for 2 + 1 + 2')
})

test('cloneClass return NewClass with Original Name', async t => {
  const NewClass = cloneClass(FixtureClass)
  t.equal(NewClass.name, FixtureClass.name, 'should clone the same name for Class')
})

test('static properties should be isolated', async t => {
  class Fixture {
    public static mol = 42

    public static load(): number {
      return this.mol
    }

    public static save(n: number): void {
      this.mol = n
    }
  }

  const C1 = cloneClass(Fixture)
  const C2 = cloneClass(Fixture)

  t.equal(C1.load(), 42, 'should be 42 by default')

  C1.save(17)
  t.equal(C1.load(), 17, 'should be 17 after set')
  t.equal(C2.load(), 42, 'should be 42 by default no mater than what value C1.mol is')

  t.notEqual(C1.mol, C2.mol, 'should not equal after cloneClass')
})

