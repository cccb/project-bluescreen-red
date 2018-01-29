

/*
 * Remap a source interval onto a target interval:
 *
 * e.g. 0..1 -> 0..255
 *      0.255 -> 0..100
 *
 */
export function remap(smin, smax, dmin, dmax, value) {
  if (value > smax || value < smin) {
    throw "value out of range";
  }
  let nval = (value - smin) / (smax - smin);
  let result = dmin + (nval * (dmax - dmin));

  return result;
}

