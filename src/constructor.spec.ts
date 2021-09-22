import { test } from 'tstest'

import { FixtureClass } from '../tests/fixtures/fixture-class.js'

import type { Constructor } from './constructor.js'

test('Constructor<TYPE> smoke testing', async t => {
  type TYPE = typeof FixtureClass & Constructor<FixtureClass>
  type PROTOTYPE = TYPE['prototype']

  /**
   * Make sure that `PROTOTYPE` is equal to `typeof FixtureClass`
   * See also: https://stackoverflow.com/a/50116912/1123955
   */
  const instance: PROTOTYPE = new FixtureClass(1, 2)

  t.equal(instance.sum(), 3, 'should sum right for 1 + 2')
})
