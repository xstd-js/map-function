import type { MapInOut } from '../../map-in-out.ts';
import { perDivisor } from '../per-divisor/per-divisor.ts';

/**
 * Converts a value expressed in tenths to a decimal.
 */
export const DECI: MapInOut<number, number> = perDivisor(10);
