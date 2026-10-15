import type { MapInOut } from '../../map-in-out.ts';

/**
 * Creates a `MapInOut` that divides values by `divisor` and vice-versa.
 */
export function perDivisor(divisor: number): MapInOut<number, number> {
  return Object.freeze({
    inOut: (value: number): number => value / divisor,
    outIn: (value: number): number => value * divisor,
  });
}
