import { describe, expect, it } from 'vitest';
import type { MapFunctionArguments } from '../../map-function-arguments.ts';
import { setStaticArguments } from './set-static-arguments.ts';

describe('setStaticArguments', () => {
  it('should return a function that returns the predefined arguments', () => {
    const args = ['hello', 42, true] as const;
    const setted: MapFunctionArguments<[], typeof args> = setStaticArguments(...args);

    expect(setted()).toStrictEqual(['hello', 42, true]);
  });

  it('should return the same reference on each call', () => {
    const setted = setStaticArguments(1, 2, 3);

    expect(setted()).toBe(setted());
  });

  it('should support empty arguments', () => {
    const setted: MapFunctionArguments<[], []> = setStaticArguments();

    expect(setted()).toStrictEqual([]);
  });
});
