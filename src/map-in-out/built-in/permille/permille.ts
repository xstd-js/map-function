import type { MapInOut } from '../../map-in-out.ts';
import { perDivisor } from '../per-divisor/per-divisor.ts';

/**
 * Converts a permillage to a decimal.
 */
export const PERMILLE: MapInOut<number, number> = perDivisor(1000);
