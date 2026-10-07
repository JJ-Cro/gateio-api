const MAX_SAFE_INTEGER_STR = '9007199254740991';

function isLossyIntegerLiteral(token: string): boolean {
  let i = 0;
  if (token[i] === '-') {
    i++;
  }
  const digits = token.slice(i);
  if (!digits.length || !/^\d+$/.test(digits)) {
    return false;
  }
  if (digits.length < MAX_SAFE_INTEGER_STR.length) {
    return false;
  }
  if (digits.length > MAX_SAFE_INTEGER_STR.length) {
    return true;
  }
  return digits > MAX_SAFE_INTEGER_STR;
}

/**
 * Walk JSON text and wrap unsafe integer literals in quotes so JSON.parse keeps them as strings.
 */
export function quoteLossyIntegers(text: string): string {
  let out = '';
  let i = 0;
  let inString = false;

  while (i < text.length) {
    const c = text[i];

    if (inString) {
      out += c;
      if (c === '\\') {
        i++;
        if (i < text.length) {
          out += text[i];
        }
      } else if (c === '"') {
        inString = false;
      }
      i++;
      continue;
    }

    if (c === '"') {
      inString = true;
      out += c;
      i++;
      continue;
    }

    if (c === '-' || (c >= '0' && c <= '9')) {
      let j = i;
      if (text[j] === '-') {
        j++;
      }
      const intStart = j;
      while (j < text.length && text[j] >= '0' && text[j] <= '9') {
        j++;
      }
      if (j === intStart && text[i] === '-') {
        out += c;
        i++;
        continue;
      }

      let k = j;
      if (k < text.length && text[k] === '.') {
        k++;
        while (k < text.length && text[k] >= '0' && text[k] <= '9') {
          k++;
        }
      }
      if (k < text.length && (text[k] === 'e' || text[k] === 'E')) {
        k++;
        if (k < text.length && (text[k] === '+' || text[k] === '-')) {
          k++;
        }
        while (k < text.length && text[k] >= '0' && text[k] <= '9') {
          k++;
        }
      }

      const token = text.slice(i, k);
      const isIntegerOnly = k === j;
      if (isIntegerOnly && isLossyIntegerLiteral(token)) {
        out += `"${token}"`;
      } else {
        out += token;
      }
      i = k;
      continue;
    }

    out += c;
    i++;
  }

  return out;
}

export function parseJSONSafeIds(text: string): unknown {
  return JSON.parse(quoteLossyIntegers(text));
}

export type SafeIdJsonParseOptions = {
  keepIdsAsString?: boolean;
  customParseJSONFn?: (text: string) => unknown;
};

export function resolveJsonParseFn(
  options: SafeIdJsonParseOptions,
): ((text: string) => unknown) | undefined {
  if (typeof options.customParseJSONFn === 'function') {
    return options.customParseJSONFn;
  }
  if (options.keepIdsAsString) {
    return parseJSONSafeIds;
  }
  return undefined;
}
