import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import { interfaceOfClass } from './interface-of-class.ts'

type AssertEqual<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false

test('interfaceOfClass() class instance', () => {
  class TestClass {
    foo () { return 'bar' }
  }
  interface TestInterface extends TestClass {}

  const interfaceOfTest = interfaceOfClass(TestClass)<TestInterface>()
  const instance = new TestClass()
  assert.ok(interfaceOfTest(instance), 'should be true for the instance of class')
})

test('interfaceOfClass() an object with the same properties of the instance', () => {
  class TestClass {
    id () { return 'id' }
  }
  interface TestInterface extends TestClass {}

  const interfaceOfTest = interfaceOfClass(TestClass)<TestInterface>()
  const instance = new TestClass()

  const copy = {
    ...instance,
  } as any

  Object.getOwnPropertyNames(
    Object.getPrototypeOf(instance),
  ).forEach(prop => {
    copy[prop] = instance[prop as keyof TestClass]
  })

  function NOT_CLASS_CONSTRUCTOR () {}
  const target = {
    ...copy,
    constructor: NOT_CLASS_CONSTRUCTOR,
  }

  assert.ok(interfaceOfTest(target), 'should pass instance validation test')

  delete (target as any).id
  assert.ok(!interfaceOfTest(target), 'should not be a valid interface if it lacks any property')
})

test('interfaceOfClass for type guard', () => {
  class TestClass {
    id () { return 'id' }
  }
  interface TestInterface extends TestClass {}

  const target: string | TestInterface = {} as any
  const interfaceOfTest = interfaceOfClass(TestClass)<TestInterface>()

  const typeTest1: AssertEqual<
    typeof interfaceOfTest,
    (o: any) => o is TestInterface
  > = true
  assert.ok(typeTest1, 'should get interfaceOfTest type guard')

  if (interfaceOfTest(target)) {
    const typeTest2: AssertEqual<typeof target, TestClass> = true
    assert.ok(typeTest2, 'should get TestClass type guard')
  } else {
    const typeTest3: AssertEqual<typeof target, string> = true
    assert.ok(typeTest3, 'should get string type guard')
  }
})

test('interfaceOfClass() for primitive types', () => {
  class TestImpl {
    id () { return 'id' }
  }
  interface TestInterface extends TestImpl {}

  const interfaceOfTest = interfaceOfClass(TestImpl)<TestInterface>()

  const PRIMITIVE_VALUES = [
    'string',
    42,
    null,
    undefined,
    BigInt('432413243214123412341234123412412'),
    {},
    [],
    true,
    false,
    Symbol('test'),
    NaN,
    Infinity,
    -Infinity,
  ] as const

  for (const val of PRIMITIVE_VALUES) {
    assert.equal(interfaceOfTest(val), false, `should get false for primitive values ${typeof val}`)
  }
})

test('interfaceOfClass() for empty interface', () => {
  class EmptyClass {}
  interface EmptyInterface extends EmptyClass {}

  assert.throws(() => interfaceOfClass(EmptyClass)<EmptyInterface>(), /has no prototype properties/)
})

test('interfaceOfClass() for parent/child class', () => {
  class Parent {
    parent () { return 'parent' }
  }

  class Child extends Parent {
    child () { return 'child' }
  }

  interface ChildInterface extends Child {}

  const interfaceOfChild = interfaceOfClass(Child)<ChildInterface>()

  const FIXTURES = [
    [new Child(), true],
    [new Parent(), false],
    [{ parent: true }, false],
    [{ child: true }, false],
    [{ child: true, parent: true }, true],
  ] as const

  for (const [target, expected] of FIXTURES) {
    assert.equal(interfaceOfChild(target), expected)
  }
})

test('interfaceOfClass() an object without properties starting with _', () => {
  class TestClass {
    id () { return 'id' }
    _foo () { return 'bar' }
  }
  interface TestInterface extends TestClass {}

  const interfaceOfTest = interfaceOfClass(TestClass)<TestInterface>()
  const instance = new TestClass()

  const copy = {
    ...instance,
  } as any

  Object.getOwnPropertyNames(
    Object.getPrototypeOf(instance),
  ).forEach(prop => {
    copy[prop] = instance[prop as keyof TestClass]
  })

  function NOT_CLASS_CONSTRUCTOR () {}
  const target = {
    ...copy,
    constructor: NOT_CLASS_CONSTRUCTOR,
  }

  assert.ok(interfaceOfTest(target), 'should pass instance validation test')

  delete (target as any)._foo
  assert.ok(interfaceOfTest(target), 'should be a valid interface even without _foo')
})
