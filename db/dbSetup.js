const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials
});
const dynamodb = new AWS.DynamoDB();

// - Tasks - Tasks Table
let params = {
    TableName : "Tasks",
    KeySchema: [       
        { AttributeName: "username", KeyType: "HASH"},
        { AttributeName: "date", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [       
        { AttributeName: "username", AttributeType: "S" },
        { AttributeName: "date", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
    }
};
//DELETE
// params = { TableName: params.TableName };
// dynamodb.deleteTable(params, function(err, data) {
//     if (err) {
//         console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Deleted table:", JSON.stringify(data, null, 2));
//CREATE
dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table:", JSON.stringify(data, null, 2));
    }
});
// }});


// Users - Users Table
params = {
    TableName : "Users",
    KeySchema: [       
        { AttributeName: "username", KeyType: "HASH"}
    ],
    AttributeDefinitions: [       
        { AttributeName: "username", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
    }
};
//DELETE
// params = { TableName: params.TableName };
// dynamodb.deleteTable(params, function(err, data) {
//     if (err) {
//         console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Deleted table:", JSON.stringify(data, null, 2));
//CREATE
dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table:", JSON.stringify(data, null, 2));
    }
});
// }});

// Agenda - Day's Tasks Table
params = {
    TableName : "Agenda",
    KeySchema: [       
        { AttributeName: "username", KeyType: "HASH"},
        { AttributeName: "date", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [       
        { AttributeName: "username", AttributeType: "S" },
        { AttributeName: "date", AttributeType: "N" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
    }
};
//DELETE
// params = { TableName: params.TableName };
// dynamodb.deleteTable(params, function(err, data) {
//     if (err) {
//         console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Deleted table:", JSON.stringify(data, null, 2));
//CREATE
dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table:", JSON.stringify(data, null, 2));
    }
});
// }});