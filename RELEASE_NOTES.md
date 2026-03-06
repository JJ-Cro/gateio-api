# Release Notes

## Unreleased

### Added

#### TradFi API
- **19 new TradFi endpoints** for MT5/traditional finance trading:
  - `getTradFiMT5Account()` – Query MT5 account info
  - `getTradFiSymbolCategories()` – Query symbol categories
  - `getTradFiSymbols()` – Query symbol list
  - `getTradFiSymbolDetail(params)` – Query symbol details
  - `getTradFiKlines(symbol, params)` – Query symbol klines
  - `getTradFiTicker(symbol)` – Query symbol ticker
  - `createTradFiUser()` – Create TradFi user
  - `getTradFiAssets()` – Query account assets
  - `createTradFiTransaction(params)` – Deposit/withdraw funds
  - `getTradFiTransactions(params?)` – Query transfer records
  - `createTradFiOrder(params)` – Create order
  - `getTradFiOrders()` – Query active orders
  - `modifyTradFiOrder(orderId, params)` – Modify order
  - `cancelTradFiOrder(orderId)` – Cancel order
  - `getTradFiOrderHistory(params?)` – Query historical orders
  - `getTradFiPositions()` – Query active positions
  - `modifyTradFiPosition(positionId, params)` – Modify position
  - `closeTradFiPosition(positionId, params)` – Close position
  - `getTradFiPositionHistory(params?)` – Query historical positions
- New request/response types in `types/request/tradfi.ts` and `types/response/tradfi.ts`

#### Futures
- `getBatchFundingRates(params)` – Batch query historical funding rate data (POST `/futures/{settle}/funding_rates`)

#### Trail Orders (Futures Autoorder)
- **7 new trail order endpoints**:
  - `createTrailOrder(params)` – Create trail order
  - `terminateTrailOrder(params)` – Terminate single trail order
  - `batchTerminateTrailOrders(params)` – Batch terminate trail orders
  - `getTrailOrderList(params)` – Get trail order list
  - `getTrailOrderDetail(params)` – Get trail order details
  - `updateTrailOrder(params)` – Update trail order
  - `getTrailOrderChangeLog(params)` – Get trail order modification records
- New types: `TrailOrder`, `TrailChangeLog`, and request types in `types/request/futures.ts` (CreateTrailOrderReq, TerminateTrailOrderReq, etc.)

### Changed

#### Earn (Dual Investment)
- `submitDualInvestmentOrder()` – Refactored to use typed `PlaceDualInvestmentOrderParams` for request and return `Promise<DualInvestmentOrder>` instead of `Promise<any>`
- New request type: `PlaceDualInvestmentOrderParams` (plan_id, amount, copies?, text?)

#### Futures
- `updateFuturesPriceTriggeredOrder()` – **Breaking change**: Endpoint path updated from `PUT /futures/{settle}/price_orders/{order_id}` to `PUT /futures/{settle}/price_orders/amend/{order_id}`

#### Deprecations
- `DualInvestmentProduct.per_value` – Marked as deprecated
