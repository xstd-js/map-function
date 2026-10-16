import type { MapInOut } from '../../../../map-in-out.ts';
import { mapInOutFactor } from '../../map-in-out-factor.ts';

/**
 * Converts a value expressed in tenths to a decimal.
 */
export const DECI: MapInOut<number, number> = mapInOutFactor(0.1);
