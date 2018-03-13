const docClient = require('../db/docClient');
const passport = require('passport');
const table = "Users";


function postSignup(req, res, next) {
	let signupStrategy = passport.authenticate('local-signup', {
		successRedirect: 	'https://patata-api.herokuapp.com/api/user/ricky',
		failureRedirect: 	'https://rickytranmer.github.io/patata/signup'
	});
	return signupStrategy(req, res, next);
}

function getUser(req, res, next) {
	let username = req.params.username || "ricky";
	let params = {
		TableName: 'Users',
		Key:{
			"username": username
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

module.exports = {
	postSignup
}