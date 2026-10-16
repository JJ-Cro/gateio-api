import { getRestBaseUrl } from '../../src/lib/requestUtils.js';

const GATE_TESTNET_REST_URL = 'https://api-testnet.gateapi.io/api/v4';

describe('REST base URL', () => {
  it('uses the global testnet host for testnet and futuresTestnet', () => {
    expect(getRestBaseUrl({ baseUrlKey: 'testnet' })).toBe(
      GATE_TESTNET_REST_URL,
    );
    expect(getRestBaseUrl({ baseUrlKey: 'futuresTestnet' })).toBe(
      GATE_TESTNET_REST_URL,
    );
  });

  it('keeps live as the default and prefers an explicit baseUrl', () => {
    expect(getRestBaseUrl({})).toBe('https://api.gateio.ws/api/v4');
    expect(
      getRestBaseUrl({
        baseUrl: 'https://example.test/api/v4',
        baseUrlKey: 'testnet',
      }),
    ).toBe('https://example.test/api/v4');
  });
});
