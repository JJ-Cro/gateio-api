// double check if schemas are requests
// double check if names are set to what the call represents(get, delete, update etc...)
// check in all non-get calls that query params and body params are as it should be
// check all inputs where we have a path to make sure all is right.

import { AxiosRequestConfig } from 'axios';

import {
  BaseRestClient,
  REST_CLIENT_TYPE_ENUM,
  RestClientType,
} from './lib/BaseRestClient.js';
import { RestClientOptions } from './lib/requestUtils.js';
import {
  CreateSubAccountApiKeyReq,
  DeleteAllFuturesOrdersReq,
  DeleteSpotOrderReq,
  GetCrossMarginAccountHistoryReq,
  GetCrossMarginBorrowHistoryReq,
  GetCrossMarginInterestRecordsReq,
  GetCrossMarginRepaymentsReq,
  GetFlashSwapOrdersReq,
  GetFuturesAccountBookReq,
  GetFuturesAutoOrdersReq,
  GetFuturesCandlesticksReq,
  GetFuturesLiquidationHistoryReq,
  GetFuturesOrderBookReq,
  GetFuturesOrdersByTimeRangeReq,
  GetFuturesOrdersReq,
  GetFuturesPositionHistoryReq,
  GetFuturesPositionsReq,
  GetFuturesStatsReq,
  GetFuturesTradesReq,
  GetFuturesTradingHistoryReq,
  GetLiquidationHistoryReq,
  GetMainSubTransfersReq,
  GetMarginBalanceHistoryReq,
  GetMarginUNIInterestRecordsReq,
  GetMarginUNILoanRecordsReq,
  GetMarginUNILoansReq,
  GetMarginUNIMaxBorrowReq,
  GetRiskLimitTiersReq,
  GetSavedAddressReq,
  GetSmallBalanceHistoryReq,
  GetSpotAccountBookReq,
  GetSpotAutoOrdersReq,
  GetSpotCandlesticksReq,
  GetSpotOrderBookReq,
  GetSpotOrdersReq,
  GetSpotTradesReq,
  GetSpotTradingHistoryReq,
  GetUnifiedInterestRecordsReq,
  GetUnifiedLoanRecordsReq,
  GetUnifiedLoansReq,
  GetWithdrawalDepositRecordsReq,
  PortfolioMarginCalculatorReq,
  SetUnifiedAccountModeReq,
  SubmitCrossMarginBorrowLoanReq,
  SubmitFlashSwapOrderPreviewReq,
  SubmitFlashSwapOrderReq,
  submitFuturesBatchOrdersReq,
  SubmitFuturesOrderReq,
  SubmitFuturesPriceTriggeredOrderReq,
  SubmitSpotClosePosCrossDisabledReq,
  SubmitSpotOrderReq,
  SubmitUnifiedBorrowOrRepayReq,
  UpdateDualModePositionLeverageReq,
  UpdateDualModePositionMarginReq,
  UpdateSpotBatchOrdersReq,
  UpdateSpotOrderReq,
  UpdateSubAccountApiKeyReq,
} from './types/requests/shared.types.js';
import {
  APIResponse,
  CreateDepositAddressResp,
  CreateSubAccountApiKeyResp,
  DeleteFuturesBatchOrdersResp,
  DeleteSpotBatchOrdersResp,
  FlashSwapOrderResp,
  GetBalancesResp,
  GetCrossMarginAccountHistoryResp,
  GetCrossMarginAccountResp,
  GetCrossMarginCurrenciesResp,
  GetCurrencyChainsResp,
  GetFlashSwapCurrencyPairsResp,
  GetFuturesAccountResp,
  GetFuturesAutoDeleveragingHistoryResp,
  GetFuturesCandlesticksResp,
  GetFuturesLiquidationHistoryResp,
  GetFuturesOrderBookResp,
  GetFuturesPositionHistoryResp,
  GetFuturesStatsResp,
  GetFuturesTickersResp,
  GetFuturesTradesResp,
  GetFuturesTradingHistoryResp,
  GetIndexConstituentsResp,
  GetLendingMarketsResp,
  GetLiquidationHistoryResp,
  GetMarginAccountsResp,
  GetMarginBalanceHistoryResp,
  GetMarginUNIInterestRecordsResp,
  GetMarginUNILoanRecordsResp,
  GetMarginUNILoansResp,
  GetMarginUNIMaxBorrowResp,
  GetPremiumIndexKLineResp,
  GetRiskLimitTiersResp,
  GetSavedAddressResp,
  GetSmallBalanceHistoryResp,
  GetSmallBalancesResp,
  GetSpotAccountBookResp,
  GetSpotAccountsResp,
  GetSpotBatchFeeRatesResp,
  GetSpotCandlesticksResp,
  GetSpotCurrenciesResp,
  GetSpotFeeRatesResp,
  GetSpotOpenOrdersResp,
  GetSpotOrderBookResp,
  GetSpotTickerResp,
  GetSpotTradesResp,
  GetSpotTradingHistoryResp,
  GetTradingFeesResp,
  GetUnifiedAccountInfoResp,
  GetUnifiedCurrencyDiscountTiersResp,
  GetUnifiedInterestRecordsResp,
  GetUnifiedLoanRecordsResp,
  GetUnifiedLoansResp,
  GetUnifiedRiskUnitDetailsResp,
  GetWithdrawalStatusResp,
  PortfolioMarginCalculatorResp,
  SubAccountCrossMarginBalancesResp,
  SubAccountFuturesBalancesResp,
  SubAccountMarginBalancesResp,
  SubAccountResp,
  SubAccountTransferRecordResp,
  SubmitCrossMarginBorrowLoanResp,
  SubmitFlashSwapOrderPreviewResp,
  SubmitSpotBatchOrdersResp,
  ToggleFuturesDualModeResp,
} from './types/response/shared.types.js';
import {
  CancelBatchOrder,
  Contract,
  CurrencyPair,
  DeliveryContract,
  FuturesOrder,
  FuturesPriceTriggeredOrder,
  Order,
  Position,
  SpotPriceTriggeredOrder,
  SubAccountKey,
  Withdraw,
} from './types/shared.js';

/**
 * Unified REST API client for all of Gate's REST APIs
 */
