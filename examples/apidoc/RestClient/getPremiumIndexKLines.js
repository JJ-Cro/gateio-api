const { RestClient } = require('gateio-api');

  // ENDPOINT: /futures/{settle}/premium_index
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1923

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getPremiumIndexKLines(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
