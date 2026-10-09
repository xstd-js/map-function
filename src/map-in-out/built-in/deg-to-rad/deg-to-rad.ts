import type { MapInOut } from '../../map-in-out.ts';

/**
 * Converts degrees to radians.
 */
export const DEG_TO_RAD: MapInOut<number, number> = Object.freeze({
  inOut: (deg: number): number => deg * (Math.PI / 180),
  outIn: (rad: number): number => rad * (180 / Math.PI),
});
