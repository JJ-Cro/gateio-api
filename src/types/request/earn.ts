/**==========================================================================================================================
 * EARN
 * ==========================================================================================================================
 */

/** GET /earn/dual/investment_plan */
export interface GetDualInvestmentPlansReq {
  plan_id?: number | string;
  coin?: string;
  type?: string;
  quote_currency?: string;
  /** `apy` | `short-period` | `multiple` */
  sort?: string;
  page?: number;
  page_size?: number;
}

/** GET /earn/dual/orders */
export interface GetDualInvestmentOrdersReq {
  from?: number;
  to?: number;
  type?: string;
  status?: string;
  coin?: string;
  page?: number;
  limit?: number;
}

/** GET /earn/dual/order-refund-preview */
export interface GetDualOrderRefundPreviewReq {
  order_id: string;
}

/** POST /earn/dual/order-refund */
export interface SubmitDualOrderRefundParams {
  order_id: string;
  /** From order-refund-preview */
  req_id: string;
}

/** POST /earn/dual/modify-order-reinvest */
export interface UpdateDualOrderReinvestParams {
  order_id?: number;
  /** 0 off, 1 on */
  status?: number;
  /** Effective duration in seconds; default 86400 */
  effective_time_duration?: number;
}

/** GET /earn/dual/project-recommend */
export interface GetDualProjectRecommendReq {
  mode?: string;
  coin?: string;
  type?: string;
  /** Comma-separated project IDs to exclude */
  history_pids?: string;
}

/** GET /earn/dual/stock/investment_plan (public) */
export interface GetDualStockInvestmentPlansReq {
  plan_id?: string;
  coin?: string;
  /** `call` sell high, `put` buy low */
  type?: 'call' | 'put';
  /** Settlement currency. Default USDT */
  quote_currency?: string;
  /** `apy` | `short-period` | `multiple` */
  sort?: string;
  page?: number;
  /** Max 100 */
  page_size?: number;
}

/** GET /earn/dual/stock/orders */
export interface GetDualStockOrdersReq {
  coin?: string;
  /**
   * HOLD current, REPAY historical, PROCESSING, SETTLEMENT_PROCESSING, ALL.
   * Default ALL.
   */
  status?: string;
  /** `call` sell high, `put` buy low */
  type?: 'call' | 'put';
  /** Unix seconds */
  from?: number;
  /** Unix seconds */
  to?: number;
  page?: number;
  /** Max 100. Defaults to 100 when omitted */
  page_size?: number;
  limit?: number;
}

/** POST /earn/dual/stock/orders */
export interface PlaceDualStockInvestmentOrderParams {
  plan_id: string;
  amount: string;
  /**
   * Custom id. Must start with `t-`, at most 28 bytes after that prefix,
   * and only numbers, letters, underscore, hyphen, or dot.
   */
  text?: string;
  /**
   * 1 uses the spot account to fund a buy-low (put) subscription.
   * Omit, or any value other than 1, leaves it unselected.
   */
  hit_spot?: 0 | 1;
  /** 1 uses the stock account to fund a buy-low (put) subscription. */
  hit_stock?: 0 | 1;
  /** 1 uses the Simple Earn account to fund a buy-low (put) subscription. */
  hit_simple?: 0 | 1;
}

/** Request params for POST /earn/dual/orders */
export interface PlaceDualInvestmentOrderParams {
  plan_id: string;
  /** Subscription amount. Mutually exclusive with copies. */
  amount: string;
  /** Units. Mutually exclusive with amount. */
  copies?: string;
  /** Custom order info, must start with t- */
  text?: string;
}

/**==========================================================================================================================
 * EARN FIXED-TERM
 * ==========================================================================================================================
 */

export interface GetEarnFixedTermProductsReq {
  asset?: string;
  type?: number; // 1 regular, 2 VIP
  page: number;
  limit: number;
}

export interface GetEarnFixedTermProductsByAssetReq {
  /** Product type: "" or 1 regular, 2 VIP, 0 all */
  type?: string;
}

export interface CreateEarnFixedTermLendReq {
  product_id: number;
  amount: string;
  year_rate?: string;
  reinvest_status?: number; // 0 off, 1 on
  redeem_account_type?: number; // 1 spot
  financial_rate_id?: number; // interest boost coupon id, 0 = none
  sub_business?: number;
}

export interface GetEarnFixedTermLendsReq {
  product_id?: number;
  order_id?: number;
  asset?: string;
  order_type: '1' | '2'; // 1 current, 2 historical
  page: number;
  limit: number;
  sub_business?: number;
  business_filter?: string;
}

export interface EarnFixedTermPreRedeemReq {
  order_id: string;
}

export interface GetEarnFixedTermHistoryReq {
  product_id?: number;
  order_id?: string;
  asset?: string;
  type: '1' | '2' | '3' | '4'; // 1 subscribe, 2 redeem, 3 interest, 4 bonus
  page: number;
  limit: number;
  start_at?: number;
  end_at?: number;
  sub_business?: number;
  business_filter?: string;
}
