

/*
 * Remap a source interval onto a target interval:
 *
 * e.g. 0..1 -> 0..255
 *      0.255 -> 0..100
 *
 */
export const remap = (smin, smax, dmin, dmax, value) => {
  if (value > smax || value < smin) {
    throw new Error("value out of range");
  }
  let nval = (value - smin) / (smax - smin);
  let result = dmin + (nval * (dmax - dmin));

  return result;
}


/**
 * Convenience function for using remap.
 */
export const withRemap = 
  (smin, smax, dmin, dmax) =>
    (value) =>
      remap(smin, smax, dmin, dmax, value);

