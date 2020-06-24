[![Build Status](https://travis-ci.org/jkomyno/is-equally-spaced.svg?branch=master)](https://travis-ci.org/jkomyno/is-equally-spaced)
[![npm version](https://badge.fury.io/js/is-equally-spaced.svg)](https://www.npmjs.com/package/is-equally-spaced)
[![Downloads](https://img.shields.io/npm/dm/is-equally-spaced.svg)](https://www.npmjs.com/package/is-equally-spaced)

# is-equally-spaced

IsEquallySpaced is a simple utility function that given an array of numbers, evaluates wether or not every element is equally spaced, i.e.
if every subsequent couple of numbers in the array has the same distance.
The best case complexity of this algorithm is O(1) and the worst is O(n).

------------------------------------------------------------------------------------------------------------------------------------------------------

## Installing

- with npm:
```sh
npm install --save is-equally-spaced
```

- with yarn
```sh
yarn add is-equally-spaced
```

## Typings

This package is written in TypeScript.
The following types are exported:

```typescript
export interface EquallySpacedResult {
  /**
   * It's the distance (approximated to the precision you need) between the first two
   * elements of the array.
   */
  distance: number;
  /**
   * isEqual is true if and only if every subsequent couple of items in the array
   * has the same distance (approximated to the precision you need) from the next one.
   */
  isEqual: boolean;
}
export type IsEquallySpaced = (arr: number[], precision?: number) => EquallySpacedResult;
```

## How to import

```typescript
import isEquallySpaced, { EquallySpacedResult, IsEquallySpaced } from 'is-equally-spaced';
```

## Usage

Just take a look at the signature of the method:

```typescript
/**
 * Given an array of numbers, evaluates wether or not every element is equally spaced, i.e.
 * if every subsequent couple of numbers in the array has the same distance.
 * The best case complexity of this algorithm is O(1) and the worst is O(n).
 * @param arr Array of numbers, which can be integer or floats
 * @param precision The number of digits after the decimal points to consider in order
 *                  to evaluate two subsequent distances as equal.
 *                  This is only useful when dealing with floats, and defaults to 8.
 */
const isEquallySpaced: IsEquallySpaced = (arr, precision = 8);
```

# Example

Consider the following array (with indexes in the upper row, and values in the bottom row).
It's equally spaced since every subsequent couple, having indexes, `(0,1), (1,2), (2,3)` and values
`(0,0.44), (0.44,0.88), (0.88,1.33)` has the same distance: `0.44`.

| 0    | 1    | 2    | 3    |
| ---- | ---- | ---- | ---- |
| 0    | 0.44 | 0.88 | 1.33 |

The situation above translates to the following code:

```typescript
const arr: number[] = [0, 0.44, 0.88, 1.33];
console.log(isEquallySpaced(arr, 2)); // { distance: 0.44, isEqual: true }
```

Hovever, if we set `0` as `precision`, the obtained result will be quite different:

```typescript
const arr: number[] = [0, 0.44, 0.88, 1.33];
console.log(isEquallySpaced(arr, 0)); // { distance: 0, isEqual: true }
```

This is due to the fact that the distance is evaluated in the following way:

- isEqual = true;
- d<sub>0,1</sub> = 0.44 - 0 = 0.44; --> approximated to 0
- distance = d<sub>0,1</sub>;
- d<sub>1,2</sub> = 0.88 - 0.44 = 0.44; --> approximated to 0, which is == d<sub>0,1</sub>
- d<sub>2,3</sub> = 1.33 - 0.88 = 0.44; --> approximated to 0, which is == d<sub>1,2</sub>

which gives ```{ distance: 0, isEqual: true }```

Please take a look at the tests to check out every possible nuance and other example of using this package.

## Related packages

- [fixed-math](https://github.com/jkomyno/fixed-math): utility function that converts a decimal number using fixed-point notation,
without using the expensive Number.toFixed

## Contributing

Of course PRs are welcome! Before contributing, however, please be sure to run `npm run test:ci` or `yarn test:ci`,
in order to check if the code you wrote respects the linting conventions and if it doesn't break any test. Please
try to keep the unit test code coverage at 100%.
