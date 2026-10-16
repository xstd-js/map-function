import type { MapInOut } from '../../../../map-in-out.ts';
import { mapInOutFactor } from '../../map-in-out-factor.ts';

/**
 * Converts a permillage to a decimal.
 */
export const PERMILLE: MapInOut<number, number> = mapInOutFactor(0.001);
