import * as test  from 'blue-tape'

import FixtureClass from '../tests/fixtures/fixture-class'

import Constructor from './constructor'

test('Constructor<TYPE> smoke testing', async t => {
  type TYPE = typeof FixtureClass & Constructor<FixtureClass>
  type PROTOTYPE = TYPE['prototype']

  /**
   * Make sure that `PROTOTYPE` is equal to `typeof FixtureClass`
   * See also: https://stackoverflow.com/a/50116912/1123955
   */
  let instance: PROTOTYPE
  instance = new FixtureClass(1, 2)

  t.equal(instance.sum(), 3, 'should sum right for 1 + 2')
})
