const { RestClient } = require('gateio-api');

  // ENDPOINT: /earn/uni/interest_reinvest
  // METHOD: PUT
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3422

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.updateInterestReinvestment(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
