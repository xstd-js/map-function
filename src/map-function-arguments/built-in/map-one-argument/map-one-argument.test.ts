import { describe, expect, it, vi } from 'vitest';
import type { MapFunction } from '../../../map-function/map-function.ts';
import type { MapFunctionArguments } from '../../map-function-arguments.ts';
import { mapOneArgument } from './map-one-argument.ts';

describe('mapOneArgument', () => {
  it('should return a function that maps the first argument through the provided mapFnc', () => {
    const mapFnc: MapFunction<number, string> = (input: number): string => `${input * 2}`;
    const mapped: MapFunctionArguments<[number], [string]> = mapOneArgument(mapFnc);

    expect(mapped(21)).toStrictEqual(['42']);
  });

  it('should call mapFnc once with the provided input', () => {
    const mapFnc = vi.fn((input: string): number => input.length);
    const mapped = mapOneArgument(mapFnc);

    expect(mapped('hello')).toStrictEqual([5]);
    expect(mapFnc).toHaveBeenCalledTimes(1);
    expect(mapFnc).toHaveBeenCalledWith('hello');
  });
});
