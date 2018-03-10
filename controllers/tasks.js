const docClient = require('../db/docClient');

function postTask(req, res, next) {
	let table = "Tasks";
	//TODO - change to logged in user, authenticate
	let username = "RickySoFine";
	let params = {
		TableName: table,
		Item:{
			"username": username,
			"date": req.body.date,
			"title": req.body.title,
			"description": req.body.description,
			"timerDefault": req.body.timerDefault,
			"timerEstimate": req.body.timerEstimate,
			"timerCount":  req.body.timerCount
		}
	};
	params.Item.date = shortenDate(params.Item.date); //see bottom

	console.log("Adding a new item...", params);
	docClient.put(params, function(err, data) {
		if (err) {
			console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
		} else {
			console.log("Added item:", JSON.stringify(data, null, 2));
		}
	});

	res.send();
}

function getTask(req, res, next) {
	let username = "RickySoFine";
	let params = {
		TableName: "Tasks",
		Key:{
			"username": username,
			"date": req.params.id || '752Z20180227T185408'
		}
	};

	docClient.get(params, function(err, data) {
		if (err) {
			console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
			res.send();
		} else {
			console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
			res.send(data);
		}
	});
}

function putTask(req, res, next) {
	//TODO - change to current user, authenticate
	console.log(req.params.id);
	let username = 'RickySoFine';

	var params = {
	    TableName: "Tasks",
	    Key:{
	        "username": username,
	        "date": req.params.id
	    },
	    UpdateExpression: "set timerCount = timerCount + :val",
	    ExpressionAttributeValues:{
	        ":val":1
	    },
	    ReturnValues:"UPDATED_NEW"
	};

	console.log("Updating the task...");
	docClient.update(params, function(err, data) {
	    if (err) {
	        console.error("Unable to update task. Error JSON:", JSON.stringify(err, null, 2));
	    } else {
	        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
	    }
	});
}

function getTasks(req, res, next) {
	let username = req.params.username || 'RickySoFine';
	var params = {
		TableName : "Tasks",
		KeyConditionExpression: "#username = :username",
		ExpressionAttributeNames:{
				"#username": "username"
		},
		ExpressionAttributeValues: {
				":username": username
		}
	};

	docClient.query(params, function(err, data) {
		if (err) {
			console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
		} else {
			console.log("Query succeeded.");
			res.send(data.Items);
		}
	});
}

function shortenDate(thisDate) {
	// Move milliseconds to the front of date property, makes var shorter and spreads out traffic on DynamoDB
	let newDate = thisDate[20];
	for(let i = 21; i < 24; i++) {
		newDate += thisDate[i];
	}
	for(let i = 0; i < 19; i++) {
		newDate += thisDate[i];
	}
	return newDate.replace(/-:/, '');
}

module.exports = {
	postTask,
	getTask,
	putTask,
	getTasks
};