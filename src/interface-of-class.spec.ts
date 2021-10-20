#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

/**
 *   Wechaty Chatbot SDK - https://github.com/wechaty/wechaty
 *
 *   @copyright 2016 Huan LI (李卓桓) <https://github.com/huan>, and
 *                   Wechaty Contributors <https://github.com/wechaty>.
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
import {
  test,
  AssertEqual,
}               from 'tstest'

import { interfaceOfClass } from './interface-of-class.js'

test('interfaceOfClass() class instance', async t => {
  class Test {}
  interface TestInterface extends Test {}

  const interfaceOfTest = interfaceOfClass(Test)<TestInterface>()
  const test = new Test()
  t.ok(interfaceOfTest(test), 'should be true for the instance of class')
})

test('interfaceOfClass() a object with the same properties of the instance', async t => {
  class Test {

    id () { return 'id' }

  }
  interface TestInterface extends Test {}

  const interfaceOfTest = interfaceOfClass(Test)<TestInterface>()
  const test = new Test()

  const copy = {
    ...test,
  } as any

  Object.getOwnPropertyNames(
    Object.getPrototypeOf(test),
  ).forEach(prop => {
    copy[prop] = test[prop as keyof Test]
  })

  function NOT_CLASS_CONSTRUCTOR () {}
  const target = {
    ...copy,
    constructor: NOT_CLASS_CONSTRUCTOR,
  }

  // console.info('target', target)
  t.ok(interfaceOfTest(target), 'should not pass instance validation instance test')

  delete target.id
  t.notOk(interfaceOfTest(target), 'should not be a valid interface if it lack any property')
})

test('interfaceOfClass for type guard', async t => {
  class Test {

    id () { return 'id' }

  }
  interface TestInterface extends Test {}

  const target: string | TestInterface = {} as any

  const interfaceOfTest = interfaceOfClass(Test)<TestInterface>()

  const typeTest1: AssertEqual<
    typeof interfaceOfTest,
    (o: any) => o is TestInterface
  > = true

  t.ok(typeTest1, 'should get interfaceOfTest type guard')

  if (interfaceOfTest(target)) {

    const typeTest2: AssertEqual<
      typeof target,
      Test
    > = true

    t.ok(typeTest2, 'should get Test type guard')

  } else {

    const typeTest3: AssertEqual<
      typeof target,
      string
    > = true

    t.ok(typeTest3, 'should get string type guard')

  }
})
