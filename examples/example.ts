// tslint:disable:variable-name
import cloneClass from '../src/clone-class'

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
