export class FixtureClass {
  public static staticNumber = 0

  public static staticMethod(n: number) {
    this.staticNumber = n
  }

  constructor(
    public i: number,
    public j: number,
  ) {
    //
  }

  public sum() {
    return this.i + this.j + (this.constructor as any).staticNumber
  }
}

export default FixtureClass
