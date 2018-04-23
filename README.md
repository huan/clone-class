# CLONE CLASS
[![NPM Version](https://badge.fury.io/js/clone-class.svg)](https://badge.fury.io/js/clone-class)
[![Build Status](https://api.travis-ci.org/zixia/node-clone-class.svg?branch=master)](https://travis-ci.org/zixia/node-clone-class)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)

Clone an ES6 Class as Another Class Name for Isolating Class Static Properties. 

## EXAMPLE

### Shell

```shell
$ npm i clone-class
```

### TypeScript

```ts
import cloneClass from 'clone-class'

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

const GoogleEmployee = cloneClass(Employee)
GoogleEmployee.company = 'Google'

const MicrosoftEmployee = cloneClass(Employee)
MicrosoftEmployee.company = 'Microsoft'

const employee1 = new GoogleEmployee('Tom')
const employee2 = new MicrosoftEmployee('Jerry')

employee1.info()
// Output: Employee Tom, Company Google
employee2.info()
// Output: Employee Jerry, Company Microsoft
```

The most tricky part of this code is `(this.constructor as any).company`.

It will be very clear after we break down it as the following steps:

1. `this.constructor` is the constructor function of the class, which shuold be the _class function_ itself.
1. `company` is a static properity defined in `Employee` class, which will be set as a property on the _class function_.
1. So `this.constructor.company` is equal to `Employee.company`, except that we will not need to know the exact name of the class, `Employee` in this case. We use this pattern is because we need to visit the _class function_ even we do not know it's name.

## CHANGELOG

### v0.2.0 (Apr 2018)

First publish version.

### v0.0.1 (Apr 23, 2018)

Initial version, seprecated from Project Wechaty.

## AUTHOR

[Huan LI](http://linkedin.com/in/zixia) \<zixia@zixia.net\>

<a href="https://stackexchange.com/users/265499">
  <img src="https://stackexchange.com/users/flair/265499.png" width="208" height="58" alt="profile for zixia on Stack Exchange, a network of free, community-driven Q&amp;A sites" title="profile for zixia on Stack Exchange, a network of free, community-driven Q&amp;A sites">
</a>

## COPYRIGHT & LICENSE

* Code & Docs © 2016-2018 Huan LI \<zixia@zixia.net\>
* Code released under the Apache-2.0 License
* Docs released under Creative Commons

[downloads-image]: http://img.shields.io/npm/dm/wechaty.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/wechaty
