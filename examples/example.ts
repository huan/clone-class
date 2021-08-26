import assert from 'assert'

import {
  cloneClass,
  instanceToClass,
}                   from '../src/mod'

class Employee {

  public static company: string

  constructor (
    public name: string,
  ) {
  }

  public info () {
    console.info(`Employee ${this.name}, Company ${(this.constructor as any).company}`)
  }

}

console.info(`
# Example 1: cloneClass()
`)

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

console.info(`
# Example 2: instanceToClass()
`)

const RestoreGoogleEmployee = instanceToClass(employeeGg, Employee)
assert(RestoreGoogleEmployee === GoogleEmployee, 'Should get back the Class which instanciated the instance')
assert(RestoreGoogleEmployee !== Employee, 'Should be different with the parent Class')

const anotherEmployee = new RestoreGoogleEmployee('Mary')
anotherEmployee.info()
// Output: Employee Mary, Company Google

console.info()
