#!/usr/bin/env bash
set -e

npm run dist
# must use `dist/` instead of `dist`
# or npm will re-pack a npm module named `dist` from npmjs.com
npm run pack

TMPDIR="/tmp/npm-pack-testing.$$"
mkdir "$TMPDIR"
mv *-*.*.*.tgz "$TMPDIR"
cp tests/fixtures/smoke-testing.ts "$TMPDIR"

cd $TMPDIR
npm init -y
npm install *-*.*.*.tgz \
  @types/node \
  typescript \

./node_modules/.bin/tsc \
  --lib esnext,dom \
  --noEmitOnError \
  --noImplicitAny \
  smoke-testing.ts

node smoke-testing.js
