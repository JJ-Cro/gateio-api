import { RestClient } from '../../src';

const account = {
  key: process.env.API_KEY || 'yourApiHere',
  secret: process.env.API_SECRET || 'yourSecretHere',
};

const gateRestClient = new RestClient({
  apiKey: account.key,
  apiSecret: account.secret,
});

async function getFuturesBalances() {
  try {
    console.log('Using API keys:', account);

    // GET specific ticker
    const ticker = await gateRestClient.getFuturesAccount({ settle: 'usdt' });
    console.log('Response: ', ticker);
  } catch (e) {
    console.error(`Error in execution: `, e);
  }
}

getFuturesBalances();
