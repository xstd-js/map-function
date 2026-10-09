/**
 * A function that maps a tuple of values of type GInArgs to a tuple of values of type GOutArgs.
 */
export interface MapFunctionArguments<
  GInArgs extends readonly unknown[],
  GOutArgs extends readonly unknown[],
> {
  (...args: GInArgs): GOutArgs;
}
