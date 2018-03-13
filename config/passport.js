//DEPRECATED
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
		return bcrypt.hashSync(password);
	};
	function validPassword(password, thisPassword) {
		return bcrypt.compareSync(password, thisPassword);
	};

	passport.serializeUser(function(user, next) {
		console.log('serializeUser');
		console.log(user.username);

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
		// let userExists = true; //changed if found
		let paramsGet = {
			TableName: table,
			Key:{ "username": username }
		};
		let encryptedPassword = encryptThis(password);
		let paramsPut = {
			TableName: table,
			Item:{
				"username": { S: username },
				"password": { S: encryptedPassword }
			}
		};

		docClient.get(paramsGet, function(err, user) {
			console.log('docClient get user ', username);
			if(err) { console.log(err) }
			if(!err && !user.username) {
				docClient.put(paramsPut, function(err, data) {
					console.log('docClient put user');
					if (err) {
						console.error("Unable to add user. Error JSON:", JSON.stringify(err, null, 2));
					}
					return next(null, paramsPut.Item);
				});
			}
		});
		
		console.log('local-signup end');
	}));
};