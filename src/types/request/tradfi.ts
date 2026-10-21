/** TradFi API request types */

export interface TradFiGetSymbolDetailParams {
  symbols: string;
}

/**
 * GET /tradfi/symbols/{symbol}/klines
 *
 * Docs: `begin_time` and `end_time` are Unix timestamps in seconds. `limit` max is 500
 * (a larger limit is an error).
 *
 * Live on XAUUSD (19 Oct 2026): millisecond timestamps return an empty list.
 * `limit` combined with `begin_time` and `end_time` returns INVALID_ARGUMENT
 * ("Invalid parameter"). `begin_time` without `end_time` returns HTTP 400, label
 * INTERNAL_SERVER_ERROR, message "Service is busy. Please try again later."
 * Send `limit` alone, or `begin_time` and `end_time` together.
 */
export interface TradFiGetKlinesParams {
  kline_type: '1m' | '15m' | '1h' | '4h' | '1d' | '7d' | '30d';
  /** Unix seconds. Pair with end_time. Do not send together with limit. */
  begin_time?: number;
  /** Unix seconds. Required when begin_time is set. */
  end_time?: number;
  /** Max 500. Do not send together with begin_time and end_time. */
  limit?: number;
}

export interface TradFiCreateTransactionReq {
  asset: string;
  change: string;
  type: 'deposit' | 'withdraw';
}

export interface TradFiGetTransactionsParams {
  begin_time?: number;
  end_time?: number;
  type?: 'deposit' | 'withdraw' | 'dividend' | 'fill_negative';
  page?: number;
  page_size?: number;
}

export interface TradFiCreateOrderReq {
  price: string;
  price_type: 'trigger' | 'market';
  side: 1 | 2;
  symbol: string;
  volume: string;
  price_tp?: string;
  price_sl?: string;
  leverage?: number;
}

export interface TradFiModifyOrderReq {
  price: string;
  price_tp?: string | null;
  price_sl?: string | null;
}

export interface TradFiModifyPositionReq {
  price_tp?: string | null;
  price_sl?: string | null;
}

export interface TradFiClosePositionReq {
  close_type: 1 | 2;
  close_volume?: string | null;
}

export interface TradFiGetOrderHistoryParams {
  begin_time?: number;
  end_time?: number;
  symbol?: string;
  side?: 1 | 2;
}

export interface TradFiGetPositionHistoryParams {
  begin_time?: number;
  end_time?: number;
  symbol?: string;
  position_dir?: 'Long' | 'Short';
  page?: number;
  page_size?: number;
}

/** GET /tradfi/symbols/commissions */
export interface TradFiGetSymbolCommissionsParams {
  symbols?: string;
  category_code?: string;
}
