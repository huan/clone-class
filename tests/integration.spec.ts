#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import { test }  from 'tstest'

test('tbw', async t => {
  t.ok(true, 'tbw')
})