export class RestClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super(restClientOptions, requestOptions);
    return this;
  }

  getClientType(): RestClientType {
    return REST_CLIENT_TYPE_ENUM.main;
  }

  getSystemMaintenanceStatus(): Promise<APIResponse<unknown>> {
    return this.get('/v1/public/system_info');
  }

  /**================================================================================================================================
   * WITHDRAW
   * ==========================================================================================================================
   */

  /**
   * Withdraw
   *
   * Withdrawals to Gate addresses do not incur transaction fees.
   *
   * @param params Withdrawal parameters
   * @returns Promise<APIResponse<Withdraw>>
   */
  submitWithdraw(params: {
    withdraw_order_id?: string;
    amount: string;
    currency: string;
    address?: string;
    memo?: string;
    chain: string;
  }): Promise<APIResponse<Withdraw>> {
    return this.postPrivate('/withdrawals', { query: params });
  }

  /**
   * Cancel withdrawal with specified ID
   *
   * @param params Parameters containing the withdrawal ID
   * @returns Promise<APIResponse<Withdraw>>
   */
  cancelWithdrawal(params: {
    withdrawal_id: string;
  }): Promise<APIResponse<Withdraw>> {
    return this.deletePrivate(`/withdrawals/${params.withdrawal_id}`);
  }

  /**==========================================================================================================================
   * WALLET
   * ==========================================================================================================================
   */

  /**
   * List chains supported for specified currency
   *
   * @param params Parameters containing the currency name
   * @returns Promise<APIResponse< GetCurrencyChainsResp[][]>>
   */
  getCurrencyChains(params: {
    currency: string;
  }): Promise<APIResponse<GetCurrencyChainsResp[]>> {
    return this.get('/wallet/currency_chains', params);
  }

  /**
   * Generate currency deposit address
   *
   * @param params Parameters containing the currency name
   * @returns Promise<APIResponse<CreateDepositAddressResp>>
   */
  createDepositAddress(params: {
    currency: string;
  }): Promise<APIResponse<CreateDepositAddressResp>> {
    return this.getPrivate('/wallet/deposit_address', params);
  }

  /**
   * Retrieve withdrawal records
   *
   * Record time range cannot exceed 30 days
   *
   * @param params Parameters for filtering withdrawal records
   * @returns Promise<APIResponse<Withdraw[]>>
   */
  getWithdrawalRecords(
    params?: GetWithdrawalDepositRecordsReq,
  ): Promise<APIResponse<Withdraw[]>> {
    return this.getPrivate('/wallet/withdrawals', params);
  }

  /**
   * Retrieve deposit records
   *
   * Record time range cannot exceed 30 days
   *
   * @param params Parameters for filtering deposit records
   * @returns Promise<APIResponse<Withdraw[]>>
   */
  getDepositRecords(
    params?: GetWithdrawalDepositRecordsReq,
  ): Promise<APIResponse<Withdraw[]>> {
    return this.getPrivate('/wallet/deposits', params);
  }

  /**
   * Transfer between trading accounts
   *
   * Transfer between different accounts. Currently support transfers between the following:
   * - spot - margin
   * - spot - futures(perpetual)
   * - spot - delivery
   * - spot - cross margin
   * - spot - options
   *
   * @param params Transfer parameters
   * @returns Promise<APIResponse<TransferResponse>>
   */
  submitTransfer(body: {
    currency: string;
    from:
      | 'spot'
      | 'margin'
      | 'futures'
      | 'delivery'
      | 'cross_margin'
      | 'options';
    to: 'spot' | 'margin' | 'futures' | 'delivery' | 'cross_margin' | 'options';
    amount: string;
    currency_pair?: string;
    settle?: string;
  }): Promise<APIResponse<{ tx_id: number }>> {
    return this.postPrivate('/wallet/transfers', { body: body });
  }

  /**
   * Transfer between main and sub accounts
   *
   * Support transferring with sub user's spot or futures account. Note that only main user's spot account is used no matter which sub user's account is operated.
   *
   * @param params Transfer parameters
   * @returns Promise<APIResponse<any>>
   */
  submitMainSubTransfer(body: {
    currency: string;
    sub_account: string;
    direction: 'to' | 'from';
    amount: string;
    client_order_id?: string;
    sub_account_type?: 'spot' | 'futures' | 'cross_margin' | 'delivery';
  }): Promise<APIResponse<any>> {
    return this.postPrivate('/wallet/sub_account_transfers', { body: body });
  }

  /**
   * Retrieve transfer records between main and sub accounts
   *
   * Record time range cannot exceed 30 days
   *
   * Note: only records after 2020-04-10 can be retrieved
   *
   * @param params Parameters for filtering transfer records
   * @returns Promise<APIResponse<SubAccountTransferRecordResp[]>>
   */
  getMainSubTransfers(
    params?: GetMainSubTransfersReq,
  ): Promise<APIResponse<SubAccountTransferRecordResp[]>> {
    return this.getPrivate('/wallet/sub_account_transfers', params);
  }

  /**
   * Sub-account transfers to sub-account
   *
   * It is possible to perform balance transfers between two sub-accounts under the same main account. You can use either the API Key of the main account or the API Key of the sub-account to initiate the transfer.
   *
   * @param params Transfer parameters
   * @returns Promise<APIResponse<any>>
   */
  submitSubToSubTransfer(body: {
    currency: string;
    sub_account_type?: string;
    sub_account_from: string;
    sub_account_from_type: 'spot' | 'futures' | 'delivery' | 'cross_margin';
    sub_account_to: string;
    sub_account_to_type: 'spot' | 'futures' | 'delivery' | 'cross_margin';
    amount: string;
  }): Promise<APIResponse<any>> {
    return this.postPrivate('/wallet/sub_account_to_sub_account', {
      body: body,
    });
  }

  /**
   * Retrieve withdrawal status
   *
   * @param params Parameters for retrieving withdrawal status
   * @returns Promise<APIResponse<GetWithdrawalStatusResp[]>>
   */
  getWithdrawalStatus(params?: {
    currency?: string;
  }): Promise<APIResponse<GetWithdrawalStatusResp[]>> {
    return this.getPrivate('/wallet/withdraw_status', params);
  }

  /**
   * Retrieve sub account balances
   *
   * @param params Parameters for retrieving sub account balances
   * @returns Promise<APIResponse<{
        uid: string;
        available: { [key: string]: string };
      }[]>>
   */
  getSubBalance(params?: { sub_uid?: string }): Promise<
    APIResponse<
      {
        uid: string;
        available: { [key: string]: string };
      }[]
    >
  > {
    return this.getPrivate('/wallet/sub_account_balances', params);
  }

  /**
   * Query sub accounts' margin balances
   *
   * @param params Parameters for querying sub accounts' margin balances
   * @returns Promise<APIResponse<SubAccountMarginBalancesResp[]>>
   */
  getSubMarginBalances(params?: {
    sub_uid?: string;
  }): Promise<APIResponse<SubAccountMarginBalancesResp[]>> {
    return this.getPrivate('/wallet/sub_account_margin_balances', params);
  }

  /**
   * Query sub accounts' futures account balances
   *
   * @param params Parameters for querying sub accounts' futures account balances
   * @returns Promise<APIResponse<SubAccountFuturesBalancesResp[]>>
   */
  getSubFuturesBalances(params?: {
    sub_uid?: string;
    settle?: string;
  }): Promise<APIResponse<SubAccountFuturesBalancesResp[]>> {
    return this.getPrivate('/wallet/sub_account_futures_balances', params);
  }

  /**
   * Query subaccount's cross_margin account info
   *
   * @param params Parameters for querying subaccount's cross_margin account info
   * @returns Promise<APIResponse<SubAccountCrossMarginBalancesResp[]>>
   */
  getSubCrossMarginBalances(params?: {
    sub_uid?: string;
  }): Promise<APIResponse<SubAccountCrossMarginBalancesResp[]>> {
    return this.getPrivate('/wallet/sub_account_cross_margin_balances', params);
  }

  /**
   * Query saved address
   *
   * @param params Parameters for querying saved address
   * @returns Promise<APIResponse<GetSavedAddressResp[]>>
   */
  getSavedAddress(
    params: GetSavedAddressReq,
  ): Promise<APIResponse<GetSavedAddressResp[]>> {
    return this.getPrivate('/wallet/saved_address', params);
  }

  /**
   * Retrieve personal trading fee
   *
   * @param params Parameters for retrieving personal trading fee
   * @returns Promise<APIResponse<GetTradingFeesResp>>
   */
  getTradingFees(params?: {
    currency_pair?: string;
    settle?: 'BTC' | 'USDT' | 'USD';
  }): Promise<APIResponse<GetTradingFeesResp>> {
    return this.getPrivate('/wallet/fee', params);
  }

  /**
   * Retrieve user's total balances
   *
   * This endpoint returns an approximate sum of exchanged amount from all currencies to input currency for each account.
   * The exchange rate and account balance could have been cached for at most 1 minute. It is not recommended to use its result for any trading calculation.
   *
   * For trading calculation, use the corresponding account query endpoint for each account type. For example:
   * - GET /spot/accounts to query spot account balance
   * - GET /margin/accounts to query margin account balance
   * - GET /futures/{settle}/accounts to query futures account balance
   *
   * @param params Parameters for retrieving total balances
   * @returns Promise<APIResponse<GetBalancesResp>>
   */
  getBalances(params?: {
    currency?: string;
  }): Promise<APIResponse<GetBalancesResp>> {
    return this.getPrivate('/wallet/total_balance', params);
  }

  /**
   * List small balance
   *
   * @returns Promise<APIResponse<GetSmallBalancesResp>>
   */
  getSmallBalances(): Promise<APIResponse<GetSmallBalancesResp>> {
    return this.getPrivate('/wallet/small_balance');
  }

  /**
   * Convert small balance
   *
   * @param params Parameters for converting small balance
   * @returns Promise<APIResponse<void>>
   */
  convertSmallBalance(body?: {
    currency?: string[];
  }): Promise<APIResponse<void>> {
    return this.postPrivate('/wallet/small_balance', { body: body });
  }

  /**
   * List small balance history
   *
   * @param params Parameters for listing small balance history
   * @returns Promise<APIResponse<GetSmallBalanceHistoryResp[]>>
   */
  getSmallBalanceHistory(
    params?: GetSmallBalanceHistoryReq,
  ): Promise<APIResponse<GetSmallBalanceHistoryResp[]>> {
    return this.getPrivate('/wallet/small_balance_history', params);
  }

  /**==========================================================================================================================
   * SUBACCOUNT
   * ==========================================================================================================================
   */

  /**
   * Create a new sub-account
   *
   * @param params Parameters for creating a new sub-account
   * @returns Promise<APIResponse<CreateSubAccountResp>>
   */
  createSubAccount(body: {
    remark?: string;
    login_name: string;
    password?: string;
    email?: string;
  }): Promise<APIResponse<SubAccountResp>> {
    return this.postPrivate('/sub_accounts', { body: body });
  }

  /**
   * List sub-accounts
   *
   * @param params Parameters for listing sub-accounts
   * @returns Promise<APIResponse<GetSubAccountsResp[]>>
   */

  getSubAccounts(params?: {
    type?: string;
  }): Promise<APIResponse<SubAccountResp[]>> {
    return this.getPrivate('/sub_accounts', params);
  }

  /**
   * Get the sub-account
   *
   * @param params Parameters containing the sub-account user ID
   * @returns Promise<APIResponse<SubAccountResp>>
   */
  getSubAccount(params: {
    user_id: number;
  }): Promise<APIResponse<SubAccountResp>> {
    return this.getPrivate(`/sub_accounts/${params.user_id}`);
  }

  /**
   * Create API Key of the sub-account
   *
   * @param params Parameters for creating API Key of the sub-account
   * @returns Promise<APIResponse<CreateSubAccountApiKeyResp>>
   */
  createSubAccountApiKey(
    params: CreateSubAccountApiKeyReq,
  ): Promise<APIResponse<CreateSubAccountApiKeyResp>> {
    const { user_id, ...body } = params;
    return this.postPrivate(`/sub_accounts/${user_id}/keys`, { body: body });
  }
  /**
   * List all API Key of the sub-account
   *
   * @param params Parameters containing the sub-account user ID
   * @returns Promise<APIResponse<SubAccountKey[]>>
   */
  getSubAccountApiKeys(params: {
    user_id: number;
  }): Promise<APIResponse<SubAccountKey[]>> {
    return this.getPrivate(`/sub_accounts/${params.user_id}/keys`);
  }

  /**
   * Update API key of the sub-account
   *
   * @param params Parameters for updating API key of the sub-account
   * @returns Promise<APIResponse<any>>
   */
  updateSubAccountApiKey(
    params: UpdateSubAccountApiKeyReq,
  ): Promise<APIResponse<any>> {
    const { user_id, key, ...body } = params;
    return this.putPrivate(`/sub_accounts/${user_id}/keys/${key}`, { body });
  }

  /**
   * Delete API key of the sub-account
   *
   * @param params Parameters for deleting API key of the sub-account
   * @returns Promise<APIResponse<any>>
   */
  deleteSubAccountApiKey(params: {
    user_id: number;
    key: string;
  }): Promise<APIResponse<any>> {
    return this.deletePrivate(
      `/sub_accounts/${params.user_id}/keys/${params.key}`,
    );
  }

  /**
   * Get the API Key of the sub-account
   *
   * @param params Parameters containing the sub-account user ID and API key
   * @returns Promise<APIResponse<SubAccountKey>>
   */
  getSubAccountApiKey(params: {
    user_id: number;
    key: string;
  }): Promise<APIResponse<SubAccountKey>> {
    return this.getPrivate(
      `/sub_accounts/${params.user_id}/keys/${params.key}`,
    );
  }

  /**
   * Lock the sub-account
   *
   * @param params Parameters containing the sub-account user ID
   * @returns Promise<APIResponse<void>>
   */
  lockSubAccount(params: { user_id: number }): Promise<APIResponse<void>> {
    return this.postPrivate(`/sub_accounts/${params.user_id}/lock`);
  }

  /**
   * Unlock the sub-account
   *
   * @param params Parameters containing the sub-account user ID
   * @returns Promise<APIResponse<void>>
   */
  unlockSubAccount(params: { user_id: number }): Promise<APIResponse<void>> {
    return this.postPrivate(`/sub_accounts/${params.user_id}/unlock`);
  }
  /**==========================================================================================================================
   * UNIFIED
   * ==========================================================================================================================
   */

  /**
   * Get unified account information
   *
   * The assets of each currency in the account will be adjusted according to their liquidity, defined by corresponding adjustment coefficients, and then uniformly converted to USD to calculate the total asset value and position value of the account.
   *
   * @param params Parameters for retrieving unified account information
   * @returns Promise<APIResponse<GetUnifiedAccountInfoResp>>
   */
  getUnifiedAccountInfo(params?: {
    currency?: string;
  }): Promise<APIResponse<GetUnifiedAccountInfoResp>> {
    return this.getPrivate('/unified/accounts', params);
  }

  /**
   * Query about the maximum borrowing for the unified account
   *
   * @param params Parameters for querying the maximum borrowing for the unified account
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   amount: string;
   * }>>
   */
  getUnifiedMaxBorrow(params: { currency: string }): Promise<
    APIResponse<{
      currency: string;
      amount: string;
    }>
  > {
    return this.getPrivate('/unified/borrowable', params);
  }

  /**
   * Query about the maximum transferable for the unified account
   *
   * @param params Parameters for querying the maximum transferable for the unified account
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   amount: string;
   * }>>
   */
  getUnifiedMaxTransferable(params: { currency: string }): Promise<
    APIResponse<{
      currency: string;
      amount: string;
    }>
  > {
    return this.getPrivate('/unified/transferable', params);
  }

  /**
   * Borrow or repay
   *
   * When borrowing, it is essential to ensure that the borrowed amount is not below the minimum borrowing threshold for the specific cryptocurrency and does not exceed the maximum borrowing limit set by the platform and the user.
   *
   * The interest on the loan will be automatically deducted from the account at regular intervals. It is the user's responsibility to manage the repayment of the borrowed amount.
   *
   * For repayment, the option to repay the entire borrowed amount is available by setting the parameter repaid_all=true
   *
   * @param params Parameters for borrowing or repaying
   * @returns Promise<APIResponse<void>>
   */
  submitUnifiedBorrowOrRepay(
    body: SubmitUnifiedBorrowOrRepayReq,
  ): Promise<APIResponse<void>> {
    return this.postPrivate('/unified/loans', { body: body });
  }

  /**
   * List loans
   *
   * @param params Parameters for listing loans
   * @returns Promise<APIResponse<GetUnifiedLoansResp[]>>
   */
  getUnifiedLoans(
    params?: GetUnifiedLoansReq,
  ): Promise<APIResponse<GetUnifiedLoansResp[]>> {
    return this.getPrivate('/unified/loans', params);
  }

  /**
   * Get loan records
   *
   * @param params Parameters for getting loan records
   * @returns Promise<APIResponse<GetUnifiedLoanRecordsResp[]>>
   */
  getUnifiedLoanRecords(
    params?: GetUnifiedLoanRecordsReq,
  ): Promise<APIResponse<GetUnifiedLoanRecordsResp[]>> {
    return this.getPrivate('/unified/loan_records', params);
  }

  /**
   * List interest records
   *
   * @param params Parameters for listing interest records
   * @returns Promise<APIResponse<GetUnifiedInterestRecordsResp[]>>
   */
  getUnifiedInterestRecords(
    params?: GetUnifiedInterestRecordsReq,
  ): Promise<APIResponse<GetUnifiedInterestRecordsResp[]>> {
    return this.getPrivate('/unified/interest_records', params);
  }

  /**
   * Retrieve user risk unit details, only valid in portfolio margin mode
   *
   * @returns Promise<APIResponse<GetUnifiedRiskUnitDetailsResp>>
   */
  getUnifiedRiskUnitDetails(): Promise<
    APIResponse<GetUnifiedRiskUnitDetailsResp>
  > {
    return this.getPrivate('/unified/risk_units');
  }

  /**
   * Set mode of the unified account
   *
   * Switching between different account modes requires only passing the parameters corresponding to the target account mode. It also supports opening or closing configuration switches for the corresponding account mode when switching.
   *
   * @param params Parameters for setting the mode of the unified account
   * @returns Promise<APIResponse<void>>
   */
  setUnifiedAccountMode(
    body: SetUnifiedAccountModeReq,
  ): Promise<APIResponse<void>> {
    return this.putPrivate('/unified/unified_mode', { body: body });
  }

  /**
   * Query mode of the unified account
   *
   * @returns Promise<APIResponse<{
   *   mode: 'classic' | 'multi_currency' | 'portfolio';
   *   settings: {
   *     usdt_futures?: boolean;
   *     spot_hedge?: boolean;
   *   };
   * }>>
   */
  getUnifiedAccountMode(): Promise<APIResponse<SetUnifiedAccountModeReq>> {
    return this.getPrivate('/unified/unified_mode');
  }

  /**
   * Get unified estimate rate
   *
   * Due to fluctuations in lending depth, hourly interest rates may vary, and thus, I cannot provide exact rates. When a currency is not supported, the interest rate returned will be an empty string.
   *
   * @param params Parameters for querying estimate rates
   * @returns Promise<APIResponse<{ [key: string]: string }>>
   */
  getUnifiedEstimateRate(params: {
    currencies: string[];
  }): Promise<APIResponse<{ [key: string]: string }>> {
    return this.getPrivate('/unified/estimate_rate', params);
  }

  /**
   * List currency discount tiers
   *
   * @returns Promise<APIResponse<GetUnifiedCurrencyDiscountTiersResp[]>>
   */
  getUnifiedCurrencyDiscountTiers(): Promise<
    APIResponse<GetUnifiedCurrencyDiscountTiersResp[]>
  > {
    return this.get('/unified/currency_discount_tiers');
  }

  /**
   * Portfolio margin calculator
   *
   * Portfolio Margin Calculator When inputting a simulated position portfolio, each position includes the position name and quantity held, supporting markets within the range of BTC and ETH perpetual contracts, options, and spot markets. When inputting simulated orders, each order includes the market identifier, order price, and order quantity, supporting markets within the range of BTC and ETH perpetual contracts, options, and spot markets. Market orders are not included.
   *
   * @param params Parameters for portfolio margin calculator
   * @returns Promise<APIResponse<PortfolioMarginCalculatorResp>>
   */
  portfolioMarginCalculator(
    body: PortfolioMarginCalculatorReq,
  ): Promise<APIResponse<PortfolioMarginCalculatorResp>> {
    return this.post('/unified/portfolio_calculator', { body: body });
  }

  /**==========================================================================================================================
   * SPOT
   * ==========================================================================================================================
   */

  /**
   * List all currencies' details
   *
   * Currency has two forms:
   * - Only currency name, e.g., BTC, USDT
   * - <currency>_<chain>, e.g., HT_ETH
   *
   * The latter one occurs when one currency has multiple chains. Currency detail contains a chain field whatever the form is. To retrieve all chains of one currency, you can use all the details which have the name of the currency or name starting with <currency>_.
   *
   * @returns Promise<APIResponse<GetSpotCurrenciesResp[]>>
   */
  getSpotCurrencies(): Promise<APIResponse<GetSpotCurrenciesResp[]>> {
    return this.get('/spot/currencies');
  }

  /**
   * Get details of a specific currency
   *
   * @param params Parameters for retrieving details of a specific currency
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   delisted: boolean;
   *   withdraw_disabled: boolean;
   *   withdraw_delayed: boolean;
   *   deposit_disabled: boolean;
   *   trade_disabled: boolean;
   *   fixed_rate: string;
   *   chain: string;
   * }>>
   */
  getSpotCurrency(params: {
    currency: string;
  }): Promise<APIResponse<GetSpotCurrenciesResp>> {
    return this.get(`/spot/currencies/${params.currency}`);
  }

  /**
   * List all currency pairs supported
   *
   * @returns Promise<APIResponse<CurrencyPair[]>>
   */
  getSpotCurrencyPairs(): Promise<APIResponse<CurrencyPair[]>> {
    return this.get('/spot/currency_pairs');
  }

  /**
   * Get details of a specific currency pair
   *
   * @param params Parameters for retrieving details of a specific currency pair
   * @returns Promise<APIResponse<CurrencyPair>>
   */
  getSpotCurrencyPair(params: {
    currency_pair: string;
  }): Promise<APIResponse<CurrencyPair>> {
    return this.get(`/spot/currency_pairs/${params.currency_pair}`);
  }

  /**
   * Retrieve ticker information
   *
   * Return only related data if currency_pair is specified; otherwise return all of them.
   *
   * @param params Parameters for retrieving ticker information
   * @returns Promise<APIResponse<GetSpotTickerResp[]>>
   */
  getSpotTicker(params?: {
    currency_pair?: string;
    timezone?: 'utc0' | 'utc8' | 'all';
  }): Promise<APIResponse<GetSpotTickerResp[]>> {
    return this.get('/spot/tickers', params);
  }

  /**
   * Retrieve order book
   *
   * Order book will be sorted by price from high to low on bids; low to high on asks.
   *
   * @param params Parameters for retrieving order book
   * @returns Promise<APIResponse<GetSpotOrderBookResp>>
   */
  getSpotOrderBook(
    params: GetSpotOrderBookReq,
  ): Promise<APIResponse<GetSpotOrderBookResp>> {
    return this.get('/spot/order_book', params);
  }

  /**
   * Retrieve market trades
   *
   * You can use from and to to query by time range, or use last_id by scrolling page. The default behavior is by time range.
   * Scrolling query using last_id is not recommended any more. If last_id is specified, time range query parameters will be ignored.
   *
   * @param params Parameters for retrieving market trades
   * @returns Promise<APIResponse<GetSpotTradesResp[]>>
   */
  getSpotTrades(
    params: GetSpotTradesReq,
  ): Promise<APIResponse<GetSpotTradesResp[]>> {
    return this.get('/spot/trades', params);
  }

  /**
   * Market candlesticks
   *
   * Maximum of 1000 points can be returned in a query. Be sure not to exceed the limit when specifying from, to and interval.
   *
   * @param params Parameters for retrieving market candlesticks
   * @returns Promise<APIResponse<GetSpotCandlesticksResp>>
   */
  getSpotCandlesticks(
    params: GetSpotCandlesticksReq,
  ): Promise<APIResponse<GetSpotCandlesticksResp>> {
    return this.get('/spot/candlesticks', params);
  }

  /**
   * Query user trading fee rates
   *
   * This API is deprecated in favour of new fee retrieving API /wallet/fee.
   *
   * @param params Parameters for querying user trading fee rates
   * @returns Promise<APIResponse<GetSpotFeeRatesResp>>
   */
  getSpotFeeRates(params?: {
    currency_pair?: string;
  }): Promise<APIResponse<GetSpotFeeRatesResp>> {
    return this.getPrivate('/spot/fee', params);
  }

  /**
   * Query a batch of user trading fee rates
   *
   * @param params Parameters for querying a batch of user trading fee rates
   * @returns Promise<APIResponse<GetSpotBatchFeeRatesResp>>
   */
  getSpotBatchFeeRates(params: {
    currency_pairs: string;
  }): Promise<APIResponse<GetSpotBatchFeeRatesResp>> {
    return this.getPrivate('/spot/batch_fee', params);
  }

  /**
   * List spot accounts
   *
   * @param params Parameters for listing spot accounts
   * @returns Promise<APIResponse<GetSpotAccountsResp[]>>
   */
  getSpotAccounts(params?: {
    currency?: string;
  }): Promise<APIResponse<GetSpotAccountsResp[]>> {
    return this.getPrivate('/spot/accounts', params);
  }

  /**
   * Query account book
   *
   * Record time range cannot exceed 30 days.
   *
   * @param params Parameters for querying account book
   * @returns Promise<APIResponse<GetSpotAccountBookResp[]>>
   */
  getSpotAccountBook(
    params?: GetSpotAccountBookReq,
  ): Promise<APIResponse<GetSpotAccountBookResp[]>> {
    return this.getPrivate('/spot/account_book', params);
  }

  /**
   * Create a batch of orders
   *
   * Batch orders requirements:
   * - custom order field text is required
   * - At most 4 currency pairs, maximum 10 orders each, are allowed in one request
   * - No mixture of spot orders and margin orders, i.e. account must be identical for all orders
   *
   * @param params Parameters for creating a batch of orders
   * @returns Promise<APIResponse<SubmitSpotBatchOrdersResp[]>>
   */
  submitSpotBatchOrders(
    body: Order[],
  ): Promise<APIResponse<SubmitSpotBatchOrdersResp[]>> {
    return this.postPrivate('/spot/batch_orders', { body: body });
  }

  /**
   * List all open orders
   *
   * List open orders in all currency pairs.
   * Note that pagination parameters affect record number in each currency pair's open order list. No pagination is applied to the number of currency pairs returned. All currency pairs with open orders will be returned.
   * Spot, portfolio, and margin orders are returned by default. To list cross margin orders, account must be set to cross_margin.
   *
   * @param params Parameters for listing all open orders
   * @returns Promise<APIResponse<GetSpotOpenOrdersResp[]>>
   */
  getSpotOpenOrders(params?: {
    page?: number;
    limit?: number;
    account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  }): Promise<APIResponse<GetSpotOpenOrdersResp[]>> {
    return this.getPrivate('/spot/open_orders', params);
  }

  /**
   * Close position when cross-currency is disabled
   *
   * Currently, only cross-margin accounts are supported to close position when cross currencies are disabled. Maximum buy quantity = (unpaid principal and interest - currency balance - the amount of the currency in the order book) / 0.998
   *
   * @param params Parameters for closing position when cross-currency is disabled
   * @returns Promise<APIResponse<Order>>
   */
  submitSpotClosePosCrossDisabled(
    body: SubmitSpotClosePosCrossDisabledReq,
  ): Promise<APIResponse<Order>> {
    return this.postPrivate('/spot/cross_liquidate_orders', { body: body });
  }

  /**
   * Create an order
   *
   * You can place orders with spot, portfolio, margin or cross margin account through setting the account field. It defaults to spot, which means spot account is used to place orders. If the user is using unified account, it defaults to the unified account.
   *
   * @param params Parameters for creating an order
   * @returns Promise<APIResponse<Order>>
   */
  submitSpotOrder(body: SubmitSpotOrderReq): Promise<APIResponse<Order>> {
    return this.postPrivate('/spot/orders', { body: body });
  }

  /**
   * List orders
   *
   * Spot, portfolio and margin orders are returned by default. If cross margin orders are needed, account must be set to cross_margin.
   *
   * @param params Parameters for listing orders
   * @returns Promise<APIResponse<Order[]>>
   */
  getSpotOrders(params: GetSpotOrdersReq): Promise<APIResponse<Order[]>> {
    return this.getPrivate('/spot/orders', params);
  }

  /**
   * Cancel all open orders in specified currency pair
   *
   * If account is not set, all open orders, including spot, portfolio, margin and cross margin ones, will be cancelled.
   * You can set account to cancel only orders within the specified account.
   *
   * @param params Parameters for cancelling all open orders in specified currency pair
   * @returns Promise<APIResponse<Order[]>>
   */
  deleteSpotPairOpenOrders(params: {
    currency_pair: string;
    side?: 'buy' | 'sell';
    account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
    action_mode?: 'ACK' | 'RESULT' | 'FULL';
  }): Promise<APIResponse<Order[]>> {
    return this.deletePrivate('/spot/orders', { query: params });
  }

  /**
   * Cancel a batch of orders with an ID list
   *
   * Multiple currency pairs can be specified, but maximum 20 orders are allowed per request.
   *
   * @param params Parameters for cancelling a batch of orders
   * @returns Promise<APIResponse<DeleteSpotBatchOrdersResp[]>>
   */
  deleteSpotBatchOrders(
    body: CancelBatchOrder[],
  ): Promise<APIResponse<DeleteSpotBatchOrdersResp[]>> {
    return this.postPrivate('/spot/cancel_batch_orders', { body: body });
  }

  /**
   * Get a single order
   *
   * Spot, portfolio and margin orders are queried by default. If cross margin orders are needed or portfolio margin account are used, account must be set to cross_margin.
   *
   * @param params Parameters for getting a single order
   * @returns Promise<APIResponse<Order>>
   */
  getSpotOrder(params: {
    order_id: string;
    currency_pair: string;
    account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  }): Promise<APIResponse<Order>> {
    return this.getPrivate(`/spot/orders/${params.order_id}`, params);
  }

  /**
   * Amend an order
   *
   * By default, the orders of spot, portfolio and margin account are updated. If you need to modify orders of the cross-margin account, you must specify account as cross_margin. For portfolio margin account, only cross_margin account is supported.
   *
   * Currently, only supports modification of price or amount fields.
   *
   * @param params Parameters for amending an order
   * @returns Promise<APIResponse<Order>>
   */
  updateSpotOrder(params: UpdateSpotOrderReq): Promise<APIResponse<Order>> {
    const { order_id, currency_pair, account, ...body } = params;

    const query = {
      currency_pair: currency_pair,
      account: account,
    };

    return this.patchPrivate(`/spot/orders/${order_id}`, {
      query: query,
      body: body,
    });
  }

  /**
   * Cancel a single order
   *
   * Spot, portfolio and margin orders are cancelled by default. If trying to cancel cross margin orders or portfolio margin account are used, account must be set to cross_margin.
   *
   * @param params Parameters for cancelling a single order
   * @returns Promise<APIResponse<Order>>
   */
  deleteSpotOrder(params: DeleteSpotOrderReq): Promise<APIResponse<Order>> {
    const { order_id, ...query } = params;
    return this.deletePrivate(`/spot/orders/${order_id}`, {
      query: query,
    });
  }

  /**
   * List personal trading history
   *
   * Spot, portfolio and margin trades are queried by default. If cross margin trades are needed, account must be set to cross_margin.
   *
   * You can also set from and/or to to query by time range. If you don't specify from and/or to parameters, only the last 7 days of data will be returned. The range of from and to is not allowed to exceed 30 days. Time range parameters are handled as order finish time.
   *
   * @param params Parameters for listing personal trading history
   * @returns Promise<APIResponse<GetSpotTradingHistoryResp[]>>
   */
  getSpotTradingHistory(
    params?: GetSpotTradingHistoryReq,
  ): Promise<APIResponse<GetSpotTradingHistoryResp[]>> {
    return this.getPrivate('/spot/my_trades', params);
  }

  /**
   * Get server current time
   *
   * @returns Promise<APIResponse<{
   *   server_time: number;
   * }>>
   */
  getServerTime(): Promise<
    APIResponse<{
      server_time: number;
    }>
  > {
    return this.get('/spot/time');
  }

  /**
   * Countdown cancel orders
   *
   * When the timeout set by the user is reached, if there is no cancel or set a new countdown, the related pending orders will be automatically cancelled. This endpoint can be called repeatedly to set a new countdown or cancel the countdown.
   *
   * @param params Parameters for setting countdown cancel orders
   * @returns Promise<APIResponse<{
   *   triggerTime: number;
   * }>>
   */
  submitSpotCountdownOrders(body: {
    timeout: number;
    currency_pair?: string;
  }): Promise<
    APIResponse<{
      triggerTime: number;
    }>
  > {
    return this.postPrivate('/spot/countdown_cancel_all', { body: body });
  }

  /**
   * Batch modification of orders
   *
   * Default modification of orders for spot, portfolio, and margin accounts. To modify orders for a cross margin account, the account parameter must be specified as cross_margin. For portfolio margin accounts, the account parameter can only be specified as cross_margin. Currently, only modifications to price or quantity (choose one) are supported.
   *
   * @param params Parameters for batch modification of orders
   * @returns Promise<APIResponse<Order[]>>
   */
  updateSpotBatchOrders(
    body: UpdateSpotBatchOrdersReq[],
  ): Promise<APIResponse<Order[]>> {
    return this.postPrivate('/spot/amend_batch_orders', { body: body });
  }

  /**
   * Create a price-triggered order
   *
   * @param params Parameters for creating a price-triggered order
   * @returns Promise<APIResponse<{
   *   id: number;
   * }>>
   */
  submitSpotPriceTriggerOrder(body: SpotPriceTriggeredOrder): Promise<
    APIResponse<{
      id: number;
    }>
  > {
    return this.postPrivate('/spot/price_orders', { body: body });
  }

  /**
   * Retrieve running auto order list
   *
   * @param params Parameters for retrieving running auto order list
   * @returns Promise<APIResponse<SpotPriceTriggeredOrder[]>>
   */
  getSpotAutoOrders(
    params: GetSpotAutoOrdersReq,
  ): Promise<APIResponse<SpotPriceTriggeredOrder[]>> {
    return this.getPrivate('/spot/price_orders', params);
  }

  /**
   * Cancel all open orders
   *
   * @param params Parameters for cancelling all open orders
   * @returns Promise<APIResponse<SpotPriceTriggeredOrder[]>>
   */
  deleteSpotAllOpenOrders(params?: {
    market?: string;
    account?: 'normal' | 'margin' | 'cross_margin';
  }): Promise<APIResponse<SpotPriceTriggeredOrder[]>> {
    return this.deletePrivate('/spot/price_orders', { query: params });
  }

  /**
   * Get a price-triggered order
   *
   * @param params Parameters for getting a price-triggered order
   * @returns Promise<APIResponse<SpotPriceTriggeredOrder>>
   */
  getPriceTriggeredOrder(params: {
    order_id: string;
  }): Promise<APIResponse<SpotPriceTriggeredOrder>> {
    return this.getPrivate(`/spot/price_orders/${params.order_id}`);
  }

  /**
   * Cancel a price-triggered order
   *
   * @param params Parameters for cancelling a price-triggered order
   * @returns Promise<APIResponse<SpotPriceTriggeredOrder>>
   */
  deleteSpotPriceTriggeredOrder(params: {
    order_id: string;
  }): Promise<APIResponse<SpotPriceTriggeredOrder>> {
    return this.deletePrivate(`/spot/price_orders/${params.order_id}`);
  }

  /**==========================================================================================================================
   * MARGIN
   * ==========================================================================================================================
   */

  /**
   * Margin account list
   *
   * @param params Parameters for listing margin accounts
   * @returns Promise<APIResponse<GetMarginAccountsResp[]>>
   */
  getMarginAccounts(params?: {
    currency_pair?: string;
  }): Promise<APIResponse<GetMarginAccountsResp[]>> {
    return this.getPrivate('/margin/accounts', params);
  }

  /**
   * List margin account balance change history
   *
   * Only transferals from and to margin account are provided for now. Time range allows 30 days at most.
   *
   * @param params Parameters for listing margin account balance change history
   * @returns Promise<APIResponse<GetMarginBalanceHistoryResp[]>>
   */
  getMarginBalanceHistory(
    params?: GetMarginBalanceHistoryReq,
  ): Promise<APIResponse<GetMarginBalanceHistoryResp[]>> {
    return this.getPrivate('/margin/account_book', params);
  }

  /**
   * Funding account list
   *
   * @param params Parameters for listing funding accounts
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   available: string;
   *   locked: string;
   *   lent: string;
   *   total_lent: string;
   * }[]>>
   */
  getFundingAccounts(params?: { currency?: string }): Promise<
    APIResponse<
      {
        currency: string;
        available: string;
        locked: string;
        lent: string;
        total_lent: string;
      }[]
    >
  > {
    return this.getPrivate('/margin/funding_accounts', params);
  }

  /**
   * Update user's auto repayment setting
   *
   * @param params Parameters for updating auto repayment setting
   * @returns Promise<APIResponse<{ status: 'on' | 'off' }>>
   */
  updateAutoRepaymentSetting(params: {
    status: 'on' | 'off';
  }): Promise<APIResponse<{ status: 'on' | 'off' }>> {
    return this.postPrivate('/margin/auto_repay', { query: params });
  }

  /**
   * Retrieve user auto repayment setting
   *
   * @returns Promise<APIResponse<{ status: 'on' | 'off' }>>
   */
  getAutoRepaymentSetting(): Promise<APIResponse<{ status: 'on' | 'off' }>> {
    return this.getPrivate('/margin/auto_repay');
  }

  /**
   * Get the max transferable amount for a specific margin currency
   *
   * @param params Parameters for retrieving the max transferable amount
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   currency_pair?: string;
   *   amount: string;
   * }>>
   */
  getMarginTransferableAmount(params: {
    currency: string;
    currency_pair?: string;
  }): Promise<
    APIResponse<{
      currency: string;
      currency_pair?: string;
      amount: string;
    }>
  > {
    return this.getPrivate('/margin/transferable', params);
  }

  /**
   * Currencies supported by cross margin
   *
   * @returns Promise<APIResponse<GetCrossMarginCurrenciesResp[]>>
   */
  getCrossMarginCurrencies(): Promise<
    APIResponse<GetCrossMarginCurrenciesResp[]>
  > {
    return this.get('/margin/cross/currencies');
  }

  /**
   * Retrieve detail of one single currency supported by cross margin
   *
   * @param params Parameters containing the currency name
   * @returns Promise<APIResponse<GetCrossMarginCurrenciesResp>>
   */
  getCrossMarginCurrency(params: {
    currency: string;
  }): Promise<APIResponse<GetCrossMarginCurrenciesResp>> {
    return this.get(`/margin/cross/currencies/${params.currency}`);
  }

  /**
   * Retrieve cross margin account
   *
   * @returns Promise<APIResponse<GetCrossMarginAccountResp>>
   */
  getCrossMarginAccount(): Promise<APIResponse<GetCrossMarginAccountResp>> {
    return this.getPrivate('/margin/cross/accounts');
  }

  /**
   * Retrieve cross margin account change history
   *
   * Record time range cannot exceed 30 days.
   *
   * @param params Parameters for retrieving cross margin account change history
   * @returns Promise<APIResponse<GetCrossMarginAccountHistoryResp[]>>
   */
  getCrossMarginAccountHistory(
    params?: GetCrossMarginAccountHistoryReq,
  ): Promise<APIResponse<GetCrossMarginAccountHistoryResp[]>> {
    return this.getPrivate('/margin/cross/account_book', params);
  }

  /**
   * Create a cross margin borrow loan
   *
   * Borrow amount cannot be less than currency minimum borrow amount.
   *
   * @param params Parameters for creating a cross margin borrow loan
   * @returns Promise<APIResponse<SubmitCrossMarginBorrowLoanResp>>
   */
  submitCrossMarginBorrowLoan(
    body: SubmitCrossMarginBorrowLoanReq,
  ): Promise<APIResponse<SubmitCrossMarginBorrowLoanResp>> {
    return this.postPrivate('/margin/cross/loans', { body: body });
  }

  /**
   * List cross margin borrow history
   *
   * Sort by creation time in descending order by default. Set reverse=false to return ascending results.
   *
   * @param params Parameters for listing cross margin borrow history
   * @returns Promise<APIResponse<SubmitCrossMarginBorrowLoanResp[]>>
   */
  getCrossMarginBorrowHistory(
    params: GetCrossMarginBorrowHistoryReq,
  ): Promise<APIResponse<SubmitCrossMarginBorrowLoanResp[]>> {
    return this.getPrivate('/margin/cross/loans', params);
  }

  /**
   * Retrieve single borrow loan detail
   *
   * @param params Parameters containing the borrow loan ID
   * @returns Promise<APIResponse<SubmitCrossMarginBorrowLoanResp>>
   */
  getCrossMarginBorrowLoan(params: {
    loan_id: string;
  }): Promise<APIResponse<SubmitCrossMarginBorrowLoanResp>> {
    return this.getPrivate(`/margin/cross/loans/${params.loan_id}`);
  }
  /**
   * Cross margin repayments
   *
   * When the liquidity of the currency is insufficient and the transaction risk is high, the currency will be disabled, and funds cannot be transferred. When the available balance of cross-margin is insufficient, the balance of the spot account can be used for repayment. Please ensure that the balance of the spot account is sufficient, and system uses cross-margin account for repayment first.
   *
   * @param params Parameters for cross margin repayments
   * @returns Promise<APIResponse<SubmitCrossMarginBorrowLoanResp[]>>
   */
  submitCrossMarginRepayment(body: {
    currency: string;
    amount: string;
  }): Promise<APIResponse<SubmitCrossMarginBorrowLoanResp[]>> {
    return this.postPrivate('/margin/cross/repayments', { body: body });
  }

  /**
   * Retrieve cross margin repayments
   *
   * Sort by creation time in descending order by default. Set reverse=false to return ascending results.
   *
   * @param params Parameters for retrieving cross margin repayments
   * @returns Promise<APIResponse<GetCrossMarginRepaymentsResp[]>>
   */
  getCrossMarginRepayments(
    params?: GetCrossMarginRepaymentsReq,
  ): Promise<APIResponse<GetCrossMarginAccountResp[]>> {
    return this.getPrivate('/margin/cross/repayments', params);
  }

  /**
   * Interest records for the cross margin account
   *
   * @param params Parameters for retrieving interest records
   * @returns Promise<APIResponse<GetCrossMarginInterestRecordsResp[]>>
   */
  getCrossMarginInterestRecords(
    params?: GetCrossMarginInterestRecordsReq,
  ): Promise<APIResponse<GetCrossMarginInterestRecordsReq[]>> {
    return this.getPrivate('/margin/cross/interest_records', params);
  }

  /**
   * Get the max transferable amount for a specific cross margin currency
   *
   * @param params Parameters for retrieving the max transferable amount
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   amount: string;
   * }>>
   */
  getCrossMarginTransferableAmount(params: { currency: string }): Promise<
    APIResponse<{
      currency: string;
      amount: string;
    }>
  > {
    return this.getPrivate('/margin/cross/transferable', params);
  }

  /**
   * Estimated interest rates
   *
   * Please note that the interest rates are subject to change based on the borrowing and lending demand, and therefore, the provided rates may not be entirely accurate.
   *
   * @param params Parameters for retrieving estimated interest rates
   * @returns Promise<APIResponse<any>>
   */
  getEstimatedInterestRates(params: {
    currencies: string[];
  }): Promise<APIResponse<any>> {
    return this.getPrivate('/margin/cross/estimate_rate', params);
  }

  /**
   * Get the max borrowable amount for a specific cross margin currency
   *
   * @param params Parameters for retrieving the max borrowable amount
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   amount: string;
   * }>>
   */
  getCrossMarginBorrowableAmount(params: { currency: string }): Promise<
    APIResponse<{
      currency: string;
      amount: string;
    }>
  > {
    return this.getPrivate('/margin/cross/borrowable', params);
  }

  /**==========================================================================================================================
   * MARGIN UNI
   * ==========================================================================================================================
   */
  /**
   * List lending markets
   *
   * @returns Promise<APIResponse<GetLendingMarketsResp[]>>
   */
  getLendingMarkets(): Promise<APIResponse<GetLendingMarketsResp[]>> {
    return this.get('/margin/uni/currency_pairs');
  }

  /**
   * Get detail of lending market
   *
   * @param params Parameters containing the currency pair
   * @returns Promise<APIResponse<{
   *   currency_pair: string;
   *   base_min_borrow_amount: string;
   *   quote_min_borrow_amount: string;
   *   leverage: string;
   * }>>
   */
  getLendingMarket(params: {
    currency_pair: string;
  }): Promise<APIResponse<GetLendingMarketsResp>> {
    return this.get(`/margin/uni/currency_pairs/${params.currency_pair}`);
  }

  /**
   * Estimate interest rate
   *
   * Please note that the interest rates are subject to change based on the borrowing and lending demand, and therefore, the provided rates may not be entirely accurate.
   *
   * @param params Parameters for retrieving estimated interest rates
   * @returns Promise<APIResponse<any>>
   */
  estimateInterestRate(params: {
    currencies: string[];
  }): Promise<APIResponse<any>> {
    return this.getPrivate('/margin/uni/estimate_rate', params);
  }

  /**
   * Borrow or repay
   *
   * @param params Parameters for borrowing or repaying
   * @returns Promise<any>
   */
  submitMarginUNIBorrowOrRepay(body: {
    currency: string;
    type: 'borrow' | 'repay';
    amount: string;
    currency_pair: string;
    repaid_all?: boolean;
  }): Promise<any> {
    return this.postPrivate('/margin/uni/loans', { body: body });
  }

  /**
   * List loans
   *
   * @param params Parameters for listing loans
   * @returns Promise<APIResponse<GetMarginUNILoansResp[]>>
   */
  getMarginUNILoans(
    params?: GetMarginUNILoansReq,
  ): Promise<APIResponse<GetMarginUNILoansResp[]>> {
    return this.getPrivate('/margin/uni/loans', params);
  }

  /**
   * Get loan records
   *
   * @param params Parameters for retrieving loan records
   * @returns Promise<APIResponse<GetMarginUNILoanRecordsResp[]>>
   */
  getMarginUNILoanRecords(
    params?: GetMarginUNILoanRecordsReq,
  ): Promise<APIResponse<GetMarginUNILoanRecordsResp[]>> {
    return this.getPrivate('/margin/uni/loan_records', params);
  }

  /**
   * List interest records
   *
   * @param params Parameters for listing interest records
   * @returns Promise<APIResponse<GetMarginUNIInterestRecordsResp[]>>
   */
  getMarginUNIInterestRecords(
    params?: GetMarginUNIInterestRecordsReq,
  ): Promise<APIResponse<GetMarginUNIInterestRecordsResp[]>> {
    return this.getPrivate('/margin/uni/interest_records', params);
  }

  /**
   * Get maximum borrowable
   *
   * @param params Parameters for retrieving the maximum borrowable amount
   * @returns Promise<APIResponse<GetMarginUNIMaxBorrowResp>>
   */
  getMarginUNIMaxBorrow(
    params: GetMarginUNIMaxBorrowReq,
  ): Promise<APIResponse<GetMarginUNIMaxBorrowResp>> {
    return this.getPrivate('/margin/uni/borrowable', params);
  }
  /**==========================================================================================================================
   * FLASH SWAP
   * ==========================================================================================================================
   */

  /**
   * List All Supported Currency Pairs In Flash Swap
   *
   * @param params Parameters for retrieving data of the specified currency
   * @returns Promise<APIResponse<GetFlashSwapCurrencyPairsResp[]>>
   */
  getFlashSwapCurrencyPairs(params?: {
    currency?: string;
  }): Promise<APIResponse<GetFlashSwapCurrencyPairsResp[]>> {
    return this.get('/flash_swap/currency_pairs', params);
  }

  /**
   * Create a flash swap order
   *
   * Initiate a flash swap preview in advance because order creation requires a preview result.
   *
   * @param params Parameters for creating a flash swap order
   * @returns Promise<APIResponse<SubmitFlashSwapOrderResp>>
   */
  submitFlashSwapOrder(
    body: SubmitFlashSwapOrderReq,
  ): Promise<APIResponse<FlashSwapOrderResp>> {
    return this.postPrivate('/flash_swap/orders', { body: body });
  }

  /**
   * List all flash swap orders
   *
   * @param params Parameters for listing flash swap orders
   * @returns Promise<APIResponse<GetFlashSwapOrdersResp[]>>
   */
  getFlashSwapOrders(
    params?: GetFlashSwapOrdersReq,
  ): Promise<APIResponse<FlashSwapOrderResp[]>> {
    return this.getPrivate('/flash_swap/orders', params);
  }

  /**
   * Get a single flash swap order's detail
   *
   * @param params Parameters containing the flash swap order ID
   * @returns Promise<APIResponse<GetFlashSwapOrderResp>>
   */
  getFlashSwapOrder(params: {
    order_id: number;
  }): Promise<APIResponse<FlashSwapOrderResp>> {
    return this.getPrivate(`/flash_swap/orders/${params.order_id}`);
  }

  /**
   * Initiate a flash swap order preview
   *
   * @param params Parameters for initiating a flash swap order preview
   * @returns Promise<APIResponse<SubmitFlashSwapOrderPreviewResp>>
   */
  submitFlashSwapOrderPreview(
    body: SubmitFlashSwapOrderPreviewReq,
  ): Promise<APIResponse<SubmitFlashSwapOrderPreviewResp>> {
    return this.postPrivate('/flash_swap/orders/preview', { body });
  }

  /**==========================================================================================================================
   * FUTURES
   * ==========================================================================================================================
   */

  /**
   * List all futures contracts
   *
   * @param params Parameters for listing futures contracts
   * @returns Promise<APIResponse<Contract[]>>
   */
  getFuturesContracts(params: {
    settle: 'btc' | 'usdt' | 'usd';
    limit?: number;
    offset?: number;
  }): Promise<APIResponse<Contract[]>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/contracts`, query);
  }

  /**
   * Get a single contract
   *
   * @param params Parameters for retrieving a single contract
   * @returns Promise<APIResponse<Contract>>
   */
  getFuturesContract(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
  }): Promise<APIResponse<Contract>> {
    return this.get(`/futures/${params.settle}/contracts/${params.contract}`);
  }

  /**
   * Futures order book
   *
   * Bids will be sorted by price from high to low, while asks sorted reversely.
   *
   * @param params Parameters for retrieving the futures order book
   * @returns Promise<APIResponse<GetFuturesOrderBookResp>>
   */
  getFuturesOrderBook(
    params: GetFuturesOrderBookReq,
  ): Promise<APIResponse<GetFuturesOrderBookResp>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/order_book`, query);
  }

  /**
   * Futures trading history
   *
   * @param params Parameters for retrieving futures trading history
   * @returns Promise<APIResponse<GetFuturesTradesResp[]>>
   */
  getFuturesTrades(
    params: GetFuturesTradesReq,
  ): Promise<APIResponse<GetFuturesTradesResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/trades`, query);
  }

  /**
   * Get futures candlesticks
   *
   * Return specified contract candlesticks. If prefix contract with mark_, the contract's mark price candlesticks are returned; if prefix with index_, index price candlesticks will be returned.
   *
   * Maximum of 2000 points are returned in one query. Be sure not to exceed the limit when specifying from, to and interval.
   *
   * @param params Parameters for retrieving futures candlesticks
   * @returns Promise<APIResponse<GetFuturesCandlesticksResp[]>>
   */
  getFuturesCandlesticks(
    params: GetFuturesCandlesticksReq,
  ): Promise<APIResponse<GetFuturesCandlesticksResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/candlesticks`, query);
  }

  /**
   * Premium Index K-Line
   *
   * Maximum of 1000 points can be returned in a query. Be sure not to exceed the limit when specifying from, to and interval.
   *
   * @param params Parameters for retrieving premium index K-Line
   * @returns Promise<APIResponse<GetPremiumIndexKLineResp[]>>
   */
  getPremiumIndexKLine(
    params: GetFuturesCandlesticksReq,
  ): Promise<APIResponse<GetPremiumIndexKLineResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/premium_index`, query);
  }

  /**
   * List futures tickers
   *
   * @param params Parameters for listing futures tickers
   * @returns Promise<APIResponse<GetFuturesTickersResp[]>>
   */
  getFuturesTickers(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract?: string;
  }): Promise<APIResponse<GetFuturesTickersResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/tickers`, query);
  }

  /**
   * Funding rate history
   *
   * @param params Parameters for retrieving funding rate history
   * @returns Promise<APIResponse<{
   *   t: number;
   *   r: string;
   * }[]>>
   */
  getFundingRates(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    limit?: number;
  }): Promise<
    APIResponse<
      {
        t: number;
        r: string;
      }[]
    >
  > {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/funding_rate`, query);
  }

  /**
   * Futures insurance balance history
   *
   * @param params Parameters for retrieving futures insurance balance history
   * @returns Promise<APIResponse<{
   *   t: number;
   *   b: string;
   * }[]>>
   */
  getFuturesInsuranceBalance(params: {
    settle: 'btc' | 'usdt' | 'usd';
    limit?: number;
  }): Promise<
    APIResponse<
      {
        t: number;
        b: string;
      }[]
    >
  > {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/insurance`, query);
  }

  /**
   * Futures stats
   *
   * @param params Parameters for retrieving futures stats
   * @returns Promise<APIResponse<GetFuturesStatsResp[]>>
   */
  getFuturesStats(
    params: GetFuturesStatsReq,
  ): Promise<APIResponse<GetFuturesStatsResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/contract_stats`, query);
  }

  /**
   * Get index constituents
   *
   * @param params Parameters for retrieving index constituents
   * @returns Promise<APIResponse<GetIndexConstituentsResp>>
   */
  getIndexConstituents(params: {
    settle: 'btc' | 'usdt' | 'usd';
    index: string;
  }): Promise<APIResponse<GetIndexConstituentsResp>> {
    return this.get(
      `/futures/${params.settle}/index_constituents/${params.index}`,
    );
  }

  /**
   * Retrieve liquidation history
   *
   * Interval between from and to cannot exceed 3600. Some private fields will not be returned in public endpoints. Refer to field description for detail.
   *
   * @param params Parameters for retrieving liquidation history
   * @returns Promise<APIResponse<GetLiquidationHistoryResp[]>>
   */
  getLiquidationHistory(
    params: GetLiquidationHistoryReq,
  ): Promise<APIResponse<GetLiquidationHistoryResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/liq_orders`, query);
  }

  /**
   * List risk limit tiers
   *
   * When the 'contract' parameter is not passed, the default is to query the risk limits for the top 100 markets.
   * 'Limit' and 'offset' correspond to pagination queries at the market level, not to the length of the returned array.
   * This only takes effect when the 'contract' parameter is empty.
   *
   * @param params Parameters for listing risk limit tiers
   * @returns Promise<APIResponse<GetRiskLimitTiersResp[]>>
   */
  getRiskLimitTiers(
    params: GetRiskLimitTiersReq,
  ): Promise<APIResponse<GetRiskLimitTiersResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/risk_limit_tiers`, query);
  }

  /**
   * Query futures account
   *
   * @param params Parameters for querying futures account
   * @returns Promise<APIResponse<GetFuturesAccountResp>>
   */
  getFuturesAccount(params: {
    settle: 'btc' | 'usdt' | 'usd';
  }): Promise<APIResponse<GetFuturesAccountResp>> {
    return this.getPrivate(`/futures/${params.settle}/accounts`);
  }

  /**
   * Query account book
   *
   * If the contract field is provided, it can only filter records that include this field after 2023-10-30.
   *
   * @param params Parameters for querying account book
   * @returns Promise<APIResponse<GetFuturesAccountBookResp[]>>
   */
  getFuturesAccountBook(
    params: GetFuturesAccountBookReq,
  ): Promise<APIResponse<GetFuturesAccountBookReq[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/account_book`, query);
  }

  /**
   * List all positions of a user
   *
   * @param params Parameters for listing all positions of a user
   * @returns Promise<APIResponse<Position[]>>
   */
  getFuturesPositions(
    params: GetFuturesPositionsReq,
  ): Promise<APIResponse<Position[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/positions`, query);
  }
  /**
   * Get single position
   *
   * @param params Parameters for retrieving a single position
   * @returns Promise<APIResponse<Position>>
   */
  getFuturesPosition(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
  }): Promise<APIResponse<Position>> {
    return this.getPrivate(
      `/futures/${params.settle}/positions/${params.contract}`,
    );
  }

  /**
   * Update position margin
   *
   * @param params Parameters for updating position margin
   * @returns Promise<APIResponse<Position>>
   */
  updateFuturesMargin(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    change: string;
  }): Promise<APIResponse<Position>> {
    const { settle, contract, ...query } = params;
    return this.postPrivate(`/futures/${settle}/positions/${contract}/margin`, {
      query: query,
    });
  }

  /**
   * Update position leverage
   *
   * @param params Parameters for updating position leverage
   * @returns Promise<APIResponse<Position>>
   */
  updateFuturesLeverage(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    leverage: string;
    cross_leverage_limit?: string;
  }): Promise<APIResponse<Position>> {
    const { settle, contract, ...query } = params;
    return this.postPrivate(
      `/futures/${settle}/positions/${contract}/leverage`,
      { query: query },
    );
  }

  /**
   * Update position risk limit
   *
   * @param params Parameters for updating position risk limit
   * @returns Promise<APIResponse<Position>>
   */
  updatePositionRiskLimit(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    risk_limit: string;
  }): Promise<APIResponse<Position>> {
    const { settle, contract, ...query } = params;
    return this.postPrivate(
      `/futures/${settle}/positions/${contract}/risk_limit`,
      { query: query },
    );
  }

  /**
   * Enable or disable dual mode
   *
   * Before setting dual mode, make sure all positions are closed and no orders are open.
   *
   * @param params Parameters for enabling or disabling dual mode
   * @returns Promise<APIResponse<ToggleFuturesDualModeResp>>
   */
  toggleFuturesDualMode(params: {
    settle: 'btc' | 'usdt' | 'usd';
    dual_mode: boolean;
  }): Promise<APIResponse<ToggleFuturesDualModeResp>> {
    const { settle, ...query } = params;
    return this.postPrivate(`/futures/${settle}/dual_mode`, {
      query: query,
    });
  }

  /**
   * Retrieve position detail in dual mode
   *
   * @param params Parameters for retrieving position detail in dual mode
   * @returns Promise<APIResponse<Position[]>>
   */
  getDualModePosition(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
  }): Promise<APIResponse<Position[]>> {
    return this.getPrivate(
      `/futures/${params.settle}/dual_comp/positions/${params.contract}`,
    );
  }

  /**
   * Update position margin in dual mode
   *
   * @param params Parameters for updating position margin in dual mode
   * @returns Promise<APIResponse<Position[]>>
   */
  updateDualModePositionMargin(
    params: UpdateDualModePositionMarginReq,
  ): Promise<APIResponse<Position[]>> {
    const { settle, contract, ...query } = params;
    return this.postPrivate(
      `/futures/${settle}/dual_comp/positions/${contract}/margin`,
      { query: query },
    );
  }

  /**
   * Update position leverage in dual mode
   *
   * @param params Parameters for updating position leverage in dual mode
   * @returns Promise<APIResponse<Position[]>>
   */
  updateDualModePositionLeverage(
    params: UpdateDualModePositionLeverageReq,
  ): Promise<APIResponse<Position[]>> {
    const { settle, contract, ...query } = params;
    return this.postPrivate(
      `/futures/${settle}/dual_comp/positions/${contract}/leverage`,
      { query: query },
    );
  }

  /**
   * Update position risk limit in dual mode
   *
   * @param params Parameters for updating position risk limit in dual mode
   * @returns Promise<APIResponse<Position[]>>
   */
  updateDualModePositionRiskLimit(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    risk_limit: string;
  }): Promise<APIResponse<Position[]>> {
    const { settle, contract, ...query } = params;
    return this.postPrivate(
      `/futures/${settle}/dual_comp/positions/${contract}/risk_limit`,
      { query: query },
    );
  }

  /**
   * Create a futures order
   *
   * Creating futures orders requires size, which is the number of contracts instead of currency amount. You can use quanto_multiplier in the contract detail response to know how much currency 1 size contract represents.
   * Zero-filled order cannot be retrieved 10 minutes after order cancellation. You will get a 404 not found for such orders.
   * Set reduce_only to true to keep the position from changing side when reducing position size.
   * In single position mode, to close a position, you need to set size to 0 and close to true.
   * In dual position mode, to close one side position, you need to set auto_size side, reduce_only to true, and size to 0.
   * Set stp_act to decide the strategy of self-trade prevention. For detailed usage, refer to the stp_act parameter in the request body.
   *
   * @param params Parameters for creating a futures order
   * @returns Promise<APIResponse<SubmitFuturesOrderReq>>
   */
  submitFuturesOrder(
    params: SubmitFuturesOrderReq,
  ): Promise<APIResponse<FuturesOrder>> {
    const { settle, ...body } = params;
    return this.postPrivate(`/futures/${settle}/orders`, { body: body });
  }

  /**
   * List futures orders
   *
   * Zero-fill order cannot be retrieved for 10 minutes after cancellation.
   * Historical orders, by default, only data within the past 6 months is supported. If you need to query data for a longer period, please use GET /futures/{settle}/orders_timerange.
   *
   * @param params Parameters for listing futures orders
   * @returns Promise<APIResponse<FuturesOrder[]>>
   */
  getFuturesOrders(
    params: GetFuturesOrdersReq,
  ): Promise<APIResponse<FuturesOrder[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/orders`, query);
  }

  /**
   * Cancel all open orders matched
   *
   * Zero-filled order cannot be retrieved 10 minutes after order cancellation.
   *
   * @param params Parameters for cancelling all open orders matched
   * @returns Promise<APIResponse<FuturesOrder[]>>
   */
  deleteAllFuturesOrders(
    params: DeleteAllFuturesOrdersReq,
  ): Promise<APIResponse<FuturesOrder[]>> {
    const { settle, ...query } = params;
    return this.deletePrivate(`/futures/${settle}/orders`, {
      query: query,
    });
  }

  /**
   * List Futures Orders By Time Range
   *
   * @param params Parameters for listing futures orders by time range
   * @returns Promise<APIResponse<FuturesOrder[]>>
   */
  getFuturesOrdersByTimeRange(
    params: GetFuturesOrdersByTimeRangeReq,
  ): Promise<APIResponse<FuturesOrder[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/orders_timerange`, query);
  }

  /**
   * Create a batch of futures orders
   *
   * Up to 10 orders per request.
   * If any of the order's parameters are missing or in the wrong format, all of them will not be executed, and a http status 400 error will be returned directly.
   * If the parameters are checked and passed, all are executed. Even if there is a business logic error in the middle (such as insufficient funds), it will not affect other execution orders.
   * The returned result is in array format, and the order corresponds to the orders in the request body.
   * In the returned result, the succeeded field of type bool indicates whether the execution was successful or not.
   * If the execution is successful, the normal order content is included; if the execution fails, the label field is included to indicate the cause of the error.
   * In the rate limiting, each order is counted individually.
   *
   * @param params Parameters for creating a batch of futures orders
   * @returns Promise<APIResponse<FuturesOrder[]>>
   */
  submitFuturesBatchOrders(
    params: submitFuturesBatchOrdersReq,
  ): Promise<APIResponse<FuturesOrder[]>> {
    const { settle, ...body } = params;
    return this.postPrivate(`/futures/${settle}/batch_orders`, { body: body });
  }

  /**
   * Get a single order
   *
   * Zero-fill order cannot be retrieved for 10 minutes after cancellation.
   * Historical orders, by default, only data within the past 6 months is supported.
   *
   * @param params Parameters for retrieving a single order
   * @returns Promise<APIResponse<FuturesOrder>>
   */
  getFuturesOrder(params: {
    settle: 'btc' | 'usdt' | 'usd';
    order_id: string;
  }): Promise<APIResponse<FuturesOrder>> {
    return this.getPrivate(
      `/futures/${params.settle}/orders/${params.order_id}`,
    );
  }

  /**
   * Cancel a single order
   *
   * @param params Parameters for cancelling a single order
   * @returns Promise<APIResponse<FuturesOrder>>
   */
  deleteFuturesOrder(params: {
    settle: 'btc' | 'usdt' | 'usd';
    order_id: string;
  }): Promise<APIResponse<FuturesOrder>> {
    return this.deletePrivate(
      `/futures/${params.settle}/orders/${params.order_id}`,
    );
  }

  /**
   * Amend an order
   *
   * @param params Parameters for amending an order
   * @returns Promise<APIResponse<FuturesOrder>>
   */
  updateFuturesOrder(params: {
    settle: 'btc' | 'usdt' | 'usd';
    order_id: string;
    size?: number;
    price?: string;
    amend_text?: string;
  }): Promise<APIResponse<FuturesOrder>> {
    const { settle, order_id, ...body } = params;
    return this.putPrivate(`/futures/${settle}/orders/${order_id}`, {
      body: body,
    });
  }

  /**
   * List personal trading history
   *
   * By default, only data within the past 6 months is supported. If you need to query data for a longer period, please use GET /futures/{settle}/my_trades_timerange.
   *
   * @param params Parameters for listing personal trading history
   * @returns Promise<APIResponse<GetFuturesTradingHistoryResp[]>>
   */
  getFuturesTradingHistory(
    params: GetFuturesTradingHistoryReq,
  ): Promise<APIResponse<GetFuturesTradingHistoryResp[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/my_trades`, query);
  }

  /**
   * List position close history
   *
   * @param params Parameters for listing position close history
   * @returns Promise<APIResponse<GetFuturesPositionHistoryResp[]>>
   */
  getFuturesPositionHistory(
    params: GetFuturesPositionHistoryReq,
  ): Promise<APIResponse<GetFuturesPositionHistoryResp[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/position_close`, query);
  }

  /**
   * List liquidation history
   *
   * @param params Parameters for listing liquidation history
   * @returns Promise<APIResponse<GetFuturesLiquidationHistoryResp[]>>
   */
  getFuturesLiquidationHistory(
    params: GetFuturesLiquidationHistoryReq,
  ): Promise<APIResponse<GetFuturesLiquidationHistoryResp[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/liquidates`, query);
  }

  /**
   * List Auto-Deleveraging History
   *
   * @param params Parameters for listing auto-deleveraging history
   * @returns Promise<APIResponse<GetFuturesAutoDeleveragingHistoryResp[]>>
   */
  getFuturesAutoDeleveragingHistory(
    params: GetFuturesLiquidationHistoryReq,
  ): Promise<APIResponse<GetFuturesAutoDeleveragingHistoryResp[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/auto_deleverages`, query);
  }

  /**
   * Countdown cancel orders
   *
   * When the timeout set by the user is reached, if there is no cancel or set a new countdown, the related pending orders will be automatically cancelled. This endpoint can be called repeatedly to set a new countdown or cancel the countdown.
   * For example, call this endpoint at 30s intervals, each countdown timeout is set to 30s. If this endpoint is not called again within 30 seconds, all pending orders on the specified market will be automatically cancelled, if no market is specified, all market pending orders will be cancelled.
   * If the timeout is set to 0 within 30 seconds, the countdown timer will expire and the cancel function will be cancelled.
   *
   * @param params Parameters for setting countdown cancel orders
   * @returns Promise<APIResponse<{ triggerTime: number }>>
   */
  deleteFuturesOrdersCountdown(params: {
    settle: 'btc' | 'usdt' | 'usd';
    timeout: number;
    contract?: string;
  }): Promise<APIResponse<{ triggerTime: number }>> {
    const { settle, ...body } = params;
    return this.postPrivate(`/futures/${settle}/countdown_cancel_all`, {
      body: body,
    });
  }

  /**
   * Query user trading fee rates
   *
   * @param params Parameters for querying user trading fee rates
   * @returns Promise<APIResponse<any>>>
   */
  getFuturesUserTradingFees(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract?: string;
  }): Promise<APIResponse<any>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/fee`, query);
  }

  /**
   * Cancel a batch of orders with an ID list
   *
   * Multiple distinct order ID list can be specified. Each request can cancel a maximum of 20 records.
   *
   * @param params Parameters for cancelling a batch of orders with an ID list
   * @returns Promise<APIResponse<DeleteFuturesBatchOrdersResp[]>>
   */
  deleteFuturesBatchOrders(params: {
    settle: 'btc' | 'usdt' | 'usd';
    body: string[];
  }): Promise<APIResponse<DeleteFuturesBatchOrdersResp[]>> {
    const { settle, ...body } = params;
    return this.postPrivate(`/futures/${settle}/batch_cancel_orders`, {
      body: body,
    });
  }

  /**
   * Create a price-triggered order
   *
   * @param params Parameters for creating a price-triggered order
   * @returns Promise<APIResponse<{ id: number }>>
   */
  submitFuturesPriceTriggeredOrder(
    params: SubmitFuturesPriceTriggeredOrderReq,
  ): Promise<APIResponse<{ id: number }>> {
    const { settle, ...body } = params;
    return this.postPrivate(`/futures/${settle}/price_orders`, { body: body });
  }

  /**
   * List all auto orders
   *
   * @param params Parameters for listing all auto orders
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder[]>>
   */
  getFuturesAutoOrders(
    params: GetFuturesAutoOrdersReq,
  ): Promise<APIResponse<FuturesPriceTriggeredOrder[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/price_orders`, query);
  }

  /**
   * Cancel all open orders
   *
   * @param params Parameters for cancelling all open orders
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder[]>>
   */
  deleteFuturesAllOpenOrders(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
  }): Promise<APIResponse<FuturesPriceTriggeredOrder[]>> {
    const { settle, ...query } = params;
    return this.deletePrivate(`/futures/${settle}/price_orders`, {
      query: query,
    });
  }

  /**
   * Get a price-triggered order
   *
   * @param params Parameters for retrieving a price-triggered order
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder>>
   */
  getFuturesPriceTriggeredOrder(params: {
    settle: 'btc' | 'usdt' | 'usd';
    order_id: string;
  }): Promise<APIResponse<FuturesPriceTriggeredOrder>> {
    return this.getPrivate(
      `/futures/${params.settle}/price_orders/${params.order_id}`,
    );
  }

  /**
   * Cancel a price-triggered order
   *
   * @param params Parameters for cancelling a price-triggered order
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder>>
   */
  deleteFuturesPriceTriggeredOrder(params: {
    settle: 'btc' | 'usdt' | 'usd';
    order_id: string;
  }): Promise<APIResponse<FuturesPriceTriggeredOrder>> {
    return this.deletePrivate(
      `/futures/${params.settle}/price_orders/${params.order_id}`,
    );
  }

  /**==========================================================================================================================
   * DELIVERY
   * ==========================================================================================================================
   */

  /**
   * List all futures contracts
   *
   * @param params Parameters for listing all futures contracts
   * @returns Promise<APIResponse<DeliveryContract[]>>
   */
  getAllDeliveryContracts(params: {
    settle: 'usdt';
  }): Promise<APIResponse<DeliveryContract[]>> {
    return this.get(`/delivery/${params.settle}/contracts`, params);
  }

  /**
   * Get a single contract
   *
   * @param params Parameters for retrieving a single contract
   * @returns Promise<APIResponse<DeliveryContract>>
   */
  getDeliveryContract(params: {
    settle: 'usdt';
    contract: string;
  }): Promise<APIResponse<DeliveryContract>> {
    return this.get(
      `/delivery/${params.settle}/contracts/${params.contract}`,
      params,
    );
  }

  /**
   * Futures order book
   *
   * Bids will be sorted by price from high to low, while asks sorted reversely
   *
   * @param params Parameters for retrieving the futures order book
   * @returns Promise<APIResponse<{
   *   id?: number;
   *   current: number;
   *   update: number;
   *   asks: { p: string; s: number }[];
   *   bids: { p: string; s: number }[];
   * }>>
   */
  getDeliveryOrderBook(params: {
    settle: 'usdt';
    contract: string;
    interval?: '0' | '0.1' | '0.01';
    limit?: number;
    with_id?: boolean;
  }): Promise<
    APIResponse<{
      id?: number;
      current: number;
      update: number;
      asks: { p: string; s: number }[];
      bids: { p: string; s: number }[];
    }>
  > {
    return this.get(`/delivery/${params.settle}/order_book`, params);
  }

  /**
   * Futures trading history
   *
   * @param params Parameters for retrieving the futures trading history
   * @returns Promise<APIResponse<{
   *   id: number;
   *   create_time: number;
   *   create_time_ms: number;
   *   contract: string;
   *   size: number;
   *   price: string;
   *   is_internal?: boolean;
   * }[]>>
   */
  getDeliveryTrades(params: {
    settle: 'usdt';
    contract: string;
    limit?: number;
    last_id?: string;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        id: number;
        create_time: number;
        create_time_ms: number;
        contract: string;
        size: number;
        price: string;
        is_internal?: boolean;
      }[]
    >
  > {
    return this.get(`/delivery/${params.settle}/trades`, params);
  }

  /**
   * Get futures candlesticks
   *
   * Return specified contract candlesticks. If prefix contract with mark_, the contract's mark price candlesticks are returned; if prefix with index_, index price candlesticks will be returned.
   * Maximum of 2000 points are returned in one query. Be sure not to exceed the limit when specifying from, to and interval.
   *
   * @param params Parameters for retrieving futures candlesticks
   * @returns Promise<APIResponse<{
   *   t: number;
   *   v?: number;
   *   c: string;
   *   h: string;
   *   l: string;
   *   o: string;
   * }[]>>
   */
  getDeliveryCandlesticks(params: {
    settle: 'usdt';
    contract: string;
    from?: number;
    to?: number;
    limit?: number;
    interval?:
      | '10s'
      | '30s'
      | '1m'
      | '5m'
      | '15m'
      | '30m'
      | '1h'
      | '2h'
      | '4h'
      | '6h'
      | '8h'
      | '12h'
      | '1d'
      | '7d'
      | '1w'
      | '30d';
  }): Promise<
    APIResponse<
      {
        t: number;
        v?: number;
        c: string;
        h: string;
        l: string;
        o: string;
      }[]
    >
  > {
    return this.get(`/delivery/${params.settle}/candlesticks`, params);
  }

  /**
   * List futures tickers
   *
   * @param params Parameters for listing futures tickers
   * @returns Promise<APIResponse<{
   *   contract: string;
   *   last: string;
   *   change_percentage: string;
   *   total_size: string;
   *   low_24h: string;
   *   high_24h: string;
   *   volume_24h: string;
   *   volume_24h_btc?: string;
   *   volume_24h_usd?: string;
   *   volume_24h_base: string;
   *   volume_24h_quote: string;
   *   volume_24h_settle: string;
   *   mark_price: string;
   *   funding_rate: string;
   *   funding_rate_indicative: string;
   *   index_price: string;
   *   quanto_base_rate?: string;
   *   basis_rate: string;
   *   basis_value: string;
   *   lowest_ask: string;
   *   highest_bid: string;
   * }[]>>
   */
  getDeliveryTickers(params: { settle: 'usdt'; contract?: string }): Promise<
    APIResponse<
      {
        contract: string;
        last: string;
        change_percentage: string;
        total_size: string;
        low_24h: string;
        high_24h: string;
        volume_24h: string;
        volume_24h_btc?: string;
        volume_24h_usd?: string;
        volume_24h_base: string;
        volume_24h_quote: string;
        volume_24h_settle: string;
        mark_price: string;
        funding_rate: string;
        funding_rate_indicative: string;
        index_price: string;
        quanto_base_rate?: string;
        basis_rate: string;
        basis_value: string;
        lowest_ask: string;
        highest_bid: string;
      }[]
    >
  > {
    return this.get(`/delivery/${params.settle}/tickers`, params);
  }

  /**
   * Futures insurance balance history
   *
   * @param params Parameters for retrieving the futures insurance balance history
   * @returns Promise<APIResponse<{
   *   t: number;
   *   b: string;
   * }[]>>
   */
  getDeliveryInsuranceBalanceHistory(params: {
    settle: 'usdt';
    limit?: number;
  }): Promise<
    APIResponse<
      {
        t: number;
        b: string;
      }[]
    >
  > {
    return this.get(`/delivery/${params.settle}/insurance`, params);
  }

  /**
   * Query futures account
   *
   * @param params Parameters for querying futures account
   * @returns Promise<APIResponse<{
   *   total: string;
   *   unrealised_pnl: string;
   *   position_margin: string;
   *   order_margin: string;
   *   available: string;
   *   point: string;
   *   currency: string;
   *   in_dual_mode: boolean;
   *   enable_credit: boolean;
   *   position_initial_margin: string;
   *   maintenance_margin: string;
   *   bonus: string;
   *   enable_evolved_classic: boolean;
   *   history: {
   *     dnw: string;
   *     pnl: string;
   *     fee: string;
   *     refr: string;
   *     fund: string;
   *     point_dnw: string;
   *     point_fee: string;
   *     point_refr: string;
   *     bonus_dnw: string;
   *     bonus_offset: string;
   *   };
   * }>>
   */
  getDeliveryAccount(params: { settle: 'usdt' }): Promise<
    APIResponse<{
      total: string;
      unrealised_pnl: string;
      position_margin: string;
      order_margin: string;
      available: string;
      point: string;
      currency: string;
      in_dual_mode: boolean;
      enable_credit: boolean;
      position_initial_margin: string;
      maintenance_margin: string;
      bonus: string;
      enable_evolved_classic: boolean;
      history: {
        dnw: string;
        pnl: string;
        fee: string;
        refr: string;
        fund: string;
        point_dnw: string;
        point_fee: string;
        point_refr: string;
        bonus_dnw: string;
        bonus_offset: string;
      };
    }>
  > {
    return this.getPrivate(`/delivery/${params.settle}/accounts`, params);
  }

  /**
   * Query account book
   *
   * @param params Parameters for querying account book
   * @returns Promise<APIResponse<{
   *   time: number;
   *   change: string;
   *   balance: string;
   *   type: 'dnw' | 'pnl' | 'fee' | 'refr' | 'fund' | 'point_dnw' | 'point_fee' | 'point_refr' | 'bonus_offset';
   *   text: string;
   *   contract?: string;
   *   trade_id?: string;
   * }[]>>
   */
  getDeliveryBook(params: {
    settle: 'usdt';
    limit?: number;
    from?: number;
    to?: number;
    type?:
      | 'dnw'
      | 'pnl'
      | 'fee'
      | 'refr'
      | 'fund'
      | 'point_dnw'
      | 'point_fee'
      | 'point_refr'
      | 'bonus_offset';
  }): Promise<
    APIResponse<
      {
        time: number;
        change: string;
        balance: string;
        type:
          | 'dnw'
          | 'pnl'
          | 'fee'
          | 'refr'
          | 'fund'
          | 'point_dnw'
          | 'point_fee'
          | 'point_refr'
          | 'bonus_offset';
        text: string;
        contract?: string;
        trade_id?: string;
      }[]
    >
  > {
    return this.getPrivate(`/delivery/${params.settle}/account_book`, params);
  }

  /**
   * List all positions of a user
   *
   * @param params Parameters for listing all positions of a user
   * @returns Promise<APIResponse<Position[]>>
   */
  getDeliveryPositions(params: {
    settle: 'usdt';
  }): Promise<APIResponse<Position[]>> {
    return this.getPrivate(`/delivery/${params.settle}/positions`, params);
  }

  /**
   * Get single position
   *
   * @param params Parameters for retrieving a single position
   * @returns Promise<APIResponse<Position>>
   */
  getDeliveryPosition(params: {
    settle: 'usdt';
    contract: string;
  }): Promise<APIResponse<Position>> {
    return this.getPrivate(
      `/delivery/${params.settle}/positions/${params.contract}`,
      params,
    );
  }

  /**
   * Update position margin
   *
   * @param params Parameters for updating position margin
   * @returns Promise<APIResponse<Position>>
   */
  updateDeliveryMargin(params: {
    settle: 'usdt';
    contract: string;
    change: string;
  }): Promise<APIResponse<Position>> {
    return this.postPrivate(
      `/delivery/${params.settle}/positions/${params.contract}/margin`,
      { query: params },
    );
  }

  /**
   * Update position leverage
   *
   * @param params Parameters for updating position leverage
   * @returns Promise<APIResponse<Position>>
   */
  updateDeliveryLeverage(params: {
    settle: 'usdt';
    contract: string;
    leverage: string;
  }): Promise<APIResponse<Position>> {
    return this.postPrivate(
      `/delivery/${params.settle}/positions/${params.contract}/leverage`,
      { query: params },
    );
  }

  /**
   * Update position risk limit
   *
   * @param params Parameters for updating position risk limit
   * @returns Promise<APIResponse<Position>>
   */
  updateDeliveryRiskLimit(params: {
    settle: 'usdt';
    contract: string;
    risk_limit: string;
  }): Promise<APIResponse<Position>> {
    return this.postPrivate(
      `/delivery/${params.settle}/positions/${params.contract}/risk_limit`,
      { query: params },
    );
  }

  /**
   * Create a futures order
   *
   * Zero-filled order cannot be retrieved 10 minutes after order cancellation
   *
   * @param params Parameters for creating a futures order
   * @returns Promise<APIResponse<FuturesOrder>>
   */
  submitDeliveryOrder(
    params: {
      settle: 'usdt';
    },
    body: FuturesOrder,
  ): Promise<APIResponse<FuturesOrder>> {
    return this.postPrivate(`/delivery/${params.settle}/orders`, { body });
  }

  /**
   * List futures orders
   *
   * Zero-fill order cannot be retrieved 10 minutes after order cancellation.
   *
   * @param params Parameters for listing futures orders
   * @returns Promise<APIResponse<FuturesOrder[]>>
   */
  getDeliveryOrders(params: {
    settle: 'usdt';
    contract?: string;
    status: 'open' | 'finished';
    limit?: number;
    offset?: number;
    last_id?: string;
    count_total?: 0 | 1;
  }): Promise<APIResponse<FuturesOrder[]>> {
    return this.getPrivate(`/delivery/${params.settle}/orders`, params);
  }

  /**
   * Cancel all open orders matched
   *
   * Zero-filled order cannot be retrieved 10 minutes after order cancellation
   *
   * @param params Parameters for cancelling all open orders matched
   * @returns Promise<APIResponse<FuturesOrder[]>>
   */
  deleteAllDeliveryOrders(params: {
    settle: 'usdt';
    contract: string;
    side?: 'ask' | 'bid';
  }): Promise<APIResponse<FuturesOrder[]>> {
    return this.deletePrivate(`/delivery/${params.settle}/orders`, {
      query: params,
    });
  }

  /**
   * Get a single order
   *
   * Zero-filled order cannot be retrieved 10 minutes after order cancellation
   *
   * @param params Parameters for retrieving a single order
   * @returns Promise<APIResponse<FuturesOrder>>
   */
  getDeliveryOrder(params: {
    settle: 'usdt';
    order_id: string;
  }): Promise<APIResponse<FuturesOrder>> {
    return this.getPrivate(
      `/delivery/${params.settle}/orders/${params.order_id}`,
    );
  }

  /**
   * Cancel a single order
   *
   * @param params Parameters for cancelling a single order
   * @returns Promise<APIResponse<FuturesOrder>>
   */
  deleteDeliveryOrder(params: {
    settle: 'usdt';
    order_id: string;
  }): Promise<APIResponse<FuturesOrder>> {
    return this.deletePrivate(
      `/delivery/${params.settle}/orders/${params.order_id}`,
    );
  }

  /**
   * List personal trading history
   *
   * @param params Parameters for listing personal trading history
   * @returns Promise<APIResponse<{
   *   id: number;
   *   create_time: number;
   *   contract: string;
   *   order_id: string;
   *   size: number;
   *   price: string;
   *   role: 'taker' | 'maker';
   *   text: string;
   *   fee: string;
   *   point_fee: string;
   * }[]>>
   */
  getDeliveryTradingHistory(params: {
    settle: 'usdt';
    contract?: string;
    order?: number;
    limit?: number;
    offset?: number;
    last_id?: string;
    count_total?: 0 | 1;
  }): Promise<
    APIResponse<
      {
        id: number;
        create_time: number;
        contract: string;
        order_id: string;
        size: number;
        price: string;
        role: 'taker' | 'maker';
        text: string;
        fee: string;
        point_fee: string;
      }[]
    >
  > {
    return this.getPrivate(`/delivery/${params.settle}/my_trades`, params);
  }

  /**
   * List position close history
   *
   * @param params Parameters for listing position close history
   * @returns Promise<APIResponse<{
   *   time: number;
   *   contract: string;
   *   side: 'long' | 'short';
   *   pnl: string;
   *   pnl_pnl: string;
   *   pnl_fund: string;
   *   pnl_fee: string;
   *   text: string;
   *   max_size: string;
   *   first_open_time: number;
   *   long_price: string;
   *   short_price: string;
   * }[]>>
   */
  getDeliveryClosedPositions(params: {
    settle: 'usdt';
    contract?: string;
    limit?: number;
  }): Promise<
    APIResponse<
      {
        time: number;
        contract: string;
        side: 'long' | 'short';
        pnl: string;
        pnl_pnl: string;
        pnl_fund: string;
        pnl_fee: string;
        text: string;
        max_size: string;
        first_open_time: number;
        long_price: string;
        short_price: string;
      }[]
    >
  > {
    return this.getPrivate(`/delivery/${params.settle}/position_close`, params);
  }

  /**
   * List liquidation history
   *
   * @param params Parameters for listing liquidation history
   * @returns Promise<APIResponse<{
   *   time: number;
   *   contract: string;
   *   leverage?: string;
   *   size: number;
   *   margin?: string;
   *   entry_price?: string;
   *   liq_price?: string;
   *   mark_price?: string;
   *   order_id?: number;
   *   order_price: string;
   *   fill_price: string;
   *   left: number;
   * }[]>>
   */
  getDeliveryLiquidationHistory(params: {
    settle: 'usdt';
    contract?: string;
    limit?: number;
    at?: number;
  }): Promise<
    APIResponse<
      {
        time: number;
        contract: string;
        leverage?: string;
        size: number;
        margin?: string;
        entry_price?: string;
        liq_price?: string;
        mark_price?: string;
        order_id?: number;
        order_price: string;
        fill_price: string;
        left: number;
      }[]
    >
  > {
    return this.getPrivate(`/delivery/${params.settle}/liquidates`, params);
  }

  /**
   * List settlement history
   *
   * @param params Parameters for listing settlement history
   * @returns Promise<APIResponse<{
   *   time: number;
   *   contract: string;
   *   leverage: string;
   *   size: number;
   *   margin: string;
   *   entry_price: string;
   *   settle_price: string;
   *   profit: string;
   *   fee: string;
   * }[]>>
   */
  getDeliverySettlementHistory(params: {
    settle: 'usdt';
    contract?: string;
    limit?: number;
    at?: number;
  }): Promise<
    APIResponse<
      {
        time: number;
        contract: string;
        leverage: string;
        size: number;
        margin: string;
        entry_price: string;
        settle_price: string;
        profit: string;
        fee: string;
      }[]
    >
  > {
    return this.getPrivate(`/delivery/${params.settle}/settlements`, params);
  }

  /**
   * Create a price-triggered order
   *
   * @param params Parameters for creating a price-triggered order
   * @returns Promise<APIResponse<{ id: number }>>
   */
  submitDeliveryTriggeredOrder(
    params: {
      settle: 'usdt';
    },
    body: FuturesPriceTriggeredOrder,
  ): Promise<APIResponse<{ id: number }>> {
    return this.postPrivate(`/delivery/${params.settle}/price_orders`, {
      query: params,
      body,
    });
  }

  /**
   * List all auto orders
   *
   * @param params Parameters for listing all auto orders
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder[]>>
   */
  getDeliveryAutoOrders(params: {
    settle: 'usdt';
    status: 'open' | 'finished';
    contract?: string;
    limit?: number;
    offset?: number;
  }): Promise<APIResponse<FuturesPriceTriggeredOrder[]>> {
    return this.getPrivate(`/delivery/${params.settle}/price_orders`, params);
  }

  /**
   * Cancel all open orders
   *
   * @param params Parameters for cancelling all open orders
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder[]>>
   */
  deleteDeliveryOrders(params: {
    settle: 'usdt';
    contract: string;
  }): Promise<APIResponse<FuturesPriceTriggeredOrder[]>> {
    return this.deletePrivate(`/delivery/${params.settle}/price_orders`, {
      query: params,
    });
  }

  /**
   * Get a price-triggered order
   *
   * @param params Parameters for retrieving a price-triggered order
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder>>
   */
  getDeliveryTriggeredOrder(params: {
    settle: 'usdt';
    order_id: string;
  }): Promise<APIResponse<FuturesPriceTriggeredOrder>> {
    return this.getPrivate(
      `/delivery/${params.settle}/price_orders/${params.order_id}`,
      params,
    );
  }

  /**
   * Cancel a price-triggered order
   *
   * @param params Parameters for cancelling a price-triggered order
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder>>
   */
  deleteDeliveryTriggeredOrder(params: {
    settle: 'usdt';
    order_id: string;
  }): Promise<APIResponse<FuturesPriceTriggeredOrder>> {
    return this.deletePrivate(
      `/delivery/${params.settle}/price_orders/${params.order_id}`,
    );
  }

  /**==========================================================================================================================
   * OPTIONS
   * ==========================================================================================================================
   */

  /**
   * List all underlyings
   *
   * @returns Promise<APIResponse<{ name: string; index_price: string }[]>>
   */
  getOptionsUnderlyings(): Promise<
    APIResponse<{ name: string; index_price: string }[]>
  > {
    return this.get(`/options/underlyings`);
  }

  /**
   * List all expiration times
   *
   * @param params Parameters for listing expiration times
   * @returns Promise<APIResponse<number[]>>
   */
  getOptionsExpirationTimes(params: {
    underlying: string;
  }): Promise<APIResponse<number[]>> {
    return this.get(`/options/expirations`, params);
  }

  /**
   * List all the contracts with specified underlying and expiration time
   *
   * @param params Parameters for listing contracts
   * @returns Promise<APIResponse<{
   *   name: string;
   *   tag: string;
   *   create_time: number;
   *   expiration_time: number;
   *   is_call: boolean;
   *   strike_price: string;
   *   last_price: string;
   *   mark_price: string;
   *   orderbook_id: number;
   *   trade_id: number;
   *   trade_size: number;
   *   position_size: number;
   *   underlying: string;
   *   underlying_price: string;
   *   multiplier: string;
   *   order_price_round: string;
   *   mark_price_round: string;
   *   maker_fee_rate: string;
   *   taker_fee_rate: string;
   *   price_limit_fee_rate: string;
   *   ref_discount_rate: string;
   *   ref_rebate_rate: string;
   *   order_price_deviate: string;
   *   order_size_min: number;
   *   order_size_max: number;
   *   orders_limit: number;
   * }[]>>
   */
  getOptionsContracts(params: {
    underlying: string;
    expiration?: number;
  }): Promise<
    APIResponse<
      {
        name: string;
        tag: string;
        create_time: number;
        expiration_time: number;
        is_call: boolean;
        strike_price: string;
        last_price: string;
        mark_price: string;
        orderbook_id: number;
        trade_id: number;
        trade_size: number;
        position_size: number;
        underlying: string;
        underlying_price: string;
        multiplier: string;
        order_price_round: string;
        mark_price_round: string;
        maker_fee_rate: string;
        taker_fee_rate: string;
        price_limit_fee_rate: string;
        ref_discount_rate: string;
        ref_rebate_rate: string;
        order_price_deviate: string;
        order_size_min: number;
        order_size_max: number;
        orders_limit: number;
      }[]
    >
  > {
    return this.get(`/options/contracts`, params);
  }

  /**
   * Query specified contract detail
   *
   * @param params Parameters for querying specified contract detail
   * @returns Promise<APIResponse<{
   *   name: string;
   *   tag: string;
   *   create_time: number;
   *   expiration_time: number;
   *   is_call: boolean;
   *   strike_price: string;
   *   last_price: string;
   *   mark_price: string;
   *   orderbook_id: number;
   *   trade_id: number;
   *   trade_size: number;
   *   position_size: number;
   *   underlying: string;
   *   underlying_price: string;
   *   multiplier: string;
   *   order_price_round: string;
   *   mark_price_round: string;
   *   maker_fee_rate: string;
   *   taker_fee_rate: string;
   *   price_limit_fee_rate: string;
   *   ref_discount_rate: string;
   *   ref_rebate_rate: string;
   *   order_price_deviate: string;
   *   order_size_min: number;
   *   order_size_max: number;
   *   orders_limit: number;
   * }>>
   */
  getOptionsContract(params: { contract: string }): Promise<
    APIResponse<{
      name: string;
      tag: string;
      create_time: number;
      expiration_time: number;
      is_call: boolean;
      strike_price: string;
      last_price: string;
      mark_price: string;
      orderbook_id: number;
      trade_id: number;
      trade_size: number;
      position_size: number;
      underlying: string;
      underlying_price: string;
      multiplier: string;
      order_price_round: string;
      mark_price_round: string;
      maker_fee_rate: string;
      taker_fee_rate: string;
      price_limit_fee_rate: string;
      ref_discount_rate: string;
      ref_rebate_rate: string;
      order_price_deviate: string;
      order_size_min: number;
      order_size_max: number;
      orders_limit: number;
    }>
  > {
    return this.get(`/options/contracts/${params.contract}`, params);
  }

  /**
   * List settlement history
   *
   * @param params Parameters for listing settlement history
   * @returns Promise<APIResponse<{
   *   time: number;
   *   contract: string;
   *   profit: string;
   *   fee: string;
   *   strike_price: string;
   *   settle_price: string;
   * }[]>>
   */
  getOptionsSettlementHistory(params: {
    underlying: string;
    limit?: number;
    offset?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        time: number;
        contract: string;
        profit: string;
        fee: string;
        strike_price: string;
        settle_price: string;
      }[]
    >
  > {
    return this.get(`/options/settlements`, params);
  }

  /**
   * Get specified contract's settlement
   *
   * @param params Parameters for retrieving specified contract's settlement
   * @returns Promise<APIResponse<{
   *   time: number;
   *   contract: string;
   *   profit: string;
   *   fee: string;
   *   strike_price: string;
   *   settle_price: string;
   * }>>
   */
  getOptionsContractSettlement(params: {
    contract: string;
    underlying: string;
    at: number;
  }): Promise<
    APIResponse<{
      time: number;
      contract: string;
      profit: string;
      fee: string;
      strike_price: string;
      settle_price: string;
    }>
  > {
    return this.get(`/options/settlements/${params.contract}`, params);
  }

  /**
   * List my options settlements
   *
   * @param params Parameters for listing my options settlements
   * @returns Promise<APIResponse<{
   *   time: number;
   *   underlying: string;
   *   contract: string;
   *   strike_price: string;
   *   settle_price: string;
   *   size: number;
   *   settle_profit: string;
   *   fee: string;
   *   realised_pnl: string;
   * }[]>>
   */
  getOptionsMySettlements(params: {
    underlying: string;
    contract?: string;
    limit?: number;
    offset?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        time: number;
        underlying: string;
        contract: string;
        strike_price: string;
        settle_price: string;
        size: number;
        settle_profit: string;
        fee: string;
        realised_pnl: string;
      }[]
    >
  > {
    return this.getPrivate(`/options/my_settlements`, params);
  }

  /**
   * Options order book
   *
   * Bids will be sorted by price from high to low, while asks sorted reversely
   *
   * @param params Parameters for retrieving options order book
   * @returns Promise<APIResponse<{
   *   id?: number;
   *   current: number;
   *   update: number;
   *   asks: { p: string; s: number }[];
   *   bids: { p: string; s: number }[];
   * }>>
   */
  getOptionsOrderBook(params: {
    contract: string;
    interval?: '0' | '0.1' | '0.01';
    limit?: number;
    with_id?: boolean;
  }): Promise<
    APIResponse<{
      id?: number;
      current: number;
      update: number;
      asks: { p: string; s: number }[];
      bids: { p: string; s: number }[];
    }>
  > {
    return this.get(`/options/order_book`, params);
  }

  /**
   * List tickers of options contracts
   *
   * @param params Parameters for listing tickers of options contracts
   * @returns Promise<APIResponse<{
   *   name: string;
   *   last_price: string;
   *   mark_price: string;
   *   index_price: string;
   *   ask1_size: number;
   *   ask1_price: string;
   *   bid1_size: number;
   *   bid1_price: string;
   *   position_size: number;
   *   mark_iv: string;
   *   bid_iv: string;
   *   ask_iv: string;
   *   leverage: string;
   *   delta: string;
   *   gamma: string;
   *   vega: string;
   *   theta: string;
   *   rho: string;
   * }[]>>
   */
  getOptionsTickers(params: { underlying: string }): Promise<
    APIResponse<
      {
        name: string;
        last_price: string;
        mark_price: string;
        index_price: string;
        ask1_size: number;
        ask1_price: string;
        bid1_size: number;
        bid1_price: string;
        position_size: number;
        mark_iv: string;
        bid_iv: string;
        ask_iv: string;
        leverage: string;
        delta: string;
        gamma: string;
        vega: string;
        theta: string;
        rho: string;
      }[]
    >
  > {
    return this.get(`/options/tickers`, params);
  }

  /**
   * Get underlying ticker
   *
   * @param params Parameters for retrieving underlying ticker
   * @returns Promise<APIResponse<{
   *   trade_put: number;
   *   trade_call: number;
   *   index_price: string;
   * }>>
   */
  getOptionsUnderlyingTicker(params: { underlying: string }): Promise<
    APIResponse<{
      trade_put: number;
      trade_call: number;
      index_price: string;
    }>
  > {
    return this.get(`/options/underlying/tickers/${params.underlying}`);
  }

  /**
   * Get options candlesticks
   *
   * @param params Parameters for retrieving options candlesticks
   * @returns Promise<APIResponse<{
   *   t: number;
   *   v?: number;
   *   c: string;
   *   h: string;
   *   l: string;
   *   o: string;
   * }[]>>
   */
  getOptionsCandlesticks(params: {
    contract: string;
    limit?: number;
    from?: number;
    to?: number;
    interval?: '1m' | '5m' | '15m' | '30m' | '1h';
  }): Promise<
    APIResponse<
      {
        t: number;
        v?: number;
        c: string;
        h: string;
        l: string;
        o: string;
      }[]
    >
  > {
    return this.get(`/options/candlesticks`, params);
  }

  /**
   * Mark price candlesticks of an underlying
   *
   * @param params Parameters for retrieving mark price candlesticks of an underlying
   * @returns Promise<APIResponse<{
   *   t: number;
   *   v?: number;
   *   c: string;
   *   h: string;
   *   l: string;
   *   o: string;
   *   sum: string;
   * }[]>>
   */
  getOptionsUnderlyingCandlesticks(params: {
    underlying: string;
    limit?: number;
    from?: number;
    to?: number;
    interval?: '1m' | '5m' | '15m' | '30m' | '1h';
  }): Promise<
    APIResponse<
      {
        t: number;
        v?: number;
        c: string;
        h: string;
        l: string;
        o: string;
        sum: string;
      }[]
    >
  > {
    return this.get(`/options/underlying/candlesticks`, params);
  }

  /**
   * Options trade history
   *
   * @param params Parameters for retrieving options trade history
   * @returns Promise<APIResponse<{
   *   id: number;
   *   create_time: number;
   *   create_time_ms: number;
   *   contract: string;
   *   size: number;
   *   price: string;
   *   is_internal?: boolean;
   * }[]>>
   */
  getOptionsTrades(params: {
    contract?: string;
    type?: 'C' | 'P';
    limit?: number;
    offset?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        id: number;
        create_time: number;
        create_time_ms: number;
        contract: string;
        size: number;
        price: string;
        is_internal?: boolean;
      }[]
    >
  > {
    return this.get(`/options/trades`, params);
  }

  /**
   * List options account
   *
   * @returns Promise<APIResponse<{
   *   user: number;
   *   total: string;
   *   short_enabled: boolean;
   *   unrealised_pnl: string;
   *   init_margin: string;
   *   maint_margin: string;
   *   order_margin: string;
   *   available: string;
   *   point: string;
   *   currency: string;
   * }>>
   */
  getOptionsAccount(): Promise<
    APIResponse<{
      user: number;
      total: string;
      short_enabled: boolean;
      unrealised_pnl: string;
      init_margin: string;
      maint_margin: string;
      order_margin: string;
      available: string;
      point: string;
      currency: string;
    }>
  > {
    return this.getPrivate(`/options/accounts`);
  }

  /**
   * List account changing history
   *
   * @param params Parameters for listing account changing history
   * @returns Promise<APIResponse<{
   *   time: number;
   *   change: string;
   *   balance: string;
   *   type: 'dnw' | 'prem' | 'fee' | 'refr' | 'set';
   *   text: string;
   * }[]>>
   */
  getOptionsAccountChange(params: {
    limit?: number;
    offset?: number;
    from?: number;
    to?: number;
    type?: 'dnw' | 'prem' | 'fee' | 'refr' | 'set';
  }): Promise<
    APIResponse<
      {
        time: number;
        change: string;
        balance: string;
        type: 'dnw' | 'prem' | 'fee' | 'refr' | 'set';
        text: string;
      }[]
    >
  > {
    return this.getPrivate(`/options/account_book`, params);
  }

  /**
   * List user's positions of specified underlying
   *
   * @param params Parameters for listing user's positions of specified underlying
   * @returns Promise<APIResponse<{
   *   user: number;
   *   underlying: string;
   *   underlying_price: string;
   *   contract: string;
   *   size: number;
   *   entry_price: string;
   *   mark_price: string;
   *   mark_iv: string;
   *   realised_pnl: string;
   *   unrealised_pnl: string;
   *   pending_orders: number;
   *   close_order: {
   *     id: number;
   *     price: string;
   *     is_liq: boolean;
   *   } | null;
   *   delta: string;
   *   gamma: string;
   *   vega: string;
   *   theta: string;
   * }[]>>
   */

  getOptionsPositionsUnderlying(params: { underlying?: string }): Promise<
    APIResponse<
      {
        user: number;
        underlying: string;
        underlying_price: string;
        contract: string;
        size: number;
        entry_price: string;
        mark_price: string;
        mark_iv: string;
        realised_pnl: string;
        unrealised_pnl: string;
        pending_orders: number;
        close_order: {
          id: number;
          price: string;
          is_liq: boolean;
        } | null;
        delta: string;
        gamma: string;
        vega: string;
        theta: string;
      }[]
    >
  > {
    return this.getPrivate(`/options/positions`, params);
  }
  /**
   * Get specified contract position
   *
   * @param params Parameters for retrieving specified contract position
   * @returns Promise<APIResponse<{
   *   user: number;
   *   underlying: string;
   *   underlying_price: string;
   *   contract: string;
   *   size: number;
   *   entry_price: string;
   *   mark_price: string;
   *   mark_iv: string;
   *   realised_pnl: string;
   *   unrealised_pnl: string;
   *   pending_orders: number;
   *   close_order: {
   *     id: number;
   *     price: string;
   *     is_liq: boolean;
   *   } | null;
   *   delta: string;
   *   gamma: string;
   *   vega: string;
   *   theta: string;
   * }>>
   */
  getOptionsPositionContract(params: { contract: string }): Promise<
    APIResponse<{
      user: number;
      underlying: string;
      underlying_price: string;
      contract: string;
      size: number;
      entry_price: string;
      mark_price: string;
      mark_iv: string;
      realised_pnl: string;
      unrealised_pnl: string;
      pending_orders: number;
      close_order: {
        id: number;
        price: string;
        is_liq: boolean;
      } | null;
      delta: string;
      gamma: string;
      vega: string;
      theta: string;
    }>
  > {
    return this.getPrivate(`/options/positions/${params.contract}`, params);
  }

  /**
   * List user's liquidation history of specified underlying
   *
   * @param params Parameters for listing user's liquidation history of specified underlying
   * @returns Promise<APIResponse<{
   *   time: number;
   *   contract: string;
   *   side: 'long' | 'short';
   *   pnl: string;
   *   text: string;
   *   settle_size: string;
   * }[]>>
   */
  getOptionsLiquidation(params: {
    underlying: string;
    contract?: string;
  }): Promise<
    APIResponse<
      {
        time: number;
        contract: string;
        side: 'long' | 'short';
        pnl: string;
        text: string;
        settle_size: string;
      }[]
    >
  > {
    return this.getPrivate(`/options/position_close`, params);
  }

  /**
   * Create an options order
   *
   * @param params Parameters for creating an options order
   * @returns Promise<APIResponse<{
   *   id: number;
   *   user: number;
   *   create_time: number;
   *   finish_time: number;
   *   finish_as: 'filled' | 'cancelled' | 'liquidated' | 'ioc' | 'auto_deleveraged' | 'reduce_only' | 'position_closed';
   *   status: 'open' | 'finished';
   *   contract: string;
   *   size: number;
   *   iceberg: number;
   *   price: string;
   *   is_close: boolean;
   *   is_reduce_only: boolean;
   *   is_liq: boolean;
   *   tif: 'gtc' | 'ioc' | 'poc';
   *   left: number;
   *   fill_price: string;
   *   text: string;
   *   tkfr: string;
   *   mkfr: string;
   *   refu: number;
   *   refr: string;
   * }>>
   */
  submitOptionsOrder(body: {
    contract: string;
    size: number;
    iceberg?: number;
    price?: string;
    close?: boolean;
    reduce_only?: boolean;
    tif?: 'gtc' | 'ioc' | 'poc';
    text?: string;
  }): Promise<
    APIResponse<{
      id: number;
      user: number;
      create_time: number;
      finish_time: number;
      finish_as:
        | 'filled'
        | 'cancelled'
        | 'liquidated'
        | 'ioc'
        | 'auto_deleveraged'
        | 'reduce_only'
        | 'position_closed';
      status: 'open' | 'finished';
      contract: string;
      size: number;
      iceberg: number;
      price: string;
      is_close: boolean;
      is_reduce_only: boolean;
      is_liq: boolean;
      tif: 'gtc' | 'ioc' | 'poc';
      left: number;
      fill_price: string;
      text: string;
      tkfr: string;
      mkfr: string;
      refu: number;
      refr: string;
    }>
  > {
    return this.postPrivate(`/options/orders`, { body });
  }

  /**
   * List options orders
   *
   * @param params Parameters for listing options orders
   * @returns Promise<APIResponse<{
   *   id: number;
   *   user: number;
   *   create_time: number;
   *   finish_time: number;
   *   finish_as: 'filled' | 'cancelled' | 'liquidated' | 'ioc' | 'auto_deleveraged' | 'reduce_only' | 'position_closed';
   *   status: 'open' | 'finished';
   *   contract: string;
   *   size: number;
   *   iceberg: number;
   *   price: string;
   *   is_close: boolean;
   *   is_reduce_only: boolean;
   *   is_liq: boolean;
   *   tif: 'gtc' | 'ioc' | 'poc';
   *   left: number;
   *   fill_price: string;
   *   text: string;
   *   tkfr: string;
   *   mkfr: string;
   *   refu: number;
   *   refr: string;
   * }[]>>
   */
  getOptionsOrders(params: {
    contract?: string;
    underlying?: string;
    status: 'open' | 'finished';
    limit?: number;
    offset?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        id: number;
        user: number;
        create_time: number;
        finish_time: number;
        finish_as:
          | 'filled'
          | 'cancelled'
          | 'liquidated'
          | 'ioc'
          | 'auto_deleveraged'
          | 'reduce_only'
          | 'position_closed';
        status: 'open' | 'finished';
        contract: string;
        size: number;
        iceberg: number;
        price: string;
        is_close: boolean;
        is_reduce_only: boolean;
        is_liq: boolean;
        tif: 'gtc' | 'ioc' | 'poc';
        left: number;
        fill_price: string;
        text: string;
        tkfr: string;
        mkfr: string;
        refu: number;
        refr: string;
      }[]
    >
  > {
    return this.getPrivate(`/options/orders`, params);
  }

  /**
   * Cancel all open orders matched
   *
   * @param params Parameters for canceling all open orders matched
   * @returns Promise<APIResponse<{
   *   id: number;
   *   user: number;
   *   create_time: number;
   *   finish_time: number;
   *   finish_as: 'filled' | 'cancelled' | 'liquidated' | 'ioc' | 'auto_deleveraged' | 'reduce_only' | 'position_closed';
   *   status: 'open' | 'finished';
   *   contract: string;
   *   size: number;
   *   iceberg: number;
   *   price: string;
   *   is_close: boolean;
   *   is_reduce_only: boolean;
   *   is_liq: boolean;
   *   tif: 'gtc' | 'ioc' | 'poc';
   *   left: number;
   *   fill_price: string;
   *   text: string;
   *   tkfr: string;
   *   mkfr: string;
   *   refu: number;
   *   refr: string;
   * }[]>>
   */
  deleteOptionsOrders(params: {
    contract?: string;
    underlying?: string;
    side?: 'ask' | 'bid';
  }): Promise<
    APIResponse<
      {
        id: number;
        user: number;
        create_time: number;
        finish_time: number;
        finish_as:
          | 'filled'
          | 'cancelled'
          | 'liquidated'
          | 'ioc'
          | 'auto_deleveraged'
          | 'reduce_only'
          | 'position_closed';
        status: 'open' | 'finished';
        contract: string;
        size: number;
        iceberg: number;
        price: string;
        is_close: boolean;
        is_reduce_only: boolean;
        is_liq: boolean;
        tif: 'gtc' | 'ioc' | 'poc';
        left: number;
        fill_price: string;
        text: string;
        tkfr: string;
        mkfr: string;
        refu: number;
        refr: string;
      }[]
    >
  > {
    return this.deletePrivate(`/options/orders`, { query: params });
  }

  /**
   * Get a single order
   *
   * @param params Parameters for retrieving a single order
   * @returns Promise<APIResponse<{
   *   id: number;
   *   user: number;
   *   create_time: number;
   *   finish_time: number;
   *   finish_as: 'filled' | 'cancelled' | 'liquidated' | 'ioc' | 'auto_deleveraged' | 'reduce_only' | 'position_closed';
   *   status: 'open' | 'finished';
   *   contract: string;
   *   size: number;
   *   iceberg: number;
   *   price: string;
   *   is_close: boolean;
   *   is_reduce_only: boolean;
   *   is_liq: boolean;
   *   tif: 'gtc' | 'ioc' | 'poc';
   *   left: number;
   *   fill_price: string;
   *   text: string;
   *   tkfr: string;
   *   mkfr: string;
   *   refu: number;
   *   refr: string;
   * }>>
   */
  getOptionsOrder(params: { order_id: number }): Promise<
    APIResponse<{
      id: number;
      user: number;
      create_time: number;
      finish_time: number;
      finish_as:
        | 'filled'
        | 'cancelled'
        | 'liquidated'
        | 'ioc'
        | 'auto_deleveraged'
        | 'reduce_only'
        | 'position_closed';
      status: 'open' | 'finished';
      contract: string;
      size: number;
      iceberg: number;
      price: string;
      is_close: boolean;
      is_reduce_only: boolean;
      is_liq: boolean;
      tif: 'gtc' | 'ioc' | 'poc';
      left: number;
      fill_price: string;
      text: string;
      tkfr: string;
      mkfr: string;
      refu: number;
      refr: string;
    }>
  > {
    return this.getPrivate(`/options/orders/${params.order_id}`);
  }

  /**
   * Cancel a single order
   *
   * @param params Parameters for canceling a single order
   * @returns Promise<APIResponse<{
   *   id: number;
   *   user: number;
   *   create_time: number;
   *   finish_time: number;
   *   finish_as: 'filled' | 'cancelled' | 'liquidated' | 'ioc' | 'auto_deleveraged' | 'reduce_only' | 'position_closed';
   *   status: 'open' | 'finished';
   *   contract: string;
   *   size: number;
   *   iceberg: number;
   *   price: string;
   *   is_close: boolean;
   *   is_reduce_only: boolean;
   *   is_liq: boolean;
   *   tif: 'gtc' | 'ioc' | 'poc';
   *   left: number;
   *   fill_price: string;
   *   text: string;
   *   tkfr: string;
   *   mkfr: string;
   *   refu: number;
   *   refr: string;
   * }>>
   */
  deleteOptionsOrder(params: { order_id: number }): Promise<
    APIResponse<{
      id: number;
      user: number;
      create_time: number;
      finish_time: number;
      finish_as:
        | 'filled'
        | 'cancelled'
        | 'liquidated'
        | 'ioc'
        | 'auto_deleveraged'
        | 'reduce_only'
        | 'position_closed';
      status: 'open' | 'finished';
      contract: string;
      size: number;
      iceberg: number;
      price: string;
      is_close: boolean;
      is_reduce_only: boolean;
      is_liq: boolean;
      tif: 'gtc' | 'ioc' | 'poc';
      left: number;
      fill_price: string;
      text: string;
      tkfr: string;
      mkfr: string;
      refu: number;
      refr: string;
    }>
  > {
    return this.deletePrivate(`/options/orders/${params.order_id}`);
  }

  /**
   * List personal trading history
   *
   * @param params Parameters for listing personal trading history
   * @returns Promise<APIResponse<{
   *   id: number;
   *   create_time: number;
   *   contract: string;
   *   order_id: number;
   *   size: number;
   *   price: string;
   *   underlying_price: string;
   *   role: 'taker' | 'maker';
   * }[]>>
   */
  getOptionsPersonalHistory(params: {
    underlying: string;
    contract?: string;
    limit?: number;
    offset?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        id: number;
        create_time: number;
        contract: string;
        order_id: number;
        size: number;
        price: string;
        underlying_price: string;
        role: 'taker' | 'maker';
      }[]
    >
  > {
    return this.getPrivate(`/options/my_trades`, params);
  }

  /**==========================================================================================================================
   * EARN UNI
   * ==========================================================================================================================
   */

  /**
   * List currencies for lending
   *
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   min_lend_amount: string;
   *   max_lend_amount: string;
   *   max_rate: string;
   *   min_rate: string;
   * }[]>>
   */
  getLendingCurrencies(): Promise<
    APIResponse<
      {
        currency: string;
        min_lend_amount: string;
        max_lend_amount: string;
        max_rate: string;
        min_rate: string;
      }[]
    >
  > {
    return this.get(`/earn/uni/currencies`);
  }

  /**
   * Get currency detail for lending
   *
   * @param params Parameters for retrieving currency detail for lending
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   min_lend_amount: string;
   *   max_lend_amount: string;
   *   max_rate: string;
   *   min_rate: string;
   * }>>
   */
  getLendingCurrency(params: { currency: string }): Promise<
    APIResponse<{
      currency: string;
      min_lend_amount: string;
      max_lend_amount: string;
      max_rate: string;
      min_rate: string;
    }>
  > {
    return this.get(`/earn/uni/currencies/${params.currency}`, params);
  }

  /**
   * Lend or redeem
   *
   * @param params Parameters for lending or redeeming
   * @returns Promise<APIResponse<void>>
   */
  submitLendOrRedeem(body: {
    currency: string;
    amount: string;
    type: 'lend' | 'redeem';
    min_rate?: string;
  }): Promise<APIResponse<void>> {
    return this.postPrivate(`/earn/uni/lends`, { body });
  }

  /**
   * List user's lending orders
   *
   * @param params Parameters for listing user's lending orders
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   current_amount: string;
   *   amount: string;
   *   lent_amount: string;
   *   frozen_amount: string;
   *   min_rate: string;
   *   interest_status: string;
   *   reinvest_left_amount: string;
   *   create_time: number;
   *   update_time: number;
   * }[]>>
   */
  getLendingOrders(params?: {
    currency?: string;
    page?: number;
    limit?: number;
  }): Promise<
    APIResponse<
      {
        currency: string;
        current_amount: string;
        amount: string;
        lent_amount: string;
        frozen_amount: string;
        min_rate: string;
        interest_status: string;
        reinvest_left_amount: string;
        create_time: number;
        update_time: number;
      }[]
    >
  > {
    return this.getPrivate(`/earn/uni/lends`, params);
  }

  /**
   * Amend lending order
   *
   * Currently only supports amending the minimum interest rate (hour)
   *
   * @param params Parameters for amending lending order
   * @returns Promise<APIResponse<void>>
   */
  updateLendingOrder(params: {
    currency?: string;
    min_rate?: string;
  }): Promise<APIResponse<void>> {
    return this.patchPrivate(`/earn/uni/lends`, { query: params });
  }

  /**
   * List records of lending
   *
   * @param params Parameters for listing records of lending
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   amount: string;
   *   last_wallet_amount: string;
   *   last_lent_amount: string;
   *   last_frozen_amount: string;
   *   type: 'lend' | 'redeem';
   *   create_time: number;
   * }[]>>
   */
  getLendingRecords(params?: {
    currency?: string;
    page?: number;
    limit?: number;
    from?: number;
    to?: number;
    type?: 'lend' | 'redeem';
  }): Promise<
    APIResponse<
      {
        currency: string;
        amount: string;
        last_wallet_amount: string;
        last_lent_amount: string;
        last_frozen_amount: string;
        type: 'lend' | 'redeem';
        create_time: number;
      }[]
    >
  > {
    return this.getPrivate(`/earn/uni/lend_records`, params);
  }

  /**
   * Get the user's total interest income of specified currency
   *
   * @param params Parameters for retrieving the user's total interest income of specified currency
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   interest: string;
   * }>>
   */
  getLendingTotalInterest(params: { currency: string }): Promise<
    APIResponse<{
      currency: string;
      interest: string;
    }>
  > {
    return this.getPrivate(`/earn/uni/interests/${params.currency}`);
  }

  /**
   * List interest records
   *
   * @param params Parameters for listing interest records
   * @returns Promise<APIResponse<{
   *   status: number;
   *   currency: string;
   *   actual_rate: string;
   *   interest: string;
   *   interest_status: string;
   *   create_time: number;
   * }[]>>
   */
  getLendingInterestRecords(params?: {
    currency?: string;
    page?: number;
    limit?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        status: number;
        currency: string;
        actual_rate: string;
        interest: string;
        interest_status: string;
        create_time: number;
      }[]
    >
  > {
    return this.getPrivate(`/earn/uni/interest_records`, params);
  }

  /**
   * Set interest reinvestment toggle
   *
   * @param params Parameters for setting interest reinvestment toggle
   * @returns Promise<APIResponse<void>>
   */
  updateInterestReinvestment(body: {
    currency: string;
    status: boolean;
  }): Promise<APIResponse<void>> {
    return this.putPrivate(`/earn/uni/interest_reinvest`, { body });
  }

  /**
   * Query currency interest compounding status
   *
   * @param params Parameters for querying currency interest compounding status
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   interest_status: string;
   * }>>
   */
  getLendingInterestStatus(params: { currency: string }): Promise<
    APIResponse<{
      currency: string;
      interest_status: string;
    }>
  > {
    return this.getPrivate(`/earn/uni/interest_status/${params.currency}`);
  }

  /**==========================================================================================================================
   * COLLATERAL LOAN
   * ==========================================================================================================================
   */

  /**
   * Place order
   *
   * @param params Parameters for placing an order
   * @returns Promise<APIResponse<{ order_id: number }>>
   */
  submitLoanOrder(body: {
    collateral_amount: string;
    collateral_currency: string;
    borrow_amount: string;
    borrow_currency: string;
  }): Promise<APIResponse<{ order_id: number }>> {
    return this.postPrivate(`/loan/collateral/orders`, { body });
  }

  /**
   * List Orders
   *
   * @param params Parameters for listing orders
   * @returns Promise<APIResponse<{
   *   order_id: number;
   *   collateral_currency: string;
   *   collateral_amount: string;
   *   borrow_currency: string;
   *   borrow_amount: string;
   *   repaid_amount: string;
   *   repaid_principal: string;
   *   repaid_interest: string;
   *   init_ltv: string;
   *   current_ltv: string;
   *   liquidate_ltv: string;
   *   status: string;
   *   borrow_time: number;
   *   left_repay_total: string;
   *   left_repay_principal: string;
   *   left_repay_interest: string;
   * }[]>>
   */
  getLoanOrders(params?: {
    page?: number;
    limit?: number;
    collateral_currency?: string;
    borrow_currency?: string;
  }): Promise<
    APIResponse<
      {
        order_id: number;
        collateral_currency: string;
        collateral_amount: string;
        borrow_currency: string;
        borrow_amount: string;
        repaid_amount: string;
        repaid_principal: string;
        repaid_interest: string;
        init_ltv: string;
        current_ltv: string;
        liquidate_ltv: string;
        status: string;
        borrow_time: number;
        left_repay_total: string;
        left_repay_principal: string;
        left_repay_interest: string;
      }[]
    >
  > {
    return this.getPrivate(`/loan/collateral/orders`, params);
  }

  /**
   * Get a single order
   *
   * @param params Parameters for retrieving a single order
   * @returns Promise<APIResponse<{
   *   order_id: number;
   *   collateral_currency: string;
   *   collateral_amount: string;
   *   borrow_currency: string;
   *   borrow_amount: string;
   *   repaid_amount: string;
   *   repaid_principal: string;
   *   repaid_interest: string;
   *   init_ltv: string;
   *   current_ltv: string;
   *   liquidate_ltv: string;
   *   status: string;
   *   borrow_time: number;
   *   left_repay_total: string;
   *   left_repay_principal: string;
   *   left_repay_interest: string;
   * }>>
   */
  getLoanOrder(params: { order_id: number }): Promise<
    APIResponse<{
      order_id: number;
      collateral_currency: string;
      collateral_amount: string;
      borrow_currency: string;
      borrow_amount: string;
      repaid_amount: string;
      repaid_principal: string;
      repaid_interest: string;
      init_ltv: string;
      current_ltv: string;
      liquidate_ltv: string;
      status: string;
      borrow_time: number;
      left_repay_total: string;
      left_repay_principal: string;
      left_repay_interest: string;
    }>
  > {
    return this.getPrivate(`/loan/collateral/orders/${params.order_id}`);
  }

  /**
   * Repayment
   *
   * @param params Parameters for repayment
   * @returns Promise<APIResponse<{
   *   repaid_principal: string;
   *   repaid_interest: string;
   * }>>
   */
  submitLoanRepay(body: {
    order_id: number;
    repay_amount: string;
    repaid_all: boolean;
  }): Promise<
    APIResponse<{
      repaid_principal: string;
      repaid_interest: string;
    }>
  > {
    return this.postPrivate(`/loan/collateral/repay`, { body });
  }

  /**
   * Repayment history
   *
   * @param params Parameters for retrieving repayment history
   * @returns Promise<APIResponse<{
   *   order_id: number;
   *   record_id: number;
   *   repaid_amount: string;
   *   borrow_currency: string;
   *   collateral_currency: string;
   *   init_ltv: string;
   *   borrow_time: number;
   *   repay_time: number;
   *   total_interest: string;
   *   before_left_principal: string;
   *   after_left_principal: string;
   *   before_left_collateral: string;
   *   after_left_collateral: string;
   * }[]>>
   */
  getLoanRepaymentHistory(params: {
    source: 'repay' | 'liquidate';
    borrow_currency?: string;
    collateral_currency?: string;
    page?: number;
    limit?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        order_id: number;
        record_id: number;
        repaid_amount: string;
        borrow_currency: string;
        collateral_currency: string;
        init_ltv: string;
        borrow_time: number;
        repay_time: number;
        total_interest: string;
        before_left_principal: string;
        after_left_principal: string;
        before_left_collateral: string;
        after_left_collateral: string;
      }[]
    >
  > {
    return this.getPrivate(`/loan/collateral/repay_records`, params);
  }

  /**
   * Increase or redeem collateral
   *
   * @param params Parameters for increasing or redeeming collateral
   * @returns Promise<APIResponse<void>>
   */
  updateLoanCollateral(body: {
    order_id: number;
    collateral_currency: string;
    collateral_amount: string;
    type: 'append' | 'redeem';
  }): Promise<APIResponse<void>> {
    return this.postPrivate(`/loan/collateral/collaterals`, { body });
  }

  /**
   * Query collateral adjustment records
   *
   * @param params Parameters for querying collateral adjustment records
   * @returns Promise<APIResponse<{
   *   order_id: number;
   *   record_id: number;
   *   borrow_currency: string;
   *   borrow_amount: string;
   *   collateral_currency: string;
   *   before_collateral: string;
   *   after_collateral: string;
   *   before_ltv: string;
   *   after_ltv: string;
   *   operate_time: number;
   * }[]>>
   */
  getLoanCollateralRecords(params?: {
    page?: number;
    limit?: number;
    from?: number;
    to?: number;
    borrow_currency?: string;
    collateral_currency?: string;
  }): Promise<
    APIResponse<
      {
        order_id: number;
        record_id: number;
        borrow_currency: string;
        borrow_amount: string;
        collateral_currency: string;
        before_collateral: string;
        after_collateral: string;
        before_ltv: string;
        after_ltv: string;
        operate_time: number;
      }[]
    >
  > {
    return this.getPrivate(`/loan/collateral/collaterals`, params);
  }

  /**
   * Query the total borrowing and collateral amount for the user
   *
   * @returns Promise<APIResponse<{
   *   borrow_amount: string;
   *   collateral_amount: string;
   * }>>
   */
  getLoanTotalAmount(): Promise<
    APIResponse<{
      borrow_amount: string;
      collateral_amount: string;
    }>
  > {
    return this.getPrivate(`/loan/collateral/total_amount`);
  }

  /**
   * Query user's collateralization ratio
   *
   * @param params Parameters for querying user's collateralization ratio
   * @returns Promise<APIResponse<{
   *   collateral_currency: string;
   *   borrow_currency: string;
   *   init_ltv: string;
   *   alert_ltv: string;
   *   liquidate_ltv: string;
   *   min_borrow_amount: string;
   *   left_borrowable_amount: string;
   * }>>
   */
  getLoanCollateralizationRatio(params: {
    collateral_currency: string;
    borrow_currency: string;
  }): Promise<
    APIResponse<{
      collateral_currency: string;
      borrow_currency: string;
      init_ltv: string;
      alert_ltv: string;
      liquidate_ltv: string;
      min_borrow_amount: string;
      left_borrowable_amount: string;
    }>
  > {
    return this.getPrivate(`/loan/collateral/ltv`, params);
  }

  /**
   * Query supported borrowing and collateral currencies
   *
   * @param params Parameters for querying supported borrowing and collateral currencies
   * @returns Promise<APIResponse<{
   *   loan_currency: string;
   *   collateral_currency: string[];
   * }[]>>
   */
  getLoanSupportedCurrencies(params?: { loan_currency?: string }): Promise<
    APIResponse<
      {
        loan_currency: string;
        collateral_currency: string[];
      }[]
    >
  > {
    return this.get(`/loan/collateral/currencies`, params);
  }

  /**==========================================================================================================================
   * MULTI COLLATERAL LOAN
   * ==========================================================================================================================
   */

  /**
   * Create Multi-Collateral Order
   *
   * @param params Parameters for creating a multi-collateral order
   * @returns Promise<APIResponse<{ order_id: number }>>
   */
  submitMultiLoanOrder(body: {
    order_id?: string;
    order_type?: string;
    fixed_type?: string;
    fixed_rate?: string;
    auto_renew?: boolean;
    auto_repay?: boolean;
    borrow_currency: string;
    borrow_amount: string;
    collateral_currencies?: {
      currency?: string;
      amount?: string;
    }[];
  }): Promise<APIResponse<{ order_id: number }>> {
    return this.postPrivate(`/loan/multi_collateral/orders`, { body });
  }

  /**
   * List Multi-Collateral Orders
   *
   * @param params Parameters for listing multi-collateral orders
   * @returns Promise<APIResponse<{
   *   order_id: string;
   *   order_type: string;
   *   fixed_type: string;
   *   fixed_rate: string;
   *   expire_time: number;
   *   auto_renew: boolean;
   *   auto_repay: boolean;
   *   current_ltv: string;
   *   status: string;
   *   borrow_time: number;
   *   total_left_repay_usdt: string;
   *   total_left_collateral_usdt: string;
   *   borrow_currencies: {
   *     currency: string;
   *     index_price: string;
   *     left_repay_principal: string;
   *     left_repay_interest: string;
   *     left_repay_usdt: string;
   *   }[];
   *   collateral_currencies: {
   *     currency: string;
   *     index_price: string;
   *     left_collateral: string;
   *     left_collateral_usdt: string;
   *   }[];
   * }[]>>
   */
  getMultiLoanOrders(params?: {
    page?: number;
    limit?: number;
    sort?: string;
    order_type?: string;
  }): Promise<
    APIResponse<
      {
        order_id: string;
        order_type: string;
        fixed_type: string;
        fixed_rate: string;
        expire_time: number;
        auto_renew: boolean;
        auto_repay: boolean;
        current_ltv: string;
        status: string;
        borrow_time: number;
        total_left_repay_usdt: string;
        total_left_collateral_usdt: string;
        borrow_currencies: {
          currency: string;
          index_price: string;
          left_repay_principal: string;
          left_repay_interest: string;
          left_repay_usdt: string;
        }[];
        collateral_currencies: {
          currency: string;
          index_price: string;
          left_collateral: string;
          left_collateral_usdt: string;
        }[];
      }[]
    >
  > {
    return this.getPrivate(`/loan/multi_collateral/orders`, params);
  }

  /**
   * Get Multi-Collateral Order Detail
   *
   * @param params Parameters for retrieving a multi-collateral order detail
   * @returns Promise<APIResponse<{
   *   order_id: string;
   *   order_type: string;
   *   fixed_type: string;
   *   fixed_rate: string;
   *   expire_time: number;
   *   auto_renew: boolean;
   *   auto_repay: boolean;
   *   current_ltv: string;
   *   status: string;
   *   borrow_time: number;
   *   total_left_repay_usdt: string;
   *   total_left_collateral_usdt: string;
   *   borrow_currencies: {
   *     currency: string;
   *     index_price: string;
   *     left_repay_principal: string;
   *     left_repay_interest: string;
   *     left_repay_usdt: string;
   *   }[];
   *   collateral_currencies: {
   *     currency: string;
   *     index_price: string;
   *     left_collateral: string;
   *     left_collateral_usdt: string;
   *   }[];
   * }>>
   */
  getMultiLoanOrder(params: { order_id: string }): Promise<
    APIResponse<{
      order_id: string;
      order_type: string;
      fixed_type: string;
      fixed_rate: string;
      expire_time: number;
      auto_renew: boolean;
      auto_repay: boolean;
      current_ltv: string;
      status: string;
      borrow_time: number;
      total_left_repay_usdt: string;
      total_left_collateral_usdt: string;
      borrow_currencies: {
        currency: string;
        index_price: string;
        left_repay_principal: string;
        left_repay_interest: string;
        left_repay_usdt: string;
      }[];
      collateral_currencies: {
        currency: string;
        index_price: string;
        left_collateral: string;
        left_collateral_usdt: string;
      }[];
    }>
  > {
    return this.getPrivate(
      `/loan/multi_collateral/orders/${params.order_id}`,
      params,
    );
  }

  /**
   * Repay Multi-Collateral Loan
   *
   * @param params Parameters for repaying a multi-collateral loan
   * @returns Promise<APIResponse<{
   *   order_id: number;
   *   repaid_currencies: {
   *     succeeded: boolean;
   *     label?: string;
   *     message?: string;
   *     currency: string;
   *     repaid_principal: string;
   *     repaid_interest: string;
   *   }[];
   * }>>
   */
  repayMultiLoan(body: {
    order_id: number;
    repay_items: {
      currency?: string;
      amount?: string;
      repaid_all?: boolean;
    }[];
  }): Promise<
    APIResponse<{
      order_id: number;
      repaid_currencies: {
        succeeded: boolean;
        label?: string;
        message?: string;
        currency: string;
        repaid_principal: string;
        repaid_interest: string;
      }[];
    }>
  > {
    return this.postPrivate(`/loan/multi_collateral/repay`, { body });
  }

  /**
   * List Multi-Collateral Repay Records
   *
   * @param params Parameters for listing multi-collateral repay records
   * @returns Promise<APIResponse<{
   *   order_id: number;
   *   record_id: number;
   *   init_ltv: string;
   *   before_ltv: string;
   *   after_ltv: string;
   *   borrow_time: number;
   *   repay_time: number;
   *   borrow_currencies: {
   *     currency: string;
   *     index_price: string;
   *     before_amount: string;
   *     before_amount_usdt: string;
   *     after_amount: string;
   *     after_amount_usdt: string;
   *   }[];
   *   collateral_currencies: {
   *     currency: string;
   *     index_price: string;
   *     before_amount: string;
   *     before_amount_usdt: string;
   *     after_amount: string;
   *     after_amount_usdt: string;
   *   }[];
   *   repaid_currencies: {
   *     currency: string;
   *     index_price: string;
   *     repaid_amount: string;
   *     repaid_principal: string;
   *     repaid_interest: string;
   *     repaid_amount_usdt: string;
   *   }[];
   *   total_interest_list: {
   *     currency: string;
   *     index_price: string;
   *     amount: string;
   *     amount_usdt: string;
   *   }[];
   *   left_repay_interest_list: {
   *     currency: string;
   *     index_price: string;
   *     before_amount: string;
   *     before_amount_usdt: string;
   *     after_amount: string;
   *     after_amount_usdt: string;
   *   }[];
   * }[]>>
   */
  getMultiLoanRepayRecords(params: {
    type: 'repay' | 'liquidate';
    borrow_currency?: string;
    page?: number;
    limit?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        order_id: number;
        record_id: number;
        init_ltv: string;
        before_ltv: string;
        after_ltv: string;
        borrow_time: number;
        repay_time: number;
        borrow_currencies: {
          currency: string;
          index_price: string;
          before_amount: string;
          before_amount_usdt: string;
          after_amount: string;
          after_amount_usdt: string;
        }[];
        collateral_currencies: {
          currency: string;
          index_price: string;
          before_amount: string;
          before_amount_usdt: string;
          after_amount: string;
          after_amount_usdt: string;
        }[];
        repaid_currencies: {
          currency: string;
          index_price: string;
          repaid_amount: string;
          repaid_principal: string;
          repaid_interest: string;
          repaid_amount_usdt: string;
        }[];
        total_interest_list: {
          currency: string;
          index_price: string;
          amount: string;
          amount_usdt: string;
        }[];
        left_repay_interest_list: {
          currency: string;
          index_price: string;
          before_amount: string;
          before_amount_usdt: string;
          after_amount: string;
          after_amount_usdt: string;
        }[];
      }[]
    >
  > {
    return this.getPrivate(`/loan/multi_collateral/repay`, params);
  }

  /**
   * Operate Multi-Collateral
   *
   * @param params Parameters for operating multi-collateral
   * @returns Promise<APIResponse<{
   *   order_id: number;
   *   collateral_currencies: {
   *     succeeded: boolean;
   *     label?: string;
   *     message?: string;
   *     currency: string;
   *     amount: string;
   *   }[];
   * }>>
   */
  operateMultiLoan(body: {
    order_id: number;
    type: 'append' | 'redeem';
    collaterals?: {
      currency?: string;
      amount?: string;
    }[];
  }): Promise<
    APIResponse<{
      order_id: number;
      collateral_currencies: {
        succeeded: boolean;
        label?: string;
        message?: string;
        currency: string;
        amount: string;
      }[];
    }>
  > {
    return this.postPrivate(`/loan/multi_collateral/mortgage`, { body });
  }

  /**
   * Query collateral adjustment records
   *
   * @param params Parameters for querying collateral adjustment records
   * @returns Promise<APIResponse<{
   *   order_id: number;
   *   record_id: number;
   *   before_ltv: string;
   *   after_ltv: string;
   *   operate_time: number;
   *   borrow_currencies: {
   *     currency: string;
   *     index_price: string;
   *     before_amount: string;
   *     before_amount_usdt: string;
   *     after_amount: string;
   *     after_amount_usdt: string;
   *   }[];
   *   collateral_currencies: {
   *     currency: string;
   *     index_price: string;
   *     before_amount: string;
   *     before_amount_usdt: string;
   *     after_amount: string;
   *     after_amount_usdt: string;
   *   }[];
   * }[]>>
   */
  getMultiLoanAdjustmentRecords(params?: {
    page?: number;
    limit?: number;
    from?: number;
    to?: number;
    collateral_currency?: string;
  }): Promise<
    APIResponse<
      {
        order_id: number;
        record_id: number;
        before_ltv: string;
        after_ltv: string;
        operate_time: number;
        borrow_currencies: {
          currency: string;
          index_price: string;
          before_amount: string;
          before_amount_usdt: string;
          after_amount: string;
          after_amount_usdt: string;
        }[];
        collateral_currencies: {
          currency: string;
          index_price: string;
          before_amount: string;
          before_amount_usdt: string;
          after_amount: string;
          after_amount_usdt: string;
        }[];
      }[]
    >
  > {
    return this.getPrivate(`/loan/multi_collateral/mortgage`, params);
  }

  /**
   * List User Currency Quota
   *
   * @param params Parameters for listing user currency quota
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   index_price: string;
   *   min_quota: string;
   *   left_quota: string;
   *   left_quote_usdt: string;
   * }[]>>
   */
  getMultiLoanCurrencyQuota(params: {
    type: 'collateral' | 'borrow';
    currency: string;
  }): Promise<
    APIResponse<
      {
        currency: string;
        index_price: string;
        min_quota: string;
        left_quota: string;
        left_quote_usdt: string;
      }[]
    >
  > {
    return this.getPrivate(`/loan/multi_collateral/currency_quota`, params);
  }

  /**
   * Query supported borrowing and collateral currencies in Multi-Collateral
   *
   * @returns Promise<APIResponse<{
   *   loan_currencies: {
   *     currency: string;
   *     price: string;
   *   }[];
   *   collateral_currencies: {
   *     currency: string;
   *     index_price: string;
   *     discount: string;
   *   }[];
   * }>>
   */
  getMultiLoanSupportedCurrencies(): Promise<
    APIResponse<{
      loan_currencies: {
        currency: string;
        price: string;
      }[];
      collateral_currencies: {
        currency: string;
        index_price: string;
        discount: string;
      }[];
    }>
  > {
    return this.get(`/loan/multi_collateral/currencies`);
  }

  /**
   * Get Multi-Collateral ratio
   *
   * @returns Promise<APIResponse<{
   *   init_ltv: string;
   *   alert_ltv: string;
   *   liquidate_ltv: string;
   * }>>
   */
  getMultiLoanRatio(): Promise<
    APIResponse<{
      init_ltv: string;
      alert_ltv: string;
      liquidate_ltv: string;
    }>
  > {
    return this.get(`/loan/multi_collateral/ltv`);
  }

  /**
   * Query fixed interest rates for the currency for 7 days and 30 days
   *
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   rate_7d: string;
   *   rate_30d: string;
   *   update_time: number;
   * }[]>>
   */
  getMultiLoanFixedRates(): Promise<
    APIResponse<
      {
        currency: string;
        rate_7d: string;
        rate_30d: string;
        update_time: number;
      }[]
    >
  > {
    return this.get(`/loan/multi_collateral/fixed_rate`);
  }

  /**==========================================================================================================================
   * EARN
   * ==========================================================================================================================
   */

  /**
   * ETH2 swap
   *
   * @param params Parameters for ETH2 swap
   * @returns Promise<APIResponse<void>>
   */
  submitEth2Swap(body: {
    side: '1' | '2';
    amount: string;
  }): Promise<APIResponse<void>> {
    return this.postPrivate(`/earn/staking/eth2/swap`, { body });
  }

  /**
   * Dual Investment product list
   *
   * @returns Promise<APIResponse<{
   *   id: number;
   *   instrument_name: string;
   *   invest_currency: string;
   *   exercise_currency: string;
   *   exercise_price: number;
   *   delivery_time: number;
   *   min_copies: number;
   *   max_copies: number;
   *   per_value: string;
   *   apy_display: string;
   *   start_time: number;
   *   end_time: number;
   *   status: 'NOTSTARTED' | 'ONGOING' | 'ENDED';
   * }[]>>
   */
  getDualInvestmentProducts(): Promise<
    APIResponse<
      {
        id: number;
        instrument_name: string;
        invest_currency: string;
        exercise_currency: string;
        exercise_price: number;
        delivery_time: number;
        min_copies: number;
        max_copies: number;
        per_value: string;
        apy_display: string;
        start_time: number;
        end_time: number;
        status: 'NOTSTARTED' | 'ONGOING' | 'ENDED';
      }[]
    >
  > {
    return this.get(`/earn/dual/investment_plan`);
  }

  /**
   * Dual Investment order list
   *
   * @returns Promise<APIResponse<{
   *   id: number;
   *   plan_id: number;
   *   copies: string;
   *   invest_amount: string;
   *   settlement_amount: string;
   *   create_time: number;
   *   complete_time: number;
   *   status: 'INIT' | 'SETTLEMENT_SUCCESS' | 'SETTLEMENT_PROCESSING' | 'CANCELED' | 'FAILED';
   *   invest_currency: string;
   *   exercise_currency: string;
   *   exercise_price: string;
   *   settlement_price: string;
   *   settlement_currency: string;
   *   apy_display: string;
   *   apy_settlement: string;
   *   delivery_time: number;
   * }[]>>
   */
  getDualInvestmentOrders(): Promise<
    APIResponse<
      {
        id: number;
        plan_id: number;
        copies: string;
        invest_amount: string;
        settlement_amount: string;
        create_time: number;
        complete_time: number;
        status:
          | 'INIT'
          | 'SETTLEMENT_SUCCESS'
          | 'SETTLEMENT_PROCESSING'
          | 'CANCELED'
          | 'FAILED';
        invest_currency: string;
        exercise_currency: string;
        exercise_price: string;
        settlement_price: string;
        settlement_currency: string;
        apy_display: string;
        apy_settlement: string;
        delivery_time: number;
      }[]
    >
  > {
    return this.getPrivate(`/earn/dual/orders`);
  }

  /**
   * Place Dual Investment order
   *
   * @param params Parameters for placing a dual investment order
   * @returns Promise<APIResponse<void>>
   */
  submitDualInvestmentOrder(body: {
    plan_id: string;
    copies: string;
  }): Promise<APIResponse<void>> {
    return this.postPrivate(`/earn/dual/orders`, { body });
  }

  /**
   * Structured Product List
   *
   * @param params Parameters for listing structured products
   * @returns Promise<APIResponse<{
   *   id: number;
   *   type: string;
   *   name_en: string;
   *   investment_coin: string;
   *   investment_period: string;
   *   min_annual_rate: string;
   *   mid_annual_rate: string;
   *   max_annual_rate: string;
   *   watch_market: string;
   *   start_time: number;
   *   end_time: number;
   *   status: 'in_process' | 'will_begin' | 'wait_settlement' | 'done';
   * }[]>>
   */
  getStructuredProductList(params: {
    status: string;
    type?: string;
    page?: number;
    limit?: number;
  }): Promise<
    APIResponse<
      {
        id: number;
        type: string;
        name_en: string;
        investment_coin: string;
        investment_period: string;
        min_annual_rate: string;
        mid_annual_rate: string;
        max_annual_rate: string;
        watch_market: string;
        start_time: number;
        end_time: number;
        status: 'in_process' | 'will_begin' | 'wait_settlement' | 'done';
      }[]
    >
  > {
    return this.get(`/earn/structured/products`, params);
  }

  /**
   * Structured Product Order List
   *
   * @param params Parameters for listing structured product orders
   * @returns Promise<APIResponse<{
   *   id: number;
   *   pid: string;
   *   lock_coin: string;
   *   amount: string;
   *   status: 'SUCCESS' | 'FAILED' | 'DONE';
   *   income: string;
   *   create_time: number;
   * }[]>>
   */
  getStructuredProductOrders(params?: {
    from?: number;
    to?: number;
    page?: number;
    limit?: number;
  }): Promise<
    APIResponse<
      {
        id: number;
        pid: string;
        lock_coin: string;
        amount: string;
        status: 'SUCCESS' | 'FAILED' | 'DONE';
        income: string;
        create_time: number;
      }[]
    >
  > {
    return this.getPrivate(`/earn/structured/orders`, params);
  }

  /**
   * Place Structured Product Order
   *
   * @param params Parameters for placing a structured product order
   * @returns Promise<APIResponse<void>>
   */
  submitStructuredProductOrder(body: {
    pid?: string;
    amount?: string;
  }): Promise<APIResponse<void>> {
    return this.postPrivate(`/earn/structured/orders`, { body });
  }

  /**==========================================================================================================================
   * ACCOUNT
   * ==========================================================================================================================
   */

  /**
   * Get account detail
   *
   * @returns Promise<APIResponse<{
   *   user_id: number;
   *   ip_whitelist: string[];
   *   currency_pairs: string[];
   *   key: {
   *     mode: number;
   *   };
   *   tier: number;
   * }>>
   */
  getAccountDetail(): Promise<
    APIResponse<{
      user_id: number;
      ip_whitelist: string[];
      currency_pairs: string[];
      key: {
        mode: number;
      };
      tier: number;
    }>
  > {
    return this.getPrivate(`/account/detail`);
  }

  /**
   * Create STP Group
   *
   * @param params Parameters for creating an STP group
   * @returns Promise<APIResponse<{
   *   id: number;
   *   name: string;
   *   creator_id: number;
   *   create_time: number;
   * }>>
   */
  createStpGroup(body: {
    id?: number;
    name: string;
    creator_id?: number;
    create_time?: number;
  }): Promise<
    APIResponse<{
      id: number;
      name: string;
      creator_id: number;
      create_time: number;
    }>
  > {
    return this.postPrivate(`/account/stp_groups`, { body });
  }

  /**
   * List STP Groups
   *
   * @param params Parameters for listing STP groups
   * @returns Promise<APIResponse<{
   *   id: number;
   *   name: string;
   *   creator_id: number;
   *   create_time: number;
   * }[]>>
   */
  getStpGroups(params?: { name?: string }): Promise<
    APIResponse<
      {
        id: number;
        name: string;
        creator_id: number;
        create_time: number;
      }[]
    >
  > {
    return this.getPrivate(`/account/stp_groups`, params);
  }

  /**
   * List users of the STP group
   *
   * @param params Parameters for listing users of the STP group
   * @returns Promise<APIResponse<{
   *   user_id: number;
   *   stp_id: number;
   *   create_time: number;
   * }[]>>
   */
  getStpGroupUsers(params: { stp_id: number }): Promise<
    APIResponse<
      {
        user_id: number;
        stp_id: number;
        create_time: number;
      }[]
    >
  > {
    return this.getPrivate(
      `/account/stp_groups/${params.stp_id}/users`,
      params,
    );
  }

  /**
   * Add users to the STP group
   *
   * @param params Parameters for adding users to the STP group
   * @returns Promise<APIResponse<{
   *   user_id: number;
   *   stp_id: number;
   *   create_time: number;
   * }[]>>
   */
  addUsersToStpGroup(
    params: { stp_id: number },
    body: number[],
  ): Promise<
    APIResponse<
      {
        user_id: number;
        stp_id: number;
        create_time: number;
      }[]
    >
  > {
    return this.postPrivate(`/account/stp_groups/${params.stp_id}/users`, {
      body,
    });
  }

  /**
   * Delete the user in the STP group
   *
   * @param params Parameters for deleting users from the STP group
   * @returns Promise<APIResponse<{
   *   user_id: number;
   *   stp_id: number;
   *   create_time: number;
   * }[]>>
   */
  deleteUserFromStpGroup(params: { stp_id: number; user_id: number }): Promise<
    APIResponse<
      {
        user_id: number;
        stp_id: number;
        create_time: number;
      }[]
    >
  > {
    return this.deletePrivate(`/account/stp_groups/${params.stp_id}/users`, {
      query: params,
    });
  }

  /**
   *
   */ /**
   *
   */ /**
   *
   */ /**
   *
   */
}
