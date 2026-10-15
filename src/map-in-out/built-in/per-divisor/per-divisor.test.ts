import { describe, expect, it } from 'vitest';
import { perDivisor } from './per-divisor.ts';

describe('perDivisor', () => {
  it('should create a MapInOut dividing values by the divisor with inOut', () => {
    const perQuinquaginta = perDivisor(50);
    expect(perQuinquaginta.inOut(50)).toBe(1);
    expect(perQuinquaginta.inOut(25)).toBe(0.5);
    expect(perQuinquaginta.inOut(0)).toBe(0);
    expect(perQuinquaginta.inOut(150)).toBe(3);
  });

  it('should create a MapInOut multiplying values by the divisor with outIn', () => {
    const perQuinquaginta = perDivisor(50);
    expect(perQuinquaginta.outIn(1)).toBe(50);
    expect(perQuinquaginta.outIn(0.5)).toBe(25);
    expect(perQuinquaginta.outIn(0)).toBe(0);
    expect(perQuinquaginta.outIn(3)).toBe(150);
  });

  it('should support round trips inOut then outIn', () => {
    const perDivisor7 = perDivisor(7);
    for (const value of [0, 7, 14, 1, 133.7, -42]) {
      expect(perDivisor7.outIn(perDivisor7.inOut(value))).toBe(value);
    }
  });

  it('should return a frozen MapInOut', () => {
    expect(Object.isFrozen(perDivisor(2))).toBe(true);
  });
});
