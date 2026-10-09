import type { MapFunction } from '../map-function/map-function.ts';

/**
 * A function that maps a value of type GIn to a value of type GOut and vice versa.
 */
export interface MapInOut<GIn, GOut> {
  readonly inOut: MapFunction<GIn, GOut>;
  readonly outIn: MapFunction<GOut, GIn>;
}
