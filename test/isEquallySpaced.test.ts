import isEquallySpaced from '../src/index';

describe('isEquallySpaced', () => {

  test(`If the array is empty, it should return a constant distance === 0`, () => {
    expect(isEquallySpaced([], 0)).toEqual({
      distance: 0,
      isEqual: true,
    });

    expect(isEquallySpaced([], 10)).toEqual({
      distance: 0,
      isEqual: true,
    });

    expect(isEquallySpaced([], -10)).toEqual({
      distance: 0,
      isEqual: true,
    });
  });

  test(`If the array is a single scalar, it should return a constant distance === 0`, () => {
    expect(isEquallySpaced([1], 0)).toEqual({
      distance: 0,
      isEqual: true,
    });

    expect(isEquallySpaced([1.5], 10)).toEqual({
      distance: 0,
      isEqual: true,
    });

    expect(isEquallySpaced([2.123456], -10)).toEqual({
      distance: 0,
      isEqual: true,
    });
  });

  test(`If the array contains floats, then the float numbers are rounded to the nearest
        element that has 'precision' digits after the decimal point`, () => {
    // 2.5 is rounded to 3
    expect(isEquallySpaced([0, 1, 2, 2.5], 0)).toEqual({
      distance: 1,
      isEqual: true,
    });

    /**
     * 4/9 (0.444...) is rounded to 0 when precision is 0, and due to the fact that
     * every element is distant 0.44... from the other, the distance is approximated to 0.
     */
    expect(isEquallySpaced([0, 4 / 9, 8 / 9, 12 / 9], 0)).toEqual({
      distance: 0,
      isEqual: true,
    });

    // (0.444...) is rounded to 0.4
    expect(isEquallySpaced([0, 0.4444, 0.8888, 1.3333], 1)).toEqual({
      distance: 0.4,
      isEqual: true,
    });

    // (0.4444 + 1e-8) is rounded to 0.44 when the precision is 2
    expect(isEquallySpaced([0, 0.4444 + 1e-8, 0.8888 + 1e-9, 1.3333 + 1e-5], 2)).toEqual({
      distance: 0.44,
      isEqual: true,
    });

    // (0.4444 + 1e-5) is kept as it is when the precision is 5
    expect(isEquallySpaced([0, 0.4444 + 1e-5, 0.8888 + 1e-6, 1.3333 + 1e-7], 5)).toEqual({
      distance: 0.4444 + 1e-5,
      isEqual: false,
    });
  });

  test(`If the array aren't equally spaced, the distance returned should be the space
        between the first two elements. isEqual should also be false`, () => {
    expect(isEquallySpaced([0, 1, 2, 2.5], 1)).toEqual({
      distance: 1,
      isEqual: false,
    });

    expect(isEquallySpaced([0, 1.5, 2.5, 3.5], 2)).toEqual({
      distance: 1.5,
      isEqual: false,
    });
  });

  test(`If the array has at least 2 elements, it should return isEqual if and only if the
        items are equally spaced`, () => {
    expect(isEquallySpaced([-1.25, 1.25], 2)).toEqual({
      distance: 2.5,
      isEqual: true,
    });

    expect(isEquallySpaced([1, -1], 0)).toEqual({
      distance: 2,
      isEqual: true,
    });

    expect(isEquallySpaced([1, -1, 1], 0)).toEqual({
      distance: 2,
      isEqual: false,
    });
  });

});