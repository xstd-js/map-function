import type { MapFunctionArguments } from '../../map-function-arguments.ts';

/**
 * Creates a function that maps no arguments to a list of predefined ones.
 *
 * @template GArguments - The static arguments' type.
 * @param args - The static arguments to set.
 * @returns {MapFunctionArguments<[], GArguments>} - A function that maps no arguments to a list of predefined ones.
 */
export function setStaticArguments<GArguments extends readonly unknown[]>(
  ...args: GArguments
): MapFunctionArguments<[], GArguments> {
  return (): GArguments => args;
}
