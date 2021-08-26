#!/usr/bin/env node --loader ts-node/esm

import { test }  from 'tstest'

test('tbw', async t => {
  t.ok(true, 'tbw')
})
