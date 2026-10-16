import type { MapInOut } from '../../map-in-out.ts';

/**
 * Creates a `MapInOut` that multiplies values by `factor` and vice-versa.
 */
export function mapInOutFactor(factor: number): MapInOut<number, number> {
  return Object.freeze({
    inOut: (value: number): number => value * factor,
    outIn: (value: number): number => value / factor,
  });
}
