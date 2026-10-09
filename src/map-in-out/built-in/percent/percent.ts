import type { MapInOut } from '../../map-in-out.ts';

/**
 * Converts a percentage to a decimal.
 */
export const PERCENT: MapInOut<number, number> = Object.freeze({
  inOut: (percent: number): number => percent / 100,
  outIn: (decimal: number): number => decimal * 100,
});
