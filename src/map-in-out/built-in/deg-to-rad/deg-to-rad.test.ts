import { describe, expect, it } from 'vitest';
import { DEG_TO_RAD } from './deg-to-rad.ts';

describe('DEG_TO_RAD', () => {
  it('should convert degrees to radians with inOut', () => {
    expect(DEG_TO_RAD.inOut(180)).toBe(Math.PI);
    expect(DEG_TO_RAD.inOut(90)).toBe(Math.PI / 2);
    expect(DEG_TO_RAD.inOut(0)).toBe(0);
    expect(DEG_TO_RAD.inOut(360)).toBeCloseTo(2 * Math.PI);
    expect(DEG_TO_RAD.inOut(-45)).toBeCloseTo(-Math.PI / 4);
  });

  it('should convert radians to degrees with outIn', () => {
    expect(DEG_TO_RAD.outIn(Math.PI)).toBe(180);
    expect(DEG_TO_RAD.outIn(Math.PI / 2)).toBe(90);
    expect(DEG_TO_RAD.outIn(0)).toBe(0);
    expect(DEG_TO_RAD.outIn(2 * Math.PI)).toBe(360);
    expect(DEG_TO_RAD.outIn(-Math.PI / 4)).toBe(-45);
  });

  it('should support round trips inOut then outIn', () => {
    for (const deg of [0, 30, 45, 90, 180, 270, 360, -60]) {
      expect(DEG_TO_RAD.outIn(DEG_TO_RAD.inOut(deg))).toBeCloseTo(deg);
    }
  });
});
