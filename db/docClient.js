const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials
});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;