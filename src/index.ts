import fixedMath from 'fixed-math';

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

/**
 * Given an array of numbers, evaluates wether or not every element is equally spaced, i.e.
 * if every subsequent couple of numbers in the array has the same distance.
 * The best case complexity of this algorithm is O(1) and the worst is O(n).
 * @param arr Array of numbers, which can be integer or floats
 * @param precision The number of digits after the decimal points to consider in order
 *                  to evaluate two subsequent distances as equal.
 *                  This is only useful when dealing with floats, and defaults to 8.
 */
const isEquallySpaced: IsEquallySpaced = (arr, precision = 8) => {
  const len = arr.length;

  /**
   * If the array is empty, or if it's a scalar, then there's no distance
   * to consider.
   */
  if (len === 0 || len === 1) {
    return {
      distance: 0,
      isEqual: true,
    };
  }

  /**
   * The distance between the first two elements of the array is taken as reference.
   */
  const distance = fixedMath(arr[1] - arr[0], precision, 'round');
  let isEqual = true;

  /**
   * The subsequent distances are evaluated with an approximation, in order to
   * allow small comparisons error when dealing with float numbers.
   */
  for (let i = 1; i < len - 1 && isEqual; ++i) {
    if (fixedMath(arr[i + 1] - arr[i], precision, 'round') !== distance) {
      isEqual = false;
    }
  }

  return {
    distance: Math.abs(distance),
    isEqual,
  };
};

export default isEquallySpaced;
