import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import { FileBox } from 'file-box'
import type { Constructor } from './constructor.ts'
import { looseInstanceOfClass } from './loose-instance-of-class.ts'

type AssertEqual<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false

test('looseInstanceOfClass: instanceof', () => {
  class TestClass {}
  const looseInstanceOfTest = looseInstanceOfClass(TestClass)
  const instance = new TestClass()
  assert.ok(looseInstanceOfTest(instance), 'should be true for a real TestClass')
})

test('looseInstanceOfClass: constructor.name', () => {
  class TestClass {}
  const looseInstanceOfTest = looseInstanceOfClass(TestClass)

  const OrigTest = TestClass
  assert.equal(TestClass, OrigTest, 'should be the same class reference at beginning')

  {
    class TestClass {}
    assert.notEqual(OrigTest, TestClass, 'should have a new TestClass different to the original')
    const f = new TestClass()
    assert.ok(looseInstanceOfTest(f), 'should be true for the same name class')
  }
})

test('looseInstanceOfClass: n/a', () => {
  class TestClass {}
  const looseInstanceOfTest = looseInstanceOfClass(TestClass)

  const FIXTURES = [
    {},
    undefined,
    [],
    null,
    0,
    NaN,
    true,
    false,
    new Date(),
    new Error(),
    new Map(),
    new Set(),
    new WeakMap(),
  ]

  for (const fixture of FIXTURES) {
    assert.ok(!looseInstanceOfTest(fixture), `should be false for ${typeof fixture}`)
  }
})

test('looseInstanceOfClass for FileBox', () => {
  const f = FileBox.fromQRCode('test')
  const looseInstanceOfFileBox = looseInstanceOfClass(FileBox as any as Constructor<FileBox>)

  const OrigFileBox = FileBox
  {
    class FileBox {}
    assert.notEqual(OrigFileBox, FileBox, 'should be two different FileBox classes')
    assert.ok(f instanceof OrigFileBox, 'should be instanceof OrigFileBox')
    assert.ok(!(f instanceof FileBox), 'should not be instanceof another FileBox class')
    assert.ok(looseInstanceOfFileBox(f), 'should be true for looseInstanceOfFileBox because same name')
  }
})

test('looseInstanceOfClass for child class', () => {
  class TestClass {}
  class ChildTest extends TestClass {}
  const looseInstanceOfTest = looseInstanceOfClass(TestClass)

  const c = new ChildTest()
  assert.ok(looseInstanceOfTest(c), 'should be true for child class instance')
})

test('looseInstanceOfClass for two same name parent class with a child class', () => {
  class Puppet {}
  const OrigPuppet = Puppet
  const looseInstanceOfPuppet = looseInstanceOfClass(OrigPuppet)

  {
    class Puppet {}
    class ChildPuppet extends Puppet {}

    const c = new ChildPuppet()
    assert.ok(!(c instanceof OrigPuppet), 'c is not an OrigPuppet instance')
    assert.ok(looseInstanceOfPuppet(c), 'should be true for child class of same named parent')
  }
})

test('looseInstanceOfClass for private constructor', () => {
  class PrivateConstructorClass {
    static create () { return new PrivateConstructorClass() }
    private constructor () {}
  }

  const looseInstanceOfPrivate = looseInstanceOfClass(
    PrivateConstructorClass as any as Constructor<PrivateConstructorClass>,
  )
  const instance = PrivateConstructorClass.create()
  assert.ok(looseInstanceOfPrivate(instance), 'should work with private constructor')
})

test('looseInstanceOfClass for abstract class', () => {
  abstract class AbstractClass {}
  class ChildClass extends AbstractClass {}

  const looseInstanceOfAbstract = looseInstanceOfClass(
    AbstractClass as any as Constructor<AbstractClass>,
  )
  const instance = new ChildClass()
  assert.ok(looseInstanceOfAbstract(instance), 'should work with abstract class')
})

test('looseInstanceOfClass for type guard', () => {
  const box: string | FileBox = {} as any
  const looseInstanceOfFileBox = looseInstanceOfClass(FileBox as any as Constructor<FileBox>)

  const typeTest1: AssertEqual<typeof looseInstanceOfFileBox, (o: any) => o is FileBox> = true
  assert.ok(typeTest1, 'should get type guard')

  if (looseInstanceOfFileBox(box)) {
    const typeTest2: AssertEqual<typeof box, FileBox> = true
    assert.ok(typeTest2, 'should get FileBox type guard')
  } else {
    const typeTest3: AssertEqual<typeof box, string> = true
    assert.ok(typeTest3, 'should get string type guard')
  }
})
