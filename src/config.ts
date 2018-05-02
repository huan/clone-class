export const VERSION = require('../package.json').version as string

// // https://stackoverflow.com/a/38311757/1123955
// export type ClassConstructor<T> = {
//   // new(): T
//   [P in keyof typeof T]: (typeof T)[P]
// }
