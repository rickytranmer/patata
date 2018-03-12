const docClient = require('../db/docClient');
const passport = require('passport');
const table = "Users";


function postSignup(req, res, next) {
	let signupStrategy = passport.authenticate('local-signup', {
		successRedirect: 	'/',
		failureRedirect: 	'https://rickytranmer.github.io/patata/signup'
	});
	return signupStrategy(req, res, next);
}

module.exports = {
	postSignup
}