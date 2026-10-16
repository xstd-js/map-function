[![npm (scoped)](https://img.shields.io/npm/v/@xstd/map-function.svg)](https://www.npmjs.com/package/@xstd/map-function)
![npm](https://img.shields.io/npm/dm/@xstd/map-function.svg)
![NPM](https://img.shields.io/npm/l/@xstd/map-function.svg)
![npm type definitions](https://img.shields.io/npm/types/@xstd/map-function.svg)
![coverage](https://img.shields.io/badge/coverage-100%25-green)
![AI generation](https://img.shields.io/badge/AI_generation-low-yellow)

<picture>
  <source height="64" media="(prefers-color-scheme: dark)" srcset="https://github.com/xstd-js/website/blob/main/assets/logo/png/logo-large-dark.png?raw=true">
  <source height="64" media="(prefers-color-scheme: light)" srcset="https://github.com/xstd-js/website/blob/main/assets/logo/png/logo-large-light.png?raw=true">
  <img height="64" alt="Shows a black logo in light color mode and a white one in dark color mode." src="https://github.com/xstd-js/website/blob/main/assets/logo/png/logo-large-light.png?raw=true">
</picture>

## @xstd/map-function

Function mapping utilities

## 📦 Installation

```shell
yarn add @xstd/map-function
# or
npm install @xstd/map-function --save
```

## 📜 Documentation

This library provides utilities to define and transform value mappings:

- [`MapFunction`](#mapfunction) - map a value from one type to another
- [`MapInOut`](#mapinout) - map a value in both directions (and back)
- [`MapFunctionArguments`](#mapfunctionarguments) - map a tuple of arguments to another tuple of arguments

### MapFunction

A function that maps a value of type `GIn` to a value of type `GOut`.

```ts
import type { MapFunction } from '@xstd/map-function';

const fahrenheitToCelsius: MapFunction<number, number> = (f) => ((f - 32) * 5) / 9;
```

### MapInOut

A function that maps a value of type `GIn` to a value of type `GOut` **and vice versa**.

It exposes two `MapFunction`s:

- `inOut`: maps `GIn` to `GOut`
- `outIn`: maps `GOut` back to `GIn`

```ts
import type { MapInOut } from '@xstd/map-function';

const stringLength: MapInOut<string, number> = Object.freeze({
  inOut: (input: string): number => input.length,
  outIn: (length: number): string => 'x'.repeat(length),
});
```

#### Operations

Functions transforming a `MapInOut` into another one.

##### `reverseMapInOut`

Reverses the `in`/`out` operations of a `MapInOut`: `inOut` becomes `outIn` and `outIn` becomes `inOut`.

```ts
import { reverseMapInOut } from '@xstd/map-function';
import { PERCENT } from '@xstd/map-function';

const decimalToPercent = reverseMapInOut(PERCENT); // MapInOut<number, number>

decimalToPercent.inOut(0.5); // 50
decimalToPercent.outIn(50); // 0.5
```

##### `chainMapInOut`

Chains multiple `MapInOut`s into a single one: `inOut` applies each map from left to right, and `outIn` applies them from right to left.

```ts
import { DECI, PERCENT, chainMapInOut, reverseMapInOut } from '@xstd/map-function';

const deciToPercent = chainMapInOut(DECI, reverseMapInOut(PERCENT)); // MapInOut<number, number>

deciToPercent.inOut(5); // 50
deciToPercent.outIn(50); // 5
```

#### Built-in

Factories creating common `MapInOut`s, and their shortcuts.

##### `mapInOutEnum`

Creates a `MapInOut` mapping values from a list of `[input, output]` entries (and the reverse mapping). Throws when a value is not part of the entries.

```ts
import { mapInOutEnum } from '@xstd/map-function';

const parity = mapInOutEnum([
  [0, 'even'],
  [1, 'odd'],
]);

parity.inOut(1); // 'odd'
parity.outIn('even'); // 0
```

##### `mapInOutFactor`

Creates a `MapInOut` multiplying values by a given `factor` (and dividing them back).

```ts
import { mapInOutFactor } from '@xstd/map-function';

const perMyriad = mapInOutFactor(0.0001);

perMyriad.inOut(1); // 0.0001
perMyriad.outIn(0.25); // 2500
```

##### Shortcuts

`DECI`, `DEG_TO_RAD`, `PERCENT` and `PERMILLE` are shortcuts of `mapInOutFactor`:

| Name         | Description                             | `inOut`                 | `outIn`                 |
| ------------ | --------------------------------------- | ----------------------- | ----------------------- |
| `DECI`       | Converts a value in tenths to a decimal | `(deci) => decimal`     | `(decimal) => deci`     |
| `DEG_TO_RAD` | Converts degrees to radians             | `(deg) => rad`          | `(rad) => deg`          |
| `PERCENT`    | Converts a percentage to a decimal      | `(percent) => decimal`  | `(decimal) => percent`  |
| `PERMILLE`   | Converts a permillage to a decimal      | `(permille) => decimal` | `(decimal) => permille` |

```ts
import { DECI, DEG_TO_RAD, PERCENT, PERMILLE } from '@xstd/map-function';

DECI.inOut(10); // 1
DECI.outIn(0.25); // 2.5

DEG_TO_RAD.inOut(180); // ~3.14159...
DEG_TO_RAD.outIn(Math.PI); // 180

PERCENT.inOut(50); // 0.5
PERCENT.outIn(0.25); // 25

PERMILLE.inOut(1000); // 1
PERMILLE.outIn(0.25); // 250
```

### MapFunctionArguments

A function that maps a tuple of values of type `GInArgs` to a tuple of values of type `GOutArgs`.

Useful to adapt the arguments of another function (e.g. callbacks or listeners).

```ts
import type { MapFunctionArguments } from '@xstd/map-function';
```

#### Built-in

##### `mapOneArgument`

Creates a function that maps the first argument of a function to another one.

```ts
import { mapOneArgument } from '@xstd/map-function';

const parse = mapOneArgument((input: string): number => Number.parseInt(input));

parse('42'); // [42]
```

##### `setStaticArguments`

Creates a function that maps no arguments to a list of predefined ones.

```ts
import { setStaticArguments } from '@xstd/map-function';

const args = setStaticArguments(1, 'a', true);

args(); // [1, 'a', true]
```
