const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const router = require('./config/routes');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

app.use(express.static(__dirname + '/client'));
app.use(require('helmet')());
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
if(!process.env.DYNO) {
	app.use((req, res, next)=> {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Credentials", "true");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
	  next();
	});
}
app.use(session({
	secret: process.env.sessionSecret || require('./config/env.js').sessionSecret,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use((req, res, next)=> {
	res.locals.currentUser = req.user;
	console.log(req.user);
	next();
});

// - Routes
app.use('/', router);

app.listen(port, ()=> {
	console.log((new Date()).toString());
	console.log(`- Listening on port ${port}`);
});