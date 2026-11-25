export class FixtureClass {

  public static staticNumber = 0

  public static staticMethod (n: number) {
    this.staticNumber = n
  }

  public i: number
  public j: number

  constructor (
    i: number,
    j: number,
  ) {
    this.i = i
    this.j = j
  }

  public sum () {
    return this.i + this.j + (this.constructor as any).staticNumber
  }

}

export default FixtureClass
