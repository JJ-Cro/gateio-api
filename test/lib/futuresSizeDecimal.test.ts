import axios, { AxiosRequestConfig } from 'axios';

import { RestClient } from '../../src/RestClient.js';
import {
  FUTURES_SIZE_DECIMAL_HEADER,
  getFuturesSizeDecimalHeaders,
  isFuturesMarketRestEndpoint,
  isFuturesMarketWsKey,
} from '../../src/lib/requestUtils.js';

jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(() =>
    Promise.resolve({
      status: 200,
      data: [],
    }),
  ),
}));

const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe('futuresSizeDecimal', () => {
  beforeEach(() => {
    mockedAxios.mockClear();
  });

  describe('getFuturesSizeDecimalHeaders', () => {
    it('returns the header only when enabled', () => {
      expect(getFuturesSizeDecimalHeaders(false)).toEqual({});
      expect(getFuturesSizeDecimalHeaders(undefined)).toEqual({});
      expect(getFuturesSizeDecimalHeaders(true)).toEqual({
        [FUTURES_SIZE_DECIMAL_HEADER]: '1',
      });
    });
  });

  describe('REST', () => {
    it('adds X-Gate-Size-Decimal on futures endpoints when futuresSizeDecimal is true', async () => {
      const rest = new RestClient({ futuresSizeDecimal: true });
      await rest.getFuturesContracts({ settle: 'usdt' });

      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            [FUTURES_SIZE_DECIMAL_HEADER]: '1',
          }),
        }),
      );
    });

    it('does not add X-Gate-Size-Decimal when futuresSizeDecimal is off', async () => {
      const rest = new RestClient();
      await rest.getFuturesContracts({ settle: 'usdt' });

      const config = mockedAxios.mock.calls[0][0] as AxiosRequestConfig;
      expect(config.headers?.[FUTURES_SIZE_DECIMAL_HEADER]).toBeUndefined();
    });

    it('does not add X-Gate-Size-Decimal on non-futures endpoints', async () => {
      const rest = new RestClient({ futuresSizeDecimal: true });
      await rest.getSpotTicker();

      const config = mockedAxios.mock.calls[0][0] as AxiosRequestConfig;
      expect(config.headers?.[FUTURES_SIZE_DECIMAL_HEADER]).toBeUndefined();
    });
  });

  describe('scoping helpers', () => {
    it('identifies futures REST paths', () => {
      expect(isFuturesMarketRestEndpoint('/futures/usdt/contracts')).toBe(true);
      expect(isFuturesMarketRestEndpoint('/delivery/usdt/contracts')).toBe(
        true,
      );
      expect(isFuturesMarketRestEndpoint('/spot/currency_pairs')).toBe(false);
    });

    it('identifies futures WebSocket keys', () => {
      expect(isFuturesMarketWsKey('perpFuturesUSDTV4')).toBe(true);
      expect(isFuturesMarketWsKey('deliveryFuturesBTCV4')).toBe(true);
      expect(isFuturesMarketWsKey('spotV4')).toBe(false);
    });
  });
});
