import type { MapInOut } from '../../map-in-out.ts';

/**
 * Creates a `MapInOut` that maps values based on a list of `[input, output]` entries (and vice-versa).
 *
 * Throws if a value is not part of the entries.
 */
export function mapInOutEnum<GIn, GOut>(
  entries: Iterable<[input: GIn, output: GOut]>,
): MapInOut<GIn, GOut> {
  const inOutMap = new Map<GIn, GOut>(entries);

  const outInMap = new Map<GOut, GIn>(
    Array.from(entries).map(([input, output]: [GIn, GOut]): readonly [GOut, GIn] => {
      return [output, input] as const;
    }),
  );

  return Object.freeze({
    inOut: (input: GIn): GOut => {
      if (!inOutMap.has(input)) {
        throw new Error(`Missing enum key: ${JSON.stringify(input)}`);
      }
      return inOutMap.get(input)!;
    },
    outIn: (output: GOut): GIn => {
      if (!outInMap.has(output)) {
        throw new Error(`Missing enum key: ${JSON.stringify(output)}`);
      }
      return outInMap.get(output)!;
    },
  });
}
