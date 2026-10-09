import type { MapFunction } from '../../../map-function/map-function.ts';
import type { MapFunctionArguments } from '../../map-function-arguments.ts';

/**
 * Creates a function that maps the first argument of a function to another one.
 *
 * @template GIn - The type of the _input_ argument.
 * @template GOut - The type of the _output_ argument.
 * @param {MapFunction<GIn, GOut>} mapFnc - The function to map the input argument to the output one.
 * @returns {MapFunctionArguments<[GIn], [GOut]>} - A function that maps one argument to another one.
 */
export function mapOneArgument<GIn, GOut>(
  mapFnc: MapFunction<GIn, GOut>,
): MapFunctionArguments<[GIn], [GOut]> {
  return (input: GIn): [GOut] => [mapFnc(input)];
}
