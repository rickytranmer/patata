// 'use strict'
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const router = require('./config/routes');

app.use(express.static(__dirname + '/client'));
app.use(require('helmet')());
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));

// - Routes
app.use('/', router);

app.listen(port, ()=> {
	console.log((new Date()).toString());
	console.log(`- Listening on port ${port}`);
});