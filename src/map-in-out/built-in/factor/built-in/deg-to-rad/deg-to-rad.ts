import type { MapInOut } from '../../../../map-in-out.ts';
import { mapInOutFactor } from '../../map-in-out-factor.ts';

/**
 * Converts degrees to radians.
 */
export const DEG_TO_RAD: MapInOut<number, number> = mapInOutFactor(Math.PI / 180);
