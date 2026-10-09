import { describe, expect, it } from 'vitest';
import { PERCENT } from './percent.ts';

describe('PERCENT', () => {
  it('should convert a percentage to a decimal with inOut', () => {
    expect(PERCENT.inOut(100)).toBe(1);
    expect(PERCENT.inOut(50)).toBe(0.5);
    expect(PERCENT.inOut(0)).toBe(0);
    expect(PERCENT.inOut(25)).toBe(0.25);
  });

  it('should convert a decimal to a percentage with outIn', () => {
    expect(PERCENT.outIn(1)).toBe(100);
    expect(PERCENT.outIn(0.5)).toBe(50);
    expect(PERCENT.outIn(0)).toBe(0);
    expect(PERCENT.outIn(0.25)).toBe(25);
  });

  it('should support round trips inOut then outIn', () => {
    for (const percent of [0, 25, 50, 75, 100, 133.7, -42]) {
      expect(PERCENT.outIn(PERCENT.inOut(percent))).toBe(percent);
    }
  });
});
