const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));
app.use(require('helmet')());
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));

// - Routes
app.get('/api/test', (req, res) => {
  res.send({ test: 'api success' });
});

app.listen(port, ()=> {
	console.log((new Date()).toString());
	console.log(`- Listening on port ${port}`);
});