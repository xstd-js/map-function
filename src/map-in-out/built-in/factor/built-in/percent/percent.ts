import type { MapInOut } from '../../../../map-in-out.ts';
import { mapInOutFactor } from '../../map-in-out-factor.ts';

/**
 * Converts a percentage to a decimal.
 */
export const PERCENT: MapInOut<number, number> = mapInOutFactor(0.01);
