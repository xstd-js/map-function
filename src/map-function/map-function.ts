/**
 * A function that maps a value of type GIn to a value of type GOut.
 */
export interface MapFunction<GIn, GOut> {
  (input: GIn): GOut;
}
