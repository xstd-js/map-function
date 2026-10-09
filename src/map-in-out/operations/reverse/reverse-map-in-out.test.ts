import { describe, expect, it, vi } from 'vitest';
import type { MapInOut } from '../../map-in-out.ts';
import { reverseMapInOut } from './reverse-map-in-out.ts';

describe('reverseMapInOut', () => {
  it('should return a new MapInOut with inOut and outIn swapped', () => {
    const inOut = vi.fn((input: number): string => `${input}`);
    const outIn = vi.fn((input: string): number => Number(input));
    const mapInOut: MapInOut<number, string> = { inOut, outIn };

    const reversed = reverseMapInOut(mapInOut);

    expect(reversed.inOut).toBe(outIn);
    expect(reversed.outIn).toBe(inOut);
  });

  it('should return the same in/out behavior as the original MapInOut', () => {
    const mapInOut: MapInOut<number, string> = {
      inOut: (input: number): string => `${input * 2}`,
      outIn: (input: string): number => Number(input) / 2,
    };

    const reversed = reverseMapInOut(mapInOut);

    expect(reversed.inOut('42')).toBe(21);
    expect(reversed.outIn(21)).toBe('42');
  });
});
