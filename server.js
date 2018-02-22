const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.get('/api/test', (req, res) => {
  res.send({ test: 'success' });
});

app.listen(port, ()=> console.log(`Listening on port ${port}`));