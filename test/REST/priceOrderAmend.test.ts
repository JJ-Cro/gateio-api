import { RestClient } from '../../src/index.js';

class CapturingRestClient extends RestClient {
  public lastCall?: { endpoint: string; params?: unknown };

  protected putPrivate(endpoint: string, params?: unknown): Promise<any> {
    this.lastCall = { endpoint, params };
    return Promise.resolve({ id: 1, id_string: '1' });
  }
}

describe('updateFuturesPriceTriggeredOrder', () => {
  it('puts order_id in the path and the body', async () => {
    const rest = new CapturingRestClient();

    await rest.updateFuturesPriceTriggeredOrder({
      settle: 'usdt',
      order_id: 42,
      price: '1',
    });

    expect(rest.lastCall).toEqual({
      endpoint: '/futures/usdt/price_orders/amend/42',
      params: {
        body: {
          order_id: 42,
          price: '1',
        },
      },
    });
  });
});
