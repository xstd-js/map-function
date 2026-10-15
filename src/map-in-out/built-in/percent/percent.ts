import type { MapInOut } from '../../map-in-out.ts';
import { perDivisor } from '../per-divisor/per-divisor.ts';

/**
 * Converts a percentage to a decimal.
 */
export const PERCENT: MapInOut<number, number> = perDivisor(100);
