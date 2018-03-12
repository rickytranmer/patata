const docClient = require('../db/docClient');
const table = "Users";
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// let User = require('../models/user');

module.exports = function(passport) {
	// - Bcrypt functions
	function encryptThis(password) {
		console.log('encryptThis');
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
	};
	function validPassword(password, thisPassword) {
		return bcrypt.compareSync(password, thisPassword);
	};

	passport.serializeUser(function(user, next) {
		console.log('serializeUser');
		console.log(user);

		next(null, user.username); //?
	});
	passport.deserializeUser(function(username, next) {
		let params = {
			TableName: table,
			Key:{ "username": username }
		};
		docClient.get(params, function(err, user) {
			console.log('docClient deserializeUser');
			next(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, username, password, next) {
		console.log('local-signup, username: ', username);
		let params = {
			TableName: table,
			Key:{ "username": username }
		};
		docClient.get(params, function(err, user) {
			console.log('docClient get user');
			let attempts = 0;
			attemptUser();
			function attemptUser() {
				attempts++;
				console.log('attempt ', attempts);
				setTimeout(()=> {
					if(err) { 
						console.log('-err');
						console.log(err);
						return next(err);
					}
					if(user && user.username) {
						console.log('-user ');
						console.log(user);
						return next(null, false);
					} else {
						attempts = 4;
						console.log('-else');
						let encryptedPassword = encryptThis(password);
						let params = {
							TableName: table,
							Item:{
								"username": username,
								"password": encryptedPassword
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
					if(attempts < 4) { attemptUser() }
				}, 1000);
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