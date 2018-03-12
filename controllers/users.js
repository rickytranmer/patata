const docClient = require('../db/docClient');
const passport = require('passport');
const table = "Users";


function postSignup(req, res, next) {
	let signupStrategy = passport.authenticate('local-signup', {
		successRedirect: 	'https://rickytranmer.github.io/patata/',
		failureRedirect: 	'https://rickytranmer.github.io/patata/signup'
	});
	console.log('postSignup');
	console.log(req);
	console.log(req.body);
	console.log(res);
	return signupStrategy(req, res, next);
}

module.exports = {
	postSignup
}