const router = require('express').Router();

// router.get('/', (req, res)=>{
// 	res.sendFile('index.html', {"root":"./client/build/"});
// });

router.get('/api/test', (req, res)=> {
  res.send({ test: 'api success' });
});

router.route('/api/task')
	// .get()
	.post((req, res, next)=> {
		console.log(req.body);
		res.send();
	});

module.exports = router;