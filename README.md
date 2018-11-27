# CLONE CLASS

[![Greenkeeper badge](https://badges.greenkeeper.io/huan/clone-class.svg)](https://greenkeeper.io/)
[![NPM Version](https://badge.fury.io/js/clone-class.svg)](https://badge.fury.io/js/clone-class)
[![Build Status](https://api.travis-ci.com/huan/clone-class.svg?branch=master)](https://travis-ci.com/huan/clone-class)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)

![Clone Class](https://huan.github.io/clone-class/images/clone-class-logo.png)

Clone an ES6 Class as Another Class Name for Isolating Class Static Properties. 

## EXAMPLE

Run the following example by:

```shell
$ git clone git@github.com:zixia/clone-class.git
$ cd clone-class
$ npm install
$ npm run example
```

### TypeScript

**[Example Source Code](https://github.com/huan/clone-class/blob/master/examples/example.ts):**

```ts
import * as assert from 'assert'

import {
  cloneClass,
  instanceToClass,
}                   from '../src/clone-class'

class Employee {
  public static company: string

  constructor(
    public name: string,
  ) {
  }

  public info() {
    console.log(`Employee ${this.name}, Company ${(this.constructor as any).company}`)
  }
}

/**
 * Example 1: `cloneClass()`
 */
const GoogleEmployee = cloneClass(Employee)
GoogleEmployee.company = 'Google'

const MicrosoftEmployee = cloneClass(Employee)
MicrosoftEmployee.company = 'Microsoft'

const employeeGg = new GoogleEmployee('Tom')
const employeeMs = new MicrosoftEmployee('Jerry')

employeeGg.info()
// Output: Employee Tom, Company Google
employeeMs.info()
// Output: Employee Jerry, Company Microsoft

/**
 * Example 2: `instanceToClass()`
 */
const RestoreGoogleEmployee = instanceToClass(employeeGg, Employee)
assert(RestoreGoogleEmployee === GoogleEmployee, 'Should get back the Class which instanciated the instance)
assert(RestoreGoogleEmployee !== Employee, 'Should be different with the parent Class')

const anotherEmployee = new RestoreGoogleEmployee('Mary')
anotherEmployee.info()
// Output: Employee Mary, Company Google
```

The most tricky part of this code is `(this.constructor as any).company`.

It will be very clear after we break down it as the following steps:

1. `this.constructor` is the constructor function of the class, which shuold be the _class function_ itself.
1. `company` is a static properity defined in `Employee` class, which will be set as a property on the _class function_.
1. So `this.constructor.company` is equal to `Employee.company`, except that we will not need to know the exact name of the class, `Employee` in this case. We use this pattern is because we need to visit the _class function_ even we do not know it's name.

## API

We have two APIs for dealing with the classes:

1. `cloneClass(OriginalClass)`: create a new Class that is `extend` from the `OriginalClass` which can isolate static properties for stored values, and return the new Class. 
1. `instanceToClass(instance, BaseClass)`: get the Class which had instanciated the `instance`, which is the `BaseClass`, or the child class of `BaseClass`, and return it.

### `cloneClass()`

```ts
const AnotherClass = cloneClass(OrignalClass)
const instance = new AnotherClass()
```

### `instanceToClass()`

```ts
const RestoredClass = instanceToClass(instance, OrignalClass)
assert(RestoredClass === AnotherClass, 'because `instance` was created by `new AnotherClass()`')
```

### `Constructor<T>`

```ts
const NewableClass: typeof AbstractClass & Constructor<AbstractClass>
const instance = new NewableClass()
```

It seems useless at first, but if you want to use manage many Child Class for a Abstract Class with typings, then it will be a must have tool.

## CHANGELOG

### v0.6 (May 2018)

1. add new function: `instanceToClass()` for getting back the `Class` from an existing `instance`.
1. add new type: `Constructor<T>` for adding `new (): T` to abstract class declaration.

### v0.4 (Apr 2018)

First publish version.

1. `cloneClass()` work as expected.

### v0.0.1 (Apr 23, 2018)

Initial version, code comes from Project Wechaty.

Learn more about the full story at Chatie blog: [New Feature: Multi-Instance Support for Wechaty v0.16(WIP)](https://blog.chatie.io/blessed-twins-bot/)

## SEE ALSO

An UseCase of `clone-class` can be found in an article writen by me from Chatie blog, it's also the place where this module comes from. It's Worth to spent some time to have a look if you are interested.

* [New Feature: Multi-Instance Support for Wechaty v0.16(WIP)](https://blog.chatie.io/blessed-twins-bot/)

* [TypeScript 2.1 keyof and Lookup Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html)
* [TypeScript Evolution](https://blog.mariusschulz.com/series/typescript-evolution)
* [TypeScript Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

## AUTHOR

[Huan LI](http://linkedin.com/in/zixia) \<zixia@zixia.net\>

<a href="https://stackexchange.com/users/265499">
  <img src="https://stackexchange.com/users/flair/265499.png" width="208" height="58" alt="profile for zixia on Stack Exchange, a network of free, community-driven Q&amp;A sites" title="profile for zixia on Stack Exchange, a network of free, community-driven Q&amp;A sites">
</a>

## COPYRIGHT & LICENSE

* Code & Docs © 2018 Huan LI \<zixia@zixia.net\>
* Code released under the Apache-2.0 License
* Docs released under Creative Commons
