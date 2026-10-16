import { describe, expect, it } from 'vitest';
import type { MapInOut } from '../../map-in-out.ts';
import { chainMapInOut } from './chain-map-in-out.ts';

describe('chainMapInOut', () => {
  it('should return an identity MapInOut when called without arguments', () => {
    const chained = chainMapInOut();

    expect(chained.inOut(42)).toBe(42);
    expect(chained.outIn(42)).toBe(42);
  });

  it('should return a MapInOut with the same in/out behavior when a single map is provided', () => {
    const mapInOut: MapInOut<number, string> = {
      inOut: (input: number): string => `${input}`,
      outIn: (input: string): number => Number(input),
    };

    const chained = chainMapInOut(mapInOut);

    expect(chained.inOut(42)).toBe('42');
    expect(chained.outIn('42')).toBe(42);
  });

  it('should chain the inOut operations from left to right', () => {
    const numberToString: MapInOut<number, string> = {
      inOut: (input: number): string => `${input * 2}`,
      outIn: (input: string): number => Number(input) / 2,
    };
    const appendExclamationMark: MapInOut<string, string> = {
      inOut: (input: string): string => `${input}!`,
      outIn: (input: string): string => input.slice(0, -1),
    };

    const chained = chainMapInOut(numberToString, appendExclamationMark);

    expect(chained.inOut(21)).toBe('42!');
  });

  it('should chain the outIn operations from right to left', () => {
    const numberToString: MapInOut<number, string> = {
      inOut: (input: number): string => `${input * 2}`,
      outIn: (input: string): number => Number(input) / 2,
    };
    const appendExclamationMark: MapInOut<string, string> = {
      inOut: (input: string): string => `${input}!`,
      outIn: (input: string): string => input.slice(0, -1),
    };

    const chained = chainMapInOut(numberToString, appendExclamationMark);

    expect(chained.outIn('42!')).toBe(21);
  });

  it('should apply the maps in the expected order', () => {
    const order: string[] = [];
    const a: MapInOut<number, number> = {
      inOut: (input: number): number => {
        order.push('a.inOut');
        return input;
      },
      outIn: (input: number): number => {
        order.push('a.outIn');
        return input;
      },
    };
    const b: MapInOut<number, number> = {
      inOut: (input: number): number => {
        order.push('b.inOut');
        return input;
      },
      outIn: (input: number): number => {
        order.push('b.outIn');
        return input;
      },
    };

    const chained = chainMapInOut(a, b);

    chained.inOut(1);
    expect(order).toEqual(['a.inOut', 'b.inOut']);

    order.length = 0;

    chained.outIn(1);
    expect(order).toEqual(['b.outIn', 'a.outIn']);
  });

  it('should support round trips inOut then outIn', () => {
    const numberToString: MapInOut<number, string> = {
      inOut: (input: number): string => `${input * 2}`,
      outIn: (input: string): number => Number(input) / 2,
    };
    const appendExclamationMark: MapInOut<string, string> = {
      inOut: (input: string): string => `${input}!`,
      outIn: (input: string): string => input.slice(0, -1),
    };
    const stringToNumber: MapInOut<string, number> = {
      inOut: (input: string): number => Number(input.slice(0, -1)),
      outIn: (input: number): string => `${input}!`,
    };

    const chained = chainMapInOut(numberToString, appendExclamationMark, stringToNumber);

    for (const value of [0, 21, -42, 133.7]) {
      expect(chained.outIn(chained.inOut(value))).toBe(value);
    }
  });

  it('should support chaining many maps', () => {
    const increment: MapInOut<unknown, unknown> = {
      inOut: (input: unknown): unknown => (input as number) + 1,
      outIn: (input: unknown): unknown => (input as number) - 1,
    };

    const chained = chainMapInOut(
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
      increment,
    );

    expect(chained.inOut(0)).toBe(25);
    expect(chained.outIn(25)).toBe(0);
  });

  it('should return a frozen MapInOut', () => {
    expect(Object.isFrozen(chainMapInOut())).toBe(true);
  });
});
