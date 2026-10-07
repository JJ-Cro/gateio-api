import {
  parseJSONSafeIds,
  quoteLossyIntegers,
  resolveJsonParseFn,
} from '../../src/lib/jsonParse';

const LOSSY_ID = '9007199254740992';
const SAFE_ID = '9007199254740991';

describe('jsonParse safe integer scanner', () => {
  describe('quoteLossyIntegers', () => {
    it('wraps a lossy id at the root', () => {
      const text = `{"id":${LOSSY_ID}}`;
      expect(quoteLossyIntegers(text)).toBe(`{"id":"${LOSSY_ID}"}`);
    });

    it('wraps ids in nested objects and arrays', () => {
      const text = `{"order":{"id":${LOSSY_ID}},"ids":[${LOSSY_ID},${SAFE_ID}]}`;
      const quoted = quoteLossyIntegers(text);
      expect(quoted).toContain(`"id":"${LOSSY_ID}"`);
      expect(quoted).toContain(`["${LOSSY_ID}",${SAFE_ID}]`);
    });

    it('wraps negative lossy integers', () => {
      const text = `{"id":-${LOSSY_ID}}`;
      expect(quoteLossyIntegers(text)).toBe(`{"id":"-${LOSSY_ID}"}`);
    });

    it('leaves integers inside strings untouched', () => {
      const text = `{"note":"order ${LOSSY_ID} pending"}`;
      expect(quoteLossyIntegers(text)).toBe(text);
    });

    it('handles escaped quotes inside strings', () => {
      const text = `{"note":"id \\"${LOSSY_ID}\\" in text","id":${LOSSY_ID}}`;
      const quoted = quoteLossyIntegers(text);
      expect(quoted).toContain(`"id \\"${LOSSY_ID}\\" in text"`);
      expect(quoted).toContain(`"id":"${LOSSY_ID}"`);
    });

    it('does not wrap decimals or exponents', () => {
      const text = `{"a":${LOSSY_ID}.5,"b":1e20}`;
      expect(quoteLossyIntegers(text)).toBe(text);
    });

    it('keeps safe integers as bare numbers', () => {
      const text = `{"id":${SAFE_ID},"small":42}`;
      expect(quoteLossyIntegers(text)).toBe(text);
    });
  });

  describe('parseJSONSafeIds', () => {
    it('parses lossy ids as strings and safe ids as numbers', () => {
      const parsed = parseJSONSafeIds(
        `{"id":${LOSSY_ID},"safe":${SAFE_ID},"nested":{"ids":[${LOSSY_ID}]}}`,
      ) as {
        id: string;
        safe: number;
        nested: { ids: string[] };
      };

      expect(parsed.id).toBe(LOSSY_ID);
      expect(typeof parsed.id).toBe('string');
      expect(parsed.safe).toBe(Number(SAFE_ID));
      expect(typeof parsed.safe).toBe('number');
      expect(parsed.nested.ids[0]).toBe(LOSSY_ID);
    });

    it('matches JSON.parse when no lossy integers are present', () => {
      const text = `{"price":"1.25","amount":100,"tags":["a","b"]}`;
      expect(parseJSONSafeIds(text)).toEqual(JSON.parse(text));
    });
  });

  describe('resolveJsonParseFn', () => {
    it('returns undefined by default', () => {
      expect(resolveJsonParseFn({})).toBeUndefined();
    });

    it('prefers customParseJSONFn over keepIdsAsString', () => {
      const custom = (t: string) => ({ custom: t.length });
      expect(
        resolveJsonParseFn({
          keepIdsAsString: true,
          customParseJSONFn: custom,
        }),
      ).toBe(custom);
    });
  });
});
