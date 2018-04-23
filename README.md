# CLONE CLASS

Clone an ES6 Class as Another Class Name for Isolating Static Properties in the Classes.

## EXAMPLE

### Shell

```shell
$ npm i clone-class
```

### TypeScript

```ts
import cloneClass from '../'

class Employee {
  public static company: string

  constructor(
    public name: string,
  ) {
  }

  public info() {
    console.log(`Employee ${this.name}, Company ${this.constructor.company}`)
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

## CHANGELOG

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
