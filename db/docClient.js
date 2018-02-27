const AWS = require('aws-sdk');
// const credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
const credentials = new AWS.EnvironmentCredentials('AWS');
AWS.config.update({
  region: "us-west-2",
  endpoint: /*"http://localhost:8000",*/ "https://dynamodb.us-west-2.amazonaws.com",
  credentials
});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;