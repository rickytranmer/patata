const router = require('express').Router();

// router.get('/', (req, res)=>{
// 	res.sendFile('index.html', {"root":"./client/build/"});
// });

router.get('/api/test', (req, res)=> {
  res.send({ test: 'api success' });
});

module.exports = router;