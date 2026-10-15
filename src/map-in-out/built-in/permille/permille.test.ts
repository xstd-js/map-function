import { describe, expect, it } from 'vitest';
import { PERMILLE } from './permille.ts';

describe('PERMILLE', () => {
  it('should convert a permillage to a decimal with inOut', () => {
    expect(PERMILLE.inOut(1000)).toBe(1);
    expect(PERMILLE.inOut(500)).toBe(0.5);
    expect(PERMILLE.inOut(0)).toBe(0);
    expect(PERMILLE.inOut(250)).toBe(0.25);
  });

  it('should convert a decimal to a permillage with outIn', () => {
    expect(PERMILLE.outIn(1)).toBe(1000);
    expect(PERMILLE.outIn(0.5)).toBe(500);
    expect(PERMILLE.outIn(0)).toBe(0);
    expect(PERMILLE.outIn(0.25)).toBe(250);
  });

  it('should support round trips inOut then outIn', () => {
    for (const permille of [0, 250, 500, 750, 1000, 1337, -42]) {
      expect(PERMILLE.outIn(PERMILLE.inOut(permille))).toBe(permille);
    }
  });
});
