const { RestClient } = require('gateio-api');

  // ENDPOINT: /delivery/{settle}/orders
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2795

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.submitDeliveryOrder(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
