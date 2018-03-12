const docClient = require('../db/docClient');
const table = "Users";
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// let User = require('../models/user');

module.exports = function(passport) {
	// - Bcrypt functions
	function encrypt(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
	};
	function validPassword(password, thisPassword) {
		return bcrypt.compareSync(password, thisPassword);
	};

	passport.serializeUser(function(user, next) {
		next(null, user.username); //?
	});
	passport.deserializeUser(function(username, next) {
		let params = {
			TableName: table,
			Key:{ "username": username }
		};
		docClient.get(params, function(err, user) {
			next(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, username, password, next) {
		console.log('local-signup');
		let params = {
			TableName: table,
			Key:{ "username": username }
		};
		docClient.get(params, function(err, user) {
			console.log('docClient get user');
			if(err) { 
				console.log('-err');
				console.log(err);
				return next(err);
			}
			if(user) {
				console.log('-user');
				return next(null, false);
			} else {
				console.log('-else');
				let params = {
					TableName: table,
					Item:{
						"username": username,
						"password": encrypt(password)
					}
				};

				docClient.put(params, function(err, data) {
					console.log('docClient put user');
					if (err) {
							console.error("Unable to add user. Error JSON:", JSON.stringify(err, null, 2));
					} else {
						console.log("Added user:", JSON.stringify(data, null, 2));
					}
					return done(null, data); //or params.Item?
				});
			}
		});
		console.log('local-signup end');
	}));

	// passport.use('local-login', new LocalStrategy({
	// 	usernameField: 'username',
	// 	passwordField: 'password',
	// 	passReqToCallback: true
	// }, function(req, username, password, next) {
	// 	// Search for user
	// 	User.findOne({'username': username}, function(err, user) {
	// 		if (err) return next(err);
	// 		// No user
	// 		if (!user) {
	// 			return next(null, false);
	// 		}
	// 		// Wrong password
	// 		if (!user.validPassword(password)) {
	// 			return next(null, false)
	// 		}
	// 		return next(null, user)
	// 	});
	// }));
};