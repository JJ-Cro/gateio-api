import { RestClient } from '../../src/index.js';

class CapturingRestClient extends RestClient {
  public calls: { method: string; endpoint: string; params?: unknown }[] = [];

  protected get(endpoint: string, params?: object): Promise<any> {
    this.calls.push({ method: 'GET', endpoint, params });
    return Promise.resolve([]);
  }

  protected getPrivate(endpoint: string, params?: object): Promise<any> {
    this.calls.push({ method: 'GET', endpoint, params });
    return Promise.resolve([]);
  }

  protected postPrivate(endpoint: string, params?: unknown): Promise<any> {
    this.calls.push({ method: 'POST', endpoint, params });
    return Promise.resolve({});
  }
}

describe('Gate API v4.106.150-157 routes', () => {
  it('loads public RPI books without putting settle in the query', async () => {
    const rest = new CapturingRestClient();

    await rest.getSpotRpiOrderBook({
      currency_pair: 'BTC_USDT',
      limit: 5,
      with_id: true,
    });
    await rest.getFuturesRpiOrderBook({
      settle: 'usdt',
      contract: 'BTC_USDT',
      interval: '0',
      limit: 10,
      with_id: true,
    });

    expect(rest.calls).toEqual([
      {
        method: 'GET',
        endpoint: '/spot/rpi_order_book',
        params: { currency_pair: 'BTC_USDT', limit: 5, with_id: true },
      },
      {
        method: 'GET',
        endpoint: '/futures/usdt/rpi_order_book',
        params: {
          contract: 'BTC_USDT',
          interval: '0',
          limit: 10,
          with_id: true,
        },
      },
    ]);
  });

  it('keeps the TradFi symbol in the path and the kline query separate', async () => {
    const rest = new CapturingRestClient();

    await rest.getTradFiKlines('XAUUSD', {
      kline_type: '1m',
      limit: 10,
    });

    expect(rest.calls).toEqual([
      {
        method: 'GET',
        endpoint: '/tradfi/symbols/XAUUSD/klines',
        params: { kline_type: '1m', limit: 10 },
      },
    ]);
  });

  it('routes stock dual earn and CrossEx security positions', async () => {
    const rest = new CapturingRestClient();

    await rest.getDualStockInvestmentPlans({ type: 'put', page: 1 });
    await rest.getDualStockProjectRecommend({ mode: 'normal' });
    await rest.getDualStockOrders({ status: 'HOLD' });
    await rest.submitDualStockOrder({
      plan_id: '1',
      amount: '10',
      hit_stock: 1,
    });
    await rest.getDualStockBalance();
    await rest.getDualStockOrderRefundPreview({ order_id: '9' });
    await rest.submitDualStockOrderRefund({ order_id: '9', req_id: 'r' });
    await rest.updateDualStockOrderReinvest({ order_id: 9, status: 1 });
    await rest.getCrossExSecurityPositions({
      symbol: 'US_STOCK_AAPL_USDT',
      exchange_type: 'US',
    });
    await rest.getCrossExAccountBook({ statement_type: 'SECURITY_DIVIDEND' });

    expect(rest.calls.map((call) => [call.method, call.endpoint])).toEqual([
      ['GET', '/earn/dual/stock/investment_plan'],
      ['GET', '/earn/dual/stock/project-recommend'],
      ['GET', '/earn/dual/stock/orders'],
      ['POST', '/earn/dual/stock/orders'],
      ['GET', '/earn/dual/stock/balance'],
      ['GET', '/earn/dual/stock/order-refund-preview'],
      ['POST', '/earn/dual/stock/order-refund'],
      ['POST', '/earn/dual/stock/modify-order-reinvest'],
      ['GET', '/crossex/security_positions'],
      ['GET', '/crossex/account_book'],
    ]);

    expect(rest.calls[3]?.params).toEqual({
      body: { plan_id: '1', amount: '10', hit_stock: 1 },
    });
    expect(rest.calls[0]?.params).toEqual({ type: 'put', page: 1 });
    expect(rest.calls[9]?.params).toEqual({
      statement_type: 'SECURITY_DIVIDEND',
    });
  });
});
