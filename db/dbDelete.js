const AWS = require('aws-sdk');
// const credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
const credentials = new AWS.EnvironmentCredentials('AWS');
AWS.config.update({
  region: "us-west-2",
  // endpoint: "http://localhost:8000",
  endpoint: "https://dynamodb.us-west-2.amazonaws.com",
  credentials
});
const dynamodb = new AWS.DynamoDB();

// - Tasks - Tasks Table
//DELETE
let params = { TableName : "Tasks" };
dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted table:", JSON.stringify(data, null, 2));
    }
});


// Users - Users Table
//DELETE
params = { TableName: "Users" };
dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted table:", JSON.stringify(data, null, 2));
    }
});

// Agenda - Day's Tasks Table
//DELETE
params = { TableName: "Agenda" };
dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted table:", JSON.stringify(data, null, 2));
    }
});