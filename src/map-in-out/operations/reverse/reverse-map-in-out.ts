import type { MapInOut } from '../../map-in-out.ts';

/**
 * Reverse the in/out operations of a map-in-out function.
 */
export function reverseMapInOut<GIn, GOut>({
  inOut,
  outIn,
}: MapInOut<GIn, GOut>): MapInOut<GOut, GIn> {
  return Object.freeze({
    inOut: outIn,
    outIn: inOut,
  });
}
