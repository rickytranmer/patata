const router = require('express').Router();
const tasksController = require('../controllers/tasks');

function ghPages(req, res, next) {
	if(!req.headers.referer.includes('https://rickytranmer.github.io/patata')) { console.log('! outside request: ', req.headers.referer) }
	// res.redirect('https://rickytranmer.github.io/patata');
	return next();
}

router.get('/api/test', (req, res)=> {
  res.send({ test: ' server: 3.23' });
});

router.route('/api/task')
	.get(ghPages, tasksController.getTask)
	.post(ghPages, tasksController.postTask);

router.route('/api/task/:id')
	.get(ghPages, tasksController.getTask)
	.put(ghPages, tasksController.putTask)
	.delete(ghPages, tasksController.deleteTask);

router.get('/api/tasks', ghPages, tasksController.getTasks);
router.get('/api/tasks/:username', ghPages, tasksController.getTasks);

router.get('/*', (req, res)=> {
	res.redirect('https://rickytranmer.github.io/patata');
});

module.exports = router;