/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  let low = 0,
    high = x;
  if (x === 1) {
    return 1;
  }
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (mid * mid === x) {
      return mid;
    } else if (mid * mid > x) {
      if ((mid + 1) * (mid + 1) < x) {
        return mid;
      }
      high = mid;
    } else if (mid * mid < x) {
      if ((mid + 1) * (mid + 1) > x) {
        return mid;
      }
      low = mid;
    }
  }
};
console.log(mySqrt(2));
