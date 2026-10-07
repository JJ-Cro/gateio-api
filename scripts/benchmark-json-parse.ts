import { performance } from 'node:perf_hooks';

import { parseJSONSafeIds } from '../dist/mjs/lib/jsonParse.js';

const LOSSY_ID = '9007199254740992';
const LEVELS = 1000;

function buildOrderBookJson(levels: number): string {
  const bids: string[] = [];
  const asks: string[] = [];
  for (let i = 0; i < levels; i++) {
    const price = (50000 - i * 0.01).toFixed(2);
    const size = (i + 1).toString();
    bids.push(
      `{"p":"${price}","s":"${size}","order_id":${LOSSY_ID}}`,
    );
    asks.push(
      `{"p":"${(50000 + i * 0.01).toFixed(2)}","s":"${size}","order_id":${LOSSY_ID}}`,
    );
  }
  return `{"channel":"futures.order_book","result":{"bids":[${bids.join(',')}],"asks":[${asks.join(',')}]}}`;
}

const payload = buildOrderBookJson(LEVELS);
const iterations = 200;

function bench(label: string, fn: (text: string) => unknown): number {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn(payload);
  }
  const ms = performance.now() - start;
  console.log(`${label}: ${ms.toFixed(2)} ms total (${(ms / iterations).toFixed(3)} ms/op)`);
  return ms;
}

const plainMs = bench('JSON.parse', (text) => JSON.parse(text));
const safeMs = bench('parseJSONSafeIds', (text) => parseJSONSafeIds(text));

console.log(
  `ratio parseJSONSafeIds / JSON.parse: ${(safeMs / plainMs).toFixed(2)}x`,
);
