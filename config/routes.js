const router = require('express').Router();
const tasksController = require('../controllers/tasks');

router.get('/api/test', (req, res)=> {
  res.send({ test: ' server: 3.14a' });
});

router.route('/api/task')
	.get(tasksController.getTask)
	.post(tasksController.postTask);

router.route('/api/task/:id')
	.get(tasksController.getTask)
	.put(tasksController.putTask);

router.get('/api/tasks', tasksController.getTasks);
router.get('/api/tasks/:username', tasksController.getTasks);

router.get('/*', (req, res)=> {
	res.redirect('https://rickytranmer.github.io/patata');
});

module.exports = router;