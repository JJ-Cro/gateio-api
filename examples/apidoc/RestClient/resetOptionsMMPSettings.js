const { RestClient } = require('gateio-api');

  // ENDPOINT: /options/mmp/reset
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3313

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.resetOptionsMMPSettings(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
