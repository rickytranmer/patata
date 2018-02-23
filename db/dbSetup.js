const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials
});
const dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Spuds",
    KeySchema: [       
        { AttributeName: "username", KeyType: "HASH"},
        { AttributeName: "taskID", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [       
        { AttributeName: "username", AttributeType: "S" },
        { AttributeName: "taskID", AttributeType: "N" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
    }
};